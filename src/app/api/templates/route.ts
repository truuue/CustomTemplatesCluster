import { connectToDatabase } from "@/config/database";
import { Template } from "@/types/template";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const db = await connectToDatabase();
    const templates = await db
      .collection("templates")
      .find({ userId: session.user.id })
      .toArray();

    const serializedTemplates = templates.map((template) => ({
      ...template,
      _id: template._id.toString(),
      createdAt: new Date(template.createdAt).toISOString(),
      updatedAt: new Date(template.updatedAt).toISOString(),
    })) as Template[];

    return NextResponse.json(serializedTemplates);
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const data = await request.json();
    const db = await connectToDatabase();

    const template = {
      ...data,
      userId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("templates").insertOne(template);
    return NextResponse.json({ _id: result.insertedId, ...template });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
