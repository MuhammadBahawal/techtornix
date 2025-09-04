import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import ChatbotWidget from './components/ChatbotWidget';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import About from './pages/About';
import Career from './pages/Career';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Context
import { ThemeProvider } from './context/ThemeContext';

// Analytics
import { initializeTracking, trackPageVisitDebounced } from './utils/analytics';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Initialize visitor tracking on app load
    initializeTracking();
  }, []);

  useEffect(() => {
    // Track page changes
    trackPageVisitDebounced(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="loading-dots mb-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h2 className="text-2xl font-bold gradient-text">Techtornix</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Loading amazing experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              zIndex: 9999999,
            },
          }}
          containerStyle={{
            zIndex: 9999999,
          }}
        />
        <ScrollToTop />

        <Navbar />

        <main className="pt-16 md:pt-20">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/career" element={<Career />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
        <ChatbotWidget />
      </div>
    </ThemeProvider>
  );
}

export default App;
