"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      setIsLoading(true);
      await signIn(provider, {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Erreur de connexion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Bienvenue sur Showcaser</CardTitle>
          {error && (
            <p className="mt-2 text-sm text-red-500">
              Une erreur est survenue lors de la connexion
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSignIn("github")}
            disabled={isLoading}
          >
            Continuer avec GitHub
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSignIn("google")}
            disabled={isLoading}
          >
            Continuer avec Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
