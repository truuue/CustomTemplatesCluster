import { connectToDatabase } from "@/config/database";
import { Template } from "@/types/template";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const templates = await db.collection("templates").find({}).toArray();

    const serializedTemplates = templates.map((template) => ({
      ...template,
      _id: template._id.toString(),
      createdAt: new Date(template.createdAt).toISOString(),
      updatedAt: new Date(template.updatedAt).toISOString(),
    })) as Template[];

    return NextResponse.json(serializedTemplates);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Erreur lors de la récupération des templates",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    console.log("Début de la requête POST");
    const body = await request.json();
    console.log("Body reçu:", body);

    const db = await connectToDatabase();
    console.log("Connexion à la DB établie");

    const newTemplate: Omit<Template, '_id'> = {
      name: body.name || "",
      description: body.description || "",
      thumbnail: body.thumbnail || "",
      category: body.category || "business",
      sections: body.sections || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: body.userId || "",
      isPublic: body.isPublic || false,
      tags: body.tags || [],
    };

    const result = await db.collection("templates").insertOne(newTemplate);
    console.log("Document inséré:", result);

    return NextResponse.json({
      _id: result.insertedId.toString(),
      ...newTemplate,
    } as Template);
  } catch (error) {
    console.error("Erreur détaillée:", error);
    return NextResponse.json(
      { message: "Erreur lors de la création du template" },
      { status: 500 }
    );
  }
}
