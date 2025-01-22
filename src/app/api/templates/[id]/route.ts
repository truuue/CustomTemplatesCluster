import { connectToDatabase } from "@/config/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../pages/api/auth/[...nextauth]";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const db = await connectToDatabase();
    const template = await db.collection("templates").findOne({
      _id: new ObjectId(params.id),
      userId: session.user.id,
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
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const db = await connectToDatabase();

    // Vérifier que le template appartient à l'utilisateur
    const existingTemplate = await db.collection("templates").findOne({
      _id: new ObjectId(params.id),
      userId: session.user.id,
    });

    if (!existingTemplate) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

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
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const db = await connectToDatabase();

    const result = await db.collection("templates").deleteOne({
      _id: new ObjectId(params.id),
      userId: session.user.id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Template non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
