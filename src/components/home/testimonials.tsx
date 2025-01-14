"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

  const item = {
    hidden: { opacity: 0, x: 20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-transparent py-24"
      id="testimonials"
    >
      <div className="container relative">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-7xl">
            Ce que disent nos utilisateurs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Découvrez pourquoi ils nous font confiance
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {/* Premier témoignage */}
              <CarouselItem className="md:basis-1/3">
                <motion.div variants={item}>
                  <div className="group relative rounded-2xl border border-primary/20 bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="mb-8">
                      <p className="text-muted-foreground">
                        "Un outil incroyable qui m'a permis de créer une landing
                        page professionnelle en moins d'une heure."
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="absolute bottom-12 left-7 z-10 -rotate-12 text-4xl opacity-10">
                        "
                      </div>
                      <div className="size-12 overflow-hidden rounded-full bg-primary/10" />
                      <div>
                        <h4 className="font-semibold">Sophie Martin</h4>
                        <p className="text-sm text-muted-foreground">
                          Fondatrice, TechStart
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>

              {/* Deuxième témoignage */}
              <CarouselItem className="md:basis-1/3">
                <motion.div variants={item}>
                  <div className="group relative rounded-2xl border border-primary/20 bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="mb-8">
                      <p className="text-muted-foreground">
                        "Un outil incroyable qui m'a permis de créer une landing
                        page professionnelle en moins d'une heure."
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="absolute bottom-12 left-7 z-10 -rotate-12 text-4xl opacity-10">
                        "
                      </div>
                      <div className="size-12 overflow-hidden rounded-full bg-primary/10" />
                      <div>
                        <h4 className="font-semibold">Sophie Martin</h4>
                        <p className="text-sm text-muted-foreground">
                          Fondatrice, TechStart
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>

              {/* Troisième témoignage */}
              <CarouselItem className="md:basis-1/3">
                <motion.div variants={item}>
                  <div className="group relative rounded-2xl border border-primary/20 bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="mb-8">
                      <p className="text-muted-foreground">
                        "Un outil incroyable qui m'a permis de créer une landing
                        page professionnelle en moins d'une heure."
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="absolute bottom-12 left-7 z-10 -rotate-12 text-4xl opacity-10">
                        "
                      </div>
                      <div className="size-12 overflow-hidden rounded-full bg-primary/10" />
                      <div>
                        <h4 className="font-semibold">Sophie Martin</h4>
                        <p className="text-sm text-muted-foreground">
                          Fondatrice, TechStart
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>

              {/* Quatrième témoignage */}
              <CarouselItem className="md:basis-1/3">
                <motion.div variants={item}>
                  <div className="group relative rounded-2xl border border-primary/20 bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="mb-8">
                      <p className="text-muted-foreground">
                        "Un outil incroyable qui m'a permis de créer une landing
                        page professionnelle en moins d'une heure."
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="absolute bottom-12 left-7 z-10 -rotate-12 text-4xl opacity-10">
                        "
                      </div>
                      <div className="size-12 overflow-hidden rounded-full bg-primary/10" />
                      <div>
                        <h4 className="font-semibold">Sophie Martin</h4>
                        <p className="text-sm text-muted-foreground">
                          Fondatrice, TechStart
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            </CarouselContent>

            <CarouselPrevious className="absolute -left-12 top-1/2 hidden lg:flex" />
            <CarouselNext className="absolute -right-12 top-1/2 hidden lg:flex" />

            <div className="mt-8 flex justify-center gap-4 lg:hidden">
              <CarouselPrevious className="static" />
              <CarouselNext className="static" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
