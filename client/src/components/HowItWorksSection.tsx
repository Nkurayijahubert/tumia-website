import { motion } from "framer-motion";
import howItWorksImage from "../assets/4.jpg";

const steps = [
  {
    number: 1,
    title: "Create Purpose-Based Channels",
    description: "Pastor James of Faith Community Church creates different channels in Tumia for tithes, building fund, missions, and youth ministry. Each contribution can now be easily tagged and tracked according to its intended purpose.",
  },
  {
    number: 2,
    title: "Collect & Allocate Funds",
    description: "As church members contribute, each donation is automatically categorized in real-time based on its purpose. Pastor James can instantly see how much has been collected for each need, without mixing funds or opening multiple accounts.",
  },
  {
    number: 3,
    title: "Track & Report Transparently",
    description: "Tumia generates clear reports showing how much was collected for each purpose and how the funds were utilized. This transparency builds trust with church members who can see exactly how their contributions are making an impact.",
  },
  {
    number: 4,
    title: "Plan Future Initiatives",
    description: "With clear insights into financial flows for each purpose, Pastor James can make better decisions about future initiatives, set realistic budgets based on historical patterns, and build financial discipline across all church activities.",
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
            Feature 1: Organize Money for Every Cause
          </h2>
          <p className="text-[#767676] text-lg">
            See how Pastor James uses Tumia to manage church finances with purpose-based tracking
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
              alt="Church leaders organizing finances with purpose-based tracking" 
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
