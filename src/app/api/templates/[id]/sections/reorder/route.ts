import { connectToDatabase } from "@/config/database";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { sections } = await request.json();
    const db = await connectToDatabase();

    const result = await db.collection("templates").updateOne(
      { _id: new ObjectId(params.id) },
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
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
