"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Section } from "@/types/template";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface SectionEditorProps {
  section: Section;
  onUpdate: (updatedSection: Section) => void;
}

export function SectionEditor({ section, onUpdate }: SectionEditorProps) {
  const [currentSection, setCurrentSection] = useState(section);
  const [isSaving, setIsSaving] = useState(false);

  const handleContentChange = (key: string, value: string) => {
    setCurrentSection((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value,
      },
    }));
  };

  const handleStyleChange = (key: string, value: string) => {
    setCurrentSection((prev) => ({
      ...prev,
      style: {
        ...prev.style,
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate(section);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Éditer la section {section.type}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contrôles spécifiques selon le type de section */}
        {section.type === "hero" && (
          <>
            <div className="space-y-2">
              <Label>Titre</Label>
              <Input
                value={currentSection.content.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                placeholder="Titre principal"
              />
            </div>
            <div className="space-y-2">
              <Label>Sous-titre</Label>
              <Input
                value={currentSection.content.subtitle || ""}
                onChange={(e) =>
                  handleContentChange("subtitle", e.target.value)
                }
                placeholder="Sous-titre"
              />
            </div>
          </>
        )}

        {/* Contrôles de style communs */}
        <div className="space-y-2">
          <Label>Couleur de fond</Label>
          <Input
            type="color"
            value={currentSection.style.backgroundColor || "#ffffff"}
            onChange={(e) =>
              handleStyleChange("backgroundColor", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Disposition</Label>
          <Select
            value={currentSection.style.layout}
            onValueChange={(value) => handleStyleChange("layout", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir la disposition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Gauche</SelectItem>
              <SelectItem value="center">Centre</SelectItem>
              <SelectItem value="right">Droite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="mt-4">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sauvegarde...
            </>
          ) : (
            "Sauvegarder"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
