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
            Ready to organize your wallet?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Start collecting contributions without mixing them with your personal finances. Get started today or request a demo to see how Tumia works.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://app.tumia.app/auth/signin" target="_blank" rel="noopener noreferrer">
              <Button className="px-8 py-7 bg-[#F9C846] text-primary font-semibold rounded-lg hover:bg-opacity-90 transition-all shadow-md text-center">
                Get Started
              </Button>
            </a>
            <a href="/request-demo">
              <Button variant="outline" className="px-8 py-7 bg-white/10 text-white border border-white/30 font-semibold rounded-lg hover:bg-white/20 transition-all text-center">
                Request Demo
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
