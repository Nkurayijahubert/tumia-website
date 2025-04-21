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
            Tumia is empowering Africa's startups to build better financial habits, unlock growth, and become the continent's next generation of scalable success stories.
          </blockquote>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-[#F9C846] rounded-full mr-4"></div>
            <div className="text-left">
              <div className="font-semibold">Amina Diallo</div>
              <div className="text-white/70">Founder, GreenTech Rwanda</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
