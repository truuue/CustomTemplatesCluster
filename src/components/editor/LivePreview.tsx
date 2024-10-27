"use client";

import { Section } from "@/types/template";

interface LivePreviewProps {
  sections: Section[];
}

export function LivePreview({ sections }: LivePreviewProps) {
  const renderSection = (section: Section) => {
    switch (section.type) {
      case "hero":
        return (
          <div
            style={{
              backgroundColor: section.style.backgroundColor,
              padding: section.style.padding || "4rem 2rem",
              textAlign: section.style.layout as any,
            }}
            className="flex min-h-[60vh] flex-col items-center justify-center"
          >
            <h1 className="mb-4 text-5xl font-bold">{section.content.title}</h1>
            <p className="mb-8 text-xl">{section.content.subtitle}</p>
            <div className="flex gap-4">
              {section.content.buttons?.map((button, index) => (
                <button
                  key={index}
                  className={`rounded-lg px-6 py-2 ${
                    button.variant === "primary"
                      ? "bg-primary text-white"
                      : "bg-secondary text-primary"
                  }`}
                >
                  {button.text}
                </button>
              ))}
            </div>
          </div>
        );
      // Ajoutez d'autres cas pour les différents types de sections
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {sections.map((section, index) => (
        <div key={section.id || index}>{renderSection(section)}</div>
      ))}
    </div>
  );
}
