"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="relative mx-auto mb-8 w-full max-w-[500px]">
          <Image
            src="/images/404.svg"
            alt="Illustration 404"
            width={500}
            height={300}
            priority
            className="dark:invert"
          />
        </div>
        <h1 className="mb-4 text-2xl font-semibold">Page non trouvée</h1>
        <p className="mb-8 text-muted-foreground">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été
          déplacée.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="mr-2 size-4" />
            Retour
          </Button>
          <Button asChild>
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
