
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreateEvent from "./pages/CreateEvent";
import DiscoverEvents from "./pages/DiscoverEvents";
import EventDetails from "./pages/EventDetails";
import Matches from "./pages/Matches";
import Agenda from "./pages/Agenda";
import NotFound from "./pages/NotFound";
import AllEvents from "./pages/AllEvents";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/criar-evento" element={<CreateEvent />} />
          <Route path="/eventos" element={<DiscoverEvents />} />
          <Route path="/todos-eventos" element={<AllEvents />} />
          <Route path="/evento/:id" element={<EventDetails />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/agenda" element={<Agenda />} />
          {/* Redirect old route to new one */}
          <Route path="/minhas-conexoes" element={<Matches />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
