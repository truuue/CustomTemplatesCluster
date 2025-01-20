"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import BackgroundGrid from "@/components/ui/background-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
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
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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

  const handleDeleteConfirm = async () => {
    if (!templateToDelete) return;

    try {
      const response = await fetch(`/api/templates/${templateToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      toast({
        title: "Succès",
        description: "Template supprimé avec succès",
      });

      setTemplates(templates.filter((t: any) => t._id !== templateToDelete));
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le template",
      });
    } finally {
      setTemplateToDelete(null);
    }
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplates((prev) =>
      prev.includes(templateId)
        ? prev.filter((id) => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleMultipleDeleteConfirm = async () => {
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
    } finally {
      setIsDeleteDialogOpen(false);
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
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mr-4"
          >
            ← Retour
          </Button>
          <h1 className="text-3xl font-bold">Mes Templates</h1>
        </div>
        <div className="flex items-center gap-4">
          {templates.length > 0 && (
            <Button
              variant={selectionMode ? "destructive" : "outline"}
              className="flex items-center gap-2"
              onClick={toggleSelectionMode}
            >
              {selectionMode
                ? "Annuler la sélection"
                : "Supprimer plusieurs templates"}
            </Button>
          )}
          {selectedTemplates.length > 0 && (
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="size-4" />
                  Supprimer ({selectedTemplates.length})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Êtes-vous absolument sûr ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. {selectedTemplates.length}{" "}
                    templates seront définitivement supprimés.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleMultipleDeleteConfirm}>
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => setTemplateToDelete(template._id)}
                    >
                      <Trash2 className="size-4" />
                      <span className="sr-only">Supprimer le template</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Êtes-vous absolument sûr ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action est irréversible. Le template sera
                        définitivement supprimé.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => setTemplateToDelete(null)}
                      >
                        Annuler
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteConfirm}>
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
