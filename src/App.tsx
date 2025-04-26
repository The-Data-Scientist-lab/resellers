import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";
import ModelsPage from "./pages/ModelsPage";
import ModelDetail from "./pages/ModelDetail";
import FeaturedPage from "./pages/FeaturedPage";
import QRCodePaymentPage from "./pages/QRCodePaymentPage";
import RefundRequestForm from "./pages/RefundRequestForm";
import RefundConfirmationPage from "./components/payment/RefundConfirmationPage";
import PaymentVerificationFailed from "./pages/PaymentVerificationFailed";
import PaymentVerificationSuccess from "./pages/PaymentVerificationSuccess";
import PaymentVerificationProcess from "./components/payment/PaymentVerificationProcess";
import NotFound from "./pages/NotFound";
import RefundSuccess from './pages/RefundSuccess';
import CompletePurchase from './pages/CompletePurchase';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <Layout>
            <PageTransition>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/models" element={<ModelsPage />} />
                <Route path="/model/:slug" element={<ModelDetail />} />
                <Route path="/featured" element={<FeaturedPage />} />
                <Route path="/complete-purchase" element={<CompletePurchase />} />
                <Route path="/payment/qr-code" element={<QRCodePaymentPage />} />
                <Route path="/payment/verification-process" element={<PaymentVerificationProcess />} />
                <Route path="/refund/request" element={<RefundRequestForm />} />
                <Route path="/refund/confirmation" element={<RefundConfirmationPage />} />
                <Route path="/payment/verification-failed" element={<PaymentVerificationFailed />} />
                <Route path="/payment/verification-success" element={<PaymentVerificationSuccess />} />
                <Route path="/refund/success" element={<RefundSuccess />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </Layout>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
