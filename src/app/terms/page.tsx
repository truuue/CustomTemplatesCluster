import { siteConfig } from "@/config/site";
import { ScrollText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* En-tête */}
      <div className="mb-16 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <ScrollText className="size-8 text-primary" />
          <h1 className="text-4xl font-bold">{siteConfig.legal.terms.title}</h1>
        </div>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          {siteConfig.legal.terms.subtitle} {siteConfig.name}.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-12">
        {/* Introduction */}
        <section>
          <p className="text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
          <p className="mt-4 text-muted-foreground">
            En utilisant {siteConfig.name}, {siteConfig.legal.terms.intro}
          </p>
        </section>

        {/* Définitions */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            {siteConfig.legal.terms.definitions.title}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {siteConfig.legal.terms.definitions.items.map((item, index) => (
              <li key={index}>
                <span className="font-medium">{item.term} :</span>{" "}
                {item.term === "Plateforme"
                  ? `${item.definition} ${siteConfig.name}`
                  : item.definition}
              </li>
            ))}
          </ul>
        </section>

        {/* Conditions Financières */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            {siteConfig.legal.terms.financial.title}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>{siteConfig.legal.terms.financial.description}</p>
            <p>{siteConfig.legal.terms.financial.notice}</p>
          </div>
        </section>

        {/* Responsabilités */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            {siteConfig.legal.terms.responsibilities.title}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>{siteConfig.legal.terms.responsibilities.intro}</p>
            <ul className="list-inside list-disc space-y-2">
              {siteConfig.legal.terms.responsibilities.items.map(
                (item, index) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
            <p>
              {siteConfig.name}{" "}
              {siteConfig.legal.terms.responsibilities.disclaimer}
            </p>
          </div>
        </section>

        {/* Résiliation */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            {siteConfig.legal.terms.termination.title}
          </h2>
          <p className="text-muted-foreground">
            {siteConfig.legal.terms.termination.description}
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            {siteConfig.contact.title}
          </h2>
          <p className="text-muted-foreground">
            Pour toute question concernant ces CGU, contactez-nous à{" "}
            <span className="text-primary">{siteConfig.contact.email}</span>
          </p>
        </section>
      </div>
    </div>
  );
}
