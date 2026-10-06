import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioLayout from "./components/PortfolioLayout";
import { Toaster } from "sonner";
import { PetProvider } from "./context/PetContext";

// Code-split page components for high-speed initial bundle performance & INP/LCP optimization
const HomeView = lazy(() => import("./pages/HomeView"));
const WorkView = lazy(() => import("./pages/WorkView"));
const BlogView = lazy(() => import("./pages/BlogView"));
const BlogPostView = lazy(() => import("./pages/BlogPostView"));
const ResumeView = lazy(() => import("./pages/ResumeView"));
const ContactView = lazy(() => import("./pages/ContactView"));
const NotFoundView = lazy(() => import("./pages/NotFoundView"));

const PageFallback = () => (
  <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 animate-pulse">
    <div className="h-8 w-48 bg-black/5 dark:bg-white/5 rounded-lg mb-4" />
    <div className="h-4 w-72 bg-black/5 dark:bg-white/5 rounded-md mb-8" />
    <div className="space-y-4">
      <div className="h-28 w-full bg-black/5 dark:bg-white/5 rounded-xl" />
      <div className="h-28 w-full bg-black/5 dark:bg-white/5 rounded-xl" />
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <PetProvider>
        <div className="relative min-h-screen w-full bg-white dark:bg-black transition-colors duration-250 overflow-x-hidden">
          {/* Sonner Toast Notifications */}
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            toastOptions={{
              className: "font-mono text-xs border border-black/10 dark:border-white/10",
            }}
          />

          {/* Portfolio Architecture Routes */}
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<PortfolioLayout />}>
                <Route index element={<HomeView />} />
                <Route path="work" element={<WorkView />} />
                <Route path="blog" element={<BlogView />} />
                <Route path="blog/:slug" element={<BlogPostView />} />
                <Route path="resume" element={<ResumeView />} />
                <Route path="contact" element={<ContactView />} />
                <Route path="*" element={<NotFoundView />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </PetProvider>
    </BrowserRouter>
  );
};

export default App;
