import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialSection from "@/components/TestimonialSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import StaticWaitlistSection from "@/components/StaticWaitlistSection";

/**
 * Static version of the Home page that uses StaticWaitlistSection
 * Use this for environments where the backend API isn't available
 */
export default function StaticHome() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialSection />
      <StaticWaitlistSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}