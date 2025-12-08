import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Innovations from "./pages/Innovations";
import InnovationDetail from "./pages/InnovationDetail";
import Events from "./pages/Events";
import HowToApply from "./pages/HowToApply";
import SelectEvent from "./pages/SelectEvent";
import ApplicationForm from "./pages/ApplicationForm";
import ApplicationConfirmation from "./pages/ApplicationConfirmation";
import Dashboard from "./pages/Dashboard";
import Roadshow from "./pages/Roadshow";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/innovations" element={<Innovations />} />
            <Route path="/innovations/:id" element={<InnovationDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/roadshow" element={<Roadshow />} />
            <Route path="/apply" element={<HowToApply />} />
            <Route path="/apply/select-event" element={
              <ProtectedRoute>
                <SelectEvent />
              </ProtectedRoute>
            } />
            <Route path="/apply/form" element={
              <ProtectedRoute>
                <ApplicationForm />
              </ProtectedRoute>
            } />
            <Route path="/apply/confirmation" element={
              <ProtectedRoute>
                <ApplicationConfirmation />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
