import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const sectionRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'A modern e-commerce platform with advanced features including real-time inventory, and seamless payment integration.',
      image: '/images/ecommerce.jpg',
  // technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: 'https://dnahormonalhealth.com/',
      github: 'https://github.com/muhammadBahawal/',
      featured: true
    },
    {
      id: 2,
      title: 'Tech Hub Institute',
      category: 'Education',
      description: 'A platform for tech education and community building, offering courses, events, and networking opportunities.',
      image: '/images/techhub.png',
  // technologies: ['React', 'Firebase', 'Node.js'],
      link: 'https://techhubsystems.com/',
      github: 'https://github.com/muhammadBahawal/',
      featured: true
    },
    {
      id: 3,
      title: 'Lyallpur Institute of Digital Computing',
      category: 'Social Media',
      description: 'A modern website for a college showcasing its programs and campus life.',
      image: '/images/lidsCollege.png',
  // technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://www.lidc.com.pk/',
      github: 'https://github.com/muhammadBahawal/',
      featured: true
    },
    {
      id: 4,
      title: 'Teqtronics',
      category: 'Electronics',
      description: 'A Modern website for software solutions.',
      image: '/images/teqtronics.png',
  // technologies: ['React', 'IoT', 'Node.js'],
      link: 'https://teqtronics.com/',
      github: 'https://github.com/muhammadBahawal/',
      featured: true
    },
    {
      id: 5,
      title: 'Cravy Crunch Restaurant',
      category: 'Food & Beverage',
      description: 'A digital presence for a modern restaurant, featuring online menu, reservations, and customer reviews.',
      image: '/images/cravycrunch.png',
  // technologies: ['React', 'Node.js'],
      link: 'https://www.cravycrunch.co.uk/',
      github: 'https://github.com/muhammadBahawal/',
      featured: true
    },
    {
      id: 6,
      title: 'Color On',
      category: 'Design',
      description: 'A creative design agency portfolio showcasing branding and digital design projects.',
      image: '/images/color-on.png',
  // technologies: ['React', 'Figma'],
      link: 'https://color-on.com/',
      github: 'https://github.com/muhammadBahawal/',
      featured: true
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards
      gsap.utils.toArray('.project-card').forEach((card, index) => {
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore some of our most successful projects that showcase our expertise 
            in delivering innovative solutions across various industries.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card group h-full"
            whileHover={{ y: -10 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-center z-0"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="text-6xl font-bold text-white/20">
                    {project.category.split(' ')[0]}
                  </div>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-30">
                  <div className="flex space-x-4">
                    <Link
                      to={project.link}
                      className="p-3 bg-white/90 rounded-full text-gray-900 hover:bg-white transition-colors duration-200"
                    >
                      <FiExternalLink className="w-5 h-5" />
                    </Link>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/90 rounded-full text-gray-900 hover:bg-white transition-colors duration-200"
                    >
                      <FiGithub className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded text-xs font-bold">
                      FEATURED
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed flex-grow">
                  {project.description}
                </p>

                {/* Technologies section removed as requested */}

                {/* CTA */}
                <Link
                  to={project.link}
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium group/link"
                >
                  <span>View Project</span>
                  <FiArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Projects CTA */}
      <div className="text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Projects
            <FiArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
