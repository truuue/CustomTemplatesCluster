import { TemplateForm } from "@/components/templates/TemplateForm";

export default function CreateTemplatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Créer un nouveau template</h1>
      <div className="max-w-2xl">
        <TemplateForm />
      </div>
    </div>
  );
}
