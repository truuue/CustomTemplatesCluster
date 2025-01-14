"use client";

import { Loading } from "@/components/ui/loading";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Section, Template } from "@/types/template";
import { useEffect, useState } from "react";
import { DraggableSectionListWrapper, SelectWrapper } from "./dynamic-imports";
import { SectionEditor } from "./SectionEditor";

interface EditorPanelProps {
  template: Template;
  activeSection: Section | null;
  isSaving: boolean;
  onAddSection: (sectionType: string) => void;
  onSectionsReorder: (sections: Section[]) => void;
  onSectionSelect: (section: Section) => void;
  onSectionDelete: (section: Section) => void;
  onSectionUpdate: (section: Section) => void;
}

export function EditorPanel({
  template,
  activeSection,
  isSaving,
  onAddSection,
  onSectionsReorder,
  onSectionSelect,
  onSectionDelete,
  onSectionUpdate,
}: EditorPanelProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="p-6">Chargement...</div>;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="mb-4 text-lg font-semibold">Ajouter une section</h2>
        <div className="space-y-2">
          <SelectWrapper onValueChange={onAddSection} disabled={isSaving}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir un type de section" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types de sections disponibles</SelectLabel>
                <SelectItem value="header">Header</SelectItem>
                <SelectItem value="hero">Hero</SelectItem>
                <SelectItem value="features">Fonctionnalités</SelectItem>
                <SelectItem value="pricing">Tarification</SelectItem>
                <SelectItem value="testimonials">Témoignages</SelectItem>
                <SelectItem value="contact">Contact</SelectItem>
                <SelectItem value="footer">Pied de page</SelectItem>
              </SelectGroup>
            </SelectContent>
          </SelectWrapper>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Sections</h2>
        {isSaving ? (
          <Loading />
        ) : (
          <DraggableSectionListWrapper
            sections={template.sections}
            onSectionsReorder={onSectionsReorder}
            onSectionSelect={onSectionSelect}
            onSectionDelete={onSectionDelete}
          />
        )}
      </div>

      {activeSection && (
        <div>
          <h2 className="mb-4 text-lg font-semibold">Éditer la section</h2>
          <SectionEditor section={activeSection} onUpdate={onSectionUpdate} />
        </div>
      )}
    </div>
  );
}
