import FAQ from "@/components/home/faq";
import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/howitworks";
import Pricing from "@/components/home/pricing";
import Stats from "@/components/home/stats";
import Testimonials from "@/components/home/testimonials";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <Header />

        <main className="flex-1 space-y-24">
          {/* Hero Section */}
          <Hero />

          {/* Comment ça marche Section */}
          <HowItWorks />

          {/* Features Section avec animation */}
          <Features />

          {/* Pricing Section avec animation */}
          <Pricing />

          {/* Testimonials Section avec animation */}
          <Testimonials />

          {/* Statistiques Section */}
          <Stats />

          {/* Questions Fréquentes Section */}
          <FAQ />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
