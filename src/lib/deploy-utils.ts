import { Template } from "@/types/template";
import JSZip from "jszip";

interface DeploymentAssets {
  html: string;
  css: string;
  images: { [key: string]: Buffer };
  scripts?: { [key: string]: string };
}

export async function generateDeploymentZip(
  template: Template,
  assets: DeploymentAssets
): Promise<Buffer> {
  const zip = new JSZip();

  // Ajouter le HTML
  zip.file("index.html", assets.html);

  // Créer un dossier assets
  const assetsFolder = zip.folder("assets");

  // Ajouter le CSS
  assetsFolder?.file("styles.css", assets.css);

  // Ajouter les images
  const imagesFolder = assetsFolder?.folder("images");
  Object.entries(assets.images).forEach(([filename, buffer]) => {
    imagesFolder?.file(filename, buffer);
  });

  // Ajouter les scripts JS si présents
  if (assets.scripts) {
    const scriptsFolder = assetsFolder?.folder("js");
    Object.entries(assets.scripts).forEach(([filename, content]) => {
      scriptsFolder?.file(filename, content);
    });
  }

  // Générer le ZIP
  return await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
}
