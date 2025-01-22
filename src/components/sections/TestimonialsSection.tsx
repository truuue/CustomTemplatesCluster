"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section, TestimonialContent } from "@/types/template";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";

interface TestimonialsSectionProps {
  content: TestimonialContent;
  style: Section["style"];
}

export function TestimonialsSection({
  content,
  style,
}: TestimonialsSectionProps) {
  const testimonials = content.testimonials || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Gestion du carrousel automatique
  useEffect(() => {
    if (style.layout !== "carousel") return;

    const handleAutoNext = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    };

    const interval = setInterval(handleAutoNext, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, style.layout, isAnimating, testimonials.length]);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const renderTestimonialCard = (
    testimonial: NonNullable<TestimonialContent["testimonials"]>[number],
    index: number
  ) => (
    <Card key={index} className="relative h-full">
      <CardHeader>
        <Quote className="absolute right-4 top-4 h-8 w-8 text-muted-foreground opacity-20" />
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={testimonial.avatar} />
            <AvatarFallback>
              {testimonial.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{testimonial.content}</p>
        {testimonial.rating && (
          <div className="mt-4">{"⭐".repeat(testimonial.rating)}</div>
        )}
      </CardContent>
    </Card>
  );

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

        {style.layout === "carousel" ? (
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    {renderTestimonialCard(testimonial, index)}
                  </div>
                ))}
              </div>
            </div>

            {testimonials.length > 1 && (
              <div className="mt-8 flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevious}
                  disabled={isAnimating}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  disabled={isAnimating}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div
            className={
              style.layout === "list"
                ? "space-y-6"
                : "grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            }
          >
            {testimonials.map((testimonial, index) =>
              renderTestimonialCard(testimonial, index)
            )}
          </div>
        )}
      </div>
    </section>
  );
}
