"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { convertButtonVariant } from "@/lib/utils/button";
import { PricingContent, Section } from "@/types/template";
import { Check, Star, X } from "lucide-react";

interface PricingComparisonSectionProps {
  content: Section["content"] & PricingContent;
  style: Section["style"];
}

export function PricingComparisonSection({
  content,
  style,
}: PricingComparisonSectionProps) {
  const plans = content.pricing || [];
  const allFeatures = Array.from(
    new Set(plans.flatMap((plan) => plan.features))
  ).sort();

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

        <div className="rounded-xl border bg-card shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Fonctionnalités</TableHead>
                {plans.map((plan, index) => (
                  <TableHead
                    key={index}
                    className={cn(
                      "text-center",
                      plan.isPopular && "relative bg-primary/5"
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
                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="text-lg font-bold">{plan.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {plan.description}
                        </div>
                      </div>
                      <div>
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">/mois</span>
                      </div>
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
                          {plan.buttonText || `Choisir ${plan.title}`}
                        </a>
                      </Button>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {allFeatures.map((feature, featureIndex) => (
                <TableRow key={featureIndex}>
                  <TableCell className="font-medium">{feature}</TableCell>
                  {plans.map((plan, planIndex) => (
                    <TableCell
                      key={planIndex}
                      className={cn(
                        "text-center",
                        plan.isPopular && "bg-primary/5"
                      )}
                    >
                      {plan.features.includes(feature) ? (
                        <Check className="mx-auto h-5 w-5 text-primary" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-muted-foreground/50" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
