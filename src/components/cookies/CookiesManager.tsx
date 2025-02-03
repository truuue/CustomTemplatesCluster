"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cookies } from "@/lib/cookies";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CookiesManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CookiesManager({
  open,
  onOpenChange,
}: CookiesManagerProps) {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
  });

  useEffect(() => {
    const currentConsent = cookies.getCookieConsent();
    if (currentConsent) {
      setPreferences(currentConsent);
    }
  }, [open]);

  const handleSave = () => {
    cookies.setCookieConsent(preferences);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Centre de Préférences des Cookies
          </DialogTitle>
          <DialogDescription className="text-base">
            Nous respectons votre vie privée. Personnalisez vos préférences de
            cookies ci-dessous. Pour plus d&apos;informations, consultez notre{" "}
            <Link
              href="/privacy"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              politique de confidentialité
              <ExternalLink className="h-3 w-3" />
            </Link>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-start space-x-4">
              <Checkbox id="essential" checked disabled />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="essential" className="text-base font-medium">
                    Cookies essentiels
                  </Label>
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    Toujours actif
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Ces cookies sont nécessaires au fonctionnement du site. Ils
                  permettent les fonctionnalités de base comme la navigation,
                  l&apos;accès aux zones sécurisées et la mémorisation de vos
                  préférences essentielles.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-start space-x-4">
              <Checkbox
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({
                    ...prev,
                    analytics: checked === true,
                  }))
                }
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="analytics" className="text-base font-medium">
                    Cookies analytiques
                  </Label>
                  <span className="rounded bg-secondary/10 px-2 py-0.5 text-xs text-secondary">
                    Optionnel
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Ces cookies nous permettent d&apos;analyser l&apos;utilisation
                  du site pour mesurer et améliorer ses performances. Ils nous
                  aident à comprendre comment les visiteurs interagissent avec
                  le site, identifier les problèmes et fournir une meilleure
                  expérience.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSave} className="gap-2">
            Enregistrer les préférences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
