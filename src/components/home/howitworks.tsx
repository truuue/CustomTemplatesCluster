import { Plus } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-gray-50/50 py-24 dark:bg-gray-800/50">
      <div className="container relative max-w-7xl py-10">
        {/* Bordures décoratives avec plus */}
        <div className="absolute inset-0 -m-4">
          {/* Bordure supérieure */}
          <div className="absolute left-4 right-4 top-0 h-px bg-primary/20" />
          {/* Bordure inférieure */}
          <div className="absolute bottom-0 left-4 right-4 h-px bg-primary/20" />
          {/* Bordure gauche */}
          <div className="absolute bottom-4 left-0 top-4 w-px bg-primary/20" />
          {/* Bordure droite */}
          <div className="absolute bottom-4 right-0 top-4 w-px bg-primary/20" />

          {/* Plus aux angles */}
          {/* Haut gauche */}
          <div className="absolute -left-[0.6rem] -top-[0.58rem]">
            <Plus className="size-5 text-gray-400" />
          </div>
          {/* Haut droite */}
          <div className="absolute -right-[0.58rem] -top-[0.6rem]">
            <Plus className="size-5 text-gray-400" />
          </div>
          {/* Bas gauche */}
          <div className="absolute -bottom-[0.6rem] -left-[0.58rem]">
            <Plus className="size-5 text-gray-400" />
          </div>
          {/* Bas droite */}
          <div className="absolute -bottom-[0.58rem] -right-[0.6rem]">
            <Plus className="size-5 text-gray-400" />
          </div>
        </div>

        {/* Contenu existant */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Comment ça marche ?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Créez votre landing page en 3 étapes simples
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {/* Premier bloc */}
          <div className="group relative">
            <div className="absolute -left-4 -top-4 flex size-12 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-primary-foreground transition-transform group-hover:scale-110">
              1
            </div>
            <div className="rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800">
              <h3 className="mb-4 text-xl font-bold">Choisissez un template</h3>
              <p className="text-muted-foreground">
                Sélectionnez parmi notre collection de templates professionnels
                optimisés
              </p>
            </div>
          </div>

          {/* deuxième bloc */}
          <div className="group relative">
            <div className="absolute -left-4 -top-4 flex size-12 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-primary-foreground transition-transform group-hover:scale-110">
              2
            </div>
            <div className="rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800">
              <h3 className="mb-4 text-xl font-bold">Personnalisez</h3>
              <p className="text-muted-foreground">
                Modifiez les couleurs, textes et images avec notre éditeur
                intuitif
              </p>
            </div>
          </div>

          {/* troisième bloc */}
          <div className="group relative">
            <div className="absolute -left-4 -top-4 flex size-12 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-primary-foreground transition-transform group-hover:scale-110">
              3
            </div>
            <div className="rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800">
              <h3 className="mb-4 text-xl font-bold">Publiez</h3>
              <p className="text-muted-foreground">
                Mettez en ligne votre landing page en un clic avec hébergement
                inclus
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
