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
    essential: true, // Toujours activé
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Préférences des cookies</DialogTitle>
          <DialogDescription>
            Gérez vos préférences de cookies. Les cookies essentiels sont requis
            pour le bon fonctionnement du site.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start space-x-4">
            <Checkbox id="essential" checked disabled />
            <div className="space-y-1">
              <Label htmlFor="essential" className="font-medium">
                Cookies essentiels
              </Label>
              <p className="text-sm text-muted-foreground">
                Ces cookies sont nécessaires au fonctionnement du site.
              </p>
            </div>
          </div>

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
            <div className="space-y-1">
              <Label htmlFor="analytics" className="font-medium">
                Cookies analytiques
              </Label>
              <p className="text-sm text-muted-foreground">
                Nous aident à comprendre comment vous utilisez le site.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSave}>Enregistrer les préférences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
