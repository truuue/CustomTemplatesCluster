import { redis } from "@/lib/redis-limiter";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../../pages/api/auth/[...nextauth]";

export async function POST() {
  const session = await getServerSession(authOptions);
  console.log("Test Redis - Session:", session);
  console.log("Test Redis - URL:", process.env.REDIS_URL);

  // Vérifier que l'utilisateur est admin
  if (!session?.user?.email || !session.user.isAdmin) {
    console.log("Test Redis - Non autorisé:", session?.user);
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    // Test de connexion Redis avec ping uniquement
    console.log("Test Redis - Tentative de connexion...");
    const pingResult = await redis.ping();
    console.log("Test Redis - Ping résultat:", pingResult);

    return NextResponse.json({
      success: true,
      message: "Connexion Redis établie avec succès",
      details: {
        ping: pingResult,
      },
    });
  } catch (error) {
    console.error("Test Redis - Erreur complète:", error);
    return NextResponse.json(
      {
        error: "Erreur lors du test Redis",
        details: error instanceof Error ? error.message : "Erreur inconnue",
        url: process.env.REDIS_URL?.replace(/\/\/.*@/, "//***@"), // Masquer les credentials
      },
      { status: 500 }
    );
  }
}
