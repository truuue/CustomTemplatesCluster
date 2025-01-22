import { connectToDatabase } from "@/config/database";
import { sectionSchema } from "@/lib/validations/template";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../../../pages/api/auth/[...nextauth]";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; sectionId: string } }
) {
  const { id, sectionId } = await params;
  try {
    const db = await connectToDatabase();

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
  const { id, sectionId } = params;
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const updatedSection = await request.json();

    // Validation de la section
    const validationResult = sectionSchema.safeParse(updatedSection);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Format de section invalide" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

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
