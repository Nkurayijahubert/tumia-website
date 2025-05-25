import { useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Confirmation from "@/pages/Confirmation";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CookiePolicy from "@/pages/CookiePolicy";
import RequestDemo from "@/pages/RequestDemo";

/**
 * Simple routing approach that just checks the location directly
 */
function App() {
  const [location] = useLocation();
  
  // Simple router based on current path
  const renderPage = () => {
    // Extract the base path
    const path = location.split('?')[0];
    console.log("Current path:", path);
    
    if (path === '/confirm') {
      console.log("Rendering Confirmation page");
      return <Confirmation />;
    }
    
    if (path === '/privacy-policy') {
      console.log("Rendering Privacy Policy page");
      return <PrivacyPolicy />;
    }
    
    if (path === '/terms-of-service') {
      console.log("Rendering Terms of Service page");
      return <TermsOfService />;
    }
    
    if (path === '/cookie-policy') {
      console.log("Rendering Cookie Policy page");
      return <CookiePolicy />;
    }
    
    if (path === '/request-demo') {
      console.log("Rendering Request Demo page");
      return <RequestDemo />;
    }
    
    // Default to home
    console.log("Rendering Home page");
    return <Home />;
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {renderPage()}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
