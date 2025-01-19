"use client";

import { motion, useInView } from "framer-motion";
import { Brush, Code2, Rocket } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    icon: <Brush className="size-6 text-primary" />,
    title: "Design Intuitif",
    description:
      "Interface drag-and-drop simple pour créer des designs uniques sans compétences techniques",
  },
  {
    icon: <Code2 className="size-6 text-primary" />,
    title: "Templates Professionnels",
    description:
      "Des templates optimisés pour la conversion et entièrement personnalisables",
  },
  {
    icon: <Rocket className="size-6 text-primary" />,
    title: "Publication Rapide",
    description:
      "Déployez votre landing page en un clic avec hébergement inclus",
  },
];

export default function FeaturesMobile() {
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

  return (
    <section
      id="features-mobile"
      ref={containerRef}
      className="relative min-h-[40vh] w-full bg-transparent py-16 lg:hidden"
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
            Tout ce dont vous avez besoin
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Des outils de création puissants
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-6 sm:grid-cols-2"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item} className="group relative">
              <div className="transition-all hover:-translate-y-1">
                <div className="h-full rounded-2xl border border-primary/20 bg-card p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
