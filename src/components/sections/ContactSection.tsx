"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/types/template";
import { Mail, MapPin, Phone } from "lucide-react";

interface ContactSectionProps {
  content: Section["content"];
  style: Section["style"];
}

export function ContactSection({ content, style }: ContactSectionProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gérer la soumission du formulaire
  };

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

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Contactez-nous</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input placeholder="Nom" />
                </div>
                <div className="space-y-2">
                  <Input type="email" placeholder="Email" />
                </div>
                <div className="space-y-2">
                  <Textarea placeholder="Message" />
                </div>
                <Button type="submit" className="w-full">
                  Envoyer
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {content.contactInfo?.map((info: any, index: number) => (
              <Card key={index}>
                <CardContent className="flex items-center gap-4 p-6">
                  {info.type === "email" && <Mail className="h-6 w-6" />}
                  {info.type === "phone" && <Phone className="h-6 w-6" />}
                  {info.type === "address" && <MapPin className="h-6 w-6" />}
                  <div>
                    <h4 className="font-semibold">{info.label}</h4>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
