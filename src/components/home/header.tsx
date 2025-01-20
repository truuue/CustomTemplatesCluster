"use client";

import { UserMenu } from "@/components/header/UserMenu";
import { MobileMenu } from "@/components/home/mobile-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/useScroll";
import { cn, scrollToSection } from "@/lib/utils";
import { Brush } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const scrolled = useScroll(50);
  const { data: session, status } = useSession();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  // Fonction pour rendre le bouton d'authentification
  const renderAuthButton = () => {
    if (status === "loading") {
      return (
        <div className="h-9 w-[100px] animate-pulse rounded-md bg-muted" />
      );
    }

    if (session?.user) {
      return <UserMenu />;
    }

    return (
      <Link href="/login">
        <Button>Connexion</Button>
      </Link>
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-gray-100/10 bg-background/60 backdrop-blur-lg"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Brush className="size-6 text-primary" />
            <span className="text-lg font-semibold">Showcaser</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, "features")}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Fonctionnalités
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, "pricing")}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Tarifs
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleNavClick(e, "testimonials")}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Témoignages
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="hidden items-center gap-4 md:flex">
            {renderAuthButton()}
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
