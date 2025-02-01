import { connectToDatabase } from "@/config/database";
import { sectionSchema } from "@/lib/validations/template";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../../../../pages/api/auth/[...nextauth]";
import { logger } from "@/lib/logger";

export async function DELETE(req: NextRequest) {
  const segments = req.nextUrl.pathname.split('/');
  const id = segments[segments.length - 3];
  const sectionId = segments[segments.length - 1];
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

export async function PUT(req: NextRequest) {
  // Récupérer l'ID et sectionId depuis les segments d'URL
  const segments = req.nextUrl.pathname.split('/');
  const id = segments[segments.length - 3];
  const sectionId = segments[segments.length - 1];

  if (!id || !sectionId) {
    logger.error("Invalid parameters", { id, sectionId });
    return NextResponse.json(
      { error: "ID ou sectionId invalide" },
      { status: 400 }
    );
  }

  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDatabase();
    const { sessionId, ...updatedSection } = await req.json();

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

    // Validation de la section
    const validationResult = sectionSchema.safeParse(updatedSection);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Format de section invalide" },
        { status: 400 }
      );
    }

    const result = await db.collection("templates").updateOne(
      {
        _id: new ObjectId(id),
        "sections.id": sectionId,
      },
      {
        $set: {
          "sections.$": updatedSection,
          updatedAt: new Date().toISOString(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Section non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedSection);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Erreur lors de la mise à jour de la section",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
