"use client";

import { cn } from "@/lib/utils";
import { DeviceType } from "@/types/editor";
import { Section, Template } from "@/types/template";
import { Brush, Loader2 } from "lucide-react";
import Link from "next/link";
import { TemplateRenderer } from "../templates/TemplateRenderer";
import { PreviewToolbar } from "./PreviewToolbar";

interface LivePreviewProps {
  sections: Section[];
  onSectionClick?: (section: Section) => void;
  device: DeviceType;
  handleDeviceChange: (device: DeviceType) => void;
  isLoading: boolean;
}

export function LivePreview({
  sections,
  onSectionClick,
  device,
  handleDeviceChange,
  isLoading,
}: LivePreviewProps) {
  const deviceStyles = {
    desktop: "w-full",
    tablet: "max-w-[768px]",
    mobile: "max-w-[375px]",
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
      {/* Barre d'outils de prévisualisation (desktop uniquement) */}
      <div className="sticky top-0 z-10 hidden bg-foreground/10 px-1 lg:block">
        <div className="flex items-center justify-between rounded-b-xl bg-background p-2 sm:p-4">
          <PreviewToolbar
            device={device}
            handleDeviceChange={handleDeviceChange}
          />
          <Link
            href="/"
            className="mr-2 flex items-center gap-1 sm:mr-3 sm:gap-2"
          >
            <Brush className="size-5 text-primary sm:size-6" />
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
