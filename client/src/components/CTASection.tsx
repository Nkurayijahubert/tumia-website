import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to organize your money for every purpose?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Join our waitlist to be among the first to experience Tumia's purpose-based money management for your organization, business, or personal finances.
          </p>
          <a href="#waitlist">
            <Button className="px-8 py-7 bg-[#F9C846] text-primary font-semibold rounded-lg hover:bg-opacity-90 transition-all shadow-md text-center">
              Get Early Access
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
