import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CompaniesCarousel = () => {
  const carouselRef = useRef(null);

  const companies = [
    { name: 'Microsoft', logo: '/images/companies/microsoft.png' },
    { name: 'Google', logo: '/images/companies/google.png' },
    { name: 'Amazon', logo: '/images/companies/amazon.png' },
    { name: 'Apple', logo: '/images/companies/apple.png' },
    { name: 'Meta', logo: '/images/companies/meta.png' },
    { name: 'Netflix', logo: '/images/companies/netflix.png' },
    { name: 'Tesla', logo: '/images/companies/tesla.png' },
    { name: 'Spotify', logo: '/images/companies/spotify.png' },
    { name: 'Uber', logo: '/images/companies/uber.png' },
    { name: 'Airbnb', logo: '/images/companies/airbnb.png' },
  ];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Create infinite scroll animation
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(carousel, {
      x: `-${companies.length * 200}px`,
      duration: companies.length * 2,
      ease: "none"
    });

    return () => tl.kill();
  }, [companies.length]);

  return (
    <div className="container-custom">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Trusted by Industry Leaders
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We've had the privilege of working with some of the world's most innovative companies
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 dark:from-gray-800 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 dark:from-gray-800 to-transparent z-10"></div>
        
        <div 
          ref={carouselRef}
          className="flex items-center space-x-12"
          style={{ width: `${companies.length * 400}px` }}
        >
          {[...companies, ...companies].map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {company.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesCarousel;
