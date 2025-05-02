import { useEffect, useState } from "react";
import { useLocation, useSearch, Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle } from "lucide-react";

export default function Confirmation() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const email = params.get("email") || "your email";
  const [location, setLocation] = useLocation();
  const [isExpired, setIsExpired] = useState(false);
  
  // For debugging
  console.log("Search params:", search);
  console.log("Email parameter:", email);
  
  // Check for hash parameters indicating OTP expiration 
  useEffect(() => {
    const hash = window.location.hash;
    console.log("Hash:", hash);
    
    if (hash.includes("error=access_denied") && hash.includes("error_code=otp_expired")) {
      console.log("OTP has expired");
      setIsExpired(true);
    }
  }, []);

  // If no email is provided, we'll still show the page with default text
  useEffect(() => {
    if (email === "your email" && !isExpired) {
      console.log("No email provided, but showing page with default text");
    }
  }, [email, isExpired, setLocation]);

  // Render different content based on expiration status
  const renderContent = () => {
    if (isExpired) {
      return (
        <>
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100">
            <AlertTriangle size={32} className="text-yellow-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-4">
            Link Expired
          </h1>
          
          <p className="text-lg text-[#767676] mb-6">
            The confirmation link you used has expired. Email links are only valid for a limited time due to security reasons.
          </p>
          
          <div className="bg-[#F9C846]/10 p-6 rounded-lg text-left mb-8">
            <h3 className="font-semibold text-[#2A2A2A] mb-2">What to do next?</h3>
            <ul className="space-y-2 text-[#767676]">
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-primary">•</span>
                <span>Please request a new confirmation link</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-primary">•</span>
                <span>Check your email for the most recent link</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-primary">•</span>
                <span>Make sure to use the link within 24 hours</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-primary">•</span>
                <span>If you continue to have issues, please contact support</span>
              </li>
            </ul>
          </div>
        </>
      );
    }
    
    return (
      <>
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-4">
          Account Confirmed!
        </h1>
        
        <p className="text-lg text-[#767676] mb-6">
          Your account <span className="font-medium text-primary">{email}</span> has been successfully confirmed. Thank you for verifying your email address. Your account is now active.
        </p>
        
        <div className="bg-[#F9C846]/10 p-6 rounded-lg text-left mb-8">
          <h3 className="font-semibold text-[#2A2A2A] mb-2">What happens next?</h3>
          <ul className="space-y-2 text-[#767676]">
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-primary">•</span>
              <span>You can now log in to your account</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-primary">•</span>
              <span>Explore our financial accountability tools</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-primary">•</span>
              <span>Connect with funding partners on our platform</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-primary">•</span>
              <span>Access financial management resources for your organization</span>
            </li>
          </ul>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F1ED]/50">
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center bg-white p-10 rounded-2xl shadow-lg"
          >
            {renderContent()}
            
            <div className="flex justify-center">
              <Link href="/">
                <Button className="px-6 py-6 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-md text-center">
                  Check Our Website
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}