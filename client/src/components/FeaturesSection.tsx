import {
  Layers,
  CreditCard,
  Clock,
  Target,
  PieChart,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

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

  // Feature set 1: Available now
  const featureSet1 = [
    {
      icon: <Layers className="text-2xl text-primary" />,
      title: "Purpose-Based Tracking",
      description:
        "Whether you’re a church collecting tithes and donations, a community group raising funds for multiple projects, or an individual managing contributions for events, Tumia lets you create dedicated channels for each cause.",
    },
    {
      icon: <CreditCard className="text-2xl text-primary" />,
      title: "One Account, Many Purposes",
      description:
        "No more confusion over which funds belong to which cause. Every contribution is tagged and tracked by its intended purpose.",
    },
    {
      icon: <Clock className="text-2xl text-primary" />,
      title: "Real-Time Transparency",
      description:
        "Instantly see how much has been collected for each cause, generate reports, and build trust with your contributors.",
    },
  ];

  // Feature set 2: Coming soon
  const featureSet2 = [
    {
      icon: <Target className="text-2xl text-gray-600" />,
      title: "Virtual Sub-Wallets",
      description:
        "Split your main wallet into multiple sub-wallets for savings, bills, donations, or business expenses without opening new accounts.",
    },
    {
      icon: <PieChart className="text-2xl text-gray-600" />,
      title: "Effortless Fund Allocation",
      description:
        "Move money between sub-wallets, set budgets, and track spending for each purpose with ease.",
    },
    {
      icon: <Users className="text-2xl text-gray-600" />,
      title: "Collaborative Management",
      description:
        "Share specific sub-wallets with family, business partners, or groups, with customizable permissions.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Two Powerful Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-6">
            Purposeful Money Management for Africa
          </h2>
          <p className="text-[#767676] text-lg">
            Tumia is becoming the go-to platform for organized and collaborative
            financial control, with two main features to transform how you
            manage money.
          </p>
        </div>

        {/* Feature 1 Section */}
        <div className="mb-16">
          <div className="bg-[#F9C846]/10 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-white font-bold">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-[#2A2A2A]">
                Collect Contributions
              </h3>
            </div>
            <p className="text-[#767676] text-lg mb-8 pl-14">
              Transform how you manage collected money by organizing it based on specific purposes. Whether collecting for a wedding gift, community project, or group event, each purpose gets its own tracking space. See exactly how much has been collected for each goal while keeping everything separate from your personal money.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {featureSet1.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#767676] text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Feature 2 Section */}
          <div className="bg-gray-100 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold text-[#2A2A2A]">
                Coming Soon: Bring Order to Your Wallet
              </h3>
            </div>
            <p className="text-[#767676] text-lg mb-8 pl-14">
              Organize your personal or business wallet—so your money is always
              where you need it, when you need it.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {featureSet2.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <span className="absolute top-4 right-4 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#767676] text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
