import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/types/template";
import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";

interface FeaturesContent {
  title?: string;
  subtitle?: string;
  features?: Array<{ title: string; description: string }>;
}

interface FeaturesEditorProps {
  section: Section;
  onUpdate: (section: Section) => void;
}

export function FeaturesEditor({ section, onUpdate }: FeaturesEditorProps) {
  const [localContent, setLocalContent] = useState({
    title: section.content?.title || "",
    subtitle: section.content?.subtitle || "",
    features: (section.content as FeaturesContent)?.features || [],
  });

  const [localStyle, setLocalStyle] = useState({
    layout: section.style?.layout || "center",
    backgroundColor: section.style?.backgroundColor || "#ffffff",
    textColor: section.style?.textColor || "#000000",
  });

  const handleAddFeature = () => {
    const newFeature = { title: "", description: "" };
    setLocalContent((prev) => ({
      ...prev,
      features: [...prev.features, newFeature],
    }));
  };

  const handleFeatureChange = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    const updatedFeatures = [...localContent.features];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [field]: value,
    };

    setLocalContent((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  const handleRemoveFeature = (index: number) => {
    setLocalContent((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleStyleChange = (field: string, value: string) => {
    setLocalStyle((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onUpdate({
      ...section,
      content: localContent,
      style: localStyle,
    });
  };

  return (
    <Tabs defaultValue="content" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">Contenu</TabsTrigger>
        <TabsTrigger value="style">Style</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Titre de la section</Label>
            <Input
              id="title"
              value={localContent.title}
              onChange={(e) =>
                setLocalContent((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Titre des fonctionnalités"
            />
          </div>

          <div>
            <Label htmlFor="subtitle">Sous-titre de la section</Label>
            <Textarea
              id="subtitle"
              value={localContent.subtitle}
              onChange={(e) =>
                setLocalContent((prev) => ({
                  ...prev,
                  subtitle: e.target.value,
                }))
              }
              placeholder="Description des fonctionnalités"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Fonctionnalités</Label>
          {localContent.features?.map((feature, index) => (
            <div
              key={index}
              className="relative space-y-2 rounded-lg border p-4"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => handleRemoveFeature(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div>
                <Label>Titre de la fonctionnalité</Label>
                <Input
                  value={feature.title}
                  onChange={(e) =>
                    handleFeatureChange(index, "title", e.target.value)
                  }
                  placeholder="Titre"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={feature.description}
                  onChange={(e) =>
                    handleFeatureChange(index, "description", e.target.value)
                  }
                  placeholder="Description"
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleAddFeature}
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une fonctionnalité
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="style" className="space-y-4">
        <div>
          <Label>Alignement</Label>
          <Select
            value={localStyle.layout}
            onValueChange={(value) => handleStyleChange("layout", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir l'alignement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Gauche</SelectItem>
              <SelectItem value="center">Centre</SelectItem>
              <SelectItem value="right">Droite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Couleur de fond</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={localStyle.backgroundColor}
              onChange={(e) =>
                handleStyleChange("backgroundColor", e.target.value)
              }
              className="h-12 w-12 p-1"
            />
            <Input
              type="text"
              value={localStyle.backgroundColor}
              onChange={(e) =>
                handleStyleChange("backgroundColor", e.target.value)
              }
              placeholder="#ffffff"
              className="flex-1"
            />
          </div>
        </div>

        <div>
          <Label>Couleur du texte</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={localStyle.textColor}
              onChange={(e) => handleStyleChange("textColor", e.target.value)}
              className="h-12 w-12 p-1"
            />
            <Input
              type="text"
              value={localStyle.textColor}
              onChange={(e) => handleStyleChange("textColor", e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>
      </TabsContent>

      <Button onClick={handleSave} className="w-full">
        <Save className="mr-2 h-4 w-4" />
        Sauvegarder
      </Button>
    </Tabs>
  );
}
