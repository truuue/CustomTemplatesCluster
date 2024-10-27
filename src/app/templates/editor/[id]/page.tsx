import { TemplateEditor } from "@/components/editor/TemplateEditor";
import { Loading } from "@/components/ui/loading";
import { connectToDatabase } from "@/config/database";
import { Template } from "@/types/template";
import { ObjectId } from "mongodb";
import { Suspense } from "react";

async function getTemplate(id: string): Promise<Template> {
  const db = await connectToDatabase();
  const template = await db.collection("templates").findOne({
    _id: new ObjectId(id),
  });

  if (!template) {
    throw new Error("Template non trouvé");
  }

  return {
    _id: template._id.toString(),
    name: template.name || "",
    description: template.description || "",
    thumbnail: template.thumbnail || "",
    category: template.category || "business",
    sections: template.sections || [],
    createdAt: template.createdAt
      ? new Date(template.createdAt).toISOString()
      : new Date().toISOString(),
    updatedAt: template.updatedAt
      ? new Date(template.updatedAt).toISOString()
      : new Date().toISOString(),
    userId: template.userId || "",
    isPublic: template.isPublic || false,
    tags: template.tags || [],
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditorPage({ params }: PageProps) {
  // Attendre la résolution des paramètres
  const resolvedParams = await params;
  const template = await getTemplate(resolvedParams.id);

  return (
    <Suspense fallback={<Loading />}>
      <TemplateEditor initialTemplate={template} />
    </Suspense>
  );
}

// Optionnel : Générer les métadonnées de la page
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const template = await getTemplate(resolvedParams.id);

  return {
    title: `Édition - ${template.name}`,
    description: template.description,
  };
}
