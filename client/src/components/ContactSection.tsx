import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Star, CheckCircle, AlertCircle, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      console.log("Sending contact form data:", data);
      
      const emailData = {
        senderName: data.name,
        senderEmail: data.email,
        subject: data.subject,
        message: data.message,
        recipientEmail: "team@tumia.app"
      };
      
      const response = await fetch("https://tumia.fly.dev/emails/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to send email: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    },
    onSuccess: () => {
      console.log("Contact form submission successful");
      setFormStatus("success");
      form.reset();
      
      // Reset form status after 5 seconds
      setTimeout(() => setFormStatus("idle"), 5000);
    },
    onError: (error: any) => {
      console.error('Contact form submission error:', error);
      setFormStatus("error");
      
      // Reset form status after 5 seconds
      setTimeout(() => setFormStatus("idle"), 5000);
    },
  });

  const onSubmit = (data: FormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-[#F6F1ED]/20">
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
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="mb-8">
                Have questions about Tumia? Want to learn more about our features? We'd love to hear from you.
              </p>
              <ul className="space-y-4">
                {[
                  "Ask questions about our platform",
                  "Get help with your account",
                  "Provide feedback or suggestions",
                  "Discuss partnership opportunities",
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
              
              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="flex items-center mb-4">
                  <Mail className="text-[#F9C846] mr-3" size={20} />
                  <span>team@tumia.app</span>
                </div>
              </div>
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
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="subject" className="text-sm font-medium text-[#2A2A2A] mb-2">
                          Subject
                        </Label>
                        <FormControl>
                          <Input 
                            {...field} 
                            id="subject"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="message" className="text-sm font-medium text-[#2A2A2A] mb-2">
                          Message
                        </Label>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            id="message"
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      disabled={contactMutation.isPending}
                      className="w-full px-5 py-7 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-md"
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </Form>
              
              {formStatus === "success" && (
                <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="text-green-600 mr-2" size={20} />
                    <span className="font-medium">Message Sent!</span>
                  </div>
                  <p>Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              )}
              
              {formStatus === "error" && (
                <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="text-red-600 mr-2" size={20} />
                    <span className="font-medium">Error</span>
                  </div>
                  <p>There was an error sending your message. Please try again or email us directly at team@tumia.app.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}