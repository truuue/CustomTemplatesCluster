import { connectToDatabase } from "@/config/database";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../pages/api/auth/[...nextauth]";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { sessionId } = await request.json();

    if (!session?.user?.id || !sessionId) {
      return NextResponse.json({ error: "Session invalide" }, { status: 401 });
    }

    const db = await connectToDatabase();

    // Vérifier si des templates existent avec cet ID de session
    const templatesExist = await db.collection("templates").findOne({
      sessionId: sessionId,
      userId: null,
    });

    if (!templatesExist) {
      return NextResponse.json({
        success: true,
        templatesLinked: 0,
      });
    }

    // Lier les templates avec sessionId à l'utilisateur
    const result = await db.collection("templates").updateMany(
      { sessionId: sessionId, userId: null },
      {
        $set: {
          userId: session.user.id,
          sessionId: null,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      templatesLinked: result.modifiedCount,
    });
  } catch (error) {
    console.error("Erreur lors de la liaison des templates:", error);
    return NextResponse.json(
      { error: "Erreur lors de la liaison des templates" },
      { status: 500 }
    );
  }
}
