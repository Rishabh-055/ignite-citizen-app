import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import AIChat from "./pages/AIChat";
import ReportIssue from "./pages/ReportIssue";
import Profile from "./pages/Profile";
import UserDetail from "./pages/UserDetail";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth routes without layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/ai-chat" element={<AIChat />} />
            
            {/* All other routes use the main layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="report-issue" element={<ReportIssue />} />
              <Route path="profile" element={<Profile />} />
              <Route path="user/:id" element={<UserDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
