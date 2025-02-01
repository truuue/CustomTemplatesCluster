import { connectToDatabase } from "@/config/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ count: 0 });
  }

  const db = await connectToDatabase();
  const count = await db.collection("templates").countDocuments({
    userId: session.user.id,
  });

  return NextResponse.json({ count });
}
