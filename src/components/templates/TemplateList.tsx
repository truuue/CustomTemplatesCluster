"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Template } from "@/types/template";
import { useEffect, useState } from "react";

export function TemplateList() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/templates");
        if (!response.ok)
          throw new Error("Erreur lors de la récupération des templates");

        const data = await response.json();
        setTemplates(data.data);
      } catch (error) {
        setError("Impossible de charger les templates");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card key={template._id?.toString()}>
          <CardHeader>
            <CardTitle>{template.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600">{template.description}</p>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">{template.category}</span>
              <Button variant="outline" size="sm">
                Voir plus
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
