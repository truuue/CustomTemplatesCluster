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

  const [pending, setPending] = useState(false);

  const handleCreate = async () => {
    try {
      setPending(true);

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
    <div className="container mx-auto">
      {/* Grille de fond avec dégradé */}
      <div className="bg-grid-pattern fixed inset-0 -z-10 opacity-100 dark:opacity-80 dark:[background-image:linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)]">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      <div className="flex h-screen flex-col items-center justify-center p-4">
        <Card className="hover-card flex w-full flex-col justify-between md:w-2/3 lg:w-1/2">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">
              Créer un nouveau template
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Commencez par donner un nom et une description à votre template
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
            {pending && <p className="text-center">Création en cours...</p>}
            {!pending && (
              <Button
                onClick={handleCreate}
                className="w-full"
                suppressHydrationWarning
              >
                Créer et commencer l'édition
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
