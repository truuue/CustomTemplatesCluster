import { redis } from "@/lib/redis-limiter";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../pages/api/auth/[...nextauth]";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Vérifier que l'utilisateur est admin
  if (!session?.user?.email || !session.user.isAdmin) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const date = new Date();
  const today = date.toISOString().split("T")[0];
  const currentHour = date.toISOString().split(":")[0];

  // Récupérer les compteurs
  const stats = {
    daily: {
      get: await redis.getDailyCount("get", today),
      set: await redis.getDailyCount("set", today),
      del: await redis.getDailyCount("del", today),
    },
    hourly: {
      get: await redis.getHourlyCount("get", currentHour),
      set: await redis.getHourlyCount("set", currentHour),
      del: await redis.getHourlyCount("del", currentHour),
    },
    limits: {
      daily: 9000,
      hourly: 375,
    },
  };

  return NextResponse.json(stats);
}
