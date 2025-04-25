import { motion } from "framer-motion";
import howItWorksImage from "../assets/4.jpg";

const steps = [
  {
    number: 1,
    title: "Onboarding & Goal Setting",
    description: "Amina joins Tumia after her organization receives a grant from a foundation. She sets clear outcome goals: implement sustainable energy solutions in 3 communities, train 10 local technicians, and document environmental impact. Tumia suggests budget allocations tied to these outcomes.",
  },
  {
    number: 2,
    title: "Smart Spend Management",
    description: "Amina's organization receives funds in their Tumia wallet and uses virtual cards to pay suppliers, technicians, and partners. Every payment is tracked in real-time, categorized, and linked to specific outcome goals, ensuring transparent fund utilization.",
  },
  {
    number: 3,
    title: "Progress & Impact Tracking",
    description: "As the project unfolds, Amina logs outcomes and impact metrics in Tumia. The platform auto-generates reports linking spending to results, creating a clear line of sight between funding and real-world impact for their foundation partner.",
  },
  {
    number: 4,
    title: "Accountability & Continued Support",
    description: "With a clear track record of transparent spending, outcome-based reporting, and documented impact, Amina's Impact Innovation Network builds trust with their funding partners and secures continued support for expanding their initiative.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-6">
            Your journey to financial accountability and impact
          </h2>
          <p className="text-[#767676] text-lg">
            See how Tumia works through the story of Amina, Executive Director of Impact Innovation Network.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            style={{ maxHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img 
              src={howItWorksImage} 
              alt="Investment leads to growth - Two professionals shaking hands" 
              className="w-full object-contain"
              style={{ maxHeight: '100%' }}
            />
          </motion.div>
          
          <div className="space-y-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex"
              >
                <div className="flex-shrink-0 mr-6">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-[#767676]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
