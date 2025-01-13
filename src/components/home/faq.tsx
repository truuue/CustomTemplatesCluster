import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="relative w-full bg-transparent py-24">
      <div className="container relative">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <h2 className="under relative text-4xl font-bold tracking-tight md:text-nowrap md:text-7xl">
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
                    stroke="#29303e"
                    strokeWidth="2"
                    fill="none"
                  ></path>
                </svg>
              </span>{" "}
              ?
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              Tout ce que vous devez savoir pour démarrer
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    01
                  </div>
                  <h3 className="text-xl font-semibold">
                    Ai-je besoin de savoir coder ?
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-14 text-muted-foreground">
                Non, notre éditeur visuel vous permet de créer des landing pages
                professionnelles sans aucune connaissance en programmation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    02
                  </div>
                  <h3 className="text-xl font-semibold">
                    Puis-je utiliser mon propre nom de domaine ?
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-14 text-muted-foreground">
                Oui, vous pouvez facilement connecter votre propre nom de
                domaine à votre landing page. Nous fournissons des instructions
                détaillées pour la configuration DNS.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    03
                  </div>
                  <h3 className="text-xl font-semibold">
                    Les pages sont-elles optimisées pour le mobile ?
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-14 text-muted-foreground">
                Oui, toutes nos landing pages sont automatiquement optimisées
                pour tous les appareils. Nous utilisons une approche
                mobile-first pour garantir une expérience optimale sur tous les
                écrans.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    04
                  </div>
                  <h3 className="text-xl font-semibold">
                    Quel est le délai de mise en ligne ?
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-14 text-muted-foreground">
                La mise en ligne est instantanée. Dès que vous cliquez sur
                "Publier", votre landing page est accessible en ligne avec un
                certificat SSL automatique.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-none">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    05
                  </div>
                  <h3 className="text-xl font-semibold">
                    Puis-je exporter le code de ma landing page ?
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-14 text-muted-foreground">
                Oui, avec notre plan Pro, vous pouvez exporter votre landing
                page en React, Next.js ou HTML statique pour l'héberger où vous
                le souhaitez.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
