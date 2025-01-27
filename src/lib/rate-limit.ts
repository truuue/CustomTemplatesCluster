import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function rateLimit(request: Request, limit = 100, duration = 60) {
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const path = request.url.split("/")[1] || "default";
  const key = `rate-limit:${ip}:${path}`;

  const current = await redis.incr(key);
  if (current > limit) {
    return {
      success: false,
      message: "Trop de requêtes veuillez réessayer plus tard",
      remaining: 0,
    };
  }

  await redis.expire(key, duration);
  return {
    success: true,
    remaining: limit - current,
  };
}
