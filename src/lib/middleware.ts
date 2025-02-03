import { connectToDatabase } from "@/config/database";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { logUnauthorizedAccess } from "@/lib/logger";
import { getUserPlanRestrictions } from "@/lib/plan-restrictions";
import { rateLimit } from "@/lib/rate-limit";
import { verifySubscriptionStatus } from "@/lib/subscription-checker";

export async function middleware(req: NextRequest) {
  // Vérifier si c'est une route API
  if (req.nextUrl.pathname.startsWith("/api/")) {
    // Rate limiting pour les routes API
    const limiter = await rateLimit(req);
    if (!limiter.success) {
      return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });
    }

    // Vérification de la taille du body pour les requêtes POST/PUT
    if (["POST", "PUT"].includes(req.method)) {
      const contentLength = req.headers.get("content-length");
      if (contentLength && parseInt(contentLength) > 1000000) {
        // 1MB
        return NextResponse.json(
          { error: "Payload trop volumineux" },
          { status: 413 }
        );
      }
    }
  }

  // Vérification de l'authentification
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Vérification des restrictions du plan
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true, stripeCustomerId: true },
  });

  const userPlan = user?.plan || "FREE";
  const restrictions = getUserPlanRestrictions(userPlan);

  // Vérification de l'abonnement pour les utilisateurs PRO
  if (userPlan === "PRO") {
    const isSubscriptionValid = await verifySubscriptionStatus(session.user.id);
    if (!isSubscriptionValid) {
      logUnauthorizedAccess(
        session.user.id,
        "Accès PRO avec abonnement invalide",
        userPlan
      );
      return NextResponse.redirect(new URL("/#pricing", req.url));
    }
  }

  // Vérification des accès aux fonctionnalités premium
  if (req.nextUrl.pathname.startsWith("/templates/")) {
    // Vérifier le nombre de templates pour le plan gratuit
    if (userPlan === "FREE") {
      const db = await connectToDatabase();
      const templatesCount = await db.collection("templates").countDocuments({
        userId: session.user.id,
      });

      if (
        templatesCount >= restrictions.maxTemplates &&
        req.nextUrl.pathname === "/templates/new"
      ) {
        logUnauthorizedAccess(
          session.user.id,
          "Tentative de création de template au-delà de la limite",
          userPlan
        );
        return NextResponse.redirect(new URL("/#pricing", req.url));
      }
    }
  }

  // Vérification des fonctionnalités premium
  if (
    (req.nextUrl.pathname.includes("/analytics") &&
      !restrictions.hasAdvancedAnalytics) ||
    (req.nextUrl.pathname.includes("/templates/premium") &&
      !restrictions.hasAllTemplates)
  ) {
    logUnauthorizedAccess(
      session.user.id,
      `Tentative d'accès à ${req.nextUrl.pathname}`,
      userPlan
    );
    return NextResponse.redirect(new URL("/#pricing", req.url));
  }

  const response = NextResponse.next();

  // Ajouter les en-têtes de sécurité
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
}

// Configuration des routes à protéger
export const config = {
  matcher: [
    // Routes protégées nécessitant une authentification
    "/templates/:path*",
    "/account/:path*",
    "/custom-domain/:path*",
    "/analytics/:path*",
    // Routes API
    "/api/:path*",
  ],
};
