import { Target, CreditCard, Layers, PieChart, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Layers className="text-2xl text-primary" />,
    title: "Purpose-Based Tracking",
    description: "Create dedicated channels for each cause, whether you're managing tithes, donations, or community project funds.",
  },
  {
    icon: <CreditCard className="text-2xl text-primary" />,
    title: "One Account, Many Purposes",
    description: "No more confusion over which funds belong to which cause. Every contribution is tagged and tracked by its intended purpose.",
  },
  {
    icon: <Clock className="text-2xl text-primary" />,
    title: "Real-Time Transparency",
    description: "Instantly see how much has been collected for each need, generate reports, and build trust with your contributors.",
  },
  {
    icon: <Target className="text-2xl text-primary" />,
    title: "Virtual Sub-Wallets",
    description: "Coming soon: Split your main wallet into multiple sub-wallets for savings, bills, donations, or business expenses without opening new accounts.",
  },
  {
    icon: <PieChart className="text-2xl text-primary" />,
    title: "Effortless Fund Allocation",
    description: "Coming soon: Move money between sub-wallets, set budgets, and track spending for each purpose with ease.",
  },
  {
    icon: <Users className="text-2xl text-primary" />,
    title: "Collaborative Management",
    description: "Coming soon: Share specific sub-wallets with family, business partners, or groups, with customizable permissions.",
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
            Organize Money for Every Cause
          </h2>
          <p className="text-[#767676] text-lg">
            Tumia is becoming the go-to platform for purposeful, organized, and collaborative money management in Africa. One account, many purposes - all managed with ease.
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
