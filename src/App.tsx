import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Policy from "./pages/Policy";
import Innovations from "./pages/Innovations";
import InnovationDetail from "./pages/InnovationDetail";
import Events from "./pages/Events";
import HowToApply from "./pages/HowToApply";
import SelectEvent from "./pages/SelectEvent";
import ApplicationForm from "./pages/ApplicationForm";
import ApplicationConfirmation from "./pages/ApplicationConfirmation";
import Dashboard from "./pages/Dashboard";
import Roadshow from "./pages/Roadshow";
import Press from "./pages/Press";
import Statutes from "./pages/Statutes";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import SubmitInnovation from "./pages/SubmitInnovation";
import {
  AdminLayout,
  AdminDashboard,
  AdminUsers,
  AdminApplications,
  AdminInnovations,
  AdminEvents,
  AdminRoadshow,
} from "./pages/admin";
import { PoliticianDashboard } from "./pages/politician";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/policy" element={<Policy />} />
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
            <Route path="/press" element={<Press />} />
            <Route path="/statutes" element={<Statutes />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/submit-innovation" element={
              <ProtectedRoute requiredRole="innovator">
                <SubmitInnovation />
              </ProtectedRoute>
            } />
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="applications" element={<AdminApplications />} />
              <Route path="innovations" element={<AdminInnovations />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="roadshow" element={<AdminRoadshow />} />
            </Route>
            {/* Politician Routes */}
            <Route path="/overview" element={
              <ProtectedRoute requiredRole="politician">
                <PoliticianDashboard />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </ErrorBoundary>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
