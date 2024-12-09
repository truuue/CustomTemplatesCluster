"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { convertButtonVariant } from "@/lib/utils/button";
import { PricingContent, Section } from "@/types/template";
import { Check, Star } from "lucide-react";

interface PricingModernSectionProps {
  content: Section["content"] & PricingContent;
  style: Section["style"];
}

export function PricingModernSection({
  content,
  style,
}: PricingModernSectionProps) {
  const plans = content.pricing || [];

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
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="mx-auto max-w-2xl text-muted-foreground">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                "relative flex flex-col",
                plan.isPopular && "border-primary shadow-lg"
              )}
            >
              {plan.isPopular && (
                <Badge
                  variant="default"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-8"
                >
                  <Star className="mr-2 h-3 w-3" />
                  Plus populaire
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={convertButtonVariant(
                    plan.buttonVariant ||
                      (plan.isPopular ? "primary" : "outline")
                  )}
                  size="lg"
                  asChild
                >
                  <a href={plan.buttonUrl || "#"}>
                    {plan.buttonText || "Commencer maintenant"}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
