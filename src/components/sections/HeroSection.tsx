"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { convertButtonVariant } from "@/lib/utils/button";
import { Section } from "@/types/template";

interface HeroSectionProps {
  content: Section["content"];
  style: Section["style"];
}

export function HeroSection({ content, style }: HeroSectionProps) {
  return (
    <section
      style={{
        backgroundColor: style.backgroundColor,
        color: style.textColor,
        padding: style.padding, // Utiliser directement le padding sans valeur par défaut
      }}
      className={cn(
        "flex min-h-[70vh] items-center justify-center transition-all duration-300", // Ajouter une transition
        style.layout === "left" && "text-left",
        style.layout === "center" && "text-center",
        style.layout === "right" && "text-right"
      )}
    >
      <div className="container mx-auto max-w-6xl">
        <h1 className="mb-6 text-5xl font-bold leading-tight lg:text-6xl">
          {content.title}
        </h1>
        {content.subtitle && (
          <p className="mb-8 text-xl text-muted-foreground lg:text-2xl">
            {content.subtitle}
          </p>
        )}
        {content.buttons && (
          <div className="flex flex-wrap justify-center gap-4">
            {content.buttons.map((button, index) => (
              <Button
                key={index}
                variant={convertButtonVariant(button.variant)}
                asChild
              >
                <a href={button.url}>{button.text}</a>
              </Button>
            ))}
          </div>
        )}
        {content.images && (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {content.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.alt}
                className="rounded-lg shadow-lg"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
