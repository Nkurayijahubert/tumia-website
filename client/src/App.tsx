import { useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Confirmation from "@/pages/Confirmation";

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
