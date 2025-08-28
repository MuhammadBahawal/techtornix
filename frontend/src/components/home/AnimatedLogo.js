import React, { useEffect, useRef, useState } from 'react';

// Simple and Clean Logo Animation
const AnimatedLogo = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Simple CSS-based animation approach to avoid GSAP conflicts
    const logoIcon = container.querySelector('.logo-icon');
    const logoText = container.querySelector('.logo-text');
    
    if (logoIcon && logoText) {
      // Add entrance animation classes
      setTimeout(() => {
        logoIcon.style.opacity = '1';
        logoIcon.style.transform = 'scale(1) rotate(0deg)';
        logoIcon.style.transition = 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }, 100);
      
      setTimeout(() => {
        logoText.style.opacity = '1';
        logoText.style.transform = 'translateY(0)';
        logoText.style.transition = 'all 0.8s ease-out';
      }, 600);

      // Simple hover effect
      const handleMouseEnter = () => {
        logoIcon.style.transform = 'scale(1.1) rotate(0deg)';
      };
      
      const handleMouseLeave = () => {
        logoIcon.style.transform = 'scale(1) rotate(0deg)';
      };

      logoIcon.addEventListener('mouseenter', handleMouseEnter);
      logoIcon.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        logoIcon.removeEventListener('mouseenter', handleMouseEnter);
        logoIcon.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const particles = [];
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 2,
          duration: Math.random() * 2 + 1,
        });
      }
      setParticles(particles);
    };
    generateParticles();
  }, []);

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto overflow-hidden" ref={containerRef}>
      {/* Main Logo Container */}
      <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, index) => (
            <div
              key={index}
              className="absolute w-1 h-1 bg-primary-400 rounded-full opacity-60"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`,
                animation: `particle-float ${particle.duration}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
        {/* Logo Icon */}
        <div className="logo-icon mb-4" style={{ opacity: 0, transform: 'scale(0) rotate(-180deg)' }}>
          <div className="relative">
            {/* Main circle */}
            <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-3xl md:text-4xl lg:text-5xl">T</span>
            </div>
            {/* Decorative rings */}
            <div className="absolute -inset-2 border-2 border-blue-400/30 rounded-full animate-ping"></div>
            <div className="absolute -inset-4 border border-purple-400/20 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Company Name */}
        <div className="logo-text text-center" style={{ opacity: 0, transform: 'translateY(30px)' }}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            TECHTORNIX
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
            Innovation & Technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
