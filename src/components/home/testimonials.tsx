"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.2,
      },
    },
  };

  const firstItem = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const laterItems = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.6,
      },
    },
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-50/50 py-24 dark:bg-gray-800/50"
      id="testimonials"
    >
      {/* Effet de grille en arrière-plan */}
      <div className="bg-grid-pattern absolute inset-0 opacity-[0.03]" />

      <div className="container relative">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Ce que disent nos utilisateurs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Découvrez pourquoi ils nous font confiance
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {/* Première carte */}
          <motion.div variants={laterItems}>
            <div className="group relative rounded-2xl border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800">
              <div className="absolute -right-2 -top-2 rotate-12 text-4xl opacity-10">
                "
              </div>
              <div className="mb-8">
                <p className="text-muted-foreground">
                  "Un outil incroyable qui m'a permis de créer une landing page
                  professionnelle en moins d'une heure."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-12 overflow-hidden rounded-full bg-primary/10">
                  {/* Image de l'avatar */}
                </div>
                <div>
                  <h4 className="font-semibold">Sophie Martin</h4>
                  <p className="text-sm text-muted-foreground">
                    Fondatrice, TechStart
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Deuxième carte (apparaît en premier) */}
          <motion.div variants={firstItem}>
            <div className="group relative rounded-2xl border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800">
              <div className="absolute -right-2 -top-2 rotate-12 text-4xl opacity-10">
                "
              </div>
              <div className="mb-8">
                <p className="text-muted-foreground">
                  "Un outil incroyable qui m'a permis de créer une landing page
                  professionnelle en moins d'une heure."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-12 overflow-hidden rounded-full bg-primary/10">
                  {/* Image de l'avatar */}
                </div>
                <div>
                  <h4 className="font-semibold">Sophie Martin</h4>
                  <p className="text-sm text-muted-foreground">
                    Fondatrice, TechStart
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Troisième carte */}
          <motion.div variants={laterItems}>
            <div className="group relative rounded-2xl border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800">
              <div className="absolute -right-2 -top-2 rotate-12 text-4xl opacity-10">
                "
              </div>
              <div className="mb-8">
                <p className="text-muted-foreground">
                  "Un outil incroyable qui m'a permis de créer une landing page
                  professionnelle en moins d'une heure."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-12 overflow-hidden rounded-full bg-primary/10">
                  {/* Image de l'avatar */}
                </div>
                <div>
                  <h4 className="font-semibold">Sophie Martin</h4>
                  <p className="text-sm text-muted-foreground">
                    Fondatrice, TechStart
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
