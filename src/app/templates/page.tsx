"use client";

import BackgroundGrid from "@/components/ui/background-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const { toast } = useToast();

  const fetchTemplates = async () => {
    try {
      const response = await fetch("/api/templates");
      if (!response.ok) throw new Error("Erreur lors du chargement");
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les templates",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleDelete = async (templateId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce template ?")) return;

    try {
      const response = await fetch(`/api/templates/${templateId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      toast({
        title: "Succès",
        description: "Template supprimé avec succès",
      });

      setTemplates(templates.filter((t: any) => t._id !== templateId));
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le template",
      });
    }
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplates((prev) =>
      prev.includes(templateId)
        ? prev.filter((id) => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleDeleteSelected = async () => {
    if (
      !confirm(
        `Êtes-vous sûr de vouloir supprimer ${selectedTemplates.length} templates ?`
      )
    )
      return;

    try {
      const results = await Promise.all(
        selectedTemplates.map((id) =>
          fetch(`/api/templates/${id}`, {
            method: "DELETE",
          })
        )
      );

      if (results.some((r) => !r.ok))
        throw new Error("Erreur lors de la suppression");

      toast({
        title: "Succès",
        description: `${selectedTemplates.length} templates supprimés avec succès`,
      });

      setTemplates(
        templates.filter((t: any) => !selectedTemplates.includes(t._id))
      );
      setSelectedTemplates([]);
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer les templates sélectionnés",
      });
    }
  };

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      setSelectedTemplates([]);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BackgroundGrid />

        <div className="mb-8 flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-40" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackgroundGrid />

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mes Templates</h1>
        <div className="flex items-center gap-4">
          <Button
            variant={selectionMode ? "destructive" : "outline"}
            className="flex items-center gap-2"
            onClick={toggleSelectionMode}
          >
            {selectionMode
              ? "Annuler la sélection"
              : "Supprimer plusieurs templates"}
          </Button>
          {selectedTemplates.length > 0 && (
            <Button
              variant="destructive"
              className="flex items-center gap-2"
              onClick={handleDeleteSelected}
            >
              <Trash2 className="size-4" />
              Supprimer ({selectedTemplates.length})
            </Button>
          )}
          <Link href="/templates/new">
            <Button>Nouveau Template</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template: any) => (
          <Card
            key={template._id}
            className={cn(
              "group relative flex flex-col justify-between border border-primary/20 text-center",
              selectedTemplates.includes(template._id) && "border-primary"
            )}
          >
            {selectionMode && (
              <div className="absolute left-4 top-4 z-10">
                <Checkbox
                  checked={selectedTemplates.includes(template._id)}
                  onCheckedChange={() => handleSelectTemplate(template._id)}
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="mb-4 text-muted-foreground">
                {template.description}
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/templates/editor/${template._id}`}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    Éditer
                  </Button>
                </Link>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(template._id)}
                    >
                      <Trash2 className="size-4" />
                      <span className="sr-only">Supprimer le template</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Supprimer le template</TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
