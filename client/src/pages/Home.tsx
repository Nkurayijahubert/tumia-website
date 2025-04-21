import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialSection from "@/components/TestimonialSection";
import WaitlistSection from "@/components/WaitlistSection";
import StaticWaitlistSection from "@/components/StaticWaitlistSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  // Check if we're in static mode (GitHub Pages deployment)
  // This will be true when running with vite.github.config.ts
  const isStaticMode = import.meta.env.VITE_STATIC_MODE === 'true' || 
                       window.location.hostname.includes('github.io');
  
  return (
    <div className="font-sans text-neutral bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <HowItWorksSection />
        <TestimonialSection />
        {isStaticMode ? <StaticWaitlistSection /> : <WaitlistSection />}
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
