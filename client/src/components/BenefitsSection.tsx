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
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
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
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
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
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
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
                    <img 
                      src={data.image} 
                      alt={data.alt} 
                      className="w-full h-full object-cover"
                    />
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
