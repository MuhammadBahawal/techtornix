import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar, FiPlay, FiUsers, FiTarget, FiAward, FiHeart } from 'react-icons/fi';
import VideoModal from '../common/VideoModal';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [counters, setCounters] = useState({
    teamMembers: 0,
    projectsCompleted: 0,
    awardsWon: 0,
    clientSatisfaction: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  const stats = [
    { number: 50, suffix: '+', label: 'Team Members', icon: FiUsers, key: 'teamMembers' },
    { number: 200, suffix: '+', label: 'Projects Completed', icon: FiTarget, key: 'projectsCompleted' },
    { number: 15, suffix: '+', label: 'Awards Won', icon: FiAward, key: 'awardsWon' },
    { number: 98, suffix: '%', label: 'Client Satisfaction', icon: FiHeart, key: 'clientSatisfaction' }
  ];

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

  // Animated counter effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        const animateCounters = () => {
          const duration = 2000;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            setCounters({
              teamMembers: Math.floor(50 * progress),
              projectsCompleted: Math.floor(200 * progress),
              awardsWon: Math.floor(15 * progress),
              clientSatisfaction: Math.floor(98 * progress)
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setHasAnimated(true);
            }
          };

          animate();
        };

        animateCounters();
      }
    }, { threshold: 0.5 });

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleWatchStory = () => {
    setIsVideoModalOpen(true);
  };

  return (
    <section className="bg-gradient-to-br from-[#1a1625] via-[#2a2438] to-[#1a1625] py-20">
      <div className="container-custom">
        {/* Stats Section */}
        <div ref={statsRef} className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                  style={{ background: 'linear-gradient(135deg, rgba(55, 183, 195, 0.2), rgba(7, 25, 82, 0.2))' }}>
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#37b7c3' }} />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #37b7c3, #071952)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                  {counters[stat.key]}{stat.suffix}
                </div>
                <div className="text-sm sm:text-base text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Trusted by <span style={{
                background: 'linear-gradient(135deg, #37b7c3, #071952)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Innovation Leaders</span>
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
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#37b7c3] to-[#071952] flex items-center justify-center text-white font-bold text-xl mr-4">
                      {testimonials[currentIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-[#37b7c3] text-sm">
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
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-[#37b7c3] scale-125'
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
              onClick={handleWatchStory}
            >
              {/* Video/Image Container */}
              <div className="relative aspect-video bg-gradient-to-br from-[#2a2438] to-[#3a3448] rounded-2xl overflow-hidden">
                {/* CEO Image Background */}
                <div className="absolute inset-0">
                  <img
                    src="/images/team/bahawal.png"
                    alt="Muhammad Bahawal - CEO"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback background if image fails to load */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2a2438] to-[#3a3448] hidden items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-[#37b7c3] to-[#071952] rounded-full flex items-center justify-center text-white text-4xl font-bold">
                      MB
                    </div>
                  </div>
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(55, 183, 195, 0.6), rgba(7, 25, 82, 0.6))' }}></div>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
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
                        <polygon points="30,2 50,17 50,37 30,52 10,37 10,17" fill="none" stroke="currentColor" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexagons)" className="text-[#37b7c3]" />
                  </svg>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#37b7c3] via-transparent to-[#071952] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-[#37b7c3] to-[#071952] rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-[#37b7c3] to-[#071952] rounded-full animate-pulse animation-delay-1000"></div>
            </motion.div>

            {/* Stats overlay */}
            <div className="
  absolute -bottom-12 -left-2  /* mobile devices par right aur neecha */ sm:-bottom-8 sm:-left-8 lg:-bottom-6 lg:-left-6 bg-[#2a2438]/90 backdrop-blur-sm border border-[#4a4458]/40 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 max-w-[200px] sm:max-w-[240px] lg:max-w-none">

              <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold mb-1"
                    style={{ color: '#37b7c3' }}>200+</div>
                  <div className="text-[10px] sm:text-xs text-gray-400">Happy Clients</div>
                </div>
                <div className="w-px h-6 sm:h-7 lg:h-8 bg-[#4a4458]"></div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold mb-1"
                    style={{ color: '#071952' }}>500+</div>
                  <div className="text-[10px] sm:text-xs text-gray-400">Projects Done</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="" // Replace with your actual video URL
        title="Innovation Leaders - Client Success Stories"
        type="youtube"
      />
    </section>
  );
};

export default TestimonialSection;
