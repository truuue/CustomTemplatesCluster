import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background px-4">
      {/* Grille de fond avec dégradé */}
      <div className="bg-grid-pattern absolute inset-0 opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
      </div>

      {/* Cercle lumineux */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Contenu existant */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <Badge className="mb-8 rounded-full border-primary/20 bg-primary/10 px-6 py-2 text-primary hover:bg-primary/60 hover:text-primary-foreground/90">
            ✨ Nouveau : Export en React & Next.js
          </Badge>

          <h1 className="mx-auto max-w-4xl bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl">
            Créez des Landing Pages Qui Convertissent
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            La plateforme tout-en-un pour créer, personnaliser et publier des
            landing pages professionnelles en quelques minutes, sans code.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/landing-page">
              <Button
                size="lg"
                className="h-12 min-w-[200px] bg-primary text-base hover:bg-primary/90"
              >
                Commencer gratuitement
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="h-12 min-w-[200px] text-base"
            >
              Voir la démo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
