import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageCircle, Calendar, Phone } from "lucide-react";

export default function RequestDemo() {
  return (
    <div className="font-sans text-neutral bg-white">
      <Header />
      <main className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#2A2A2A] mb-6">
              Request a Demo
            </h1>
            <p className="text-lg md:text-xl text-[#767676] max-w-2xl mx-auto">
              See Tumia in action! Book a personalized demo to learn how our platform can help you organize your wallet and collect contributions effectively.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#2A2A2A] mb-2">WhatsApp Demo</h3>
                <p className="text-[#767676]">
                  Get an instant demo via WhatsApp. Quick, convenient, and personalized.
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-[#4A4A4A]">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Immediate response during business hours
                </div>
                <div className="flex items-center text-sm text-[#4A4A4A]">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Screen sharing and live demo
                </div>
                <div className="flex items-center text-sm text-[#4A4A4A]">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Q&A session included
                </div>
              </div>
              
              <a 
                href="https://wa.me/250780947401?text=Hi%2C%20I%27d%20like%20to%20request%20a%20demo%20of%20Tumia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full px-6 py-4 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-md">
                  <MessageCircle className="mr-2" size={20} />
                  Chat on WhatsApp
                </Button>
              </a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#F9C846]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-[#F9C846]" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#2A2A2A] mb-2">Scheduled Demo</h3>
                <p className="text-[#767676]">
                  Book a dedicated time slot for a comprehensive demo session.
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-[#4A4A4A]">
                  <span className="w-2 h-2 bg-[#F9C846] rounded-full mr-3"></span>
                  30-45 minute dedicated session
                </div>
                <div className="flex items-center text-sm text-[#4A4A4A]">
                  <span className="w-2 h-2 bg-[#F9C846] rounded-full mr-3"></span>
                  Customized to your use case
                </div>
                <div className="flex items-center text-sm text-[#4A4A4A]">
                  <span className="w-2 h-2 bg-[#F9C846] rounded-full mr-3"></span>
                  Follow-up support included
                </div>
              </div>
              
              <a 
                href="https://calendly.com/hinia/demo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button 
                  variant="outline" 
                  className="w-full px-6 py-4 bg-white text-[#F9C846] border border-[#F9C846] font-medium rounded-lg hover:bg-[#F9C846]/5 transition-all"
                >
                  <Calendar className="mr-2" size={20} />
                  Schedule on Calendly
                </Button>
              </a>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12 p-8 bg-[#F6F1ED]/50 rounded-2xl"
          >
            <h4 className="text-xl font-semibold text-[#2A2A2A] mb-4">
              What You'll See in the Demo
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
              <div>
                <h5 className="font-semibold text-[#2A2A2A] mb-2">Platform Overview</h5>
                <ul className="text-[#4A4A4A] text-sm space-y-1">
                  <li>• Dashboard walkthrough</li>
                  <li>• Account setup process</li>
                  <li>• Navigation and features</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-[#2A2A2A] mb-2">Key Features</h5>
                <ul className="text-[#4A4A4A] text-sm space-y-1">
                  <li>• Contribution collection</li>
                  <li>• Fund reconciliation</li>
                  <li>• Reporting and analytics</li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mt-8">
            <p className="text-[#767676]">
              Questions? Contact us at{" "}
              <a href="mailto:team@tumia.app" className="text-primary hover:underline">
                team@tumia.app
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}