import { connectToDatabase } from "@/config/database";
import { Section } from "@/types/template";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const newSection: Section = await request.json();
    const db = await connectToDatabase();

    const result = await db
      .collection("templates")
      .updateOne({ _id: new ObjectId(params.id) }, {
        $push: { sections: newSection },
        $set: { updatedAt: new Date().toISOString() },
      } as any);

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Template non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(newSection);
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
