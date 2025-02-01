import { Resend } from "resend";
import logger from "./logger";

if (!process.env.RESEND_API_KEY) {
  throw new Error("La clé API Resend n'est pas configurée");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRedisAlert(stats: {
  daily: number;
  hourly: number;
  dailyLimit: number;
  hourlyLimit: number;
}) {
  const dailyPercentage = (stats.daily / stats.dailyLimit) * 100;
  const hourlyPercentage = (stats.hourly / stats.hourlyLimit) * 100;

  console.log("=== DÉBUT ENVOI EMAIL ===");
  console.log("Configuration email:", {
    from: process.env.REDIS_ALERT_FROM || "Redis Monitor <redis@showcaser.app>",
    to: process.env.ADMIN_EMAIL || "admin@showcaser.app",
    resendKey: process.env.RESEND_API_KEY
      ? `${process.env.RESEND_API_KEY.substring(0, 8)}...`
      : "Non configuré",
  });

  const html = `
    <h2>⚠️ Alerte Redis - Limites d'utilisation</h2>
    <p>Les limites d'utilisation de Redis approchent des seuils critiques :</p>
    
    <h3>Utilisation Journalière</h3>
    <p>${stats.daily}/${stats.dailyLimit} requêtes (${dailyPercentage.toFixed(1)}%)</p>
    
    <h3>Utilisation Horaire</h3>
    <p>${stats.hourly}/${stats.hourlyLimit} requêtes (${hourlyPercentage.toFixed(1)}%)</p>
    
    <p>Veuillez vérifier le tableau de bord pour plus de détails.</p>
    
    <hr>
    <p><small>Cet email est envoyé automatiquement par le système de monitoring Redis.</small></p>
  `;

  try {
    console.log("Tentative d'envoi via Resend...");
    const emailConfig = {
      from:
        process.env.REDIS_ALERT_FROM || "Redis Monitor <redis@showcaser.app>",
      to: process.env.ADMIN_EMAIL || "admin@showcaser.app",
      subject: `🚨 Alerte Redis - Utilisation ${Math.max(dailyPercentage, hourlyPercentage).toFixed(0)}%`,
      html: html,
      tags: [
        { name: "type", value: "redis_alert" },
        { name: "daily_usage", value: dailyPercentage.toFixed(0) },
        { name: "hourly_usage", value: hourlyPercentage.toFixed(0) },
      ],
    };
    console.log("Configuration complète:", emailConfig);

    const result = await resend.emails.send(emailConfig);
    console.log("Réponse Resend:", result);

    logger.info({
      message: "Alerte Redis envoyée par email",
      emailId: result.data?.id ?? 'unknown',
      dailyPercentage,
      hourlyPercentage,
    });

    console.log("=== EMAIL ENVOYÉ AVEC SUCCÈS ===");
  } catch (error) {
    console.error("=== ERREUR D'ENVOI EMAIL ===");
    console.error("Erreur complète:", error);
    if (error instanceof Error) {
      console.error("Message d'erreur:", error.message);
      console.error("Stack trace:", error.stack);
    }
    logger.error({
      message: "Erreur lors de l'envoi de l'alerte Redis",
      error,
      stats,
    });
    throw error;
  }
}
