"use client";

import { cn } from "@/lib/utils";
import { Section, Template } from "@/types/template";
import { Calendar, Loader2, Monitor, Smartphone, Tablet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TemplateRenderer } from "../templates/TemplateRenderer";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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
    <div className="flex h-full flex-col bg-foreground/10">
      {/* Barre d'outils de prévisualisation */}
      <div className="sticky top-0 z-10 bg-foreground/10 px-1">
        <div className="flex items-center justify-between rounded-b-xl bg-background p-2 sm:p-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={device === "desktop" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  onClick={() => handleDeviceChange("desktop")}
                >
                  <Monitor className="size-4 sm:size-5" />
                  <span className="sr-only">Vue bureau</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Vue bureau</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={device === "tablet" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  onClick={() => handleDeviceChange("tablet")}
                >
                  <Tablet className="size-4 sm:size-5" />
                  <span className="sr-only">Vue tablette</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Vue tablette</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={device === "mobile" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  onClick={() => handleDeviceChange("mobile")}
                >
                  <Smartphone className="size-4 sm:size-5" />
                  <span className="sr-only">Vue mobile</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Vue mobile</TooltipContent>
            </Tooltip>
          </div>

          <Link
            href="/"
            className="mr-2 flex items-center gap-1 sm:mr-3 sm:gap-2"
          >
            <Calendar className="size-5 text-primary sm:size-6" />
            <span className="text-base font-semibold sm:text-lg">
              Showcaser
            </span>
          </Link>
        </div>
      </div>

      {/* Zone de prévisualisation */}
      <div className="flex-1 overflow-y-auto bg-foreground/10 p-1">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : (
          <div
            className={cn(
              "mx-auto h-full overflow-hidden rounded-lg bg-background shadow-lg transition-all duration-300",
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
