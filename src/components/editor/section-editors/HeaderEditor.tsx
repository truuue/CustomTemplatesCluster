"use client";

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
import { HeaderContent, Section } from "@/types/template";
import { Save, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface HeaderEditorProps {
  section: Section;
  onUpdate: (section: Section) => void;
}

export function HeaderEditor({ section, onUpdate }: HeaderEditorProps) {
  const [localContent, setLocalContent] = useState({
    companyName: (section.content as HeaderContent).companyName || "",
    logo: (section.content as HeaderContent).logo || "",
    variant: (section.content as HeaderContent).variant || "default",
  });

  const handleInputChange = (field: string, value: string) => {
    setLocalContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalContent((prev) => ({
          ...prev,
          logo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteLogo = () => {
    setLocalContent((prev) => ({
      ...prev,
      logo: "",
    }));
  };

  const handleSave = () => {
    onUpdate({
      ...section,
      content: localContent,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="logo">Logo de l&apos;entreprise</Label>
        <div className="flex items-center gap-4">
          <div className={`relative ${localContent.logo ? "w-40" : "flex-1"}`}>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
            <Button variant="outline" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              {localContent.logo ? "Changer" : "Télécharger un logo"}
            </Button>
          </div>
          {localContent.logo && (
            <div className="flex items-center gap-2">
              <Image
                src={localContent.logo}
                alt="Logo preview"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteLogo}
                className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName">Nom de la société</Label>
        <Input
          id="companyName"
          value={localContent.companyName}
          onChange={(e) => handleInputChange("companyName", e.target.value)}
          placeholder="Entrez le nom de la société"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="variant">Style du header</Label>
        <Select
          value={localContent.variant}
          onValueChange={(value) => handleInputChange("variant", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choisir un style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Standard</SelectItem>
            <SelectItem value="centered">Centré</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSave} className="w-full">
        <Save className="mr-2 h-4 w-4" />
        Sauvegarder
      </Button>
    </div>
  );
}
