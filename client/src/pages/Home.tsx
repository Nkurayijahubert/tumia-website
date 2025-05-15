import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import BenefitsSection from "@/components/BenefitsSection";
// Removing How It Works section as requested
import TestimonialSection from "@/components/TestimonialSection";
import WaitlistSection from "@/components/WaitlistSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans text-neutral bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <TestimonialSection />
        <WaitlistSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
