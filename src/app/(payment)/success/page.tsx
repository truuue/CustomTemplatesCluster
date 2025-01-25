import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Success() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="mb-6 animate-bounce">
          <CheckCircle className="h-12 w-12 text-green-500 sm:h-16 sm:w-16" />
        </div>
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
          Paiement réussi !
        </h1>
        <p className="mb-8 px-4 text-base text-muted-foreground sm:px-0 sm:text-lg">
          Merci pour votre achat. Vous pouvez maintenant accéder à tous vos
          templates.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Button className="w-full sm:w-auto" asChild>
            <Link href="/templates">Voir mes templates</Link>
          </Button>
          <Button className="w-full sm:w-auto" variant="outline" asChild>
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
