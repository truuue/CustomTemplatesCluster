"use client";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DeviceType } from "@/types/editor";
import { Section, Template } from "@/types/template";
import { Calendar, Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { EditorPanel } from "./EditorPanel";
import { LivePreview } from "./LivePreview";
import { PreviewToolbar } from "./PreviewToolbar";

interface TemplateEditorProps {
  initialTemplate: Template;
}

// Modifions le SelectWrapper pour éviter les problèmes d'hydratation
const SelectWrapper = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.Select),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2">
        Chargement...
      </div>
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
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDeviceChange = (newDevice: DeviceType) => {
    setIsLoading(true);
    setDevice(newDevice);
    setTimeout(() => setIsLoading(false), 500);
  };

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
      {/* Barre d'outils mobile */}
      <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-background p-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-[400px] p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle>Éditeur de template</SheetTitle>
              </SheetHeader>
              <div className="h-[calc(100vh-65px)] overflow-y-auto p-4">
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
            </SheetContent>
          </Sheet>
          <PreviewToolbar
            device={device}
            handleDeviceChange={handleDeviceChange}
          />
        </div>
        <Link href="/" className="flex items-center gap-1">
          <Calendar className="size-5 text-primary" />
          <span className="text-base font-semibold">Showcaser</span>
        </Link>
      </div>

      {/* Panneau d'édition desktop */}
      <div className="fixed hidden h-screen w-[300px] overflow-hidden border-r bg-background lg:block xl:w-[400px]">
        <div className="h-full overflow-y-auto">
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
      </div>

      {/* Zone de prévisualisation */}
      <div className="h-screen overflow-y-auto pt-[64px] lg:pl-[300px] lg:pt-0 xl:pl-[400px]">
        {isSaving ? (
          <div className="flex h-full items-center justify-center">
            <Loading />
          </div>
        ) : (
          <LivePreview
            sections={template.sections}
            device={device}
            handleDeviceChange={handleDeviceChange}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
