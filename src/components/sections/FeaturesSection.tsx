"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Section } from "@/types/template";

interface FeaturesSectionProps {
  content: Section["content"];
  style: Section["style"];
}

export function FeaturesSection({ content, style }: FeaturesSectionProps) {
  return (
    <section
      style={{
        backgroundColor: style.backgroundColor,
        color: style.textColor,
        padding: style.padding || "4rem 2rem",
      }}
      className={cn("w-full", style.layout === "center" && "text-center")}
    >
      <div className="container mx-auto max-w-6xl">
        {content.title && (
          <h2 className="mb-12 text-4xl font-bold">{content.title}</h2>
        )}
        {content.subtitle && (
          <p className="mb-16 text-xl text-muted-foreground">
            {content.subtitle}
          </p>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.features?.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                {feature.icon && (
                  <div className="mb-4 text-4xl text-primary">
                    {feature.icon}
                  </div>
                )}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
