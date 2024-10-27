import { connectToDatabase } from "@/config/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectToDatabase();
    await db.command({ ping: 1 });

    return NextResponse.json({
      status: "success",
      message: "Connexion à MongoDB réussie",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Erreur de connexion à MongoDB",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

// curl http://localhost:3000/api/test-db
