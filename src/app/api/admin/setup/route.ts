import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function POST() {
  console.log("Setup admin - Email:", ADMIN_EMAIL);

  if (!ADMIN_EMAIL) {
    console.log("Setup admin - Erreur: ADMIN_EMAIL non configuré");
    return NextResponse.json(
      { error: "ADMIN_EMAIL non configuré" },
      { status: 500 }
    );
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL },
    });
    console.log("Setup admin - Utilisateur existant:", existingUser);

    // Créer ou mettre à jour l'utilisateur
    const user = await prisma.user.upsert({
      where: { email: ADMIN_EMAIL },
      update: { isAdmin: true, plan: "PRO" },
      create: {
        email: ADMIN_EMAIL,
        isAdmin: true,
        name: "Admin",
        plan: "PRO",
      },
    });

    console.log("Setup admin - Utilisateur mis à jour:", user);

    return NextResponse.json({
      success: true,
      message: `${ADMIN_EMAIL} est maintenant admin`,
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Setup admin - Erreur:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de la configuration admin",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
