import { connectToDatabase } from "@/config/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../../pages/api/auth/[...nextauth]";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const resolvedParams = await context.params;
    const db = await connectToDatabase();
    const data = await request.json();
    const { sessionId } = data;

    // Vérifier que le template appartient à l'utilisateur ou correspond à la session
    const template = await db.collection("templates").findOne({
      _id: new ObjectId(resolvedParams.id),
      $or: [
        { userId: session?.user?.id },
        { sessionId: sessionId, userId: null },
      ],
    });

    if (!template) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const result = await db
      .collection("templates")
      .updateOne({ _id: new ObjectId(resolvedParams.id) }, {
        $push: { sections: data },
        $set: { updatedAt: new Date().toISOString() },
      } as any);

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Template non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Erreur lors de l'ajout de la section",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
