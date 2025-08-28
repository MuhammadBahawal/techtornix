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
        className="min-h-screen"
      >
        {/* Hero Section */}
        <SimpleHeroSection />

        {/* Services Section */}
        <section className="reveal-section">
          <ServicesSection />
        </section>

        {/* Companies Carousel */}
        <section className="reveal-section py-12 bg-gray-50 dark:bg-gray-800">
          <CompaniesCarousel />
        </section>

        {/* Testimonial Section - Trusted by Innovation Leaders */}
        <section className="reveal-section">
          <TestimonialSection />
        </section>

        {/* Tech Stack Section */}
        <section className="reveal-section section-padding" style={{ isolation: 'isolate' }}>
          <TechStackSection />
        </section>

        {/* Success Story Section - Always visible */}
        <section 
          className="reveal-section section-padding bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800"
          style={{ 
            isolation: 'isolate',
            position: 'relative',
            zIndex: 1,
            display: 'block !important',
            visibility: 'visible !important',
            opacity: '1 !important'
          }}
        >
          <SuccessStorySection />
        </section>

        {/* Featured Projects - Always visible */}
        <section 
          className="reveal-section section-padding"
          style={{ 
            isolation: 'isolate',
            position: 'relative',
            zIndex: 1,
            display: 'block !important',
            visibility: 'visible !important',
            opacity: '1 !important'
          }}
        >
          <FeaturedProjects />
        </section>

        {/* Working Methodology - Always visible */}
        <section 
          className="reveal-section section-padding bg-gray-50 dark:bg-gray-800"
          style={{ 
            isolation: 'isolate',
            position: 'relative',
            zIndex: 1,
            display: 'block !important',
            visibility: 'visible !important',
            opacity: '1 !important'
          }}
        >
          <WorkingMethodologySection />
        </section>

        {/* Testimonials */}
        <section className="reveal-section section-padding">
          <TestimonialsSection />
        </section>

        {/* CTA Section */}
        <section className="reveal-section">
          <CTASection />
        </section>
      </motion.div>
    </>
  );
};

export default Home;
