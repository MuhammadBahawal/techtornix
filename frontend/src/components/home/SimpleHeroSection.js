import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import AnimatedLogo from './AnimatedLogo';

const SimpleHeroSection = () => {
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    years: 0,
    team: 0
  });

  useEffect(() => {
    // Simple counter animation
    const animateCounters = () => {
      const targets = { projects: 500, clients: 200, years: 5, team: 50 };
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setCounters({
          projects: Math.floor(targets.projects * progress),
          clients: Math.floor(targets.clients * progress),
          years: Math.floor(targets.years * progress),
          team: Math.floor(targets.team * progress)
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      setTimeout(animate, 1000);
    };

    animateCounters();
  }, []);

  const scrollToExplore = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)') ||
                       document.getElementById('about') ||
                       document.getElementById('services');
    
    if (nextSection) {
      const headerOffset = 80;
      const elementPosition = nextSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: window.innerHeight - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 dark:bg-accent-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-1000"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="block">Building</span>
                <span className="block">
                  <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                    Digital Excellence
                  </span>
                </span>
                <span className="block">Together</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              Transform your business with cutting-edge technology solutions. We specialize in web development, 
              mobile apps, AI solutions, and digital innovation that drives real results.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started Today
                <FiArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
              </Link>
              
              <button className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group">
                <FiPlay className="mr-2 w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform duration-200" />
                Watch Our Story
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 pt-6 lg:pt-8"
            >
              <div className="text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {counters.projects}+
                </div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Projects Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {counters.clients}+
                </div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Happy Clients
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {counters.years}+
                </div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {counters.team}+
                </div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Team Members
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Animated Logo */}
          <div className="flex items-center justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg"
            >
              <AnimatedLogo />
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 lg:w-32 lg:h-32 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default SimpleHeroSection;
