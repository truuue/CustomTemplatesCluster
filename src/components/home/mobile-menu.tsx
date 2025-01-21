"use client";

import { UserMenu } from "@/components/header/UserMenu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function MobileMenu() {
  const { data: session } = useSession();

  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[85vw] max-w-[400px] p-0">
          <div className="flex h-full flex-col">
            <SheetHeader className="border-b p-4">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-1 flex-col justify-between overflow-y-auto">
              <nav className="flex flex-col items-center space-y-6 px-4 py-4">
                <Link
                  href="#features"
                  className="text-base font-medium hover:text-primary"
                >
                  Fonctionnalités
                </Link>
                <Link
                  href="#pricing"
                  className="text-base font-medium hover:text-primary"
                >
                  Tarifs
                </Link>
                <Link
                  href="#testimonials"
                  className="text-base font-medium hover:text-primary"
                >
                  Témoignages
                </Link>
              </nav>
              <div className="mt-auto border-t px-4 py-4">
                {session?.user ? (
                  <div className="flex justify-center">
                    <UserMenu side="top" align="center" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link href="/login" className="w-full">
                      <Button variant="ghost" className="w-full">
                        Connexion
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
