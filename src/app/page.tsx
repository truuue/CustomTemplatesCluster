import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold">Créateur de Landing Pages</h1>
        <p className="text-xl text-gray-600">
          Créez des landing pages professionnelles en quelques minutes
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Créer une Landing Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Commencez avec un nouveau template et personnalisez-le selon vos
              besoins
            </p>
            <Link href="/templates/new">
              <Button className="w-full">Créer un nouveau template</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mes Templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Accédez à vos templates sauvegardés</p>
            <Link href="/templates">
              <Button variant="outline" className="w-full">
                Voir mes templates
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Templates Populaires</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
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
    </main>
  );
}
