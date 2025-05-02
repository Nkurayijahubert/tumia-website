import { Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Confirmation from "@/pages/Confirmation";

/**
 * Router setup with a base location hook to ensure proper client-side routing
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router base="">
          <Route path="/" component={Home} />
          <Route path="/confirm" component={Confirmation} />
          <Route path="/:rest*" component={NotFound} />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
