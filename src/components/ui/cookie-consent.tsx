"use client";

import { Button } from "@/components/ui/button";
import { cookies, type CookieConsent } from "@/lib/cookies";
import { useEffect, useState } from "react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = cookies.getCookieConsent();
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleCookieChoice = (acceptAnalytics: boolean) => {
    const consent: CookieConsent = {
      essential: true, // Toujours true car essentiels
      analytics: acceptAnalytics,
    };

    cookies.setCookieConsent(consent);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background p-4 shadow-lg">
      <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">
            Nous utilisons des cookies essentiels pour le fonctionnement du site
            et des cookies d&apos;analyse pour améliorer votre expérience.
          </p>
          <p className="text-xs text-gray-400">
            Les cookies essentiels sont toujours activés car ils sont
            nécessaires au fonctionnement du site.
          </p>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <Button variant="outline" onClick={() => handleCookieChoice(false)}>
            Cookies Essentiels Uniquement
          </Button>
          <Button onClick={() => handleCookieChoice(true)}>
            Accepter Tous les Cookies
          </Button>
        </div>
      </div>
    </div>
  );
}
