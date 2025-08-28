import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiGlobe, 
  FiSmartphone, 
  FiCode, 
  FiCpu, 
  FiImage, 
  FiTrendingUp, 
  FiWifi,
  FiArrowRight,
  FiUsers,
  FiStar
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Website Development',
      slug: 'website-development',
      icon: FiGlobe,
      shortDescription: 'Custom web solutions that drive business growth',
      description: 'We create modern, responsive websites that not only look stunning but also perform exceptionally. Our web development services include everything from simple landing pages to complex web applications.',
      features: ['Responsive Design', 'SEO Optimization', 'Performance Optimization', 'CMS Integration'],
      technologies: ['React', 'Next.js', 'Node.js', 'MongoDB'],
      clientsServed: 150,
      averageRating: 4.9,
      startingPrice: 2999,
      color: 'from-blue-500 to-cyan-500',
      image: '/images/services/web-development.jpg'
    },
    {
      id: 2,
      title: 'iOS Development',
      slug: 'ios-development',
      icon: FiSmartphone,
      shortDescription: 'Native iOS apps that users love',
      description: 'Build powerful iOS applications that provide seamless user experiences. We develop native iOS apps using Swift and modern iOS frameworks.',
      features: ['Native Performance', 'App Store Optimization', 'Push Notifications', 'In-App Purchases'],
      technologies: ['Swift', 'SwiftUI', 'Core Data', 'CloudKit'],
      clientsServed: 85,
      averageRating: 4.8,
      startingPrice: 4999,
      color: 'from-gray-600 to-gray-800',
      image: '/images/services/ios-development.jpg'
    },
    {
      id: 3,
      title: 'Android Development',
      slug: 'android-development',
      icon: FiSmartphone,
      shortDescription: 'Scalable Android applications',
      description: 'Create robust Android applications that reach millions of users. We use Kotlin and modern Android development practices.',
      features: ['Material Design', 'Google Play Optimization', 'Firebase Integration', 'Offline Support'],
      technologies: ['Kotlin', 'Jetpack Compose', 'Room', 'Firebase'],
      clientsServed: 92,
      averageRating: 4.7,
      startingPrice: 4499,
      color: 'from-green-500 to-emerald-500',
      image: '/images/services/android-development.jpg'
    },
    {
      id: 4,
      title: 'SaaS Products',
      slug: 'saas-products',
      icon: FiCode,
      shortDescription: 'Complete SaaS solutions from idea to launch',
      description: 'We help you build and launch successful SaaS products with scalable architecture, subscription management, and user analytics.',
      features: ['Multi-tenant Architecture', 'Subscription Management', 'Analytics Dashboard', 'API Development'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      clientsServed: 45,
      averageRating: 4.9,
      startingPrice: 9999,
      color: 'from-purple-500 to-pink-500',
      image: '/images/services/saas-products.jpg'
    },
    {
      id: 5,
      title: 'AI Solutions',
      slug: 'ai-solutions',
      icon: FiCpu,
      shortDescription: 'Intelligent solutions powered by AI',
      description: 'Leverage the power of artificial intelligence to automate processes, gain insights, and create intelligent applications.',
      features: ['Machine Learning Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI'],
      clientsServed: 38,
      averageRating: 4.8,
      startingPrice: 7999,
      color: 'from-orange-500 to-red-500',
      image: '/images/services/ai-solutions.jpg'
    },
    {
      id: 6,
      title: 'UI/UX Design',
      slug: 'uiux-design',
      icon: FiImage,
      shortDescription: 'Beautiful designs that convert',
      description: 'Create stunning user interfaces and experiences that engage users and drive conversions. Our design process is user-centered and data-driven.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision'],
      clientsServed: 120,
      averageRating: 4.9,
      startingPrice: 1999,
      color: 'from-pink-500 to-rose-500',
      image: '/images/services/uiux-design.jpg'
    },
    {
      id: 7,
      title: 'Digital Marketing',
      slug: 'digital-marketing',
      icon: FiTrendingUp,
      shortDescription: 'Data-driven marketing strategies',
      description: 'Grow your business with comprehensive digital marketing strategies including SEO, social media, and paid advertising.',
      features: ['SEO Optimization', 'Social Media Marketing', 'PPC Campaigns', 'Content Marketing'],
      technologies: ['Google Analytics', 'Google Ads', 'Facebook Ads', 'SEMrush'],
      clientsServed: 95,
      averageRating: 4.7,
      startingPrice: 1499,
      color: 'from-yellow-500 to-orange-500',
      image: '/images/services/digital-marketing.jpg'
    },
    {
      id: 8,
      title: 'IoT Solutions',
      slug: 'iot-solutions',
      icon: FiWifi,
      shortDescription: 'Connected devices and smart systems',
      description: 'Build IoT solutions that connect devices, collect data, and provide intelligent automation for homes and businesses.',
      features: ['Device Connectivity', 'Real-time Monitoring', 'Data Analytics', 'Cloud Integration'],
      technologies: ['Arduino', 'Raspberry Pi', 'AWS IoT', 'MQTT'],
      clientsServed: 28,
      averageRating: 4.8,
      startingPrice: 5999,
      color: 'from-teal-500 to-cyan-500',
      image: '/images/services/iot-solutions.jpg'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate service cards
      gsap.utils.toArray('.service-card').forEach((card, index) => {
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
            delay: index * 0.1,
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
    <>
      <Helmet>
        <title>Our Services - Techtornix | Web Development, Mobile Apps, AI Solutions</title>
        <meta name="description" content="Explore our comprehensive range of services including web development, mobile app development, AI solutions, UI/UX design, and digital marketing. Transform your business with Techtornix." />
        <meta name="keywords" content="web development services, mobile app development, AI solutions, UI UX design, digital marketing, SaaS development, IoT solutions" />
      </Helmet>

      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen pt-8"
      >
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                We offer a comprehensive range of technology services to help your business thrive in the digital age. 
                From web development to AI solutions, we've got you covered.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    className="service-card group"
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                    whileHover={{ y: -10 }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full">
                      {/* Service Image/Icon */}
                      <div className={`relative h-48 bg-gradient-to-br ${service.color} overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="w-20 h-20 text-white" />
                        </div>
                        
                        {/* Hover overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                      </div>

                      {/* Service Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                            {service.title}
                          </h3>
                          <div className="flex items-center space-x-1 text-yellow-400">
                            <FiStar className="w-4 h-4 fill-current" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {service.averageRating}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                          {service.shortDescription}
                        </p>

                        <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Features */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                          <div className="grid grid-cols-2 gap-1">
                            {service.features.slice(0, 4).map((feature, idx) => (
                              <div key={idx} className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`}></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {service.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between mb-6 text-sm">
                          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                            <FiUsers className="w-4 h-4" />
                            <span>{service.clientsServed}+ clients</span>
                          </div>
                          <div className="text-primary-600 dark:text-primary-400 font-semibold">
                            From ${service.startingPrice.toLocaleString()}
                          </div>
                        </div>

                        {/* CTA */}
                        <Link
                          to={`/services/${service.slug}`}
                          className="w-full btn-primary group/btn"
                        >
                          <span>Learn More</span>
                          <FiArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary-600 to-accent-600">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Let's discuss your project requirements and find the perfect solution for your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="btn bg-white text-primary-600 hover:bg-gray-100"
                >
                  Get Free Consultation
                </Link>
                <Link
                  to="/portfolio"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600"
                >
                  View Our Work
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Services;
