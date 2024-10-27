"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/types/template";
import { Quote } from "lucide-react";

interface TestimonialsSectionProps {
  content: Section["content"];
  style: Section["style"];
}

export function TestimonialsSection({
  content,
  style,
}: TestimonialsSectionProps) {
  const testimonials = content.testimonials || [];

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
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <Quote className="absolute right-4 top-4 h-8 w-8 text-muted-foreground opacity-20" />
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
