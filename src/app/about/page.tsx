import { siteConfig } from "@/config/site";
import { Brush } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* En-tête */}
      <div className="mb-16 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Brush className="size-8 text-primary" />
          <h1 className="text-4xl font-bold">
            {siteConfig.company.about.title} de {siteConfig.name}
          </h1>
        </div>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          {siteConfig.company.about.subtitle}
        </p>
      </div>

      {/* Notre Mission */}
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">
          {siteConfig.company.about.mission.title}
        </h2>
        <p className="text-muted-foreground">
          Chez {siteConfig.name}, {siteConfig.company.about.mission.description}
        </p>
      </div>

      {/* Nos Valeurs */}
      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {siteConfig.company.about.values.items.map((value, index) => (
          <div key={index} className="rounded-lg border p-6">
            <h3 className="mb-4 text-xl font-semibold">{value.title}</h3>
            <p className="text-muted-foreground">{value.description}</p>
          </div>
        ))}
      </div>

      {/* Notre Histoire */}
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">
          {siteConfig.company.about.history.title}
        </h2>
        <p className="text-muted-foreground">
          Fondé en {siteConfig.company.foundedYear}, {siteConfig.name}{" "}
          {siteConfig.company.about.history.description}
        </p>
      </div>

      {/* Contact */}
      <div className="text-center">
        <h2 className="mb-6 text-2xl font-bold">{siteConfig.contact.title}</h2>
        <p className="text-muted-foreground">
          {siteConfig.contact.subtitle}
          <br />
          Contactez-nous à{" "}
          <span className="text-primary">{siteConfig.contact.email}</span>
        </p>
      </div>
    </div>
  );
}
