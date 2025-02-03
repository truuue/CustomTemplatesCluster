import { sendRedisAlert } from "@/lib/email";
import { redis } from "@/lib/redis-limiter";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../pages/api/auth/[...nextauth]";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  // Vérifier que l'utilisateur est admin
  if (!session?.user?.email || !session.user.isAdmin) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    // Test 1: Connexion basique
    const testKey = "test_connection";
    const testValue = "ok_" + Date.now();
    await redis.set(testKey, testValue);
    const readValue = await redis.get(testKey);
    await redis.del(testKey);

    // Test 2: Simuler une charge pour déclencher une alerte
    const simulatedStats = {
      daily: 4500, // 50% de la limite
      hourly: 187, // 50% de la limite horaire
      dailyLimit: 9000,
      hourlyLimit: 375,
    };

    // Envoyer une alerte de test
    await sendRedisAlert(simulatedStats);

    return NextResponse.json({
      success: true,
      connection: readValue === testValue,
      message: "Tests Redis effectués avec succès",
      details: {
        connectionTest: readValue === testValue,
        alertSent: true,
        simulatedLoad: simulatedStats,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
