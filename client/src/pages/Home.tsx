import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
// Removing Benefits section and How It Works section as requested
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";
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
        <TestimonialSection />
        <ContactSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
