import { connectToDatabase } from "@/config/database";
import { sectionSchema } from "@/lib/validations/template";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "../../../../../../../pages/api/auth/[...nextauth]";

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { sections } = await req.json();

    // Validation des sections
    const validationResult = z.array(sectionSchema).safeParse(sections);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Format de sections invalide" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

    // Vérifier que le template appartient à l'utilisateur
    const template = await db.collection("templates").findOne({
      _id: new ObjectId(id),
      userId: session.user.id,
    });

    if (!template) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const result = await db.collection("templates").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          sections: sections,
          updatedAt: new Date(),
        },
      }
    );

    if (!result.matchedCount) {
      return NextResponse.json(
        { error: "Template non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la réorganisation des sections:", error);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "production"
            ? "Une erreur est survenue"
            : error instanceof Error
              ? error.message
              : "Une erreur est survenue",
      },
      { status: 500 }
    );
  }
}
