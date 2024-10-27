import { connectToDatabase } from "@/config/database";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; sectionId: string } }
) {
  try {
    const db = await connectToDatabase();

    const result = await db.collection("templates").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $pull: { sections: { id: params.sectionId } } as any,
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
    const db = await connectToDatabase();
    const updatedSection = await request.json();

    const result = await db.collection("templates").updateOne(
      {
        _id: new ObjectId(params.id),
        "sections.id": params.sectionId,
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
