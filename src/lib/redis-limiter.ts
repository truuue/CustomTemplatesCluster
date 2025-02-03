import { sendRedisAlert } from "@/lib/email";
import { Redis } from "ioredis";
import logger from "@/lib/logger";

const DAILY_LIMIT = 9000; // 90% de la limite gratuite de 10k
const HOURLY_LIMIT = Math.floor(DAILY_LIMIT / 24);
const CACHE_TTL = 5 * 60; // 5 minutes en secondes

// Seuils d'alerte (en pourcentage)
const ALERT_THRESHOLDS = [50, 75, 90];

class RedisSafeLimiter {
  private redis: Redis;
  private counters: Map<string, number>;
  private lastReset: Date;
  private lastAlertTime: Date;
  private lastAlertPercentage: number;

  constructor(redisUrl: string) {
    this.redis = new Redis(redisUrl);
    this.counters = new Map();
    this.lastReset = new Date();
    this.lastAlertTime = new Date(0);
    this.lastAlertPercentage = 0;
  }

  private async checkAndSendAlert(dailyCount: number, hourlyCount: number) {
    const dailyPercentage = (dailyCount / DAILY_LIMIT) * 100;
    const hourlyPercentage = (hourlyCount / HOURLY_LIMIT) * 100;
    const maxPercentage = Math.max(dailyPercentage, hourlyPercentage);

    // Trouver le prochain seuil d'alerte dépassé
    const nextThreshold = ALERT_THRESHOLDS.find(
      (t) => maxPercentage >= t && t > this.lastAlertPercentage
    );

    if (
      nextThreshold &&
      Date.now() - this.lastAlertTime.getTime() > 30 * 60 * 1000
    ) {
      // 30 minutes entre les alertes
      await sendRedisAlert({
        daily: dailyCount,
        hourly: hourlyCount,
        dailyLimit: DAILY_LIMIT,
        hourlyLimit: HOURLY_LIMIT,
      });

      this.lastAlertTime = new Date();
      this.lastAlertPercentage = nextThreshold;

      logger.warn({
        message: "Alerte Redis envoyée",
        dailyPercentage,
        hourlyPercentage,
        threshold: nextThreshold,
      });
    }
  }

  private async incrementCounter(key: string): Promise<number> {
    const date = new Date();
    const dayKey = `counter:${key}:${date.toISOString().split("T")[0]}`;
    const hourKey = `counter:${key}:${date.toISOString().split(":")[0]}`;

    try {
      const multi = this.redis.multi();
      multi.incr(dayKey);
      multi.expire(dayKey, 86400); // 24 heures
      multi.incr(hourKey);
      multi.expire(hourKey, 3600); // 1 heure

      const results = await multi.exec();
      const dailyCount = results?.[0]?.[1] as number;
      const hourlyCount = results?.[2]?.[1] as number;

      // Vérifier les seuils d'alerte
      await this.checkAndSendAlert(dailyCount, hourlyCount);

      if (dailyCount > DAILY_LIMIT || hourlyCount > HOURLY_LIMIT) {
        logger.warn({
          message: "Limite Redis atteinte",
          daily: dailyCount,
          hourly: hourlyCount,
          key,
        });
        return -1;
      }

      return dailyCount;
    } catch (error) {
      logger.error({
        message: "Erreur Redis counter",
        error,
        key,
      });
      return -1;
    }
  }

  async getDailyCount(operation: string, date: string): Promise<number> {
    try {
      const count = await this.redis.get(`counter:${operation}:${date}`);
      return parseInt(count || "0");
    } catch (error) {
      logger.error({
        message: "Erreur lecture compteur journalier",
        error,
        operation,
        date,
      });
      return 0;
    }
  }

  async getHourlyCount(operation: string, hour: string): Promise<number> {
    try {
      const count = await this.redis.get(`counter:${operation}:${hour}`);
      return parseInt(count || "0");
    } catch (error) {
      logger.error({
        message: "Erreur lecture compteur horaire",
        error,
        operation,
        hour,
      });
      return 0;
    }
  }

  async getStats(): Promise<{
    daily: Record<string, number>;
    hourly: Record<string, number>;
    limits: { daily: number; hourly: number };
  }> {
    const date = new Date();
    const today = date.toISOString().split("T")[0];
    const currentHour = date.toISOString().split(":")[0];

    return {
      daily: {
        get: await this.getDailyCount("get", today),
        set: await this.getDailyCount("set", today),
        del: await this.getDailyCount("del", today),
      },
      hourly: {
        get: await this.getHourlyCount("get", currentHour),
        set: await this.getHourlyCount("set", currentHour),
        del: await this.getHourlyCount("del", currentHour),
      },
      limits: {
        daily: DAILY_LIMIT,
        hourly: HOURLY_LIMIT,
      },
    };
  }

  async get(key: string): Promise<string | null> {
    const count = await this.incrementCounter("get");
    if (count === -1) return null;

    try {
      return await this.redis.get(key);
    } catch (error) {
      logger.error({
        message: "Erreur Redis get",
        error,
        key,
      });
      return null;
    }
  }

  async set(
    key: string,
    value: string,
    ttl: number = CACHE_TTL
  ): Promise<"OK" | null> {
    const count = await this.incrementCounter("set");
    if (count === -1) return null;

    try {
      return await this.redis.set(key, value, "EX", ttl);
    } catch (error) {
      logger.error({
        message: "Erreur Redis set",
        error,
        key,
      });
      return null;
    }
  }

  async del(key: string): Promise<number> {
    const count = await this.incrementCounter("del");
    if (count === -1) return 0;

    try {
      return await this.redis.del(key);
    } catch (error) {
      logger.error({
        message: "Erreur Redis del",
        error,
        key,
      });
      return 0;
    }
  }

  async ping(): Promise<string> {
    try {
      return await this.redis.ping();
    } catch (error) {
      console.error("Erreur Redis ping:", error);
      throw error;
    }
  }
}

export const redis = new RedisSafeLimiter(
  process.env.REDIS_URL || "redis://localhost:6379"
);
