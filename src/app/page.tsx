import FAQ from "@/components/home/faq";
import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/howitworks";
import Pricing from "@/components/home/pricing";
import Testimonials from "@/components/home/testimonials";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <Header />

        <main className="relative flex-1 space-y-24">
          {/* Grille de fond avec dégradé */}
          <div className="bg-grid-pattern fixed inset-0 opacity-100">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          </div>

          {/* Hero Section */}
          <Hero />

          {/* Features Section avec animation */}
          <Features />

          {/* Comment ça marche Section */}
          <HowItWorks />

          {/* Pricing Section avec animation */}
          <Pricing />

          {/* Testimonials Section avec animation */}
          <Testimonials />

          {/* Statistiques Section */}
          {/* <Stats /> */}

          {/* Questions Fréquentes Section */}
          <FAQ />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
