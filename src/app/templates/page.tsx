"use client";

import BackgroundGrid from "@/components/ui/background-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        <Link href="/templates/new">
          <Button>Nouveau Template</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template: any) => (
          <Card
            key={template._id}
            className="group relative flex flex-col justify-between border border-primary/20 text-center"
          >
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 size-8 text-destructive opacity-0 transition-opacity hover:bg-destructive/10 group-hover:opacity-100"
                    onClick={() => handleDelete(template._id)}
                  >
                    <Trash2 className="size-4" />
                    <span className="sr-only">Supprimer le template</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Supprimer le template</TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="mb-4 text-muted-foreground">
                {template.description}
              </p>
              <Link href={`/templates/editor/${template._id}`}>
                <Button variant="outline" className="w-full">
                  Éditer
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
