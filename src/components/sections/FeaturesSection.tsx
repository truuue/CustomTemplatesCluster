"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Section } from "@/types/template";

interface Feature {
  icon?: string;
  title: string;
  description: string;
}

export interface FeaturesSectionContent {
  title?: string;
  subtitle?: string;
  features: Feature[];
}

interface FeaturesSectionProps {
  content: FeaturesSectionContent;
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
      <div className="container mx-auto flex max-w-6xl flex-col items-center">
        {content.title && (
          <h2 className="mb-12 text-4xl font-bold">{content.title}</h2>
        )}
        {content.subtitle && (
          <p className="mb-16 text-xl text-muted-foreground">
            {content.subtitle}
          </p>
        )}
        <div className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.features?.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center">
              <CardHeader className="w-full text-center">
                {feature.icon && (
                  <div className="mb-4 text-4xl text-primary">
                    {feature.icon}
                  </div>
                )}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
