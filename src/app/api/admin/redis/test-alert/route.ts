import { sendRedisAlert } from "@/lib/email";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../../pages/api/auth/[...nextauth]";

export async function POST() {
  const session = await getServerSession(authOptions);
  console.log("Test Alerte - Session:", session);

  // Vérifier que l'utilisateur est admin
  if (!session?.user?.email || !session.user.isAdmin) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    console.log("Test Alerte - Début de l'envoi");
    // Simuler une utilisation élevée (80%)
    await sendRedisAlert({
      daily: 7200, // 80% de 9000
      hourly: 300, // 80% de 375
      dailyLimit: 9000,
      hourlyLimit: 375,
    });

    console.log("Test Alerte - Email envoyé avec succès");
    return NextResponse.json({
      success: true,
      message: "Email d'alerte test envoyé",
    });
  } catch (error) {
    console.error("Test Alerte - Erreur complète:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de l'envoi de l'email test",
        details: error instanceof Error ? error.message : "Erreur inconnue",
        config: {
          from: process.env.REDIS_ALERT_FROM,
          to: process.env.ADMIN_EMAIL,
          resendKey: process.env.RESEND_API_KEY ? "Configuré" : "Non configuré",
        },
      },
      { status: 500 }
    );
  }
}
