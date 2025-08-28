import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiArrowLeft, 
  FiArrowRight, 
  FiCheck, 
  FiStar, 
  FiUsers, 
  FiClock,
  FiTrendingUp,
  FiShield
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ServiceDetail = () => {
  const { slug } = useParams();
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Service data based on slug
  const getServiceData = (slug) => {
    const services = {
      'website-development': {
        title: 'Website Development',
        slug: 'website-development',
        description: 'We create modern, responsive websites that not only look stunning but also perform exceptionally. Our web development services include everything from simple landing pages to complex web applications.',
        longDescription: 'Our website development service combines cutting-edge technology with creative design to deliver web solutions that drive business growth. We specialize in creating responsive, fast-loading, and SEO-optimized websites that provide exceptional user experiences across all devices.',
        features: [
          'Responsive Design',
          'SEO Optimization', 
          'Performance Optimization',
          'CMS Integration',
          'E-commerce Solutions',
          'Custom Web Applications',
          'API Development',
          'Database Design'
        ],
        technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'AWS'],
        clientsServed: 150,
        averageRating: 4.9,
        startingPrice: 2999,
        deliveryTime: '4-8 weeks',
      },
      'ios-development': {
        title: 'iOS Development',
        slug: 'ios-development',
        description: 'Build powerful, native iOS applications that deliver exceptional user experiences on iPhone and iPad devices.',
        longDescription: 'Our iOS development team creates stunning, high-performance mobile applications using the latest iOS technologies. We focus on creating intuitive user interfaces and seamless functionality that engages users and drives business growth.',
        features: [
          'Native iOS Development',
          'SwiftUI & UIKit',
          'App Store Optimization',
          'Push Notifications',
          'In-App Purchases',
          'Core Data Integration',
          'API Integration',
          'Performance Optimization'
        ],
        technologies: ['Swift', 'SwiftUI', 'UIKit', 'Core Data', 'Firebase', 'TestFlight'],
        clientsServed: 85,
        averageRating: 4.8,
        startingPrice: 4999,
        deliveryTime: '6-10 weeks',
      },
      'android-development': {
        title: 'Android Development',
        slug: 'android-development',
        description: 'Create robust Android applications that reach millions of users across diverse Android devices.',
        longDescription: 'Our Android development expertise spans from simple utility apps to complex enterprise solutions. We use modern Android development practices to ensure your app performs excellently across all Android devices.',
        features: [
          'Native Android Development',
          'Kotlin & Java',
          'Material Design',
          'Google Play Services',
          'Firebase Integration',
          'Room Database',
          'RESTful API Integration',
          'Performance Optimization'
        ],
        technologies: ['Kotlin', 'Java', 'Android Studio', 'Firebase', 'Room', 'Retrofit'],
        clientsServed: 92,
        averageRating: 4.7,
        startingPrice: 4499,
        deliveryTime: '6-10 weeks',
      },
      'saas-products': {
        title: 'SaaS Products',
        slug: 'saas-products',
        description: 'Build scalable Software-as-a-Service platforms that grow with your business and serve customers globally.',
        longDescription: 'We specialize in creating comprehensive SaaS solutions that handle everything from user management to billing, analytics, and scaling. Our SaaS products are built for reliability, security, and growth.',
        features: [
          'Multi-tenant Architecture',
          'User Management',
          'Subscription Billing',
          'Analytics Dashboard',
          'API Development',
          'Third-party Integrations',
          'Security & Compliance',
          'Auto-scaling Infrastructure'
        ],
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Stripe'],
        clientsServed: 45,
        averageRating: 4.9,
        startingPrice: 9999,
        deliveryTime: '12-16 weeks',
      },
      'ai-solutions': {
        title: 'AI Solutions',
        slug: 'ai-solutions',
        description: 'Harness the power of artificial intelligence to automate processes and gain valuable insights from your data.',
        longDescription: 'Our AI solutions help businesses leverage machine learning, natural language processing, and computer vision to solve complex problems and create intelligent applications that adapt and learn.',
        features: [
          'Machine Learning Models',
          'Natural Language Processing',
          'Computer Vision',
          'Predictive Analytics',
          'Chatbots & Virtual Assistants',
          'Data Processing Pipelines',
          'Model Deployment',
          'Performance Monitoring'
        ],
        technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'AWS SageMaker', 'Docker'],
        clientsServed: 28,
        averageRating: 4.8,
        startingPrice: 7999,
        deliveryTime: '8-12 weeks',
      },
      'uiux-design': {
        title: 'UI/UX Design',
        slug: 'uiux-design',
        description: 'Create beautiful, intuitive user interfaces and experiences that delight users and drive engagement.',
        longDescription: 'Our design team combines creativity with user research to create interfaces that are not only visually stunning but also highly functional and user-friendly. We focus on creating designs that convert visitors into customers.',
        features: [
          'User Research & Analysis',
          'Wireframing & Prototyping',
          'Visual Design',
          'Interaction Design',
          'Usability Testing',
          'Design Systems',
          'Responsive Design',
          'Accessibility Compliance'
        ],
        technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer'],
        clientsServed: 120,
        averageRating: 4.9,
        startingPrice: 3499,
        deliveryTime: '4-6 weeks',
      },
      'digital-marketing': {
        title: 'Digital Marketing',
        slug: 'digital-marketing',
        description: 'Grow your online presence and reach your target audience with comprehensive digital marketing strategies.',
        longDescription: 'Our digital marketing services help businesses build strong online presence, generate leads, and increase conversions through strategic SEO, social media marketing, content marketing, and paid advertising campaigns.',
        features: [
          'Search Engine Optimization',
          'Social Media Marketing',
          'Content Marketing',
          'Pay-Per-Click Advertising',
          'Email Marketing',
          'Analytics & Reporting',
          'Conversion Optimization',
          'Brand Strategy'
        ],
        technologies: ['Google Analytics', 'Google Ads', 'Facebook Ads', 'SEMrush', 'Mailchimp', 'HubSpot'],
        clientsServed: 200,
        averageRating: 4.7,
        startingPrice: 1999,
        deliveryTime: '2-4 weeks',
      },
      'iot-solutions': {
        title: 'IoT Solutions',
        slug: 'iot-solutions',
        description: 'Connect and control devices with intelligent IoT solutions that bridge the physical and digital worlds.',
        longDescription: 'Our IoT solutions help businesses create smart, connected systems that collect data, automate processes, and provide real-time insights. From smart homes to industrial automation, we build IoT systems that scale.',
        features: [
          'Device Connectivity',
          'Real-time Data Processing',
          'Cloud Integration',
          'Mobile App Control',
          'Analytics Dashboard',
          'Security Implementation',
          'Scalable Architecture',
          'Maintenance & Support'
        ],
        technologies: ['Arduino', 'Raspberry Pi', 'AWS IoT', 'MQTT', 'Node.js', 'React Native'],
        clientsServed: 35,
        averageRating: 4.6,
        startingPrice: 6999,
        deliveryTime: '8-12 weeks',
      }
    };

    return services[slug] || services['website-development'];
  };

  const service = getServiceData(slug);

  // Common testimonials and process data
  const commonData = {
    testimonials: [
      {
        name: 'Sarah Johnson',
        company: 'TechStart Inc.',
        rating: 5,
        text: 'Techtornix delivered an exceptional website that exceeded our expectations. The design is beautiful and the performance is outstanding.',
        avatar: '/images/avatars/sarah.jpg'
      },
      {
        name: 'Michael Chen',
        company: 'InnovateLab',
        rating: 5,
        text: 'Professional team with excellent communication. They understood our requirements perfectly and delivered on time.',
        avatar: '/images/avatars/michael.jpg'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Discovery & Planning',
        description: 'We analyze your requirements, target audience, and business goals to create a comprehensive project plan.',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Design & Prototyping',
        description: 'Our design team creates wireframes and prototypes to visualize the user experience and interface.',
        duration: '2-3 weeks'
      },
      {
        step: 3,
        title: 'Development & Testing',
        description: 'We build your solution using modern technologies and conduct thorough testing to ensure quality.',
        duration: '3-4 weeks'
      },
      {
        step: 4,
        title: 'Launch & Support',
        description: 'We deploy your solution and provide ongoing support and maintenance to keep it running smoothly.',
        duration: 'Ongoing'
      }
    ],
    packages: [
      {
        name: 'Starter',
        price: service.startingPrice,
        description: 'Perfect for small businesses and startups',
        features: [
          'Basic implementation',
          'Standard features',
          'Email support',
          '3 months support'
        ]
      },
      {
        name: 'Professional',
        price: Math.round(service.startingPrice * 1.8),
        description: 'Ideal for growing businesses',
        features: [
          'Advanced features',
          'Custom integrations',
          'Priority support',
          '6 months support',
          'Analytics setup'
        ],
        popular: true
      },
      {
        name: 'Enterprise',
        price: Math.round(service.startingPrice * 3.2),
        description: 'For large organizations',
        features: [
          'Full customization',
          'Advanced integrations',
          'Performance optimization',
          '12 months support',
          'Dedicated support'
        ]
      }
    ]
  };

  // Merge service data with common data
  const fullService = { ...service, ...commonData };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.utils.toArray('.animate-section').forEach((section, index) => {
        gsap.fromTo(section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'process', label: 'Process' },
    { id: 'packages', label: 'Packages' },
    { id: 'testimonials', label: 'Testimonials' }
  ];

  return (
    <>
      <Helmet>
        <title>{fullService.title} - Techtornix Services</title>
        <meta name="description" content={fullService.description} />
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
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  {fullService.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {fullService.longDescription}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center space-x-2">
                    <FiStar className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {fullService.averageRating}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiUsers className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {fullService.clientsServed}+
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">clients served</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiClock className="w-5 h-5 text-green-600" />
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {fullService.deliveryTime}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">delivery</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="btn-primary">
                    Get Started
                    <FiArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link to="/portfolio" className="btn-outline">
                    View Examples
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Starting from
                  </h3>
                  <div className="text-4xl font-bold gradient-text mb-4">
                    ${fullService.startingPrice.toLocaleString()}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Get a custom quote based on your specific requirements
                  </p>
                  <Link to="/contact" className="w-full btn-primary">
                    Request Quote
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="border-b border-gray-200 dark:border-gray-700 sticky top-20 bg-white dark:bg-gray-900 z-40">
          <div className="container-custom">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* Tab Content */}
        <section className="section-padding">
          <div className="container-custom">
            {activeTab === 'overview' && (
              <div className="animate-section">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      What's Included
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {fullService.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <FiCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      Technologies We Use
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {fullService.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-8 grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <FiTrendingUp className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">99%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <FiShield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Secure</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <FiUsers className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'process' && (
              <div className="animate-section">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                  Our Development Process
                </h2>
                <div className="space-y-8">
                  {fullService.process.map((step, index) => (
                    <div key={step.step} className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {step.title}
                          </h3>
                          <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'packages' && (
              <div className="animate-section">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                  Choose Your Package
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {fullService.packages.map((pkg, index) => (
                    <div
                      key={pkg.name}
                      className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                        pkg.popular
                          ? 'border-primary-600 scale-105'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {pkg.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {pkg.description}
                        </p>
                        <div className="text-4xl font-bold gradient-text">
                          ${pkg.price.toLocaleString()}
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-3">
                            <FiCheck className="w-5 h-5 text-green-600" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        to="/contact"
                        className={`w-full btn ${
                          pkg.popular ? 'btn-primary' : 'btn-outline'
                        }`}
                      >
                        Get Started
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="animate-section">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                  What Our Clients Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {fullService.testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        "{testimonial.text}"
                      </blockquote>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
                            {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Let's discuss your requirements and create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Get Free Consultation
                </Link>
                <Link to="/services" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600">
                  <FiArrowLeft className="w-5 h-5 mr-2" />
                  Back to Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default ServiceDetail;
