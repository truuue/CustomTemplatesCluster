"use client";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Section, Template } from "@/types/template";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LivePreview } from "./LivePreview";
import { SectionEditor } from "./SectionEditor";

interface TemplateEditorProps {
  initialTemplate: Template;
}

// Modifions le SelectWrapper pour éviter les problèmes d'hydratation
const SelectWrapper = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.Select),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 w-full rounded-md border border-input bg-background" />
    ),
  }
);

// Modifions le DraggableSectionListWrapper également
const DraggableSectionListWrapper = dynamic(
  () =>
    import("./DraggableSectionList").then((mod) => mod.DraggableSectionList),
  {
    ssr: false,
    loading: () => <div className="h-20 animate-pulse rounded-md bg-muted" />,
  }
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

  const handleSectionDelete = async (sectionToDelete: Section) => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `/api/templates/${template._id}/sections/${sectionToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setTemplate((prev) => ({
        ...prev,
        sections: prev.sections.filter((s) => s.id !== sectionToDelete.id),
      }));
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative h-screen">
      {/* Bouton mobile pour ouvrir le panneau d'édition */}
      <div className="fixed left-4 top-4 z-50 block lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <EditorPanel
              template={template}
              activeSection={activeSection}
              isSaving={isSaving}
              onAddSection={handleAddSection}
              onSectionsReorder={handleSectionsReorder}
              onSectionSelect={setActiveSection}
              onSectionDelete={handleSectionDelete}
              onSectionUpdate={handleSectionUpdate}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Panneau d'édition desktop */}
      <div className="fixed hidden h-screen overflow-y-auto border-r bg-background lg:block lg:w-[300px] xl:w-[400px]">
        <EditorPanel
          template={template}
          activeSection={activeSection}
          isSaving={isSaving}
          onAddSection={handleAddSection}
          onSectionsReorder={handleSectionsReorder}
          onSectionSelect={setActiveSection}
          onSectionDelete={handleSectionDelete}
          onSectionUpdate={handleSectionUpdate}
        />
      </div>

      {/* Prévisualisation */}
      <div className="h-screen overflow-y-auto lg:pl-[300px] xl:pl-[400px]">
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

// Nouveau composant pour le panneau d'édition
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

function EditorPanel({
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

  if (!isMounted) {
    return <div className="space-y-6 p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="mb-4 text-lg font-semibold">Ajouter une section</h2>
        <SelectWrapper onValueChange={onAddSection} disabled={isSaving}>
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
