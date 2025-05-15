import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import startupsImage from "../assets/2.jpg";
import investorsImage from "../assets/3.jpg";
import ecosystemImage from "../assets/5.jpg";

const benefitsData = {
  startups: {
    title: "For Churches & Religious Groups",
    items: [
      "Separate tithes, offerings, and special project funds in one account",
      "Track donations in real-time and generate transparent reports",
      "Build trust with congregants through purpose-based fund tracking",
      "Manage multiple ministry budgets with ease and accountability",
    ],
    image: startupsImage,
    alt: "Religious leaders managing church funds for different purposes",
  },
  investors: {
    title: "For Community Groups & Clubs",
    items: [
      "Manage dues, event collections, and project funds from one account",
      "Track every contribution by its specific purpose",
      "Instantly see how much has been collected for each community need",
      "Build transparency and trust with community members",
    ],
    image: investorsImage,
    alt: "Community groups organizing finances for multiple projects",
  },
  ecosystem: {
    title: "For Individuals & Families",
    items: [
      "Coming soon: Create virtual sub-wallets for savings, bills, and family support",
      "Coming soon: Share specific sub-wallets with customizable permissions",
      "Coming soon: Set budgets and track spending for each purpose",
      "Coming soon: Get instant balance updates and spending alerts for each sub-wallet",
    ],
    image: ecosystemImage,
    alt: "Family members collaboratively managing finances for different purposes",
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
            Solutions for Everyone
          </h2>
          <p className="text-[#767676] text-lg">
            Tumia transforms how you interact with your money, bringing order, transparency, 
            and control to your finances for every purpose and need.
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
                Churches & Religious Groups
              </TabsTrigger>
              <TabsTrigger
                value="investors"
                className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Community Groups
              </TabsTrigger>
              <TabsTrigger
                value="ecosystem"
                className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Individuals & Families
              </TabsTrigger>
            </TabsList>

            {Object.entries(benefitsData).map(([key, data]) => (
              <TabsContent
                key={key}
                value={key}
                className="p-6 md:p-10 focus:outline-none"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-[#2A2A2A]">
                      {data.title}
                    </h3>
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
                      className="w-full h-full object-contain"
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
