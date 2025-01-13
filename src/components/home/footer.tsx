import { Calendar } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-24 w-full border-t bg-background/50 py-8 backdrop-blur sm:py-12">
      <div className="container px-4 sm:px-6">
        {/* Logo et description */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Calendar className="size-6 text-primary" />
              <span className="text-xl font-bold">Showcaser</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Créez des landing pages qui convertissent, sans code. La
              plateforme tout-en-un pour créer, personnaliser et publier des
              pages web professionnelles.
            </p>
          </div>

          {/* Colonnes de liens */}
          <div className="col-span-1">
            <h4 className="mb-3 text-sm font-semibold sm:mb-4">Produit</h4>
            <ul className="space-y-3 text-sm text-muted-foreground transition-colors">
              <li>
                <Link href="#" className="hover:text-primary">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Templates
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="mb-3 text-sm font-semibold sm:mb-4">Ressources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground transition-colors">
              <li>
                <Link href="#" className="hover:text-primary">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4 className="mb-3 text-sm font-semibold sm:mb-4">Entreprise</h4>
            <ul className="space-y-3 text-sm text-muted-foreground transition-colors">
              <li>
                <Link href="#" className="hover:text-primary">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur et copyright */}
        <div className="mt-8 border-t pt-6 sm:mt-12 sm:pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground sm:flex-row">
            <p>© 2024 Showcaser. Tous droits réservés.</p>
            <div className="flex flex-wrap justify-center gap-4 transition-colors">
              <Link href="#" className="hover:text-primary">
                Confidentialité
              </Link>
              <Link href="#" className="hover:text-primary">
                CGU
              </Link>
              <Link href="#" className="hover:text-primary">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
