import { connectToDatabase } from "@/config/database";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await connectToDatabase();
    const template = await db.collection("templates").findOne({
      _id: new ObjectId(params.id),
    });

    if (!template) {
      return NextResponse.json(
        { message: "Template non trouvé" },
        { status: 404 }
      );
    }

    // Sérialiser le template
    const serializedTemplate = {
      ...template,
      _id: template._id.toString(),
      createdAt: new Date(template.createdAt).toISOString(),
      updatedAt: new Date(template.updatedAt).toISOString(),
    };

    return NextResponse.json(serializedTemplate);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Erreur lors de la récupération du template",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();

    const updateData = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    delete updateData._id; // Supprimer _id pour éviter les conflits

    const result = await db
      .collection("templates")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Template non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      _id: params.id,
      ...updateData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Erreur lors de la mise à jour du template",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await context.params;
    const db = await connectToDatabase();

    const result = await db
      .collection("templates")
      .deleteOne({ _id: new ObjectId(resolvedParams.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Template non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Template supprimé avec succès" });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Erreur lors de la suppression du template",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
