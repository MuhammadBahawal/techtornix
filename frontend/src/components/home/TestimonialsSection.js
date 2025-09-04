import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO',
      company: 'TechStart Inc.',
      avatar: '/images/avatars/sarah.jpg',
      rating: 5,
      text: 'Techtornix transformed our vision into reality with their exceptional web development skills. The team was professional, responsive, and delivered beyond our expectations.',
      project: 'E-commerce Platform'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'CTO',
      company: 'InnovateLab',
      avatar: '/images/avatars/michael.jpg',
      rating: 5,
      text: 'Working with Techtornix on our mobile app was a game-changer. Their expertise in React Native and attention to detail resulted in a flawless user experience.',
      project: 'Mobile Application'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Founder',
      company: 'DataFlow Solutions',
      avatar: '/images/avatars/emily.jpg',
      rating: 5,
      text: 'The AI solutions provided by Techtornix have revolutionized our data analytics. Their team understood our complex requirements and delivered innovative solutions.',
      project: 'AI Analytics Dashboard'
    },
    {
      id: 4,
      name: 'David Thompson',
      position: 'Product Manager',
      company: 'CloudTech',
      avatar: '/images/avatars/david.jpg',
      rating: 5,
      text: 'Exceptional service and outstanding results. Techtornix not only met our deadlines but also provided valuable insights that improved our overall product strategy.',
      project: 'SaaS Platform'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate testimonial cards
      gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 60,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section ref={sectionRef} className="container-custom">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience working with us.
          </p>
        </motion.div>
      </div>

      {/* Main Testimonial Carousel */}
      <div className="relative max-w-4xl mx-auto mb-12">
        <div className="relative overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="testimonial-card bg-white dark:bg-gray-800 p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="text-center">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <FiStar key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-gray-900 dark:text-white mb-8 leading-relaxed font-medium">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                {/* Client Info */}
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonials[currentIndex].position} at {testimonials[currentIndex].company}
                    </p>
                    <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">
                      Project: {testimonials[currentIndex].project}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-3 mb-12">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-primary-600 w-8'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* All Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="testimonial-card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group cursor-pointer"
            onClick={() => goToSlide(index)}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm leading-relaxed">
                  "{testimonial.text.substring(0, 120)}..."
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {testimonial.position} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
