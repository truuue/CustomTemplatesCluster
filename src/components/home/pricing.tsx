import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section className="relative w-full overflow-hidden bg-gray-50/50 py-24 dark:bg-gray-800/50">
      {/* Effet de grille en arrière-plan */}
      <div className="bg-grid-pattern absolute inset-0 opacity-[0.03]" />

      <div className="container relative">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Tarifs simples et transparents
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choisissez le plan qui correspond à vos besoins
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Plan Gratuit */}
          <div className="relative flex flex-col justify-between rounded-2xl border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-2xl font-bold">Gratuit</h3>
            <p className="mt-2 text-muted-foreground">Pour démarrer</p>
            <div className="my-8">
              <span className="text-4xl font-bold">0€</span>
              <span className="text-muted-foreground">/mois</span>
            </div>
            <ul className="mb-8 space-y-4">
              {["1 landing page", "Templates de base", "Support par email"].map(
                (feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-3 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                )
              )}
            </ul>
            <Button className="w-full" variant="outline">
              Commencer gratuitement
            </Button>
          </div>

          {/* Plan Pro */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-primary bg-card p-8 shadow-lg">
            <Badge className="absolute -top-3 left-6 px-3 py-1">
              Plus populaire
            </Badge>
            <h3 className="text-2xl font-bold">Pro</h3>
            <p className="mt-2 text-muted-foreground">
              Pour les professionnels
            </p>
            <div className="my-8">
              <span className="text-4xl font-bold">29€</span>
              <span className="text-muted-foreground">/mois</span>
            </div>
            <ul className="mb-8 space-y-4">
              {[
                "Landing pages illimitées",
                "Tous les templates",
                "Support prioritaire",
                "Domaine personnalisé",
                "Analytics avancés",
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-3 h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full">Commencer l'essai gratuit</Button>
          </div>

          {/* Plan Entreprise */}
          <div className="relative flex flex-col justify-between rounded-2xl border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-2xl font-bold">Entreprise</h3>
            <p className="mt-2 text-muted-foreground">
              Pour les grandes équipes
            </p>
            <div className="my-8">
              <span className="text-4xl font-bold">99€</span>
              <span className="text-muted-foreground">/mois</span>
            </div>
            <ul className="mb-8 space-y-4">
              {[
                "Tout le plan Pro",
                "SSO & SAML",
                "API access",
                "SLA garanti",
                "Support dédié",
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-3 h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full" variant="outline">
              Contacter les ventes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
