"use client";

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
import { PricingContent, Section } from "@/types/template";
import { Check } from "lucide-react";

interface PricingSectionProps {
  content: Section["content"] & PricingContent;
  style: Section["style"];
}

export function PricingSection({ content, style }: PricingSectionProps) {
  const plans = content.pricing || [
    {
      title: "Starter",
      price: "0€",
      description: "Pour commencer",
      features: ["Feature 1", "Feature 2"],
      isPopular: false,
    },
    {
      title: "Pro",
      price: "29€",
      description: "Pour les professionnels",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      isPopular: true,
    },
  ];

  return (
    <section
      style={{
        backgroundColor: style.backgroundColor,
        color: style.textColor,
        padding: style.padding || "4rem 2rem",
      }}
      className="w-full"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
          {content.subtitle && (
            <p className="text-xl text-muted-foreground">{content.subtitle}</p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
                "relative",
                plan.isPopular && "scale-105 border-primary shadow-lg"
              )}
            >
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                  Plus populaire
                </span>
              )}
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={plan.isPopular ? "default" : "outline"}
                  className="w-full"
                >
                  Commencer
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
