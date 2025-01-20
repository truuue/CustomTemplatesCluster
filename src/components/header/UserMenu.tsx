"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, Trash2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const userInitials = session.user.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-input bg-background px-2 py-[0.15rem] text-foreground outline-none ring-primary transition-colors hover:bg-foreground hover:text-background focus:ring-2">
        <span className="text-sm font-medium">{session.user.name}</span>
        <Avatar className="size-8">
          <AvatarImage
            src={session.user.image || ""}
            alt={session.user.name || ""}
          />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="mt-2 w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{session.user.name}</p>
            <p className="text-xs text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />

        <Link href="/templates">
          <DropdownMenuItem>
            <Settings className="mr-2 size-4" />
            <span>Mes Templates</span>
          </DropdownMenuItem>
        </Link>

        <Link href="/delete-account">
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <Trash2 className="mr-2 size-4" />
            <span>Supprimer mon compte</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 size-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
