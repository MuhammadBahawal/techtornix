import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CompaniesCarousel = () => {
  const carouselRef = useRef(null);

  const companies = [
    { name: 'Tech-Hub', logo: '/images/logos/techhub.webp' },
    { name: 'Cravy Crunch', logo: '/images/logos/cravycrunch1.webp' },
    { name: 'Teqtronics', logo: '/images/logos/teqtronics1.webp' },
    { name: 'LIDS College', logo: '/images/logos/lids.webp' },
    { name: 'AMS', logo: '/images/logos/ams.webp' },
    { name: 'Hypernexis', logo: '/images/logos/hypernexislogo.webp' },
    { name: 'JCBuck', logo: '/images/logos/jcbuck.webp' },
    { name: 'Tribe Dishes', logo: '/images/logos/TribeDishes.webp' },
  ];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Create infinite scroll animation
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(carousel, {
      x: `-${companies.length * 280}px`,
      duration: companies.length * 3,
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
          style={{ width: `${companies.length * 560}px` }}
        >
          {[...companies, ...companies].map((company, index) => (
            <img
              key={`${company.name}-${index}`}
              src={company.logo}
              alt={company.name}
              className="flex-shrink-0 w-48 h-24 object-contain max-h-20 max-w-[90%] grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              style={{ display: 'block' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesCarousel;