import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    // Supprimer l'utilisateur et toutes ses données associées
    await prisma.user.delete({
      where: { id: session.user.id },
    });

    return NextResponse.json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du compte:", error);
    return NextResponse.json(
      {
        message: "Erreur lors de la suppression du compte",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
