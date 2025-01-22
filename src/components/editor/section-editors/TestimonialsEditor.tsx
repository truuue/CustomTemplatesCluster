"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Section, TestimonialContent } from "@/types/template";
import { Plus, Save, Trash2, Upload } from "lucide-react";
import { useState } from "react";

interface TestimonialsEditorProps {
  section: Section;
  onUpdate: (section: Section) => void;
}

type Testimonial = NonNullable<TestimonialContent["testimonials"]>[number];

export function TestimonialsEditor({
  section,
  onUpdate,
}: TestimonialsEditorProps) {
  const [localContent, setLocalContent] = useState({
    title: section.content?.title || "Témoignages clients",
    subtitle: section.content?.subtitle || "Ce que nos clients disent de nous",
    testimonials:
      (section.type === "testimonials" &&
        (section.content as TestimonialContent).testimonials) ||
      [],
  });

  const [localStyle, setLocalStyle] = useState({
    layout: section.style?.layout || "grid",
    backgroundColor: section.style?.backgroundColor || "#ffffff",
    textColor: section.style?.textColor || "#000000",
    padding: section.style?.padding || "4rem 2rem",
  });

  const handleAddTestimonial = () => {
    const newTestimonial: Testimonial = {
      name: "",
      title: "",
      content: "",
      rating: 5,
    };
    setLocalContent((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, newTestimonial],
    }));
  };

  const handleTestimonialChange = (
    index: number,
    field: keyof Testimonial,
    value: string | number
  ) => {
    const updatedTestimonials = [...localContent.testimonials];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value,
    };
    setLocalContent((prev) => ({
      ...prev,
      testimonials: updatedTestimonials,
    }));
  };

  const handleRemoveTestimonial = (index: number) => {
    setLocalContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index),
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
            <Label>Titre de la section</Label>
            <Input
              value={localContent.title}
              onChange={(e) =>
                setLocalContent((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Titre des témoignages"
            />
          </div>

          <div>
            <Label>Sous-titre de la section</Label>
            <Textarea
              value={localContent.subtitle}
              onChange={(e) =>
                setLocalContent((prev) => ({
                  ...prev,
                  subtitle: e.target.value,
                }))
              }
              placeholder="Description des témoignages"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label>Témoignages</Label>
          {localContent.testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={() => handleRemoveTestimonial(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <CardContent className="space-y-4 p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="h-16 w-16">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label>Nom</Label>
                    <Input
                      value={testimonial.name}
                      onChange={(e) =>
                        handleTestimonialChange(index, "name", e.target.value)
                      }
                      placeholder="Nom du client"
                    />
                  </div>

                  <div>
                    <Label>Titre / Entreprise</Label>
                    <Input
                      value={testimonial.title}
                      onChange={(e) =>
                        handleTestimonialChange(index, "title", e.target.value)
                      }
                      placeholder="Poste ou entreprise"
                    />
                  </div>

                  <div>
                    <Label>Témoignage</Label>
                    <Textarea
                      value={testimonial.content}
                      onChange={(e) =>
                        handleTestimonialChange(
                          index,
                          "content",
                          e.target.value
                        )
                      }
                      placeholder="Contenu du témoignage"
                    />
                  </div>

                  <div>
                    <Label>Note</Label>
                    <Select
                      value={testimonial.rating?.toString()}
                      onValueChange={(value) =>
                        handleTestimonialChange(
                          index,
                          "rating",
                          parseInt(value)
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une note" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <SelectItem key={rating} value={rating.toString()}>
                            {"⭐".repeat(rating)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleAddTestimonial}
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un témoignage
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="style" className="space-y-4">
        <div>
          <Label>Disposition</Label>
          <Select
            value={localStyle.layout}
            onValueChange={(value) => handleStyleChange("layout", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir la disposition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid">Grille</SelectItem>
              <SelectItem value="carousel">Carrousel</SelectItem>
              <SelectItem value="list">Liste</SelectItem>
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
