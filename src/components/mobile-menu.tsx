"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block md:hidden">
      <button
        className="mr-4 flex flex-col space-y-1.5 p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <span
          className={cn(
            "h-0.5 w-6 bg-foreground transition-transform duration-200",
            isOpen && "translate-y-2 rotate-45"
          )}
        />
        <span
          className={cn(
            "h-0.5 w-6 bg-foreground transition-opacity duration-200",
            isOpen && "opacity-0"
          )}
        />
        <span
          className={cn(
            "h-0.5 w-6 bg-foreground transition-transform duration-200",
            isOpen && "-translate-y-2 -rotate-45"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-14 w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="flex flex-col space-y-4">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Fonctionnalités
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Prix
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Témoignages
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
