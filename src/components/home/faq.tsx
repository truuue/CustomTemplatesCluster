import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="relative w-full bg-transparent py-12 md:py-24">
      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center md:mb-16">
            <h2 className="under relative text-3xl font-bold tracking-tight md:text-4xl lg:text-7xl">
              Des{" "}
              <span className="relative inline-block">
                <span className="relative z-10">questions</span>
                <svg
                  className="absolute bottom-0 left-0 h-1 w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 2"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 1 Q25 2 50 1 T100 1"
                    stroke="hsl(var(--stroke))"
                    strokeWidth="2"
                    fill="none"
                  ></path>
                </svg>
              </span>{" "}
              ?
            </h2>

            <p className="mt-3 text-base text-muted-foreground md:mt-4 md:text-lg">
              Tout ce que vous devez savoir pour démarrer
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="w-full hover:no-underline">
                <div className="flex w-full flex-col items-center gap-2 md:flex-row md:gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary md:size-10">
                    01
                  </div>
                  <h3 className="w-full text-center text-lg font-semibold md:text-left md:text-xl">
                    Ai-je besoin de savoir coder ?
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mt-2 text-center text-sm text-muted-foreground md:mt-0 md:pl-14 md:text-left md:text-base">
                Non, notre éditeur visuel vous permet de créer des landing pages
                professionnelles sans aucune connaissance en programmation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-none">
              <AccordionTrigger className="w-full hover:no-underline">
                <div className="flex w-full flex-col items-center gap-2 md:flex-row md:gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary md:size-10">
                    02
                  </div>
                  <h3 className="w-full text-center text-lg font-semibold md:text-left md:text-xl">
                    Puis-je utiliser mon propre nom de domaine ?
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mt-2 text-center text-sm text-muted-foreground md:mt-0 md:pl-14 md:text-left md:text-base">
                Oui, vous pouvez facilement connecter votre propre nom de
                domaine à votre landing page. Nous fournissons des instructions
                détaillées pour la configuration DNS.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-none">
              <AccordionTrigger className="w-full hover:no-underline">
                <div className="flex w-full flex-col items-center gap-2 md:flex-row md:gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary md:size-10">
                    03
                  </div>
                  <h3 className="w-full text-center text-lg font-semibold md:text-left md:text-xl">
                    Les pages sont-elles optimisées pour le mobile ?
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mt-2 text-center text-sm text-muted-foreground md:mt-0 md:pl-14 md:text-left md:text-base">
                Oui, toutes nos landing pages sont automatiquement optimisées
                pour tous les appareils. Nous utilisons une approche
                mobile-first pour garantir une expérience optimale sur tous les
                écrans.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-none">
              <AccordionTrigger className="w-full hover:no-underline">
                <div className="flex w-full flex-col items-center gap-2 md:flex-row md:gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary md:size-10">
                    04
                  </div>
                  <h3 className="w-full text-center text-lg font-semibold md:text-left md:text-xl">
                    Quel est le délai de mise en ligne ?
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mt-2 text-center text-sm text-muted-foreground md:mt-0 md:pl-14 md:text-left md:text-base">
                La mise en ligne est instantanée. Dès que vous cliquez sur
                &quot;Publier&quot;, votre landing page est accessible en ligne
                avec un certificat SSL automatique.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-none">
              <AccordionTrigger className="w-full hover:no-underline">
                <div className="flex w-full flex-col items-center gap-2 md:flex-row md:gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary md:size-10">
                    05
                  </div>
                  <h3 className="w-full text-center text-lg font-semibold md:text-left md:text-xl">
                    Puis-je exporter le code de ma landing page ?
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mt-2 text-center text-sm text-muted-foreground md:mt-0 md:pl-14 md:text-left md:text-base">
                Oui, avec notre plan Pro, vous pouvez exporter votre landing
                page en React, Next.js ou HTML statique pour l&apos;héberger où
                vous le souhaitez.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
