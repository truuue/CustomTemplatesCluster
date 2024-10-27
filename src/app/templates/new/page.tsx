"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewTemplate() {
  const router = useRouter();
  const [templateInfo, setTemplateInfo] = useState({
    name: "",
    description: "",
  });

  const handleCreate = async () => {
    try {
      const response = await fetch("/api/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...templateInfo,
          sections: [],
        }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push(`/templates/editor/${data._id}`);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Créer un nouveau template</CardTitle>
          <CardDescription>
            Commencez par donner un nom et une description à votre template
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">Nom du template</Label>
            <Input
              id="template-name"
              type="text"
              value={templateInfo.name}
              onChange={(e) =>
                setTemplateInfo((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Mon super template"
              suppressHydrationWarning
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="template-description">Description</Label>
            <Input
              id="template-description"
              type="text"
              value={templateInfo.description}
              onChange={(e) =>
                setTemplateInfo((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Une brève description de votre template"
              suppressHydrationWarning
            />
          </div>
          <Button
            onClick={handleCreate}
            className="w-full"
            suppressHydrationWarning
          >
            Créer et commencer l'édition
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
