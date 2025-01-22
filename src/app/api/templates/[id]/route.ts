import { connectToDatabase } from "@/config/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../pages/api/auth/[...nextauth]";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!id) {
    return res.status(400).json({ error: "ID invalide" });
  }
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return res.status(401).json({ error: "Non autorisé" });
    }

    const db = await connectToDatabase();
    const template = await db.collection("templates").findOne({
      _id: new ObjectId(id),
      userId: session.user.id,
    });

    if (!template) {
      return res.status(404).json({ message: "Template non trouvé" });
    }

    // Sérialiser le template
    const serializedTemplate = {
      ...template,
      _id: template._id.toString(),
      createdAt: new Date(template.createdAt).toISOString(),
      updatedAt: new Date(template.updatedAt).toISOString(),
    };

    return res.json(serializedTemplate);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erreur lors de la récupération du template",
      error: error instanceof Error ? error.message : "Erreur inconnue",
    });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "ID invalide" });
  }
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return res.status(401).json({ error: "Non autorisé" });
    }

    const body = req.body;
    const db = await connectToDatabase();

    // Vérifier que le template appartient à l'utilisateur
    const existingTemplate = await db.collection("templates").findOne({
      _id: new ObjectId(id as string),
      userId: session.user.id,
    });

    if (!existingTemplate) {
      return res.status(401).json({ error: "Non autorisé" });
    }

    const updateData = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    delete updateData._id; // Supprimer _id pour éviter les conflits

    const result = await db
      .collection("templates")
      .updateOne({ _id: new ObjectId(id as string) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Template non trouvé" });
    }

    return res.json({
      _id: id,
      ...updateData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erreur lors de la mise à jour du template",
      error: error instanceof Error ? error.message : "Erreur inconnue",
    });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "ID invalide" });
  }
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return res.status(401).json({ error: "Non autorisé" });
    }

    const db = await connectToDatabase();

    const result = await db.collection("templates").deleteOne({
      _id: new ObjectId(id as string),
      userId: session.user.id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Template non trouvé" });
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("Erreur API:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
