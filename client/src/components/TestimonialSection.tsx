import { QuoteIcon } from "lucide-react";
import { motion } from "framer-motion";
import testimonialImage from "@assets/1744886722507.jpeg";

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
            Tumia helped me collect and track wedding gift contributions for a friend's wedding. Before Tumia, money sent to my mobile wallet would mix with my personal funds, causing confusion. Now I can easily monitor each contribution separately, see total amounts collected, and maintain transparency with friends. It's been transformative for group collection management.
          </blockquote>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-[#F9C846] rounded-full mr-4 overflow-hidden">
              <img 
                src={testimonialImage} 
                alt="Testimonial" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <div className="font-semibold">Muriel Ishimwe</div>
              <div className="text-white/70">Kigali, Rwanda</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
