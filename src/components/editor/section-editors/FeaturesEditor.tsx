import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/types/template";
import { Plus, Trash2 } from "lucide-react";

interface FeaturesEditorProps {
  section: Section;
  onUpdate: (section: Section) => void;
}

export function FeaturesEditor({ section, onUpdate }: FeaturesEditorProps) {
  const content = section.content as {
    title?: string;
    subtitle?: string;
    features?: Array<{ title: string; description: string }>;
  };

  const handleAddFeature = () => {
    const newFeature = { title: "", description: "" };
    onUpdate({
      ...section,
      content: {
        ...content,
        features: [...(content.features || []), newFeature],
      },
    });
  };

  const handleFeatureChange = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    const updatedFeatures = [...(content.features || [])];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [field]: value,
    };

    onUpdate({
      ...section,
      content: {
        ...content,
        features: updatedFeatures,
      },
    });
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = content.features?.filter((_, i) => i !== index);
    onUpdate({
      ...section,
      content: {
        ...content,
        features: updatedFeatures,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Titre de la section</Label>
          <Input
            id="title"
            value={content.title || ""}
            onChange={(e) =>
              onUpdate({
                ...section,
                content: { ...content, title: e.target.value },
              })
            }
            placeholder="Titre des fonctionnalités"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Sous-titre de la section</Label>
          <Textarea
            id="subtitle"
            value={content.subtitle || ""}
            onChange={(e) =>
              onUpdate({
                ...section,
                content: { ...content, subtitle: e.target.value },
              })
            }
            placeholder="Description des fonctionnalités"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Fonctionnalités</Label>
        {content.features?.map((feature, index) => (
          <div key={index} className="relative space-y-2 rounded-lg border p-4">
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
    </div>
  );
}
