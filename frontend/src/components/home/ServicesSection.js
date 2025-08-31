
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaMobile, 
  FaCode, 
  FaRobot, 
  FaWifi,
  FaPalette,
  FaBullhorn,
  FaCloud,
  FaShoppingCart
} from 'react-icons/fa';

const ServicesSection = () => {
  const services = [
    {
      id: 'mobile-development',
      title: 'Mobile App Development',
      description: 'We build high-performance mobile apps for iOS and Android, focusing on custom mobile application development and user engagement.',
      icon: FaMobile,
      color: '#00D4FF',
      link: '/services/mobile-development'
    },
    {
      id: 'web-development',
      title: 'Website Development',
      description: 'Custom web application development services designed for speed, security & SEO optimization, ensuring maximum online visibility & performance.',
      icon: FaCode,
      color: '#61DAFB',
      link: '/services/web-development'
    },
    {
      id: 'ai-solutions',
      title: 'AI Based Solutions',
      description: 'Leverage enterprise AI solutions to fully automate business processes, improve decision-making & enhance customers interactions with cutting-edge systems.',
      icon: FaRobot,
      color: '#FF6B6B',
      link: '/services/ai-solutions'
    },
    {
      id: 'iot-solutions',
      title: 'IoT-Based Solutions',
      description: 'Integrate IoT-based solutions into your business operations to automate data collection & remote device control for optimized performance.',
      icon: FaWifi,
      color: '#4ECDC4',
      link: '/services/iot-solutions'
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description: 'Create intuitive and engaging user experiences with modern design principles that convert visitors into customers.',
      icon: FaPalette,
      color: '#FFE66D',
      link: '/services/ui-ux-design'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to boost your online presence and drive measurable business growth.',
      icon: FaBullhorn,
      color: '#FF8E53',
      link: '/services/digital-marketing'
    },
    {
      id: 'cloud-services',
      title: 'Cloud Services',
      description: 'Scalable cloud infrastructure solutions for modern businesses with enterprise-grade security and performance.',
      icon: FaCloud,
      color: '#A8E6CF',
      link: '/services/cloud-services'
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Solutions',
      description: 'Complete e-commerce platforms with payment integration, inventory management, and customer analytics.',
      icon: FaShoppingCart,
      color: '#DDA0DD',
      link: '/services/ecommerce'
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
  <div className="container-custom">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            We offer a wide range of services to help your business grow and succeed in the digital age.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="h-full"
              >
                <Link
                  to={service.link}
                  className="group block bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  tabIndex={0}
                >
                  <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-4 mx-auto bg-gray-200 dark:bg-gray-700 group-hover:bg-primary-100 dark:group-hover:bg-primary-900 transition-colors duration-300">
                    <Icon className="text-3xl sm:text-4xl text-primary-600 dark:text-primary-400 drop-shadow-lg transition-colors duration-300" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 text-center group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm text-center mb-2 sm:mb-4">
                    {service.description}
                  </p>
                  <span className="flex items-center justify-center bg-gray-100 dark:bg-transparent text-primary-600 dark:text-primary-400 font-medium rounded px-3 py-1 mt-2 text-xs sm:text-sm group-hover:bg-primary-50 dark:group-hover:bg-primary-900 transition-colors duration-200">
                    Learn More <span className="ml-1"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg></span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
          </div>
      </div>
    </section>
  );
};

export default ServicesSection;
       