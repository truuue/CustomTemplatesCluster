"use client";

import { generateSectionCSS } from "@/lib/template-utils";
import { cn } from "@/lib/utils";
import { DeviceType } from "@/types/editor";
import { Section, Template } from "@/types/template";
import { renderToString } from "react-dom/server";
import { TemplateRenderer } from "../templates/TemplateRenderer";
import { DeployButton } from "../ui/deploy-button";
import { PreviewToolbar } from "./PreviewToolbar";

interface LivePreviewProps {
  sections: Section[];
  device: DeviceType;
  handleDeviceChange: (device: DeviceType) => void;
  isLoading: boolean;
  templateId: string;
}

export function LivePreview({
  sections,
  device,
  handleDeviceChange,
  isLoading,
  templateId,
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
    _id: templateId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    thumbnail: "",
    category: "",
    userId: "",
    isPublic: false,
    tags: [],
  };

  // Générer le HTML à partir du TemplateRenderer
  const renderedContent = (
    <TemplateRenderer template={template} isEditing={false} />
  );
  const htmlContent = renderToString(renderedContent);

  const assets = {
    html: `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.name}</title>
    <link href="/assets/styles.css" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root">${htmlContent}</div>
    <script src="/assets/js/runtime.js"></script>
</body>
</html>`,
    css: sections.map((section) => generateSectionCSS(section)).join("\n"),
    images: {},
    scripts: {
      "runtime.js": `
        document.addEventListener('DOMContentLoaded', function() {
          // Logique d'interactivité si nécessaire
        });
      `,
    },
  };

  return (
    <div className="relative min-h-screen bg-background">
      <div className="sticky top-0 z-10 hidden justify-end border-b bg-background/80 px-4 py-2 backdrop-blur lg:flex">
        <PreviewToolbar
          device={device}
          handleDeviceChange={handleDeviceChange}
        />
      </div>
      <div
        className={cn(
          "preview-container transition-all duration-300",
          deviceStyles[device]
        )}
      >
        {isLoading ? (
          <div className="flex h-screen items-center justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="mx-auto h-full overflow-hidden bg-background">
            <TemplateRenderer template={template} isEditing={false} />
          </div>
        )}
      </div>
      <div className="fixed bottom-4 right-4">
        <DeployButton template={template} assets={assets} />
      </div>
    </div>
  );
}
