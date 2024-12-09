"use client";

import { Card } from "@/components/ui/card";
import { Section } from "@/types/template";
import { FeaturesEditor } from "./section-editors/FeaturesEditor";
import { HeaderEditor } from "./section-editors/HeaderEditor";
import { HeroEditor } from "./section-editors/HeroEditor";
import { PricingEditor } from "./section-editors/PricingEditor";

interface SectionEditorProps {
  section: Section;
  onUpdate: (section: Section) => void;
}

export function SectionEditor({ section, onUpdate }: SectionEditorProps) {
  const renderEditor = () => {
    switch (section.type) {
      case "header":
        return <HeaderEditor section={section} onUpdate={onUpdate} />;
      case "hero":
        return <HeroEditor section={section} onUpdate={onUpdate} />;
      case "features":
        return <FeaturesEditor section={section} onUpdate={onUpdate} />;
      case "pricing":
        return <PricingEditor section={section} onUpdate={onUpdate} />;
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
