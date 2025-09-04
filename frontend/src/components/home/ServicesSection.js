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
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Why Choose</span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Techtornix
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tailored Services For Every Vision
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <Link to={service.link} className="block h-full">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-transparent relative overflow-hidden h-full flex flex-col">
                  {/* Background Gradient on Hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                    style={{ background: `linear-gradient(135deg, ${service.color}20, ${service.color}05)` }}
                  ></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${service.color}15` }}
                    >
                      <service.icon 
                        className="w-8 h-8 transition-colors duration-300" 
                        style={{ color: service.color }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-500 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Border Effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ 
                      background: `linear-gradient(45deg, ${service.color}40, transparent, ${service.color}40)`,
                      padding: '2px'
                    }}
                  >
                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl"></div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Ready to transform your business with cutting-edge technology?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
