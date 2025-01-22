"use client";

import { cn } from "@/lib/utils";
import { ContactContent } from "@/types/template";
import Image from "next/image";

interface ContactSectionProps {
  content: ContactContent;
  style: Record<string, any>;
  onClick?: () => void;
}

export function ContactSection({
  content,
  style,
  onClick,
}: ContactSectionProps) {
  return (
    <section className="w-full" style={style} onClick={onClick}>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          {content.title && (
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              {content.title}
            </h2>
          )}
          {content.subtitle && (
            <p className="mb-8 text-lg text-muted-foreground">
              {content.subtitle}
            </p>
          )}
          {content.email && (
            <a
              href={`mailto:${content.email}`}
              className="mb-8 inline-block text-lg text-primary hover:underline"
            >
              {content.email}
            </a>
          )}
          {content.buttons && content.buttons.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {content.buttons.map((button) => (
                <a
                  key={button.id}
                  href={button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-2 border bg-white px-4 py-2 transition-transform hover:scale-105",
                    button.shape === "rounded" && "rounded-md",
                    button.shape === "circle" && "rounded-full",
                    button.size === "small" && "scale-90",
                    button.size === "large" && "scale-110"
                  )}
                >
                  {button.imageUrl && (
                    <Image
                      src={button.imageUrl}
                      alt={button.title}
                      width={24}
                      height={24}
                      className={cn(
                        "object-contain",
                        button.size === "small" && "h-4 w-4",
                        button.size === "medium" && "h-5 w-5",
                        button.size === "large" && "h-6 w-6"
                      )}
                    />
                  )}
                  <span className="font-medium">{button.title}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export type { ContactSectionProps };
