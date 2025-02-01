import { connectToDatabase } from "@/config/database";
import { templateSchema } from "@/lib/validations/template";
import { Template } from "@/types/template";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDatabase();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

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
    const data = await request.json();

    // Validation du template
    const validationResult = templateSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: validationResult.error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const template = {
      ...validationResult.data,
      userId: session?.user?.id || null,
      sessionId: !session?.user?.id ? data.sessionId : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const db = await connectToDatabase();
    const result = await db.collection("templates").insertOne(template);

    return NextResponse.json({ _id: result.insertedId, ...template });
  } catch (error) {
    console.error(error);
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

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const data = await request.json();
    const { templateId, sessionId } = data;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const db = await connectToDatabase();

    // Mettre à jour le template avec l'ID de l'utilisateur
    const result = await db.collection("templates").updateOne(
      {
        _id: templateId,
        sessionId: sessionId,
        userId: null,
      },
      {
        $set: {
          userId: session.user.id,
          sessionId: null,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Template non trouvé ou déjà lié" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
