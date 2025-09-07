import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiArrowLeft,
  FiExternalLink,
  FiGithub,
  FiCalendar,
  FiUsers,
  FiCode,
  FiTrendingUp
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const PortfolioDetail = () => {
  const { slug } = useParams();
  const sectionRef = useRef(null);
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);

  // Mock project data - in real app, fetch from API
  const mockProject = {
    id: 1,
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    category: 'Web Development',
    description: 'A modern, scalable e-commerce platform built with React and Node.js',
    longDescription: `
      This comprehensive e-commerce platform was designed to handle high-traffic loads while providing 
      an exceptional user experience. Built with modern technologies and best practices, it features 
      real-time inventory management, secure payment processing, and advanced analytics.
    `,
    client: 'TechCorp Solutions',
    duration: '6 months',
    teamSize: '5 developers',
  // technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'AWS', 'Docker'],
    features: [
      'Real-time inventory management',
      'Secure payment processing with Stripe',
      'Advanced search and filtering',
      'Mobile-responsive design',
      'Admin dashboard with analytics',
      'Multi-language support',
      'SEO optimized',
      'Performance monitoring'
    ],
    challenges: [
      'Handling high concurrent users during peak sales',
      'Implementing complex inventory synchronization',
      'Ensuring PCI compliance for payment processing',
      'Optimizing page load speeds for mobile users'
    ],
    solutions: [
      'Implemented Redis caching and database optimization',
      'Built real-time sync system using WebSockets',
      'Integrated Stripe for secure, compliant payments',
      'Used lazy loading and image optimization techniques'
    ],
    results: [
      '40% increase in conversion rate',
      '60% reduction in page load time',
      '99.9% uptime during peak traffic',
      '25% increase in mobile sales'
    ],
    images: [
      '/images/portfolio/ecommerce-1.jpg',
      '/images/portfolio/ecommerce-2.jpg',
      '/images/portfolio/ecommerce-3.jpg'
    ],
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/techtornix/ecommerce-platform',
    date: '2024-12-15',
    featured: true
  };

  const mockRelatedProjects = [
    {
      id: 2,
      title: 'Mobile Banking App',
      slug: 'mobile-banking-app',
      category: 'Mobile Development',
      description: 'Secure mobile banking application with biometric authentication',
      image: '/images/portfolio/banking-app.jpg'
    },
    {
      id: 3,
      title: 'AI-Powered CRM',
      slug: 'ai-powered-crm',
      category: 'AI Solutions',
      description: 'Customer relationship management system with AI insights',
      image: '/images/portfolio/ai-crm.jpg'
    }
  ];

  useEffect(() => {
    // In real app, fetch project by slug
    setProject(mockProject);
    setRelatedProjects(mockRelatedProjects);
  }, [slug]);

  useEffect(() => {
    if (project) {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.fade-in-section').forEach((section, index) => {
          gsap.fromTo(section,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0,
              duration: 0.6, delay: index * 0.1,
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
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots mb-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} - Techtornix Portfolio</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen pt-8"
      >
        {/* Back Button */}
        <section className="py-8">
          <div className="container-custom">
            <Link
              to="/portfolio"
              className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
                  {project.category}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <FiExternalLink className="w-5 h-5 mr-2" />
                      View Live Site
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                    >
                      <FiGithub className="w-5 h-5 mr-2" />
                      View Code
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <FiCalendar className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{project.duration}</p>
                  </div>
                  <div>
                    <FiUsers className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Team Size</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{project.teamSize}</p>
                  </div>
                  <div>
                    <FiCode className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{project.client}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative h-96 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-white/30">
                      {project.title.split(' ')[0]}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="section-padding fade-in-section">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Project Overview
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-center">
                {project.longDescription}
              </p>
            </div>
          </div>
        </section>

  {/* Technologies section removed as requested */}

        {/* Features & Challenges */}
        <section className="section-padding fade-in-section">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Features */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Key Features
                </h3>
                <ul className="space-y-4">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Challenges Faced
                </h3>
                <ul className="space-y-4">
                  {project.challenges.map((challenge, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-400">{challenge}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions & Results */}
        <section className="section-padding bg-gray-50 dark:bg-gray-800 fade-in-section">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Solutions */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Solutions Implemented
                </h3>
                <ul className="space-y-4">
                  {project.solutions.map((solution, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-400">{solution}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Results Achieved
                </h3>
                <ul className="space-y-4">
                  {project.results.map((result, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <FiTrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{result}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="section-padding fade-in-section">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                Related Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {relatedProjects.map((relatedProject, index) => (
                  <motion.div
                    key={relatedProject.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <Link to={`/portfolio/${relatedProject.slug}`} className="block">
                      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-gray-700 dark:to-gray-600">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-xl font-bold text-white/30">
                              {relatedProject.title.split(' ')[0]}
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
                            {relatedProject.category}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-3 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                            {relatedProject.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {relatedProject.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </motion.div>
    </>
  );
};

export default PortfolioDetail;
