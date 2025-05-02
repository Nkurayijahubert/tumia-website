import { useEffect } from "react";
import { useLocation, useSearch, Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Confirmation() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const email = params.get("email") || "your email";
  
  // For debugging
  console.log("Search params:", search);
  console.log("Email parameter:", email);
  const [location, setLocation] = useLocation();

  // If no email is provided, redirect to the home page
  useEffect(() => {
    if (email === "your email") {
      console.log("No email provided, but showing page with default text");
      // We're allowing the page to display with default text rather than redirecting
    }
  }, [email, setLocation]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-20 bg-[#F6F1ED]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center bg-white p-10 rounded-2xl shadow-lg"
          >
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-4">
              Thank You for Joining!
            </h1>
            
            <p className="text-lg text-[#767676] mb-6">
              We've successfully added <span className="font-medium text-primary">{email}</span> to our waitlist. We're excited to have you join us on this journey toward financial accountability and impact in Africa's innovation ecosystem.
            </p>
            
            <div className="bg-[#F9C846]/10 p-6 rounded-lg text-left mb-8">
              <h3 className="font-semibold text-[#2A2A2A] mb-2">What happens next?</h3>
              <ul className="space-y-2 text-[#767676]">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-primary">•</span>
                  <span>You'll receive a confirmation email shortly</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-primary">•</span>
                  <span>We'll keep you updated on our launch progress</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-primary">•</span>
                  <span>You'll get early access to our platform when we launch</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-primary">•</span>
                  <span>We'll share financial management resources for funded organizations</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/">
                <Button className="px-6 py-6 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-md text-center">
                  Return to Home
                </Button>
              </Link>
              <a href="https://x.com/usetumia" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="px-6 py-6 bg-white text-primary border border-primary font-medium rounded-lg hover:bg-primary/5 transition-all text-center">
                  Follow Us on Twitter
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}