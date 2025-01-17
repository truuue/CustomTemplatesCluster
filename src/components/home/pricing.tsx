"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const firstItem = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const laterItem = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.5,
    },
  },
};

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative w-full overflow-hidden bg-transparent py-24"
    >
      <div className="container flex flex-col items-center justify-center lg:flex-row-reverse">
        <div className="mb-16 ml-0 text-center lg:mb-0 lg:ml-16 lg:text-right">
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight lg:text-8xl">
            Des tarifs simples et{" "}
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: "2px hsl(var(--stroke))",
              }}
            >
              transparents
            </span>
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Choisissez le plan qui correspond à vos besoins
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-8 md:flex-row md:space-x-16 md:space-y-0"
        >
          {/* Plan Gratuit */}
          <motion.div variants={laterItem}>
            <div className="relative flex min-w-[300px] flex-col justify-between rounded-xl border border-primary/20 bg-card px-14 py-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg md:px-8">
              <h3 className="text-4xl font-bold">Gratuit</h3>
              <p className="mt-2 text-muted-foreground">Pour démarrer</p>
              <div className="my-8">
                <span className="text-4xl font-bold">0€</span>
                <span className="text-muted-foreground">/mois</span>
              </div>
              <ul className="mb-8 space-y-4">
                {[
                  "1 landing page",
                  "Templates de base",
                  "Support par email",
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-3 size-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full text-base" variant="outline">
                Commencer gratuitement
              </Button>
            </div>
          </motion.div>

          {/* Plan Pro */}
          <motion.div variants={firstItem}>
            <div className="relative flex min-w-[300px] flex-col justify-between rounded-xl border-2 border-primary bg-card px-14 py-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-lg md:px-8">
              <Badge className="absolute -top-3 left-6 px-3 py-1 text-xs">
                Plus populaire
              </Badge>
              <h3 className="text-4xl font-bold">Pro</h3>
              <p className="mt-2 text-muted-foreground">
                Pour les professionnels
              </p>
              <div className="my-8">
                <span className="text-4xl font-bold">9.99€</span>
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
                    <Check className="mr-3 size-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full text-base">
                Commencer l'essai gratuit
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
