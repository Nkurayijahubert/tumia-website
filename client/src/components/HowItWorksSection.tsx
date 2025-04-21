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
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <svg
              viewBox="0 0 600 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              {/* Background */}
              <rect width="600" height="400" fill="#F6F1ED" opacity="0.2" />
              
              {/* Woman (Amina) */}
              <circle cx="150" cy="120" r="40" fill="#2A2A2A" />
              <rect x="120" y="160" width="60" height="80" rx="10" fill="#005B68" />
              
              {/* Solar panels */}
              <rect x="300" y="80" width="60" height="40" rx="5" fill="#2A2A2A" />
              <rect x="310" y="90" width="10" height="10" fill="#F9C846" />
              <rect x="330" y="90" width="10" height="10" fill="#F9C846" />
              <rect x="310" y="110" width="10" height="10" fill="#F9C846" />
              <rect x="330" y="110" width="10" height="10" fill="#F9C846" />
              
              <rect x="380" y="80" width="60" height="40" rx="5" fill="#2A2A2A" />
              <rect x="390" y="90" width="10" height="10" fill="#F9C846" />
              <rect x="410" y="90" width="10" height="10" fill="#F9C846" />
              <rect x="390" y="110" width="10" height="10" fill="#F9C846" />
              <rect x="410" y="110" width="10" height="10" fill="#F9C846" />
              
              <rect x="460" y="80" width="60" height="40" rx="5" fill="#2A2A2A" />
              <rect x="470" y="90" width="10" height="10" fill="#F9C846" />
              <rect x="490" y="90" width="10" height="10" fill="#F9C846" />
              <rect x="470" y="110" width="10" height="10" fill="#F9C846" />
              <rect x="490" y="110" width="10" height="10" fill="#F9C846" />
              
              {/* Houses/villages */}
              <path d="M300 280 L330 250 L360 280 Z" fill="#2A2A2A" />
              <rect x="310" y="280" width="40" height="30" fill="#2A2A2A" />
              <rect x="330" y="290" width="10" height="20" fill="#F6F1ED" />
              
              <path d="M380 280 L410 250 L440 280 Z" fill="#2A2A2A" />
              <rect x="390" y="280" width="40" height="30" fill="#2A2A2A" />
              <rect x="410" y="290" width="10" height="20" fill="#F6F1ED" />
              
              <path d="M460 280 L490 250 L520 280 Z" fill="#2A2A2A" />
              <rect x="470" y="280" width="40" height="30" fill="#2A2A2A" />
              <rect x="490" y="290" width="10" height="20" fill="#F6F1ED" />
              
              {/* Tumia mobile device */}
              <rect x="80" y="220" width="100" height="160" rx="10" fill="#FFFFFF" stroke="#2A2A2A" strokeWidth="3" />
              <rect x="90" y="230" width="80" height="15" rx="3" fill="#005B68" />
              <text x="95" y="242" fontFamily="Arial" fontSize="10" fill="white">Tumia</text>
              
              {/* App UI Elements */}
              <rect x="90" y="255" width="80" height="10" rx="2" fill="#E0E0E0" />
              <rect x="90" y="275" width="40" height="40" rx="5" fill="#F9C846" opacity="0.7" />
              <rect x="140" y="275" width="30" height="40" rx="5" fill="#005B68" opacity="0.7" />
              
              <rect x="90" y="325" width="80" height="10" rx="2" fill="#E0E0E0" />
              <rect x="90" y="345" width="80" height="20" rx="5" fill="#005B68" />
              <text x="115" y="360" fontFamily="Arial" fontSize="10" fill="white">Track</text>
              
              {/* Connecting lines */}
              <path d="M170 180 C230 160, 280 220, 310 180" stroke="#005B68" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M170 200 C280 240, 350 200, 380 240" stroke="#005B68" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M170 220 C300 300, 400 260, 450 260" stroke="#005B68" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
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
