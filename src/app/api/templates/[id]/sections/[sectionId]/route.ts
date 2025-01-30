import { connectToDatabase } from "@/config/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../../../../pages/api/auth/[...nextauth]";

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const sectionId = req.nextUrl.searchParams.get("sectionId");
  const sessionId = req.nextUrl.searchParams.get("sessionId");

  if (!id || !sectionId) {
    return NextResponse.json(
      { error: "ID ou sectionId invalide" },
      { status: 400 }
    );
  }

  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDatabase();

    // Vérifier que le template appartient à l'utilisateur ou correspond à la session
    const template = await db.collection("templates").findOne({
      _id: new ObjectId(id),
      $or: [
        { userId: session?.user?.id },
        { sessionId: sessionId, userId: null },
      ],
    });

    if (!template) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const result = await db.collection("templates").updateOne(
      { _id: new ObjectId(id) },
      {
        $pull: { sections: { id: sectionId } } as any,
        $set: { updatedAt: new Date().toISOString() },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Template non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Section supprimée avec succès" });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Erreur lors de la suppression de la section",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string; sectionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "ID de template invalide" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const data = await request.json();

    // Vérifier que le template appartient à l'utilisateur
    const template = await db.collection("templates").findOne({
      _id: new ObjectId(params.id),
      userId: session.user.id,
    });

    if (!template) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const result = await db.collection("templates").updateOne(
      {
        _id: new ObjectId(params.id),
        "sections.id": params.sectionId,
      },
      {
        $set: {
          "sections.$": data,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Section non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la section:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
