import BackgroundGrid from "@/components/ui/background-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LandingPage() {
  const cards = [
    {
      title: "Créer une Landing Page",
      description:
        "Commencez avec un nouveau template et personnalisez-le selon vos besoins",
      href: "/templates/new",
      buttonText: "Créer un nouveau template",
      buttonVariant: "default" as const,
    },
    {
      title: "Mes Templates",
      description:
        "Accédez à tous vos templates professionnels et personnalisés",
      href: "/templates",
      buttonText: "Voir mes templates",
      buttonVariant: "outline" as const,
    },
  ];

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      <BackgroundGrid />

      <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:py-16">
        <div className="mb-12 px-4 text-center sm:mb-16 md:mb-24">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Créateur de Landing Pages
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Créez des landing pages professionnelles en quelques minutes
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-28 px-4 sm:grid-cols-2 sm:px-6">
          {cards.map((card) => (
            <Card
              key={card.title}
              className="hover-card flex flex-col justify-between border border-primary/20"
            >
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{card.description}</p>
                <Link href={card.href}>
                  <Button variant={card.buttonVariant} className="w-full">
                    {card.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
