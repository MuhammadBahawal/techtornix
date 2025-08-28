import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiExternalLink, 
  FiGithub, 
  FiFilter, 
  FiX,
  FiArrowRight,
  FiCalendar,
  FiUsers,
  FiTrendingUp
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Projects', count: 12 },
    { id: 'web', name: 'Web Development', count: 5 },
    { id: 'mobile', name: 'Mobile Apps', count: 3 },
    { id: 'ai', name: 'AI Solutions', count: 2 },
    { id: 'saas', name: 'SaaS Products', count: 2 }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      description: 'A modern e-commerce platform with advanced features including real-time inventory, AI-powered recommendations, and seamless payment integration.',
      image: '/images/projects/ecommerce.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      client: 'RetailCorp Inc.',
      duration: '6 months',
      teamSize: 5,
      projectUrl: 'https://example-ecommerce.com',
      githubUrl: 'https://github.com/techtornix/ecommerce',
      featured: true
    },
    {
      id: 2,
      title: 'Healthcare Mobile App',
      category: 'mobile',
      description: 'A comprehensive healthcare app connecting patients with doctors, featuring telemedicine, appointment booking, and health tracking.',
      image: '/images/projects/healthcare.jpg',
      technologies: ['React Native', 'Firebase', 'WebRTC', 'Node.js'],
      client: 'MedCare Solutions',
      duration: '8 months',
      teamSize: 6,
      projectUrl: 'https://medcare-app.com',
      githubUrl: 'https://github.com/techtornix/healthcare-app',
      featured: true
    },
    {
      id: 3,
      title: 'AI Analytics Dashboard',
      category: 'ai',
      description: 'An intelligent analytics dashboard that provides real-time insights and predictive analytics for business decision making.',
      image: '/images/projects/ai-dashboard.jpg',
      technologies: ['Python', 'TensorFlow', 'React', 'D3.js', 'PostgreSQL'],
      client: 'DataFlow Solutions',
      duration: '10 months',
      teamSize: 4,
      projectUrl: 'https://dataflow-analytics.com',
      githubUrl: 'https://github.com/techtornix/ai-analytics',
      featured: true
    },
    {
      id: 4,
      title: 'Project Management SaaS',
      category: 'saas',
      description: 'A comprehensive project management platform with team collaboration, time tracking, and advanced reporting features.',
      image: '/images/projects/project-saas.jpg',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      client: 'TaskFlow Inc.',
      duration: '12 months',
      teamSize: 8,
      projectUrl: 'https://taskflow-saas.com',
      githubUrl: 'https://github.com/techtornix/project-saas',
      featured: false
    },
    {
      id: 5,
      title: 'Restaurant Website & App',
      category: 'web',
      description: 'A modern restaurant website with online ordering, table reservations, and customer management system.',
      image: '/images/projects/restaurant.jpg',
      technologies: ['Next.js', 'React Native', 'Node.js', 'MongoDB'],
      client: 'Gourmet Bistro',
      duration: '4 months',
      teamSize: 4,
      projectUrl: 'https://gourmet-bistro.com',
      githubUrl: 'https://github.com/techtornix/restaurant-app',
      featured: false
    },
    {
      id: 6,
      title: 'Fitness Tracking App',
      category: 'mobile',
      description: 'A comprehensive fitness app with workout tracking, nutrition planning, and social features.',
      image: '/images/projects/fitness.jpg',
      technologies: ['Flutter', 'Firebase', 'Node.js', 'MongoDB'],
      client: 'FitLife Technologies',
      duration: '6 months',
      teamSize: 5,
      projectUrl: 'https://fitlife-app.com',
      githubUrl: 'https://github.com/techtornix/fitness-app',
      featured: false
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, delay: index * 0.1,
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
  }, [filteredProjects]);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <Helmet>
        <title>Portfolio - Techtornix | Our Best Work & Case Studies</title>
        <meta name="description" content="Explore our portfolio of successful projects including web applications, mobile apps, AI solutions, and SaaS products." />
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
                Our <span className="gradient-text">Portfolio</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Discover our successful projects and see how we've helped businesses 
                transform their digital presence with innovative solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 bg-white dark:bg-gray-900 sticky top-20 z-40 border-b border-gray-200 dark:border-gray-700">
          <div className="container-custom">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiFilter className="w-4 h-4" />
                  <span>{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="project-card group cursor-pointer"
                    onClick={() => openModal(project)}
                    whileHover={{ y: -10 }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                      {/* Project Image */}
                      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl font-bold text-white/30">
                            {project.title.split(' ')[0]}
                          </div>
                        </div>
                        
                        {project.featured && (
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-xs font-bold">
                              FEATURED
                            </span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="text-white font-medium">View Details</div>
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium capitalize">
                            {project.category}
                          </span>
                          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm">
                            <FiCalendar className="w-4 h-4" />
                            <span>{project.duration}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                          {project.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Project Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <FiUsers className="w-4 h-4" />
                            <span>{project.teamSize} team members</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FiTrendingUp className="w-4 h-4" />
                            <span>{project.client}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
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
                Let's create something amazing together. Contact us to discuss your project requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Start Your Project
                  <FiArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/services" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600">
                  View Our Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>

      {/* Simple Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Client</span>
                  <div className="font-medium text-gray-900 dark:text-white">{selectedProject.client}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Duration</span>
                  <div className="font-medium text-gray-900 dark:text-white">{selectedProject.duration}</div>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Technologies</span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-lg text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedProject.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary"
                >
                  <FiExternalLink className="w-5 h-5 mr-2" />
                  View Live
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-outline"
                >
                  <FiGithub className="w-5 h-5 mr-2" />
                  View Code
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;
