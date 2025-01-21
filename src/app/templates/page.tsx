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
      <div className="container mx-auto px-2 py-4 sm:px-4 sm:py-8">
        <BackgroundGrid />

        <div className="mb-4 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
          <Skeleton className="h-8 w-32 sm:h-10 sm:w-48" />
          <Skeleton className="h-8 w-24 sm:h-10 sm:w-32" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-32 sm:h-40" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackgroundGrid />

      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="shrink-0"
          >
            ← Retour
          </Button>
          <h1 className="text-2xl font-bold sm:text-3xl">Mes Templates</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {templates.length > 0 && (
            <Button
              variant={selectionMode ? "destructive" : "outline"}
              className="flex-1 items-center gap-2 text-sm sm:flex-none sm:text-base"
              onClick={toggleSelectionMode}
            >
              {selectionMode ? "Annuler" : "Supprimer plusieurs templates"}
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
                  className="flex-1 items-center gap-2 sm:flex-none"
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
          <Link href="/templates/new" className="flex-1 sm:flex-none">
            <Button className="w-full">Nouveau Template</Button>
          </Link>
        </div>
      </div>

      {templates.length === 0 && (
        <div className="flex h-[70dvh] items-center justify-center">
          <p className="text-muted-foreground">
            Aucun template trouvé créez en un dès maintenant !
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template: any) => (
          <Card
            key={template._id}
            className={cn(
              "group relative flex flex-col justify-between border border-primary/20 p-4 text-center sm:p-6",
              selectedTemplates.includes(template._id) && "border-primary"
            )}
          >
            {selectionMode && (
              <div className="absolute left-2 top-2 z-10 sm:left-4 sm:top-4">
                <Checkbox
                  checked={selectedTemplates.includes(template._id)}
                  onCheckedChange={() => handleSelectTemplate(template._id)}
                />
              </div>
            )}
            <CardHeader className="p-0 sm:p-4">
              <CardTitle className="text-lg sm:text-xl">
                {template.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-0 sm:p-4">
              <p className="mb-4 text-sm text-muted-foreground sm:text-base">
                {template.description}
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/templates/editor/${template._id}`}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full text-sm sm:text-base"
                  >
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
