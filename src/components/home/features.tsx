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

export default function Features() {
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
      id="features"
      ref={containerRef}
      className="relative min-h-[50vh] w-full bg-transparent py-24"
    >
      <div className="container relative flex flex-row-reverse items-start space-x-16">
        <motion.div
          className="mb-16 text-right md:mb-0"
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
            Tout ce dont vous avez besoin
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground xl:text-nowrap">
            Des outils de création puissants
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="relative flex flex-col items-center space-y-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative w-[500px]"
            >
              <div className="transition-all hover:-translate-y-1">
                <div className="h-full rounded-2xl border border-primary/20 bg-card p-8 shadow-sm transition-shadow hover:shadow-lg">
                  <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
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
