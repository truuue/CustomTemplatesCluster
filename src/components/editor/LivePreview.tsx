"use client";

import { cn } from "@/lib/utils";
import { Section, Template } from "@/types/template";
import { Loader2, Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";
import { TemplateRenderer } from "../templates/TemplateRenderer";
import { Button } from "../ui/button";

interface LivePreviewProps {
  sections: Section[];
  onSectionClick?: (section: Section) => void;
}

type DeviceType = "desktop" | "tablet" | "mobile";

export function LivePreview({ sections, onSectionClick }: LivePreviewProps) {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [isLoading, setIsLoading] = useState(false);

  const deviceStyles = {
    desktop: "w-full",
    tablet: "max-w-[768px]",
    mobile: "max-w-[375px]",
  };

  const handleDeviceChange = (newDevice: DeviceType) => {
    setIsLoading(true);
    setDevice(newDevice);
    // Simuler un temps de chargement pour une meilleure UX
    setTimeout(() => setIsLoading(false), 500);
  };

  const template: Template = {
    sections,
    name: "Preview",
    description: "Live preview",
    _id: "preview",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    thumbnail: "",
    category: "",
    userId: "",
    isPublic: false,
    tags: [],
  };

  return (
    <div className="flex h-full flex-col">
      {/* Barre d'outils de prévisualisation */}
      <div className="bg-gray-100 px-1">
        <div className="flex items-center justify-between rounded-b-xl border bg-white p-4">
          <div className="flex items-center gap-2">
            <Button
              variant={device === "desktop" ? "default" : "ghost"}
              size="icon"
              onClick={() => handleDeviceChange("desktop")}
            >
              <Monitor className="size-5" />
            </Button>
            <Button
              variant={device === "tablet" ? "default" : "ghost"}
              size="icon"
              onClick={() => handleDeviceChange("tablet")}
            >
              <Tablet className="size-5" />
            </Button>
            <Button
              variant={device === "mobile" ? "default" : "ghost"}
              size="icon"
              onClick={() => handleDeviceChange("mobile")}
            >
              <Smartphone className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Zone de prévisualisation */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-1">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : (
          <div
            className={cn(
              "mx-auto h-full overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300",
              deviceStyles[device]
            )}
          >
            <div className="h-full overflow-y-auto">
              <TemplateRenderer
                template={template}
                isEditing={true}
                onSectionClick={onSectionClick}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
