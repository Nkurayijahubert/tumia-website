import { Target, CreditCard, Brain, LineChart, CalendarCheck, Coins } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Target className="text-2xl text-primary" />,
    title: "Goal Setting & Budgeting",
    description: "Set clear business goals and allocate budgets for each funding stage with AI-suggested budget allocations.",
  },
  {
    icon: <CreditCard className="text-2xl text-primary" />,
    title: "Smart Spend Management",
    description: "Manage spending efficiently through a dedicated wallet and virtual cards, fostering real-time financial discipline.",
  },
  {
    icon: <Brain className="text-2xl text-primary" />,
    title: "AI-Driven Insights",
    description: "Get intelligent suggestions and coaching to make smarter financial decisions and adjust to changing realities.",
  },
  {
    icon: <LineChart className="text-2xl text-primary" />,
    title: "Automated Reporting",
    description: "Generate customized reports that link spending to business milestones and impact, for effective communication with stakeholders.",
  },
  {
    icon: <CalendarCheck className="text-2xl text-primary" />,
    title: "Milestone Tracking",
    description: "Track progress against key milestones with objective verification of completion for investors and stakeholders.",
  },
  {
    icon: <Coins className="text-2xl text-primary" />,
    title: "Fundraising Readiness",
    description: "Assessment tools that evaluate when your startup is financially ready for the next funding round.",
  },
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-6">
            Everything you need for financial accountability
          </h2>
          <p className="text-[#767676] text-lg">
            Tumia combines smart spend management, goal-setting, and impact tracking to help African startups make data-driven decisions.
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-[#767676]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
