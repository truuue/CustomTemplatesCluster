import { generateDeploymentZip } from "@/lib/deploy-utils";
import { generateStaticHTML } from "@/lib/static-renderer";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../pages/api/auth/[...nextauth]";

const NETLIFY_PAT = process.env.NETLIFY_PAT;
const NETLIFY_API = "https://api.netlify.com/api/v1";

export async function POST(
  request: Request,
  { params }: { params: { templateId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    if (!NETLIFY_PAT) {
      return NextResponse.json(
        { error: "Configuration Netlify manquante" },
        { status: 500 }
      );
    }

    const { template } = await request.json();

    // Générer le HTML et CSS statiques
    const { html, css } = await generateStaticHTML(template);

    // Préparer les assets pour le déploiement
    const assets = {
      html,
      css,
      images: {},
      scripts: {
        "runtime.js": `
          // Hydratation minimale
          document.addEventListener('DOMContentLoaded', function() {
            // Ajouter ici la logique d'interactivité si nécessaire
          });
        `,
      },
    };

    // Générer le ZIP avec tous les assets
    const deploymentZip = await generateDeploymentZip(template, assets);

    // Générer un nom unique pour le site
    const uniqueSiteName = `template-${params.templateId}-${Date.now().toString(36)}`;

    // 1. Créer un nouveau site sur Netlify
    const siteResponse = await fetch(`${NETLIFY_API}/sites`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NETLIFY_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: uniqueSiteName,
        custom_domain: null,
      }),
    });

    const siteData = await siteResponse.json();
    if (!siteResponse.ok) {
      throw new Error("Erreur lors de la création du site");
    }

    // 2. Déployer le contenu avec le ZIP
    const deployResponse = await fetch(
      `${NETLIFY_API}/sites/${siteData.site_id}/deploys`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NETLIFY_PAT}`,
          "Content-Type": "application/zip",
        },
        body: deploymentZip,
      }
    );

    if (!deployResponse.ok) {
      throw new Error("Erreur lors du déploiement");
    }

    return NextResponse.json({
      deployUrl: siteData.ssl_url,
      claimUrl: `https://app.netlify.com/sites/${siteData.name}/claim`,
    });
  } catch (error) {
    console.error("Erreur de déploiement:", error);
    return NextResponse.json(
      { error: "Erreur lors du déploiement" },
      { status: 500 }
    );
  }
}
