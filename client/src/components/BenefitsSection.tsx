import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const benefitsData = {
  startups: {
    title: "For Founders",
    items: [
      "Build lasting financial discipline and readiness for growth",
      "Access real-time tools and AI guidance for smarter spending",
      "Dynamic runway calculator that updates with each transaction",
      "Easily demonstrate progress and impact to attract further investment",
    ],
    svgImage: (
      <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="250" fill="#F6F1ED" opacity="0.3" />
        
        {/* Background elements */}
        <circle cx="300" cy="50" r="30" fill="#F9C846" opacity="0.2" />
        <circle cx="50" cy="200" r="40" fill="#005B68" opacity="0.1" />
        
        {/* Desk/Table */}
        <rect x="50" y="150" width="300" height="10" fill="#2A2A2A" />
        <rect x="60" y="160" width="10" height="60" fill="#2A2A2A" />
        <rect x="330" y="160" width="10" height="60" fill="#2A2A2A" />
        
        {/* Laptop */}
        <rect x="120" y="100" width="160" height="5" rx="2" fill="#2A2A2A" />
        <rect x="120" y="105" width="160" height="100" rx="5" fill="#2A2A2A" />
        <rect x="125" y="110" width="150" height="90" rx="2" fill="#F6F1ED" />
        
        {/* Chart on laptop screen */}
        <path d="M140 170 L140 130 L165 150 L190 135 L215 145 L240 125 L265 140" 
              stroke="#005B68" strokeWidth="2" fill="none" />
        <circle cx="140" cy="130" r="3" fill="#005B68" />
        <circle cx="165" cy="150" r="3" fill="#005B68" />
        <circle cx="190" cy="135" r="3" fill="#005B68" />
        <circle cx="215" cy="145" r="3" fill="#005B68" />
        <circle cx="240" cy="125" r="3" fill="#005B68" />
        <circle cx="265" cy="140" r="3" fill="#005B68" />
        
        {/* Person 1 */}
        <circle cx="90" cy="80" r="20" fill="#2A2A2A" />
        <rect x="75" y="100" width="30" height="40" rx="5" fill="#005B68" />
        
        {/* Person 2 */}
        <circle cx="310" cy="80" r="20" fill="#2A2A2A" />
        <rect x="295" y="100" width="30" height="40" rx="5" fill="#005B68" />
        
        {/* Light bulb - idea */}
        <circle cx="200" cy="40" r="15" fill="#F9C846" />
        <path d="M200 55 L200 70" stroke="#2A2A2A" strokeWidth="2" />
        <path d="M195 60 L205 60" stroke="#2A2A2A" strokeWidth="2" />
      </svg>
    ),
    alt: "African startup founders discussing business strategy",
  },
  investors: {
    title: "For Investors & Accelerators",
    items: [
      "Gain actionable insights and transparent progress tracking",
      "Ensure that support translates into real business growth",
      "Release funds in tranches tied to specific milestones",
      "Foster a new generation of scalable, fundable businesses",
    ],
    svgImage: (
      <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="250" fill="#F6F1ED" opacity="0.3" />
        
        {/* Background elements */}
        <circle cx="50" cy="50" r="30" fill="#F9C846" opacity="0.2" />
        <circle cx="350" cy="200" r="40" fill="#005B68" opacity="0.1" />
        
        {/* Large display screen */}
        <rect x="50" y="40" width="300" height="170" rx="5" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
        
        {/* Dashboard header */}
        <rect x="60" y="50" width="280" height="30" rx="3" fill="#005B68" />
        <rect x="70" y="60" width="100" height="10" rx="2" fill="white" opacity="0.7" />
        <circle cx="320" cy="65" r="8" fill="white" opacity="0.7" />
        
        {/* Dashboard panels */}
        <rect x="60" y="90" width="135" height="110" rx="3" fill="#FFFFFF" stroke="#E0E0E0" />
        <rect x="205" y="90" width="135" height="110" rx="3" fill="#FFFFFF" stroke="#E0E0E0" />
        
        {/* Charts and graphs */}
        <rect x="70" y="100" width="80" height="10" rx="2" fill="#2A2A2A" opacity="0.7" />
        <rect x="215" y="100" width="80" height="10" rx="2" fill="#2A2A2A" opacity="0.7" />
        
        {/* Bar chart */}
        <rect x="70" y="120" width="15" height="70" rx="2" fill="#005B68" opacity="0.8" />
        <rect x="95" y="140" width="15" height="50" rx="2" fill="#005B68" opacity="0.6" />
        <rect x="120" y="130" width="15" height="60" rx="2" fill="#005B68" opacity="0.7" />
        <rect x="145" y="160" width="15" height="30" rx="2" fill="#005B68" opacity="0.5" />
        
        {/* Progress circles */}
        <circle cx="240" cy="145" r="25" fill="none" stroke="#E0E0E0" strokeWidth="5" />
        <path d="M240 120 A25 25 0 1 1 215 145" stroke="#005B68" strokeWidth="5" fill="none" />
        <text x="233" y="150" fontFamily="Arial" fontSize="12" fill="#2A2A2A">75%</text>
        
        <circle cx="300" cy="145" r="25" fill="none" stroke="#E0E0E0" strokeWidth="5" />
        <path d="M300 120 A25 25 0 0 1 325 145" stroke="#F9C846" strokeWidth="5" fill="none" />
        <text x="293" y="150" fontFamily="Arial" fontSize="12" fill="#2A2A2A">25%</text>
        
        {/* Table */}
        <rect x="100" y="220" width="200" height="5" fill="#2A2A2A" />
        <rect x="195" y="225" width="10" height="25" fill="#2A2A2A" />
      </svg>
    ),
    alt: "Investors reviewing startup performance analytics",
  },
  ecosystem: {
    title: "For the Ecosystem",
    items: [
      "Raise the standard of financial empowerment among entrepreneurs",
      "Bridge the gap between funding and sustainable growth",
      "Increase success rates of early-stage ventures",
      "Drive inclusive economic development across Africa",
    ],
    svgImage: (
      <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="250" fill="#F6F1ED" opacity="0.3" />
        
        {/* Background elements */}
        <circle cx="350" cy="50" r="30" fill="#F9C846" opacity="0.2" />
        <circle cx="50" cy="200" r="40" fill="#005B68" opacity="0.1" />
        
        {/* Africa map stylized */}
        <path d="M190 40 Q220 35, 240 55 Q260 75, 270 100 Q280 130, 270 160 Q260 190, 230 205 Q200 220, 170 200 Q145 180, 140 145 Q135 110, 150 80 Q165 50, 190 40" 
              fill="#005B68" opacity="0.2" stroke="#005B68" strokeWidth="2" />
        
        {/* Connection points as cities/hubs */}
        <circle cx="200" cy="70" r="8" fill="#F9C846" />
        <circle cx="250" cy="90" r="8" fill="#F9C846" />
        <circle cx="230" cy="150" r="8" fill="#F9C846" />
        <circle cx="180" cy="180" r="8" fill="#F9C846" />
        <circle cx="150" cy="120" r="8" fill="#F9C846" />
        
        {/* Connection lines */}
        <line x1="200" y1="70" x2="250" y2="90" stroke="#2A2A2A" strokeWidth="1" strokeDasharray="4" />
        <line x1="250" y1="90" x2="230" y2="150" stroke="#2A2A2A" strokeWidth="1" strokeDasharray="4" />
        <line x1="230" y1="150" x2="180" y2="180" stroke="#2A2A2A" strokeWidth="1" strokeDasharray="4" />
        <line x1="180" y1="180" x2="150" y2="120" stroke="#2A2A2A" strokeWidth="1" strokeDasharray="4" />
        <line x1="150" y1="120" x2="200" y2="70" stroke="#2A2A2A" strokeWidth="1" strokeDasharray="4" />
        
        {/* Growth indicators */}
        <path d="M310 160 L310 120 L330 110 L350 90" stroke="#005B68" strokeWidth="2" fill="none" />
        <circle cx="310" cy="120" r="3" fill="#005B68" />
        <circle cx="330" cy="110" r="3" fill="#005B68" />
        <circle cx="350" cy="90" r="3" fill="#005B68" />
        
        <path d="M90 160 L90 130 L70 110 L50 100" stroke="#005B68" strokeWidth="2" fill="none" />
        <circle cx="90" cy="130" r="3" fill="#005B68" />
        <circle cx="70" cy="110" r="3" fill="#005B68" />
        <circle cx="50" cy="100" r="3" fill="#005B68" />
      </svg>
    ),
    alt: "African innovation hub with entrepreneurs collaborating",
  },
};

export default function BenefitsSection() {
  const [activeTab, setActiveTab] = useState("startups");

  return (
    <section id="benefits" className="py-20 bg-[#F6F1ED]/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-[#F9C846]/20 text-primary rounded-full text-sm font-semibold mb-4">
            Benefits
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-6">
            Value for every stakeholder
          </h2>
          <p className="text-[#767676] text-lg">
            Tumia creates value for startups, investors, accelerators, and the entire ecosystem.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex w-full rounded-none border-b border-gray-200">
              <TabsTrigger 
                value="startups" 
                className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                For Startups
              </TabsTrigger>
              <TabsTrigger 
                value="investors" 
                className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                For Investors & Accelerators
              </TabsTrigger>
              <TabsTrigger 
                value="ecosystem" 
                className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                For the Ecosystem
              </TabsTrigger>
            </TabsList>
            
            {Object.entries(benefitsData).map(([key, data]) => (
              <TabsContent key={key} value={key} className="p-6 md:p-10 focus:outline-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-[#2A2A2A]">{data.title}</h3>
                    <ul className="space-y-4">
                      {data.items.map((item, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <span className="mr-3 text-primary mt-1">
                            <CheckCircle size={16} />
                          </span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-64 md:h-80 rounded-xl overflow-hidden"
                  >
                    <div className="w-full h-full bg-white p-4">
                      {data.svgImage}
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
