import FAQ from "@/components/home/faq";
import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/howitworks";
import Pricing from "@/components/home/pricing";
import Testimonials from "@/components/home/testimonials";
import BackgroundGrid from "@/components/ui/background-grid";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <Header />

        <main className="relative flex-1">
          <BackgroundGrid />

          <div className="z-10 space-y-12">
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
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
