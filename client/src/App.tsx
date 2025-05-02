import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Confirmation from "@/pages/Confirmation";

/**
 * Always use the dynamic Home component which has proper
 * API integration for waitlist submissions
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/confirm" component={Confirmation} />
      <Route path="/confirm/:rest*" component={Confirmation} />
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
