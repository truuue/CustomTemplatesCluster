import { MotionSection } from "@/components/ui/motion-section";
import { Wand2 } from "lucide-react";

export default function Features() {
  return (
    <MotionSection className="relative w-full overflow-hidden px-4 py-24">
      {/* Cercles décoratifs */}
      <div className="absolute right-0 top-1/2 h-[150px] w-[150px] rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute left-0 top-1/2 h-[150px] w-[150px] rounded-full bg-primary/25 blur-3xl" />

      {/* Grille de fond subtile */}
      <div className="bg-grid-pattern absolute inset-0 opacity-[0.03]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
            Tout ce dont vous avez besoin
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Des outils puissants pour créer des landing pages qui convertissent
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature Card */}
          <div className="group relative rounded-2xl border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800">
            <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3">
              <Wand2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Design Intuitif</h3>
            <p className="text-muted-foreground">
              Interface drag-and-drop simple pour créer des designs uniques sans
              compétences techniques
            </p>
          </div>

          <div className="group relative rounded-2xl border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800">
            <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3">
              <Wand2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Templates Professionnels</h3>
            <p className="text-muted-foreground">
              Des templates optimisés pour la conversion et entièrement
              personnalisables
            </p>
          </div>

          <div className="group relative rounded-2xl border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800">
            <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3">
              <Wand2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Publication Rapide</h3>
            <p className="text-muted-foreground">
              Déployez votre landing page en un clic avec hébergement inclus
            </p>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
