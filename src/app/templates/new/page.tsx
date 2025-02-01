"use client";

import BackgroundGrid from "@/components/ui/background-grid";
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
import { usePlanRestrictions } from "@/hooks/usePlanRestrictions";
import { useSessionId } from "@/hooks/useSessionId";
import { canCreateNewTemplate } from "@/lib/plan-restrictions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewTemplate() {
  const router = useRouter();
  const { data: session } = useSession();
  const sessionId = useSessionId();
  const [templateInfo, setTemplateInfo] = useState({
    name: "",
    description: "",
    category: "",
  });

  const [pending, setPending] = useState(false);
  const { restrictions, userPlan } = usePlanRestrictions();
  const [templatesCount, setTemplatesCount] = useState(0);

  const isFormValid =
    templateInfo.name.trim() !== "" && templateInfo.description.trim() !== "";

  useEffect(() => {
    async function fetchTemplatesCount() {
      const response = await fetch("/api/templates/count");
      const data = await response.json();
      setTemplatesCount(data.count);
    }
    fetchTemplatesCount();
  }, []);

  const canCreate = canCreateNewTemplate(
    templatesCount,
    userPlan as "FREE" | "PRO"
  );

  const handleCreate = async () => {
    if (!isFormValid) return;

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
          userId: session?.user?.id || null,
          sessionId: !session?.user?.id ? sessionId : null,
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
      <BackgroundGrid />

      <div className="flex h-screen flex-col items-center justify-center p-4">
        {!canCreate ? (
          <div className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">
              Limite de templates atteinte
            </h2>
            <p className="mb-6 text-muted-foreground">
              Vous avez atteint la limite de templates pour votre plan actuel.
              Passez au plan Pro pour créer des templates illimités.
            </p>
            <Link href="/#pricing">
              <Button>Voir les plans</Button>
            </Link>
          </div>
        ) : (
          <Card className="hover-card flex w-full flex-col justify-between md:w-2/3 lg:w-1/2">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                Créer un nouveau template
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {session?.user
                  ? "Commencez par donner un nom et une description à votre template"
                  : "Vous pouvez créer un template sans compte. Il sera lié à votre compte quand vous vous connecterez."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="template-name">Nom du template *</Label>
                <Input
                  id="template-name"
                  type="text"
                  value={templateInfo.name}
                  onChange={(e) =>
                    setTemplateInfo((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Mon super template"
                  required
                  suppressHydrationWarning
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-description">Description *</Label>
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
                  required
                  suppressHydrationWarning
                />
              </div>
              {pending && <p className="text-center">Création en cours...</p>}
              {!pending && (
                <Button
                  onClick={handleCreate}
                  className="w-full"
                  disabled={!isFormValid}
                  suppressHydrationWarning
                >
                  Créer et commencer l&apos;édition
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
