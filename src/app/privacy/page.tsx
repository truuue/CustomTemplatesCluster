import { siteConfig } from "@/config/site";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* En-tête */}
      <div className="mb-16 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Shield className="size-8 text-primary" />
          <h1 className="text-4xl font-bold">
            {siteConfig.legal.privacy.title}
          </h1>
        </div>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Chez {siteConfig.name}, {siteConfig.legal.privacy.subtitle}
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-12">
        {/* Introduction */}
        <section>
          <p className="text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
          <p className="mt-4 text-muted-foreground">
            Cette politique de confidentialité décrit comment {siteConfig.name}{" "}
            {siteConfig.legal.privacy.description}
          </p>
        </section>

        {/* Collecte des données */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            {siteConfig.legal.privacy.dataCollection.title}
          </h2>
          <p className="mb-4 text-muted-foreground">
            {siteConfig.legal.privacy.dataCollection.intro}
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {(siteConfig.legal.privacy.dataCollection.items || []).map(
              (value, index) => (
                <li key={index}>
                  {value.replace(/'/g, "&apos;").replace(/"/g, "&quot;")}
                </li>
              )
            )}
          </ul>
        </section>

        {/* Utilisation des données */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">Utilisation des Données</h2>
          <p className="mb-4 text-muted-foreground">
            Nous utilisons vos données pour :
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Fournir et améliorer nos services</li>
            <li>Personnaliser votre expérience</li>
            <li>Traiter vos paiements</li>
            <li>Communiquer avec vous concernant votre compte</li>
            <li>Assurer la sécurité de notre plateforme</li>
          </ul>
        </section>

        {/* Protection des données */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">Protection des Données</h2>
          <p className="text-muted-foreground">
            Nous mettons en œuvre des mesures de sécurité techniques et
            organisationnelles pour protéger vos données personnelles contre
            tout accès non autorisé, modification, divulgation ou destruction.
          </p>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">Cookies</h2>
          <p className="text-muted-foreground">
            Nous utilisons des cookies pour améliorer votre expérience sur notre
            plateforme. Vous pouvez contrôler les cookies via les paramètres de
            votre navigateur.
          </p>
        </section>

        {/* Droits des utilisateurs */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">Vos Droits</h2>
          <p className="mb-4 text-muted-foreground">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification de vos données</li>
            <li>Droit à l'effacement de vos données</li>
            <li>Droit à la portabilité de vos données</li>
            <li>Droit d'opposition au traitement</li>
          </ul>
        </section>

        {/* Contact */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            {siteConfig.contact.title}
          </h2>
          <p className="text-muted-foreground">
            Pour toute question concernant notre politique de confidentialité ou
            pour exercer vos droits, contactez-nous à{" "}
            <span className="text-primary">{siteConfig.contact.email}</span>
          </p>
        </section>
      </div>
    </div>
  );
}
