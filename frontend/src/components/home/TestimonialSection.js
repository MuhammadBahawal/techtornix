import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar, FiPlay } from 'react-icons/fi';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      position: "CEO",
      organization: "TechCorp Inc.",
      avatar: "/api/placeholder/60/60",
      content: "From start to finish, Techtornix's AI software development services were seamless. They truly understood our needs and built something incredible.",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "CTO",
      organization: "InnovateLab",
      avatar: "/api/placeholder/60/60",
      content: "Excellent React Native mobile developers and delivered excellent work on our development project and I enjoyed working with their team.",
      rating: 5
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "Product Manager",
      organization: "StartupXYZ",
      avatar: "/api/placeholder/60/60",
      content: "The team's expertise in modern web technologies and their attention to detail made our project a huge success. Highly recommended!",
      rating: 5
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "Founder",
      organization: "DigitalFlow",
      avatar: "/api/placeholder/60/60",
      content: "Professional, reliable, and innovative. Techtornix transformed our vision into a powerful digital solution that exceeded expectations.",
      rating: 5
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-gradient-to-br from-[#1a1625] via-[#2a2438] to-[#1a1625] py-20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Innovation Leaders</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our clients say about working with us.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Testimonial Carousel */}
          <div className="relative">
            <div 
              className="relative overflow-hidden rounded-2xl"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-[#2a2438]/80 backdrop-blur-sm border border-[#4a4458]/40 rounded-2xl p-8"
                >
                  {/* User Info */}
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                      {testimonials[currentIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-cyan-400 text-sm">
                        {testimonials[currentIndex].position}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {testimonials[currentIndex].organization}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-gray-300 text-lg leading-relaxed mb-6">
                    "{testimonials[currentIndex].content}"
                  </blockquote>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#3a3448]/80 backdrop-blur-sm border border-[#4a4458]/40 rounded-full flex items-center justify-center text-white hover:bg-[#4a4458]/80 transition-all duration-300 hover:scale-110"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#3a3448]/80 backdrop-blur-sm border border-[#4a4458]/40 rounded-full flex items-center justify-center text-white hover:bg-[#4a4458]/80 transition-all duration-300 hover:scale-110"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-cyan-400 scale-125'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Right Side - Video/Image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Video/Image Container */}
              <div className="relative aspect-video bg-gradient-to-br from-[#2a2438] to-[#3a3448] rounded-2xl overflow-hidden">
                {/* Placeholder for video/image */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <FiPlay className="w-8 h-8 text-white ml-1" />
                    </div>
                    <p className="text-white font-medium">Watch Our Story</p>
                    <p className="text-gray-300 text-sm">See how we transform ideas into reality</p>
                  </div>
                </div>

                {/* Hexagonal pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 400 300">
                    <defs>
                      <pattern id="hexagons" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                        <polygon points="30,2 50,17 50,37 30,52 10,37 10,17" fill="none" stroke="currentColor" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexagons)" className="text-cyan-400"/>
                  </svg>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse animation-delay-1000"></div>
            </motion.div>

            {/* Stats overlay */}
            <div className="absolute -bottom-6 -left-6 bg-[#2a2438]/90 backdrop-blur-sm border border-[#4a4458]/40 rounded-xl p-4">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">200+</div>
                  <div className="text-xs text-gray-400">Happy Clients</div>
                </div>
                <div className="w-px h-8 bg-[#4a4458]"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">500+</div>
                  <div className="text-xs text-gray-400">Projects Done</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
