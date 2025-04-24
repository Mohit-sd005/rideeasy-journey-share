
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RiderDashboard from "./pages/RiderDashboard";
import PassengerDashboard from "./pages/PassengerDashboard";
import CreateRide from "./pages/CreateRide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Authentication Routes */}
          <Route path="/login/:role" element={<Login />} />
          <Route path="/signup/:role" element={<Signup />} />
          
          {/* Rider Routes */}
          <Route path="/rider/dashboard" element={<RiderDashboard />} />
          <Route path="/rider/create-ride" element={<CreateRide />} />
          
          {/* Passenger Routes */}
          <Route path="/passenger/dashboard" element={<PassengerDashboard />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
