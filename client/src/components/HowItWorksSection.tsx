import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Onboarding & Goal Setting",
    description: "Amina joins Tumia after being selected for an accelerator program. She sets clear goals: build 100 prototype solar kits, pilot in 3 villages, and train 10 local technicians. Tumia's AI suggests realistic budget allocations based on similar startups' data.",
  },
  {
    number: 2,
    title: "Smart Spend Management",
    description: "Amina receives funds in her Tumia wallet and uses virtual cards to pay suppliers, technicians, and partners. Every payment is tracked in real-time and categorized, helping her make informed budget adjustments.",
  },
  {
    number: 3,
    title: "Progress & Impact Tracking",
    description: "As the pilot unfolds, Amina logs outcomes in Tumia. The platform auto-generates reports linking her spending to results, benchmarking progress against industry standards.",
  },
  {
    number: 4,
    title: "Ready for Scale",
    description: "With a clear track record of disciplined spending, transparent reporting, and tangible results, Amina's GreenTech Rwanda is well-positioned to attract new investors and scale across the region.",
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
            Your journey to financial empowerment
          </h2>
          <p className="text-[#767676] text-lg">
            See how Tumia works through the story of Amina, founder of GreenTech Rwanda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              alt="Modern financial dashboard showing business metrics" 
              className="w-full h-auto rounded-2xl shadow-lg"
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
