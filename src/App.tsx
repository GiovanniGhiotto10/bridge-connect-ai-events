
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import Index from "./pages/Index";
import CreateEvent from "./pages/CreateEvent";
import DiscoverEvents from "./pages/DiscoverEvents";
import EventDetails from "./pages/EventDetails";
import Matches from "./pages/Matches";
import Agenda from "./pages/Agenda";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AllEvents from "./pages/AllEvents";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyEvents from "./pages/MyEvents";

const App = () => {
  // Create QueryClient inside the component to ensure fresh instance
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
    },
  }), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Signup />} />
            <Route path="/criar-evento" element={<CreateEvent />} />
            <Route path="/eventos" element={<DiscoverEvents />} />
            <Route path="/todos-eventos" element={<AllEvents />} />
            <Route path="/evento/:id" element={<EventDetails />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/meus-eventos" element={<MyEvents />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/perfil/:id" element={<Profile />} />
            {/* Redirect old route to new one */}
            <Route path="/minhas-conexoes" element={<Matches />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
