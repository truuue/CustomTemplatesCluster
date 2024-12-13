import { MobileMenu } from "@/components/mobile-menu";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionSection } from "@/components/ui/motion-section";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ArrowRight, Check, Layout, Rocket, Star, Wand2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex h-14 max-w-7xl items-center">
            <MobileMenu />
            <Link href="/" className="flex items-center space-x-2">
              <Wand2 className="h-6 w-6" />
              <span className="font-bold">Showcaser</span>
            </Link>
            <nav className="ml-6 hidden items-center space-x-6 md:flex">
              <Link
                href="#features"
                className="text-sm font-medium hover:text-primary"
              >
                Fonctionnalités
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium hover:text-primary"
              >
                Prix
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium hover:text-primary"
              >
                Témoignages
              </Link>
            </nav>
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
              <Button size="sm">S'inscrire</Button>
              <Button variant="ghost" size="sm" className="hidden md:block">
                Se connecter
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section avec animation */}
        <main className="flex-1">
          <MotionSection className="relative w-full bg-gradient-to-b from-primary/5 to-background px-24 py-40 sm:px-16 sm:py-56 md:py-48 lg:py-44 xl:py-56">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Badge className="mb-4" variant="secondary">
                  ✨ Nouveau : Export en React & Next.js
                </Badge>
                <div className="space-y-2">
                  <h1 className="mb-12 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-3xl font-bold tracking-normal text-transparent sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Créez des Landing Pages Impressionnantes
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                    Concevez, personnalisez et publiez des landing pages
                    professionnelles en quelques minutes, sans code.
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link href="/landing-page">
                    <Button size="lg" className="px-8">
                      Commencer Gratuitement
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    Voir la Démo
                  </Button>
                </div>
                <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    Essai gratuit 14 jours
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    Sans carte bancaire
                  </div>
                </div>
              </div>
            </div>
          </MotionSection>

          {/* Comment ça marche Section */}
          <section className="w-full py-12 md:py-24">
            <div className="container">
              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Comment ça marche ?
                </h2>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Créez votre landing page en 3 étapes simples
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {/* premier bloc */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute -left-4 -top-4 flex size-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
                    1
                  </div>
                  <div className="w-full rounded-xl bg-white p-6 dark:bg-gray-700">
                    <h3 className="mb-4 text-xl font-bold">
                      Choisissez un template
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Sélectionnez parmi notre collection de templates
                      professionnels optimisés
                    </p>
                  </div>
                </div>

                {/* deuxième bloc */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute -left-4 -top-4 flex size-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
                    2
                  </div>
                  <div className="w-full rounded-xl bg-white p-6 dark:bg-gray-700">
                    <h3 className="mb-4 text-xl font-bold">Personnalisez</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Modifiez les couleurs, textes et images avec notre éditeur
                      drag-and-drop intuitif
                    </p>
                  </div>
                </div>

                {/* troisième bloc */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute -left-4 -top-4 flex size-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
                    3
                  </div>
                  <div className="w-full rounded-xl bg-white p-6 dark:bg-gray-700">
                    <h3 className="mb-4 text-xl font-bold">Publiez</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Mettez en ligne votre landing page en un clic avec
                      hébergement et SSL inclus
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section avec animation */}
          <MotionSection className="w-full bg-gray-50 px-4 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Tout ce dont vous avez besoin
                </h2>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Des outils puissants pour créer des landing pages qui
                  convertissent
                </p>
              </div>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-4 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-700">
                  <Wand2 className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Design Intuitif</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Interface drag-and-drop simple pour créer des designs
                    uniques sans compétences techniques
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-700">
                  <Layout className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">
                    Templates Professionnels
                  </h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Plus de 100 templates optimisés pour la conversion et
                    entièrement personnalisables
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-700">
                  <Rocket className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Publication Rapide</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Déployez votre landing page en un clic avec hébergement
                    inclus et SSL gratuit
                  </p>
                </div>
              </div>
            </div>
          </MotionSection>

          {/* Pricing Section avec animation */}
          <MotionSection className="w-full px-4 py-12 md:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Prix Simples et Transparents
                </h2>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Choisissez le plan qui correspond à vos besoins
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {/* Starter Plan */}
                <div className="flex flex-col rounded-xl bg-white p-6 shadow-sm dark:bg-gray-700">
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <div className="mt-4 text-4xl font-bold">0€</div>
                  <p className="mt-2 text-gray-500">par mois</p>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />1 landing
                      page
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      Templates basiques
                    </li>
                  </ul>
                  <Button className="mt-8" variant="outline">
                    Commencer Gratuitement
                  </Button>
                </div>

                {/* Pro Plan */}
                <div className="flex scale-105 flex-col rounded-xl bg-primary p-6 text-primary-foreground shadow-lg">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <div className="mt-4 text-4xl font-bold">29€</div>
                  <p className="mt-2">par mois</p>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4" />
                      Landing pages illimitées
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4" />
                      Tous les templates
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4" />
                      Support prioritaire
                    </li>
                  </ul>
                  <Button className="mt-8" variant="secondary">
                    Commencer l'essai Pro
                  </Button>
                </div>

                {/* Enterprise Plan */}
                <div className="flex flex-col rounded-xl bg-white p-6 shadow-sm dark:bg-gray-700">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <div className="mt-4 text-4xl font-bold">Sur Mesure</div>
                  <p className="mt-2 text-gray-500">contactez-nous</p>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      Solutions personnalisées
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      Support dédié
                    </li>
                  </ul>
                  <Button className="mt-8" variant="outline">
                    Contactez-nous
                  </Button>
                </div>
              </div>
            </div>
          </MotionSection>

          {/* Testimonials Section avec animation */}
          <MotionSection
            className="w-full bg-gray-50 px-4 py-12 dark:bg-gray-800 md:py-24 lg:py-32"
            id="testimonials"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ce que disent nos utilisateurs
                </h2>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Découvrez pourquoi ils nous font confiance
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col rounded-xl bg-white p-6 shadow-sm dark:bg-gray-700">
                  <div className="mb-4 flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-gray-500 dark:text-gray-400">
                    "Un outil incroyable qui m'a permis de créer une landing
                    page professionnelle en moins d'une heure."
                  </p>
                  <div className="mt-6 border-t pt-6">
                    <div className="font-semibold">Sophie Martin</div>
                    <div className="text-sm text-gray-500">
                      Fondatrice, TechStart
                    </div>
                  </div>
                </div>
                <div className="flex flex-col rounded-xl bg-white p-6 shadow-sm dark:bg-gray-700">
                  <div className="mb-4 flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-gray-500 dark:text-gray-400">
                    "La facilité d'utilisation est exceptionnelle. J'ai pu créer
                    et publier ma page en quelques clics."
                  </p>
                  <div className="mt-6 border-t pt-6">
                    <div className="font-semibold">Thomas Dubois</div>
                    <div className="text-sm text-gray-500">
                      Marketing Manager, GrowthCo
                    </div>
                  </div>
                </div>
                <div className="flex flex-col rounded-xl bg-white p-6 shadow-sm dark:bg-gray-700">
                  <div className="mb-4 flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-gray-500 dark:text-gray-400">
                    "Le meilleur rapport qualité-prix du marché. Les templates
                    sont magnifiques."
                  </p>
                  <div className="mt-6 border-t pt-6">
                    <div className="font-semibold">Marie Leroy</div>
                    <div className="text-sm text-gray-500">
                      Designer, CreativeStudio
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionSection>

          {/* Questions Fréquentes Section */}
          <section className="w-full py-12 md:py-24">
            <div className="container">
              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Questions Fréquentes
                </h2>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Tout ce que vous devez savoir pour démarrer
                </p>
              </div>
              <div className="mx-auto max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-semibold">
                      Ai-je besoin de savoir coder ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 dark:text-gray-400">
                      Non, notre éditeur visuel vous permet de créer des landing
                      pages professionnelles sans aucune connaissance en
                      programmation.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-semibold">
                      Puis-je utiliser mon propre nom de domaine ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 dark:text-gray-400">
                      Oui, vous pouvez facilement connecter votre propre nom de
                      domaine à votre landing page. Nous fournissons des
                      instructions détaillées pour la configuration DNS.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-semibold">
                      Les pages sont-elles optimisées pour le mobile ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 dark:text-gray-400">
                      Oui, toutes nos landing pages sont automatiquement
                      optimisées pour tous les appareils. Nous utilisons une
                      approche mobile-first pour garantir une expérience
                      optimale sur tous les écrans.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-semibold">
                      Quel est le délai de mise en ligne ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 dark:text-gray-400">
                      La mise en ligne est instantanée. Dès que vous cliquez sur
                      "Publier", votre landing page est accessible en ligne avec
                      un certificat SSL automatique.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-lg font-semibold">
                      Puis-je exporter le code de ma landing page ?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 dark:text-gray-400">
                      Oui, avec notre plan Pro, vous pouvez exporter votre
                      landing page en React, Next.js ou HTML statique pour
                      l'héberger où vous le souhaitez.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full border-t px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <h4 className="mb-4 text-sm font-semibold">Produit</h4>
                <ul className="space-y-3 text-sm text-gray-500">
                  <li>
                    <Link href="#">Fonctionnalités</Link>
                  </li>
                  <li>
                    <Link href="#">Tarifs</Link>
                  </li>
                  <li>
                    <Link href="#">Templates</Link>
                  </li>
                  <li>
                    <Link href="#">Nouveautés</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold">Ressources</h4>
                <ul className="space-y-3 text-sm text-gray-500">
                  <li>
                    <Link href="#">Blog</Link>
                  </li>
                  <li>
                    <Link href="#">Documentation</Link>
                  </li>
                  <li>
                    <Link href="#">Guides</Link>
                  </li>
                  <li>
                    <Link href="#">Support</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold">Entreprise</h4>
                <ul className="space-y-3 text-sm text-gray-500">
                  <li>
                    <Link href="#">À propos</Link>
                  </li>
                  <li>
                    <Link href="#">Carrières</Link>
                  </li>
                  <li>
                    <Link href="#">Contact</Link>
                  </li>
                  <li>
                    <Link href="#">Presse</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold">Légal</h4>
                <ul className="space-y-3 text-sm text-gray-500">
                  <li>
                    <Link href="#">Confidentialité</Link>
                  </li>
                  <li>
                    <Link href="#">CGU</Link>
                  </li>
                  <li>
                    <Link href="#">Cookies</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
              <p>© 2024 Showcaser. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
