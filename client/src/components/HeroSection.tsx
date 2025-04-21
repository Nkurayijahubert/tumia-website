import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import dashboardImage from "../assets/1.jpg";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-b from-[#F6F1ED]/50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="inline-block px-4 py-2 bg-[#F9C846]/20 text-primary rounded-full text-sm font-semibold mb-6">
              Coming Soon
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2A2A2A] leading-tight mb-6">
              AI-Powered Financial <span className="text-primary">Empowerment</span> for African Startups
            </h1>
            <p className="text-lg md:text-xl text-[#767676] mb-8 max-w-xl mx-auto lg:mx-0">
              Build strong financial habits, achieve your growth goals, and become a scalable, investment-ready business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a href="#waitlist">
                <Button className="px-8 py-7 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-md text-center">
                  Join Our Waitlist
                </Button>
              </a>
              <a href="#how-it-works">
                <Button variant="outline" className="px-8 py-7 bg-white text-primary border border-primary font-medium rounded-lg hover:bg-primary/5 transition-all text-center">
                  Learn More
                </Button>
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#F9C846]/20 rounded-full filter blur-3xl opacity-70"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full filter blur-3xl opacity-70"></div>
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <img 
                src={dashboardImage} 
                alt="Tumia financial dashboard showing business metrics and growth charts" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
