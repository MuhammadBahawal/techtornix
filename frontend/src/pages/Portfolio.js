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

// Portfolio Projects Data with public image paths and consistent technologies
const portfolioProjects = [
  {
    id: 1,
    title: 'Jakba Solutions',
    category: 'Software Company',
    description: 'We created a professional website for Jakba Solutions, a leading software house delivering innovative digital solutions. The platform showcases their expertise in custom software development, web and mobile applications, and digital transformation services. With a modern, SEO-friendly, and responsive design, the website highlights their portfolio, services, and client success stories to strengthen their online presence and attract potential clients.',
    image: '/images/jakba.png',
    // technologies: ['Angular', 'Laravel', 'MySQL', 'Three.js', 'Google Maps API'],
    client: 'Jakba Solutions',
    duration: '3 months',
    teamSize: 4,
    projectUrl: 'https://jakba.netlify.app',
    githubUrl: 'https://github.com/techtornix',
    featured: false
  },
  {
    id: 2,
    title: 'LIDS Group of Colleges',
    category: 'Education',
    description: 'We designed and developed the official website for LIDS Group of Colleges (Lyallpur Institute of Digital Computing). The platform showcases their academic programs, admissions, faculty, and student-focused initiatives with a modern, responsive, and user-friendly design that reflects their commitment to educational excellence.',
    image: '/images/lidsCollege.png',
    // technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    client: 'LIDS Group of Colleges',
    duration: '4 months',
    teamSize: 5,
    projectUrl: 'https://www.lidc.com.pk/',
    githubUrl: 'https://github.com/techtornix/',
    featured: true

  },
  {
    id: 3,
    title: 'Tech-Hub Innovations',
    category: 'Education',
    description: 'We designed and developed the official website for Tech-Hub Innovations, a government-recognized training institute partnered with NAVTTC and the Government of Pakistan. The website showcases their skill development programs, certified courses, admissions, and success stories. With a clean, responsive, and user-friendly interface, the platform makes it easier for students to explore programs, apply online, and stay connected with the institute.',
    image: '/images/techhub.png',
    // technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    client: 'TechHub Innovations',
    duration: '5 months',
    teamSize: 4,
    projectUrl: 'https://techhub-demo.com',
    githubUrl: 'https://github.com/techtornix/',
    featured: true

  },
  {
    id: 4,
    title: 'TeqTronics Solutions',
    category: 'software Company',
    description: 'We developed the official website for TeqTronics Solutions, a global software company providing innovative web, mobile, and AI-powered solutions. The platform highlights their services, products, and expertise, while offering a modern, scalable, and user-friendly interface to attract international clients.',
    image: '/images/teqtronics.png',
    // technologies: ['React', 'Node.js', 'MongoDB'],
    client: 'TeqTronics Solutions',
    duration: '4 months',
    teamSize: 5,
    projectUrl: 'https://www.teqtronics.com/',
    githubUrl: 'https://github.com/techtornix',
    featured: true
  },
  {
    id: 5,
    title: 'CravyCrunch Restaurant',
    category: 'Restaurant Website',
    description: 'We developed a modern and responsive website for CravyCrunch, a UK-based restaurant known for its delicious cuisine and exceptional dining experience. The platform features an interactive food menu, online table reservations, and integrated food ordering options. With a clean, SEO-friendly design and mobile-first approach, the website helps CravyCrunch engage customers, boost online visibility, and provide a seamless digital experience.',
    image: '/images/cravycrunch.png',
    // technologies: ['React', 'Express.js', 'MongoDB', 'Stripe', 'AWS'],
    client: 'CravyCrunch Restaurant',
    duration: '4 months',
    teamSize: 5,
    projectUrl: 'https://cravycrunch.co.uk',
    githubUrl: 'https://github.com/techtornix',
    featured: true

  },
  {
    id: 6,
    title: 'HyperNexis Solutions',
    category: 'Software Company',
    description: 'We built the official website for HyperNexis Solutions, a modern software house providing innovative digital services. The platform highlights their expertise in web and mobile app development, AI-powered solutions, and enterprise software. With a professional, SEO-friendly design and responsive interface, the website strengthens their brand identity, showcases their portfolio, and helps attract potential clients.',
    image: '/images/hypr.webp',
    // technologies: ['React', 'Node.js', 'MongoDB', 'Next.js', 'AWS'],
    client: 'HyperNexis Solutions',
    duration: '5 months',
    teamSize: 6,
    projectUrl: 'https://hypernexis.netlify.app',
    githubUrl: 'https://github.com/techtornix/',
    featured: false

  },
  {
    id: 7,
    title: 'Color-On Paints',
    category: 'Manufacturing & Retail',
    description: 'We developed a professional website for Color-On, a company specializing in premium paints and coatings. The platform highlights their wide range of paint products, wall finishes, and industrial solutions. With an SEO-friendly design, interactive product showcase, and user-friendly navigation, the website helps Color-On build a strong digital presence, engage customers, and increase sales both online and offline.',
    image: '/images/coloron.png',
    // technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS S3'],
    client: 'Color-On Paints',
    duration: '3 months',
    teamSize: 3,
    projectUrl: 'https://color-on.in',
    githubUrl: 'https://github.com/techtornix/',
    featured: false

  },
  {
    id: 8,
    title: 'TribeDishes Restaurant',
    category: 'Restaurant Website',
    description: 'We developed a modern website for TribeDishes, a restaurant specializing in authentic African cuisine. The platform showcases their diverse menu, cultural dining experience, and easy online food ordering. With an SEO-friendly design, mobile-first approach, and integrated table reservation system, the website helps TribeDishes attract food lovers, boost online visibility, and deliver a seamless digital experience for customers.',
    image: '/images/tribe.png',
    // technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    client: 'TribeDishes Restaurant',
    duration: '4 months',
    teamSize: 4,
    projectUrl: 'https://tribedishes.com/',
    githubUrl: 'https://github.com/techtornix/',
    featured: false

  },
  {
    id: 9,
    title: 'DNA Hormonal Health',
    category: 'E-Commerce',
    description: 'We developed the official e-commerce website for DNA Hormonal Health, a leading provider of natural testosterone support supplements. The platform highlights their product range, benefits like increased energy, deeper sleep, sharper focus, and improved mood, along with age-specific messaging. With a modern, SEO-friendly, and mobile-responsive design, the website provides an engaging shopping experience, seamless product navigation, and boosts online sales and brand visibility.',
    image: '/images/dna.jpg',
    // technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    client: 'DNA Hormonal Health',
    duration: '6 months',
    teamSize: 5,
    projectUrl: 'https://dnahormonalhealth.com',
    githubUrl: 'https://github.com/techtornix/dna-hormonal-health',
    featured: true
  }
];

const Portfolio = () => {
  const sectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects] = useState(portfolioProjects);
  const [loading] = useState(false);

  // Generate categories from projects
  const categories = React.useMemo(() => {
    const categoryMap = new Map();
    categoryMap.set('all', { id: 'all', name: 'All Projects', count: projects.length });

    projects.forEach(project => {
      const cat = project.category.toLowerCase().replace(/\s+/g, '-');
      if (categoryMap.has(cat)) {
        categoryMap.get(cat).count++;
      } else {
        categoryMap.set(cat, {
          id: cat,
          name: project.category,
          count: 1
        });
      }
    });

    return Array.from(categoryMap.values());
  }, [projects]);

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory);

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
        className="min-h-screen pt-8 "
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
            <div className="flex justify-center">
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-10 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-[200px] cursor-pointer"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FiFilter className="w-4 h-4 text-gray-400" />
                </div>
              </div>
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
                    className="project-card group cursor-pointer h-full"
                    onClick={() => openModal(project)}
                    whileHover={{ y: -10 }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
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
                      <div className="p-6 flex-1 flex flex-col">
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

                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed flex-1 min-h-[4.5rem]">
                          {project.description.length > 120
                            ? `${project.description.substring(0, 120)}...`
                            : project.description}
                        </p>

                        {/* Technologies section removed as requested */}

                        {/* Project Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto">
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-9999999"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-6 z-9999999 max-h-[90vh] overflow-y-auto flex flex-col"
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

              <div className="mb-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
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

              {/* Technologies section removed as requested */}

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