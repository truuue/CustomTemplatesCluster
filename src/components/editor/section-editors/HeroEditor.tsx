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
import { TemplateButtonVariant } from "@/lib/utils/button";
import { Section } from "@/types/template";
import { Save } from "lucide-react";
import { useState } from "react";

interface HeroEditorProps {
  section: Section;
  onUpdate: (section: Section) => void;
}

export function HeroEditor({ section, onUpdate }: HeroEditorProps) {
  const [localContent, setLocalContent] = useState({
    title: section.content.title || "",
    subtitle: section.content.subtitle || "",
    ctaText: section.content.buttons?.[0]?.text || "",
    ctaUrl: section.content.buttons?.[0]?.url || "#",
    ctaVariant: (section.content.buttons?.[0]?.variant ||
      "primary") as TemplateButtonVariant,
  });

  const [localStyle, setLocalStyle] = useState({
    backgroundColor: section.style.backgroundColor || "#ffffff",
    textColor: section.style.textColor || "#000000",
    padding: section.style.padding || "4rem 2rem",
    layout: section.style.layout || "center",
  });

  const handleContentChange = (field: string, value: string) => {
    setLocalContent((prev) => ({
      ...prev,
      [field]: value,
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
      content: {
        title: localContent.title,
        subtitle: localContent.subtitle,
        buttons: [
          {
            text: localContent.ctaText,
            url: localContent.ctaUrl,
            variant: localContent.ctaVariant,
          },
        ],
      },
      style: localStyle,
    });
  };

  return (
    <Tabs defaultValue="content" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">Contenu</TabsTrigger>
        <TabsTrigger value="style">Style</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-4">
        <div>
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            value={localContent.title}
            onChange={(e) => handleContentChange("title", e.target.value)}
            placeholder="Entrez le titre principal"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Sous-titre</Label>
          <Textarea
            id="subtitle"
            value={localContent.subtitle}
            onChange={(e) => handleContentChange("subtitle", e.target.value)}
            placeholder="Entrez le sous-titre"
          />
        </div>

        <div className="space-y-4 rounded-lg border p-4">
          <Label>Configuration du bouton CTA</Label>

          <div className="space-y-2">
            <Label htmlFor="ctaText">Texte du bouton</Label>
            <Input
              id="ctaText"
              value={localContent.ctaText}
              onChange={(e) => handleContentChange("ctaText", e.target.value)}
              placeholder="Texte du bouton d'action"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ctaUrl">Lien du bouton</Label>
            <Input
              id="ctaUrl"
              value={localContent.ctaUrl}
              onChange={(e) => handleContentChange("ctaUrl", e.target.value)}
              placeholder="URL du lien (ex: /contact)"
            />
          </div>

          <div className="space-y-2">
            <Label>Style du bouton</Label>
            <Select
              value={localContent.ctaVariant}
              onValueChange={(value) =>
                handleContentChange(
                  "ctaVariant",
                  value as TemplateButtonVariant
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir un style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Principal</SelectItem>
                <SelectItem value="secondary">Secondaire</SelectItem>
                <SelectItem value="outline">Contour</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

      <Button onClick={handleSave} className="mt-4 w-full">
        <Save className="mr-2 h-4 w-4" />
        Sauvegarder
      </Button>
    </Tabs>
  );
}
