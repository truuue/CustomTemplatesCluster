"use client";

import { Loading } from "@/components/ui/loading";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Section, Template } from "@/types/template";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LivePreview } from "./LivePreview";
import { SectionEditor } from "./SectionEditor";

interface TemplateEditorProps {
  initialTemplate: Template;
}

const SelectWrapper = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.Select),
  {
    ssr: false, // Désactive le rendu côté serveur
  }
);

const DraggableSectionListWrapper = dynamic(
  () =>
    import("./DraggableSectionList").then((mod) => mod.DraggableSectionList),
  { ssr: false }
);

export function TemplateEditor({ initialTemplate }: TemplateEditorProps) {
  const [template, setTemplate] = useState<Template>(initialTemplate);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleAddSection = async (sectionType: string) => {
    setIsSaving(true);
    try {
      const newSection: Section = {
        id: uuidv4(),
        type: sectionType as
          | "hero"
          | "features"
          | "pricing"
          | "testimonials"
          | "contact"
          | "footer",
        content: {},
        style: {},
      };

      const response = await fetch(`/api/templates/${template._id}/sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSection),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout de la section");

      setTemplate((prev) => ({
        ...prev,
        sections: [...prev.sections, newSection],
      }));

      setActiveSection(newSection);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSectionUpdate = async (updatedSection: Section) => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `/api/templates/${template._id}/sections/${updatedSection.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedSection),
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      setTemplate((prev) => ({
        ...prev,
        sections: prev.sections.map((s) =>
          s.id === updatedSection.id ? updatedSection : s
        ),
      }));

      console.log("Section mise à jour avec succès");
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSectionsReorder = async (reorderedSections: Section[]) => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `/api/templates/${template._id}/sections/reorder`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sections: reorderedSections }),
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la réorganisation");
      setTemplate((prev) => ({ ...prev, sections: reorderedSections }));
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Panneau d'édition */}
      <div className="w-1/3 overflow-y-auto bg-gray-100 p-4">
        <div className="mb-6">
          <h2 className="mb-4 text-2xl font-bold">Ajouter une section</h2>
          <SelectWrapper onValueChange={handleAddSection} disabled={isSaving}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir un type de section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hero">Hero</SelectItem>
              <SelectItem value="features">Fonctionnalités</SelectItem>
              <SelectItem value="pricing">Tarification</SelectItem>
              <SelectItem value="testimonials">Témoignages</SelectItem>
              <SelectItem value="contact">Contact</SelectItem>
            </SelectContent>
          </SelectWrapper>
        </div>

        <div className="mb-6">
          <h2 className="mb-4 text-2xl font-bold">Sections</h2>
          {isSaving ? (
            <Loading />
          ) : (
            <DraggableSectionListWrapper
              sections={template.sections}
              onSectionsReorder={handleSectionsReorder}
              onSectionSelect={setActiveSection}
            />
          )}
        </div>

        {activeSection && (
          <div className="mt-6">
            <h2 className="mb-4 text-2xl font-bold">Éditer la section</h2>
            <SectionEditor
              section={activeSection}
              onUpdate={handleSectionUpdate}
            />
          </div>
        )}
      </div>

      {/* Prévisualisation en direct */}
      <div className="w-2/3 overflow-y-auto">
        {isSaving ? (
          <div className="flex h-full items-center justify-center">
            <Loading />
          </div>
        ) : (
          <LivePreview sections={template.sections} />
        )}
      </div>
    </div>
  );
}
