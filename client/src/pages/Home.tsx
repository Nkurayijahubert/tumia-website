import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrandsSection from "@/components/BrandsSection";
import FeaturesSection from "@/components/FeaturesSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
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
        <BrandsSection />
        <FeaturesSection />
        <BenefitsSection />
        <HowItWorksSection />
        <TestimonialSection />
        <WaitlistSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
