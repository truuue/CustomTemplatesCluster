"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function HowItWorks() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[50vh] w-full bg-transparent py-24"
    >
      <div className="container relative flex flex-row items-start space-x-16">
        <motion.div
          className="mb-16 text-left md:mb-0"
          style={{
            position: "sticky",
            top: "35%",
            transform: "translateY(-50%)",
          }}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut",
            },
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="max-w-2xl text-pretty text-3xl font-bold tracking-tight md:text-8xl">
            Comment ça marche ?
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground xl:text-nowrap">
            Créez votre landing page en 3 étapes simples
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="relative flex flex-col items-center space-y-16"
        >
          {/* Premier bloc */}
          <motion.div variants={item} className="group relative w-[500px]">
            <div className="transition-all hover:-translate-y-1">
              <div className="absolute -left-4 -top-4 flex size-12 rotate-3 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-primary-foreground transition-transform group-hover:scale-110">
                <span className="-rotate-3">1</span>
              </div>
              <div className="h-full rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-gray-800">
                <h3 className="mb-4 text-xl font-bold">
                  Choisissez un template
                </h3>
                <p className="text-muted-foreground">
                  Sélectionnez parmi notre collection de templates
                  professionnels optimisés
                </p>
              </div>
            </div>
          </motion.div>

          {/* deuxième bloc */}
          <motion.div variants={item} className="group relative w-[500px]">
            <div className="transition-all hover:-translate-y-1">
              <div className="absolute -left-4 -top-4 flex size-12 rotate-3 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-primary-foreground transition-transform group-hover:scale-110">
                <span className="-rotate-3">2</span>
              </div>
              <div className="h-full rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800">
                <h3 className="mb-4 text-xl font-bold">Personnalisez</h3>
                <p className="text-muted-foreground">
                  Modifiez les couleurs, textes et images grâce à notre éditeur
                  intuitif
                </p>
              </div>
            </div>
          </motion.div>

          {/* troisième bloc */}
          <motion.div variants={item} className="group relative w-[500px]">
            <div className="transition-all hover:-translate-y-1">
              <div className="absolute -left-4 -top-4 flex size-12 rotate-3 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-primary-foreground transition-transform group-hover:scale-110">
                <span className="-rotate-3">3</span>
              </div>
              <div className="h-full rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800">
                <h3 className="mb-4 text-xl font-bold">Publiez</h3>
                <p className="text-muted-foreground">
                  Mettez en ligne votre landing page en un clic avec hébergement
                  inclus
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
