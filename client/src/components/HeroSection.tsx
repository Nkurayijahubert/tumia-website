import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
              <svg
                viewBox="0 0 600 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
              >
                {/* Background elements */}
                <rect width="600" height="400" fill="#F6F1ED" opacity="0.3" />
                <circle cx="500" cy="100" r="50" fill="#F9C846" opacity="0.2" />
                <circle cx="100" cy="300" r="70" fill="#005B68" opacity="0.1" />
                
                {/* Dashboard header */}
                <rect x="50" y="40" width="500" height="60" rx="10" fill="#005B68" />
                <text x="80" y="75" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="white">Tumia Financial Dashboard</text>
                <circle cx="520" cy="70" r="15" fill="white" opacity="0.8" />
                
                {/* Main dashboard content */}
                <rect x="50" y="120" width="320" height="240" rx="10" fill="white" stroke="#E0E0E0" />
                <text x="70" y="150" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#2A2A2A">Revenue Growth</text>
                
                {/* Chart */}
                <path d="M70 300 L70 200 L110 260 L150 230 L190 250 L230 180 L270 210 L310 170" 
                      stroke="#005B68" strokeWidth="3" fill="none" />
                <path d="M70 300 L310 300" stroke="#E0E0E0" strokeWidth="1" />
                <path d="M70 300 L70 170" stroke="#E0E0E0" strokeWidth="1" />
                
                {/* Chart points */}
                <circle cx="70" cy="200" r="4" fill="#005B68" />
                <circle cx="110" cy="260" r="4" fill="#005B68" />
                <circle cx="150" cy="230" r="4" fill="#005B68" />
                <circle cx="190" cy="250" r="4" fill="#005B68" />
                <circle cx="230" cy="180" r="4" fill="#005B68" />
                <circle cx="270" cy="210" r="4" fill="#005B68" />
                <circle cx="310" cy="170" r="4" fill="#005B68" />
                
                {/* AI insights panel */}
                <rect x="390" y="120" width="160" height="240" rx="10" fill="white" stroke="#E0E0E0" />
                <text x="410" y="150" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="#2A2A2A">AI Insights</text>
                
                {/* AI recommendation items */}
                <rect x="410" y="170" width="120" height="30" rx="5" fill="#F6F1ED" />
                <text x="420" y="190" fontFamily="Arial" fontSize="10" fill="#2A2A2A">Optimize cash flow</text>
                
                <rect x="410" y="210" width="120" height="30" rx="5" fill="#F6F1ED" />
                <text x="420" y="230" fontFamily="Arial" fontSize="10" fill="#2A2A2A">Reduce expenses</text>
                
                <rect x="410" y="250" width="120" height="30" rx="5" fill="#F6F1ED" />
                <text x="420" y="270" fontFamily="Arial" fontSize="10" fill="#2A2A2A">Investment opportunity</text>
                
                {/* Sparklines */}
                <path d="M410 320 L430 310 L450 315 L470 300 L490 320 L510 305 L530 310" 
                      stroke="#F9C846" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
