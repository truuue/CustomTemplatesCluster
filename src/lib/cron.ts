import { CronJob } from "cron";
import logger from "@/lib/logger";
import { checkAllSubscriptions } from "@/lib/subscription-checker";

const TIMEZONE = process.env.TIMEZONE || "Europe/Paris";
const CHECK_TIME = process.env.SUBSCRIPTION_CHECK_TIME || "0 0 * * *";

// Vérification des abonnements à l'heure configurée
export const subscriptionCheckJob = new CronJob(
  CHECK_TIME,
  async () => {
    try {
      logger.info("Début de la vérification des abonnements", {
        timezone: TIMEZONE,
        scheduledTime: CHECK_TIME,
      });

      await checkAllSubscriptions();

      logger.info("Fin de la vérification des abonnements", {
        timezone: TIMEZONE,
        completedAt: new Date().toISOString(),
      });
    } catch (error) {
      logger.error("Erreur lors de la vérification des abonnements:", {
        error,
        timezone: TIMEZONE,
        failedAt: new Date().toISOString(),
      });
    }
  },
  null,
  false,
  TIMEZONE,
  null,
  true // runOnInit - lance une vérification au démarrage
);

// Démarrer la tâche si nous sommes en production
if (process.env.NODE_ENV === "production") {
  subscriptionCheckJob.start();
  logger.info("Tâche de vérification des abonnements démarrée", {
    timezone: TIMEZONE,
    nextRun: subscriptionCheckJob.nextDate().toString(),
  });
}
