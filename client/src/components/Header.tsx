import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold">
              <span className="text-primary">Tum</span>
              <span className="text-[#F9C846]">ia</span>
            </a>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-neutral hover:text-primary transition-colors font-medium">
              Features
            </a>
            <a href="#benefits" className="text-neutral hover:text-primary transition-colors font-medium">
              Benefits
            </a>
            <a href="#how-it-works" className="text-neutral hover:text-primary transition-colors font-medium">
              How It Works
            </a>
            <a href="#contact" className="text-neutral hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </nav>
          
          <div className="hidden md:block">
            <a href="#waitlist">
              <Button className="bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-md">
                Join Waitlist
              </Button>
            </a>
          </div>
          
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-neutral focus:outline-none">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a 
                href="#features" 
                className="block text-neutral hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#benefits" 
                className="block text-neutral hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Benefits
              </a>
              <a 
                href="#how-it-works" 
                className="block text-neutral hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#contact" 
                className="block text-neutral hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="#waitlist"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-md">
                  Join Waitlist
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
