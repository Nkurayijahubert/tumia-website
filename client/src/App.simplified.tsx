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
    console.log("Production app checking API availability...");
    const response = await fetch("/api/health", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // Short timeout to avoid hanging the application
      signal: AbortSignal.timeout(3000),
    });
    if (response.ok) {
      console.log("Production app: API health check successful, using dynamic mode");
      return true;
    }
    console.warn("Production app: API health check failed (status not OK), using static site mode");
    return false;
  } catch (error) {
    console.warn("Production app: API health check failed with error, using static site mode:", error);
    return false;
  }
};

/**
 * Enhanced Router component that prefers dynamic mode in production
 * but falls back to static mode if API checks fail
 */
function Router() {
  // Default to dynamic mode for Vercel deployments
  const [useStaticMode, setUseStaticMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const checkAvailability = async () => {
      // For Vercel or tumia.app, we'll try to use dynamic mode by default
      console.log("Production app: Preferring dynamic mode");
      
      // Always verify API health before committing to dynamic mode
      const isApiAvailable = await checkApiAvailability();
      setUseStaticMode(!isApiAvailable);
      setIsLoading(false);
    };
    
    // Execute the async function
    checkAvailability();
  }, []);
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Use the appropriate Home component based on API availability
  const HomeComponent = useStaticMode ? StaticHome : Home;
  
  // Debug in console which mode we're using
  console.log("Production app static mode:", useStaticMode ? "enabled" : "disabled");
  
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