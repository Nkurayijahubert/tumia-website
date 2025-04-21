import { useState } from "react";
import { Star, CheckCircle, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

// For GitHub Pages deployment with FormSpree
// The FormSpree endpoint can be configured via environment variable or use the default
const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || "YOUR_FORMSPREE_FORM_ID";
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

export default function StaticWaitlistSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [role, setRole] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormStatus("success");
        e.currentTarget.reset();
        setRole("");
        // Reset form status after 5 seconds
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="py-20 bg-[#F6F1ED]/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-primary p-10 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Join our waitlist</h2>
              <p className="mb-8">
                Be among the first to experience Tumia and unlock your startup's financial potential. Early access members receive:
              </p>
              <ul className="space-y-4">
                {[
                  "Priority onboarding and setup assistance",
                  "Exclusive financial management workshops",
                  "Complimentary strategy session with our experts",
                  "Special early adopter pricing",
                ].map((benefit, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="mr-3 text-[#F9C846] mt-1">
                      <Star size={16} />
                    </span>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="p-10 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-[#2A2A2A] mb-2">
                    Full Name
                  </Label>
                  <Input 
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-[#2A2A2A] mb-2">
                    Email Address
                  </Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="company" className="text-sm font-medium text-[#2A2A2A] mb-2">
                    Company Name
                  </Label>
                  <Input 
                    id="company"
                    name="company"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="role" className="text-sm font-medium text-[#2A2A2A] mb-2">
                    Your Role
                  </Label>
                  <Select name="role" value={role} onValueChange={setRole}>
                    <SelectTrigger id="role" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="founder">Founder/Co-founder</SelectItem>
                      <SelectItem value="investor">Investor</SelectItem>
                      <SelectItem value="accelerator">Accelerator Program Manager</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Hidden field for FormSpree to redirect to */}
                <input 
                  type="hidden" 
                  name="_next" 
                  value={window.location.href} 
                />
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full px-5 py-7 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-md"
                  >
                    {isSubmitting ? "Submitting..." : "Join Waitlist"}
                  </Button>
                </div>
              </form>
              
              {formStatus === "success" && (
                <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="text-green-600 mr-2" size={20} />
                    <span className="font-medium">Success!</span>
                  </div>
                  <p>Thank you for joining our waitlist. We'll be in touch soon with more information.</p>
                </div>
              )}
              
              {formStatus === "error" && (
                <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="text-red-600 mr-2" size={20} />
                    <span className="font-medium">Error</span>
                  </div>
                  <p>Something went wrong. Please try again later or contact us directly.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}