import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "When will Tumia be available?",
    answer: "Tumia is currently in private beta with select partners. We're planning a phased rollout starting in Q3 2025. Join our waitlist to be among the first to gain access.",
  },
  {
    question: "Which countries does Tumia support?",
    answer: "At launch, Tumia will be available in Rwanda, Kenya, and Nigeria. We have plans to expand to other African countries shortly after. If you're interested in Tumia for a specific country, please let us know when joining the waitlist.",
  },
  {
    question: "How does Tumia integrate with existing financial services?",
    answer: "Tumia offers API integrations with major banking providers, accounting software, and payment platforms across Africa. Our solution complements your existing financial infrastructure while providing enhanced capabilities for spend management, impact tracking, and outcome-based reporting.",
  },
  {
    question: "How does Tumia help with funding accountability?",
    answer: "Tumia provides tools to link spending directly to outcomes, generate transparent reports for funders, and track impact metrics over time. This creates trust and accountability between funded organizations and their funding partners, leading to more sustainable relationships and improved funding outcomes.",
  },
  {
    question: "Is Tumia only for organizations that have received funding?",
    answer: "Tumia is designed for any organization in Africa's innovation ecosystem that receives and manages funding. This includes NGOs, social enterprises, research institutions, and startups. Our platform helps establish strong financial accountability and demonstrate impact to funding partners.",
  },
  {
    question: "How secure is Tumia for managing financial data?",
    answer: "Security is our top priority. Tumia employs bank-level encryption, multi-factor authentication, and regular security audits. We comply with international data protection standards and maintain strict policies to ensure your financial information remains secure.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-[#F9C846]/20 text-primary rounded-full text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-[#767676] text-lg">
            Get answers to common questions about Tumia.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 focus:outline-none bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <span className="font-medium">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-primary" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[#767676]">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
