import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import StaticHome from "@/pages/StaticHome";

// Function to check if the API is available
const checkApiAvailability = async (): Promise<boolean> => {
  try {
    const response = await fetch("/api/health", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // Short timeout to avoid hanging the application
      signal: AbortSignal.timeout(5000),
    });
    if (response.ok) {
      console.log("API health check successful, using dynamic mode");
      return true;
    }
    console.warn("API health check failed (status not OK), using static site mode");
    return false;
  } catch (error) {
    console.warn("API health check failed with error, using static site mode:", error);
    return false;
  }
};

function Router() {
  // Default to static mode for safety, will be updated after API check
  const [useStaticMode, setUseStaticMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Check if we're in a static environment (GitHub Pages)
    if (window.location.hostname.includes("github.io") || 
        import.meta.env.VITE_FORCE_STATIC_MODE === "true") {
      console.log("Static mode enforced by environment or hostname");
      setUseStaticMode(true);
      setIsLoading(false);
      return;
    }
    
    // Special case for Vercel deployment - for now we'll use static mode
    // until we fix the API issues on Vercel
    if (window.location.hostname.includes(".vercel.app")) {
      console.log("Vercel deployment detected, using static mode for reliability");
      setUseStaticMode(true);
      setIsLoading(false);
      return;
    }
    
    // For other environments, check API availability
    checkApiAvailability().then(isAvailable => {
      setUseStaticMode(!isAvailable);
      setIsLoading(false);
    });
  }, []);
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Use the appropriate Home component based on API availability
  const HomeComponent = useStaticMode ? StaticHome : Home;
  
  return (
    <Switch>
      <Route path="/" component={HomeComponent} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
