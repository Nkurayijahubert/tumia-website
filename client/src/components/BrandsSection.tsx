import { motion } from "framer-motion";

export default function BrandsSection() {
  const partnerVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 0.6,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#767676] font-medium">
            Trusted by accelerators and investors across Africa
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {[1, 2, 3, 4, 5].map((index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={partnerVariants}
              className={`h-8 w-32 bg-[#2A2A2A]/10 rounded flex items-center justify-center ${
                index === 5 ? "hidden lg:flex" : ""
              }`}
            >
              Partner {index}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
