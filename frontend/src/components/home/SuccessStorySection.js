import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiTrendingUp, FiUsers, FiAward, FiClock } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const SuccessStorySection = () => {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);

  const stats = [
    {
      icon: FiClock,
      number: 5,
      suffix: '+',
      label: 'Years of Working',
      description: 'Delivering excellence since 2019',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiTrendingUp,
      number: 500,
      suffix: '+',
      label: 'Solutions Delivered',
      description: 'Innovative solutions across industries',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiAward,
      number: 450,
      suffix: '+',
      label: 'Projects Completed',
      description: 'Successfully delivered on time',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiUsers,
      number: 200,
      suffix: '+',
      label: 'Satisfied Clients',
      description: 'Building lasting partnerships',
      color: 'from-orange-500 to-red-500'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate counters
      countersRef.current.forEach((counter, index) => {
        if (counter) {
          const stat = stats[index];
          const obj = { value: 0 };
          
          gsap.to(obj, {
            value: stat.number,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              counter.textContent = Math.round(obj.value);
            },
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          });
        }
      });

      // Animate stat cards
      gsap.utils.toArray('.stat-card').forEach((card, index) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 60,
            scale: 0.8
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

  return (
    <section 
      ref={sectionRef} 
      className="container-custom"
      style={{ 
        isolation: 'isolate',
        position: 'relative',
        zIndex: 1,
        display: 'block !important',
        visibility: 'visible !important',
        opacity: '1 !important'
      }}
    >
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Success is Our <span className="gradient-text">Story</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Numbers that speak for themselves. We've built a track record of delivering 
            exceptional results and creating lasting value for our clients.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="stat-card relative group h-full"
              whileHover={{ y: -10 }}
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Number */}
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span 
                      ref={el => countersRef.current[index] = el}
                      className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
                    >
                      0
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white ml-1">
                      {stat.suffix}
                    </span>
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow">
                  {stat.description}
                </p>

                {/* Hover effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional content */}
      <div className="mt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Be Our Next Success Story?
          </h3>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg">
            Join hundreds of satisfied clients who have transformed their businesses with our innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.a>
            <motion.a
              href="/portfolio"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Work
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStorySection;
