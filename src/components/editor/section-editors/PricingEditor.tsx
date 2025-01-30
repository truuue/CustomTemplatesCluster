"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PricingContent, Section } from "@/types/template";
import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";

interface PricingEditorProps {
  section: Section;
  onUpdate: (section: Section) => void;
}

type PricingPlan = NonNullable<PricingContent["pricing"]>[0];

export function PricingEditor({ section, onUpdate }: PricingEditorProps) {
  const content = section.content as PricingContent;

  const [localContent, setLocalContent] = useState<PricingContent>({
    title: content.title || "",
    subtitle: content.subtitle || "",
    variant: content.variant || "modern",
    pricing: content.pricing || [],
  });

  const [localStyle, setLocalStyle] = useState(section.style);

  const handleContentChange = (field: keyof PricingContent, value: any) => {
    setLocalContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStyleChange = (field: keyof typeof localStyle, value: string) => {
    setLocalStyle((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePlanChange = (
    index: number,
    field: keyof PricingPlan,
    value: any
  ) => {
    if (!localContent.pricing) return;

    const newPricing = [...localContent.pricing];
    newPricing[index] = {
      ...newPricing[index],
      [field]: value,
    };
    handleContentChange("pricing", newPricing);
  };

  const addPlan = () => {
    const newPlan: PricingPlan = {
      title: "Nouveau plan",
      price: "0€",
      description: "Description du plan",
      features: ["Fonctionnalité 1"],
      isPopular: false,
      buttonText: "Commencer",
      buttonUrl: "#",
      buttonVariant: "primary",
    };
    handleContentChange("pricing", [...(localContent.pricing || []), newPlan]);
  };

  const removePlan = (index: number) => {
    if (!localContent.pricing) return;
    const newPricing = localContent.pricing.filter((_, i) => i !== index);
    handleContentChange("pricing", newPricing);
  };

  const addFeature = (planIndex: number) => {
    if (!localContent.pricing) return;
    const newPricing = [...localContent.pricing];
    newPricing[planIndex].features.push("Nouvelle fonctionnalité");
    handleContentChange("pricing", newPricing);
  };

  const removeFeature = (planIndex: number, featureIndex: number) => {
    if (!localContent.pricing) return;
    const newPricing = [...localContent.pricing];
    newPricing[planIndex].features = newPricing[planIndex].features.filter(
      (_, i) => i !== featureIndex
    );
    handleContentChange("pricing", newPricing);
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
        {/* Section générale */}
        <div className="space-y-4">
          <div>
            <Label>Titre de la section</Label>
            <Input
              value={localContent.title}
              onChange={(e) => handleContentChange("title", e.target.value)}
              placeholder="Nos formules"
            />
          </div>
          <div>
            <Label>Sous-titre</Label>
            <Textarea
              value={localContent.subtitle}
              onChange={(e) => handleContentChange("subtitle", e.target.value)}
              placeholder="Choisissez la formule qui vous convient le mieux"
            />
          </div>
          <div>
            <Label>Style d&apos;affichage</Label>
            <Select
              value={localContent.variant}
              onValueChange={(value) => handleContentChange("variant", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir un style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Cartes modernes</SelectItem>
                <SelectItem value="comparison">Tableau comparatif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Gestion des formules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Formules</Label>
            <Button onClick={addPlan} variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une formule
            </Button>
          </div>

          <div className="grid gap-4">
            {localContent.pricing?.map((plan, planIndex) => (
              <Card key={planIndex}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <Input
                        value={plan.title}
                        onChange={(e) =>
                          handlePlanChange(planIndex, "title", e.target.value)
                        }
                        placeholder="Nom de la formule"
                        className="text-lg font-semibold"
                      />
                      <Textarea
                        value={plan.description}
                        onChange={(e) =>
                          handlePlanChange(
                            planIndex,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Description de la formule"
                        className="resize-none"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePlan(planIndex)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Prix</Label>
                      <Input
                        value={plan.price}
                        onChange={(e) =>
                          handlePlanChange(planIndex, "price", e.target.value)
                        }
                        placeholder="ex: 29€"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={plan.isPopular}
                        onCheckedChange={(checked) =>
                          handlePlanChange(planIndex, "isPopular", checked)
                        }
                      />
                      <Label>Formule mise en avant</Label>
                    </div>
                  </div>

                  <div>
                    <Label>Fonctionnalités</Label>
                    <div className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => {
                              const newFeatures = [...plan.features];
                              newFeatures[featureIndex] = e.target.value;
                              handlePlanChange(
                                planIndex,
                                "features",
                                newFeatures
                              );
                            }}
                            placeholder="Fonctionnalité"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              removeFeature(planIndex, featureIndex)
                            }
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addFeature(planIndex)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter une fonctionnalité
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Texte du bouton</Label>
                      <Input
                        value={plan.buttonText}
                        onChange={(e) =>
                          handlePlanChange(
                            planIndex,
                            "buttonText",
                            e.target.value
                          )
                        }
                        placeholder="ex: S'abonner"
                      />
                    </div>
                    <div>
                      <Label>URL du bouton</Label>
                      <Input
                        value={plan.buttonUrl}
                        onChange={(e) =>
                          handlePlanChange(
                            planIndex,
                            "buttonUrl",
                            e.target.value
                          )
                        }
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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

      <Button onClick={handleSave} className="w-full">
        <Save className="mr-2 h-4 w-4" />
        Sauvegarder
      </Button>
    </Tabs>
  );
}
