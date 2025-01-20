import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function rateLimit(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const key = `rate-limit:${ip}`;

  const current = await redis.incr(key);
  if (current > 100) {
    // 100 requêtes par minute
    return {
      success: false,
      message: "Trop de requêtes",
    };
  }

  await redis.expire(key, 60);
  return { success: true };
}
