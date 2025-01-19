"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function HowItWorksMobile() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const steps = [
    {
      number: 1,
      title: "Choisissez un template",
      description:
        "Sélectionnez parmi notre collection de templates professionnels optimisés",
    },
    {
      number: 2,
      title: "Personnalisez",
      description:
        "Modifiez les couleurs, textes et images grâce à notre éditeur intuitif",
    },
    {
      number: 3,
      title: "Publiez",
      description:
        "Mettez en ligne votre landing page en un clic avec hébergement inclus",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-transparent py-16 lg:hidden"
    >
      <div className="container px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 50 }}
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
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Comment ça marche ?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Créez votre landing page en 3 étapes simples
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="space-y-6"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={item}
              className="group relative"
            >
              <div className="transition-all hover:-translate-y-1">
                <div className="relative rounded-2xl border border-primary/20 bg-card p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <div className="absolute -left-2 -top-2 flex size-10 rotate-3 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground transition-transform group-hover:scale-110 sm:size-12 sm:text-2xl">
                    <span className="-rotate-3">{step.number}</span>
                  </div>
                  <div className="ml-8 sm:ml-10">
                    <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
