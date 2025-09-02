import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
// Removed GSAP to prevent conflicts

// Components
import SimpleHeroSection from '../components/home/SimpleHeroSection';
import ServicesSection from '../components/home/ServicesSection';
import CompaniesCarousel from '../components/home/CompaniesCarousel';
import TechStackSection from '../components/home/TechStackSection';
import SuccessStorySection from '../components/home/SuccessStorySection';
import WorkingMethodologySection from '../components/home/WorkingMethodologySection';
import FeaturedProjects from '../components/home/FeaturedProjects';
import TestimonialsSection from '../components/home/TestimonialsSection';
import TestimonialSection from '../components/home/TestimonialSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Simple intersection observer for section reveals
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px)';
      section.style.transition = 'all 0.8s ease-out';
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Techtornix</title>
        <meta name="description" content="Techtornix is a leading software house delivering cutting-edge web development, mobile applications, AI solutions, and digital transformation services. Transform your business with our innovative technology solutions." />
        <meta name="keywords" content="software development, web development, mobile apps, AI solutions, digital transformation, React, Node.js, MongoDB, techtornix" />
        <meta property="og:title" content="Techtornix - Modern Software House" />
        <meta property="og:description" content="Transform your business with our innovative technology solutions. We specialize in web development, mobile apps, AI solutions, and digital transformation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://techtornix.com" />
        <link rel="canonical" href="https://techtornix.com" />
      </Helmet>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen overflow-x-hidden"
      >
        {/* Hero Section */}
        <SimpleHeroSection />

        {/* Services Section */}
        <section className="reveal-section w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <ServicesSection />
          </div>
        </section>

        {/* Companies Carousel */}
        <section className="reveal-section py-8 sm:py-12 lg:py-16 bg-gray-50 dark:bg-gray-800 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CompaniesCarousel />
          </div>
        </section>

        {/* Testimonial Section - Trusted by Innovation Leaders */}
        <section className="reveal-section w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <TestimonialSection />
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="reveal-section py-8 sm:py-12 lg:py-16" style={{ isolation: 'isolate' }}>
          <TechStackSection />
        </section>

        {/* Success Story Section - Always visible */}
        <section
          className="reveal-section py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 w-full"
          style={{
            isolation: 'isolate',
            position: 'relative',
            zIndex: 1,
            display: 'block !important',
            visibility: 'visible !important',
            opacity: '1 !important'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SuccessStorySection />
          </div>
        </section>

        {/* Featured Projects - Always visible */}
        <section
          className="reveal-section py-8 sm:py-12 lg:py-16 w-full"
          style={{
            isolation: 'isolate',
            position: 'relative',
            zIndex: 1,
            display: 'block !important',
            visibility: 'visible !important',
            opacity: '1 !important'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedProjects />
          </div>
        </section>

        {/* Working Methodology - Always visible */}
        <section
          className="reveal-section py-8 sm:py-12 lg:py-16 bg-gray-50 dark:bg-gray-800 w-full"
          style={{
            isolation: 'isolate',
            position: 'relative',
            zIndex: 1,
            display: 'block !important',
            visibility: 'visible !important',
            opacity: '1 !important'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <WorkingMethodologySection />
          </div>
        </section>

        {/* Testimonials */}
        <section className="reveal-section py-8 sm:py-12 lg:py-16 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TestimonialsSection />
          </div>
        </section>

        {/* CTA Section */}
        <section className="reveal-section w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <CTASection />
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Home;
