"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ContactSectionProps {
  content: Record<string, any>;
  style: Record<string, any>;
  onClick?: () => void;
}

export function ContactSection({ content, style, onClick }: ContactSectionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="w-full">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-32 bg-muted rounded" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="w-full" 
      style={style}
      onClick={onClick}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="grid gap-8">
            <div className="rounded-lg">
              <div className="p-6 pt-0">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <Input
                      placeholder="Nom"
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Email"
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Message"
                      suppressHydrationWarning
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    suppressHydrationWarning
                  >
                    Envoyer
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
