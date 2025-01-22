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
import { useEffect } from "react";

export default function Home() {
  const { toast } = useToast();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && !cookies.hasShownLoginToast()) {
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
      });
      cookies.setLoginToast();
    }
  }, [status, toast]);

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

          {/* Statistiques Section */}
          {/* <Stats /> */}

          {/* Questions Fréquentes Section */}
          <FAQ />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
