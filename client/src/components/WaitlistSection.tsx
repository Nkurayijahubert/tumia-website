import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Star, CheckCircle, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Please select your role"),
});

type FormValues = z.infer<typeof formSchema>;

export default function WaitlistSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: (data: FormValues) => 
      apiRequest("POST", "/api/waitlist", data),
    onSuccess: () => {
      setFormStatus("success");
      form.reset();
      // Reset form status after 5 seconds
      setTimeout(() => setFormStatus("idle"), 5000);
    },
    onError: () => {
      setFormStatus("error");
    },
  });

  const onSubmit = (data: FormValues) => {
    waitlistMutation.mutate(data);
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="name" className="text-sm font-medium text-[#2A2A2A] mb-2">
                          Full Name
                        </Label>
                        <FormControl>
                          <Input 
                            {...field} 
                            id="name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="email" className="text-sm font-medium text-[#2A2A2A] mb-2">
                          Email Address
                        </Label>
                        <FormControl>
                          <Input 
                            {...field} 
                            id="email"
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="company" className="text-sm font-medium text-[#2A2A2A] mb-2">
                          Company Name
                        </Label>
                        <FormControl>
                          <Input 
                            {...field} 
                            id="company"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="role" className="text-sm font-medium text-[#2A2A2A] mb-2">
                          Your Role
                        </Label>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger id="role" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="founder">Founder/Co-founder</SelectItem>
                            <SelectItem value="investor">Investor</SelectItem>
                            <SelectItem value="accelerator">Accelerator Program Manager</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      disabled={waitlistMutation.isPending}
                      className="w-full px-5 py-7 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-md"
                    >
                      {waitlistMutation.isPending ? "Submitting..." : "Join Waitlist"}
                    </Button>
                  </div>
                </form>
              </Form>
              
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
