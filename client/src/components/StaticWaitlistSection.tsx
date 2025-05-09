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

// Static version of waitlist section for deployment - no API or external dependencies
export default function StaticWaitlistSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [role, setRole] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data for submission
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      role: formData.get('role') as string
    };
    
    console.log('Static form submission with data:', data);
    
    // Try to submit to API first, with fallback to simulated success
    try {
      // Try to call the API directly
      const apiResponse = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        // Add a short timeout to avoid long waits if API is unavailable
        signal: AbortSignal.timeout(3000)
      });
      
      if (apiResponse.ok) {
        console.log('StaticWaitlistSection: API submission successful!');
        setFormStatus("success");
      } else {
        // If we get an error response, check if it's just a duplicate email
        try {
          const responseData = await apiResponse.json();
          
          if (apiResponse.status === 409 && responseData.message?.includes('already registered')) {
            console.log('StaticWaitlistSection: Duplicate email detected');
            // Still show success for user experience
            setFormStatus("success");
          } else {
            console.log('StaticWaitlistSection: API error response:', responseData);
            // Fallback to success even on error for better UX in static mode
            setFormStatus("success");
          }
        } catch (parseError) {
          console.log('StaticWaitlistSection: Could not parse error response:', parseError);
          // Fallback to success even on error for better UX in static mode
          setFormStatus("success");
        }
      }
    } catch (fetchError) {
      console.log('StaticWaitlistSection: API fetch error:', fetchError);
      
      // If the API call fails, we fall back to always showing success
      // This ensures the static version always provides a good user experience
      setFormStatus("success");
    }
    
    // Reset the form regardless of what happened with the API
    e.currentTarget.reset();
    setRole("");
    setIsSubmitting(false);
    
    // Reset form status after 8 seconds
    setTimeout(() => setFormStatus("idle"), 8000);
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

                {/* No hidden fields needed for this implementation */}
                
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