import { Redis } from "ioredis";
import { logPlanValidationError } from "./logger";
import prisma from "./prisma";
import { stripe } from "./stripe";

// Vérification de la clé API Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("La clé API Stripe n'est pas configurée");
}

// Configuration Redis pour le cache
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
const CACHE_TTL = 5 * 60; // 5 minutes en secondes
const CACHE_PREFIX = "sub_status:";

export async function verifySubscriptionStatus(
  userId: string
): Promise<boolean> {
  try {
    // Vérifier le cache d'abord
    const cachedStatus = await redis.get(`${CACHE_PREFIX}${userId}`);
    if (cachedStatus !== null) {
      return cachedStatus === "true";
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true, plan: true },
    });

    if (!user || !user.stripeCustomerId || user.plan !== "PRO") {
      await redis.set(`${CACHE_PREFIX}${userId}`, "true", "EX", CACHE_TTL);
      return true; // Les utilisateurs gratuits sont toujours valides
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: "active",
      limit: 1,
    });

    const hasActiveSubscription = subscriptions.data.length > 0;

    if (!hasActiveSubscription && user.plan === "PRO") {
      // Rétrograder l'utilisateur vers le plan gratuit
      await prisma.user.update({
        where: { id: userId },
        data: { plan: "FREE" },
      });

      logPlanValidationError(
        userId,
        "Abonnement PRO expiré - Rétrogradé vers FREE"
      );
      await redis.set(`${CACHE_PREFIX}${userId}`, "false", "EX", CACHE_TTL);
      return false;
    }

    // Mettre en cache le résultat
    await redis.set(
      `${CACHE_PREFIX}${userId}`,
      hasActiveSubscription.toString(),
      "EX",
      CACHE_TTL
    );

    return hasActiveSubscription;
  } catch (error) {
    logPlanValidationError(userId, `Erreur de vérification: ${error}`);
    return false;
  }
}

export async function checkAllSubscriptions() {
  try {
    const proUsers = await prisma.user.findMany({
      where: { plan: "PRO" },
      select: { id: true },
    });

    // Utiliser un verrou distribué pour éviter les exécutions simultanées
    const lock = await redis.set(
      "subscription_check_lock",
      "1",
      "EX",
      3600,
      "NX"
    );
    if (!lock) {
      console.log("Une autre vérification est déjà en cours");
      return;
    }

    for (const user of proUsers) {
      await verifySubscriptionStatus(user.id);
      // Petit délai pour éviter de surcharger l'API Stripe
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Libérer le verrou
    await redis.del("subscription_check_lock");
  } catch (error) {
    console.error("Erreur lors de la vérification des abonnements:", error);
    // S'assurer que le verrou est libéré en cas d'erreur
    await redis.del("subscription_check_lock");
  }
}
