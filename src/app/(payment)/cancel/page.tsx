import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function Cancel() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="mb-6">
          <XCircle className="h-12 w-12 animate-pulse text-destructive sm:h-16 sm:w-16" />
        </div>
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Paiement annulé</h1>
        <p className="mb-8 px-4 text-base text-muted-foreground sm:px-0 sm:text-lg">
          Le paiement a été annulé. Aucun montant n&apos;a été débité de votre
          compte.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Button className="w-full sm:w-auto" variant="destructive" asChild>
            <Link href="/" id="pricing">
              Réessayer
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" variant="outline" asChild>
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
