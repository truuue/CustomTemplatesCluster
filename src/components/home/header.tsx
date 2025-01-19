"use client";

import { MobileMenu } from "@/components/mobile-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/useScroll";
import { cn, scrollToSection } from "@/lib/utils";
import { Brush } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const scrolled = useScroll(50);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    scrollToSection(sectionId);
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
            <Button variant="ghost" size="sm">
              Se connecter
            </Button>
            <Button size="sm">S'inscrire</Button>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
