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

  const testimonials = [
    {
      content:
        "C'est un outil incroyable qui permet de créer une landing page facilement et rapidement.",
      author: "Fabien (Dieu)",
      role: "SWE, Holberton",
    },
    {
      content:
        "Cette solution web est impréssionnante de tant elle facilite la création de landing page.",
      author: "Yoann",
      role: "Développeur C#",
    },
    {
      content:
        "Une interface intuitive et des fonctionnalités qui m'ont permis de concevoir une page rapidement !",
      author: "Pierre",
      role: "Développeur ML",
    },
    {
      content:
        "C'est tout simplement la meilleure solution pour créer des landing pages modernes et réactives sans effort.",
      author: "Hugo",
      role: "Développeur Fullstack",
    },
    {
      content:
        "Grâce à cet outil, j'ai économisé des heures de travail. Le rendu est impeccable !",
      author: "Cathy",
      role: "Développeuse Fullstack",
    },
    {
      content:
        "Grâce à cet outil, j'ai économisé des heures de travail. Le rendu est impeccable !",
      author: "Valentin",
      role: "Développeuse Fullstack",
    },
  ];

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
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/3">
                  <motion.div variants={item}>
                    <div className="group relative rounded-2xl border border-primary/20 bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                      <div className="mb-8">
                        <p className="text-muted-foreground">
                          &quot;{testimonial.content}&quot;
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="absolute bottom-12 left-7 z-10 -rotate-12 text-4xl opacity-10">
                          &quot;
                        </div>
                        <div className="size-12 overflow-hidden rounded-full bg-primary/10" />
                        <div>
                          <h3 className="font-semibold">
                            {testimonial.author}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
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
