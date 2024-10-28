"use client";

import { Card } from "@/components/ui/card";
import { Section } from "@/types/template";
import { HeroEditor } from "./section-editors/HeroEditor";

interface SectionEditorProps {
  section: Section;
  onUpdate: (section: Section) => void;
}

export function SectionEditor({ section, onUpdate }: SectionEditorProps) {
  const renderEditor = () => {
    switch (section.type) {
      case "hero":
        return <HeroEditor section={section} onUpdate={onUpdate} />;
      case "features":
        // À implémenter
        return <div>Éditeur de fonctionnalités à venir</div>;
      case "pricing":
        // À implémenter
        return <div>Éditeur de tarification à venir</div>;
      case "testimonials":
        // À implémenter
        return <div>Éditeur de témoignages à venir</div>;
      case "contact":
        // À implémenter
        return <div>Éditeur de contact à venir</div>;
      default:
        return <div>Type de section non pris en charge</div>;
    }
  };

  return <Card className="p-4">{renderEditor()}</Card>;
}
