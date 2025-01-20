"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteAccountPage() {
  const [confirmed, setConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteAccount = async () => {
    if (!confirmed) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez confirmer la suppression de votre compte",
      });
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      await signOut({ redirect: false });

      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès",
      });

      router.push("/");
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer votre compte",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-destructive">
            Supprimer mon compte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            Cette action est irréversible. Toutes vos données seront
            définitivement supprimées.
          </p>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="confirm"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
            />
            <label
              htmlFor="confirm"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Je comprends que cette action est irréversible
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={!confirmed || isDeleting}
              className="w-full"
            >
              {isDeleting ? "Suppression..." : "Supprimer mon compte"}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={isDeleting}
              className="w-full"
            >
              Annuler
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
