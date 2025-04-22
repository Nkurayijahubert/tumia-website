import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import StaticHome from "@/pages/StaticHome";

/**
 * Simplified App component that always uses StaticHome
 * For use in production environments or when the API is unavailable
 */
function Router() {
  console.log("Using simplified app with StaticHome component");
  
  return (
    <Switch>
      <Route path="/" component={StaticHome} />
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