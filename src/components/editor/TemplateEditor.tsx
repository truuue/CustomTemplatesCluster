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
import { useToast } from "@/hooks/use-toast";
import { useSessionId } from "@/hooks/useSessionId";
import { DeviceType } from "@/types/editor";
import { Section, Template } from "@/types/template";
import { Brush, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { EditorPanel } from "./EditorPanel";
import { LivePreview } from "./LivePreview";
import { PreviewToolbar } from "./PreviewToolbar";

interface TemplateEditorProps {
  initialTemplate: Template;
}

export function TemplateEditor({ initialTemplate }: TemplateEditorProps) {
  const [template, setTemplate] = useState<Template>(initialTemplate);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const sessionId = useSessionId();

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
        body: JSON.stringify({
          ...newSection,
          sessionId: !session?.user?.id ? sessionId : null,
        }),
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
      console.log("Updating section with ID:", updatedSection.id);
      console.log("Template ID:", template._id);

      const url = new URL(
        `/api/templates/${template._id}/sections/${updatedSection.id}`,
        window.location.origin
      );
      url.searchParams.set("id", template._id);
      url.searchParams.set("sectionId", updatedSection.id);

      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedSection,
          sessionId: !session?.user?.id ? sessionId : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la mise à jour");
      }

      setTemplate((prev) => ({
        ...prev,
        sections: prev.sections.map((s) =>
          s.id === updatedSection.id ? updatedSection : s
        ),
      }));

      toast({
        title: "Succès",
        description: "Section mise à jour avec succès",
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour la section",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSectionsReorder = async (reorderedSections: Section[]) => {
    setIsSaving(true);
    try {
      console.log("Reordering sections for template ID:", template._id);

      const url = new URL(
        `/api/templates/${template._id}/sections/reorder`,
        window.location.origin
      );
      url.searchParams.set("id", template._id);

      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sections: reorderedSections,
          sessionId: !session?.user?.id ? sessionId : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la réorganisation");
      }

      setTemplate((prev) => ({ ...prev, sections: reorderedSections }));
      toast({
        title: "Succès",
        description: "Sections réorganisées avec succès",
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de réorganiser les sections",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSectionDelete = async (sectionToDelete: Section) => {
    setIsSaving(true);
    try {
      console.log("Deleting section with ID:", sectionToDelete.id);
      console.log("Template ID:", template._id);

      const url = new URL(
        `/api/templates/${template._id}/sections/${sectionToDelete.id}`,
        window.location.origin
      );
      url.searchParams.set("id", template._id);
      url.searchParams.set("sectionId", sectionToDelete.id);
      if (!session?.user?.id && sessionId) {
        url.searchParams.set("sessionId", sessionId);
      }

      const response = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      setTemplate((prev) => ({
        ...prev,
        sections: prev.sections.filter((s) => s.id !== sectionToDelete.id),
      }));

      toast({
        title: "Succès",
        description: data.message || "Section supprimée avec succès",
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer la section",
      });
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
          <Brush className="size-5 text-primary" />
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
            templateId={template._id}
          />
        )}
      </div>
    </div>
  );
}
