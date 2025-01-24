"use client";

import FAQ from "@/components/home/faq";
import Features from "@/components/home/features";
import FeaturesMobile from "@/components/home/features-mobile";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/howitworks";
import HowItWorksMobile from "@/components/home/howitworks-mobile";
import Pricing from "@/components/home/pricing";
import Testimonials from "@/components/home/testimonials";
import BackgroundGrid from "@/components/ui/background-grid";
import { useToast } from "@/hooks/use-toast";
import { cookies } from "@/lib/cookies";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

export default function Home() {
  const { toast } = useToast();
  const { status, data: session } = useSession();
  const hasTriedLinking = useRef(false);

  useEffect(() => {
    const linkTemplates = async () => {
      // Vérifier si la session est authentifiée et si nous n'avons pas déjà essayé de lier les templates
      if (
        status === "authenticated" &&
        session?.user?.id &&
        !hasTriedLinking.current
      ) {
        hasTriedLinking.current = true;
        const sessionId = localStorage.getItem("temp_session_id");

        if (sessionId) {
          try {
            const response = await fetch("/api/templates/link", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ sessionId }),
            });

            const data = await response.json();
            if (response.ok && data.templatesLinked > 0) {
              toast({
                title: "Templates liés avec succès",
                description: `${data.templatesLinked} template(s) ont été liés à votre compte.`,
              });
              // Supprimer l'ID de session après une liaison réussie
              localStorage.removeItem("temp_session_id");
            }
          } catch (error) {
            console.error("Erreur lors de la liaison des templates:", error);
          }
        }

        if (!cookies.hasShownLoginToast()) {
          toast({
            title: "Connexion réussie",
            description: "Vous êtes maintenant connecté",
          });
          cookies.setLoginToast();
        }
      }
    };

    linkTemplates();
  }, [status, session, toast]);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Header */}
      <Header />

      <main className="relative flex-1 pt-[64px] lg:pt-0">
        <BackgroundGrid />

        <div className="z-10 space-y-12">
          {/* Hero Section */}
          <Hero />

          {/* Features Section avec animation */}
          <Features />
          <FeaturesMobile />

          {/* Comment ça marche Section */}
          <HowItWorks />
          <HowItWorksMobile />

          {/* Pricing Section avec animation */}
          <Pricing />

          {/* Testimonials Section avec animation */}
          <Testimonials />

          {/* Questions Fréquentes Section */}
          <FAQ />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
