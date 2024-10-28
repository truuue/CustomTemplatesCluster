"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function CookieConsent() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setAccepted(false);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg">
      <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-500">
          Nous utilisons des cookies pour améliorer votre expérience. En
          continuant à utiliser ce site, vous acceptez notre politique de
          confidentialité.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={acceptCookies}>
            Refuser
          </Button>
          <Button onClick={acceptCookies}>Accepter</Button>
        </div>
      </div>
    </div>
  );
}
