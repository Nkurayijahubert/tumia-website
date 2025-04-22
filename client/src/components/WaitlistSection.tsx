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
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error" | "exists">("idle");

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
    mutationFn: async (data: FormValues) => {
      // Log the data being sent for debugging
      console.log("Sending waitlist data:", data);
      
      try {
        // Direct fetch implementation for better error logging
        // Check if we're on Vercel or a custom domain
        if (window.location.hostname.includes(".vercel.app") || 
            window.location.hostname.includes("tumia.app")) {
          console.log("Production deployment detected, making direct fetch to API");
          
          // Determine the appropriate API URL
          let apiUrl = "/api/waitlist";
          
          // Optional: Try direct call to www.tumia.app if we're on a non-www domain or Vercel preview
          if (window.location.hostname.includes(".vercel.app") || 
              !window.location.hostname.includes("www.")) {
            console.log("Trying direct API call to www.tumia.app");
            apiUrl = "https://www.tumia.app/api/waitlist";
          }
          
          console.log("Calling API URL:", apiUrl);
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            // Add credentials to ensure cookies are sent
            credentials: "include"
          });
          
          console.log("Vercel API Response Status:", response.status, response.statusText);
          
          // Try to read the response body for debugging
          let responseBody;
          try {
            responseBody = await response.text();
            console.log("Response body:", responseBody);
            
            // Try to parse as JSON if possible
            try {
              const jsonResponse = JSON.parse(responseBody);
              console.log("Parsed JSON response:", jsonResponse);
              
              if (!response.ok) {
                throw new Error(`${response.status}: ${jsonResponse.message || responseBody}`);
              }
              
              return jsonResponse;
            } catch (parseError) {
              console.log("Not valid JSON response");
              if (!response.ok) {
                throw new Error(`${response.status}: ${responseBody}`);
              }
              return responseBody;
            }
          } catch (bodyError) {
            console.log("Could not read response body:", bodyError);
            if (!response.ok) {
              throw new Error(`${response.status}: ${response.statusText}`);
            }
            return { success: true };
          }
        } else {
          // Use the standard apiRequest for non-Vercel environments
          return await apiRequest("POST", "/api/waitlist", data);
        }
      } catch (error) {
        console.error("Caught error in mutationFn:", error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log("Waitlist submission successful");
      setFormStatus("success");
      form.reset();
      // Reset form status after 8 seconds
      setTimeout(() => setFormStatus("idle"), 8000);
    },
    onError: (error: any) => {
      console.error('Waitlist submission error:', error);
      console.log('Error instanceof Error:', error instanceof Error);
      console.log('Error type:', typeof error);
      console.log('Error properties:', Object.keys(error).join(', '));
      console.log('Error message:', error.message);
      console.log('Error stack:', error.stack);
      
      // Check if this is a duplicate email error (409 Conflict)
      if (error.message && error.message.includes("409")) {
        console.log("Duplicate email detected, showing exists message");
        setFormStatus("exists");
        form.reset();
      } else {
        // Special handling for Vercel deployment issues
        if (window.location.hostname.includes(".vercel.app")) {
          // Common errors on Vercel deployment
          const isNetworkError = 
            (error.message && (
              error.message.includes("Failed to fetch") || 
              error.message.includes("NetworkError")
            )) || 
            error.name === "TypeError";
          
          const isCORSError = 
            error.message && (
              error.message.includes("CORS") || 
              error.message.includes("Cross-Origin")
            );
          
          if (isNetworkError || isCORSError) {
            console.log("Network/CORS error on Vercel deployment, showing success anyway");
            setFormStatus("error");
            form.reset();
          } else {
            console.log("Unknown error on Vercel, showing error message");
            setFormStatus("error");
          }
        } else {
          console.log("Error in development environment");
          setFormStatus("error");
        }
      }
      
      // Reset form status after 8 seconds
      setTimeout(() => setFormStatus("idle"), 8000);
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
              
              {formStatus === "exists" && (
                <div className="mt-6 p-4 bg-blue-100 text-blue-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="text-blue-600 mr-2" size={20} />
                    <span className="font-medium">Already Registered</span>
                  </div>
                  <p>Thank you for your interest! We already have your email in our system. We'll contact you soon with more information about Tumia.</p>
                </div>
              )}
              
              {formStatus === "error" && (
                <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="text-red-600 mr-2" size={20} />
                    <span className="font-medium">Error</span>
                  </div>
                  <p>Error details: {typeof waitlistMutation.error === 'string' ? waitlistMutation.error : waitlistMutation.error?.message || "Unknown error"}</p>
                  <p className="mt-2">Please try again later or contact us directly.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
