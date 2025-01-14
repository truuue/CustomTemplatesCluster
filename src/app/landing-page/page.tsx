import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Grille de fond avec dégradé */}
      <div className="bg-grid-pattern fixed inset-0 -z-10 opacity-100 dark:opacity-80 dark:[background-image:linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)]">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:py-16">
        <div className="mb-12 px-4 text-center sm:mb-16 md:mb-24">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Créateur de Landing Pages
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl">
            Créez des landing pages professionnelles en quelques minutes
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          <Card className="hover-card flex flex-col justify-between">
            <CardHeader>
              <CardTitle>Créer une Landing Page</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Commencez avec un nouveau template et personnalisez-le selon vos
                besoins
              </p>
              <Link href="/templates/new">
                <Button className="w-full">Créer un nouveau template</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover-card flex flex-col justify-between">
            <CardHeader>
              <CardTitle>Mes Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Accédez à vos templates sauvegardés
              </p>
              <Link href="/templates">
                <Button variant="outline" className="w-full">
                  Voir mes templates
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover-card flex flex-col justify-between">
            <CardHeader>
              <CardTitle>Templates Populaires</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Explorez notre collection de templates prédéfinis
              </p>
              <Link href="/templates/gallery">
                <Button variant="outline" className="w-full">
                  Explorer la galerie
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
