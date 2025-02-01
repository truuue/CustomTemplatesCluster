import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const LOG_DIR = process.env.LOG_DIR || "logs";
const MAX_SIZE = process.env.LOG_MAX_SIZE || "10m";
const MAX_FILES = process.env.LOG_MAX_FILES || "14d";

// Transport avec rotation pour les erreurs
const errorTransport = new DailyRotateFile({
  filename: `${LOG_DIR}/error-%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  maxSize: MAX_SIZE,
  maxFiles: MAX_FILES,
  level: "error",
  format: format.combine(format.timestamp(), format.json()),
});

// Transport avec rotation pour les accès
const accessTransport = new DailyRotateFile({
  filename: `${LOG_DIR}/access-%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  maxSize: MAX_SIZE,
  maxFiles: MAX_FILES,
  format: format.combine(format.timestamp(), format.json()),
});

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [errorTransport, accessTransport],
});

// Console logging en développement
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export function logUnauthorizedAccess(
  userId: string,
  attemptedAction: string,
  userPlan: string
) {
  logger.warn({
    message: "Tentative d'accès non autorisé",
    userId,
    attemptedAction,
    userPlan,
    timestamp: new Date().toISOString(),
    ip: process.env.NODE_ENV === "production" ? "[REDACTED]" : "127.0.0.1", // Protection des IPs en prod
  });
}

export function logPlanValidationError(userId: string, error: string) {
  logger.error({
    message: "Erreur de validation de plan",
    userId,
    error,
    timestamp: new Date().toISOString(),
  });
}

export default logger;
