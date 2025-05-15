import { QuoteIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <QuoteIcon size={40} className="text-[#F9C846] opacity-50 mx-auto mb-8" />
          <blockquote className="text-2xl md:text-3xl font-medium italic mb-8">
            Tumia has transformed how our community group manages funds. We can now track contributions for multiple projects in one account, and everyone sees exactly where their money goes.
          </blockquote>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-[#F9C846] rounded-full mr-4"></div>
            <div className="text-left">
              <div className="font-semibold">Jean-Paul Kagame</div>
              <div className="text-white/70">Community Association Leader, Kigali</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
