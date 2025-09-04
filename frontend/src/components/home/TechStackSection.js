import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaAws, 
  FaDocker, 
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaFigma,
  FaGoogle,
  FaFacebook
} from 'react-icons/fa';
import { 
  SiMongodb, 
  SiPostgresql, 
  SiTailwindcss, 
  SiTypescript, 
  SiNextdotjs, 
  SiExpress,
  SiGraphql,
  SiRedis,
  SiKubernetes,
  SiTensorflow,
  SiGatsby,
  SiIonic,
  SiMui,
  SiDjango,
  SiRedux,
  SiKeras,
  SiFlask,
  SiJenkins,
  SiDigitalocean,
  SiFirebase,
  SiGooglecloud,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobexd,
  SiQt,
  SiCisco
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const TechStackSection = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All', color: '#00D4FF' },
    { id: 'frontend', name: 'Frontend', color: '#61DAFB' },
    { id: 'backend', name: 'Backend', color: '#339933' },
    { id: 'devops', name: 'DevOps', color: '#FF6B35' },
    { id: 'cloud', name: 'Cloud Platforms', color: '#FF9900' },
    { id: 'design', name: 'Design', color: '#FF61F6' },
    { id: 'marketing', name: 'Digital Marketing', color: '#4285F4' },
    { id: 'iot', name: 'IoT', color: '#00C851' }
  ];

  const technologies = [
    // Frontend
    { name: 'CSS', icon: FaCss3Alt, color: '#1572B6', category: 'frontend' },
    { name: 'HTML', icon: FaHtml5, color: '#E34F26', category: 'frontend' },
    { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', category: 'frontend' },
    { name: 'Gatsby', icon: SiGatsby, color: '#663399', category: 'frontend' },
    { name: 'Ionic', icon: SiIonic, color: '#3880FF', category: 'frontend' },
    { name: 'Material UI', icon: SiMui, color: '#0081CB', category: 'frontend' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000', category: 'frontend' },
    { name: 'ReactJS', icon: FaReact, color: '#61DAFB', category: 'frontend' },
    { name: 'Redux', icon: SiRedux, color: '#764ABC', category: 'frontend' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', category: 'frontend' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'frontend' },
    
    // Backend
    { name: 'GraphQL', icon: SiGraphql, color: '#E10098', category: 'backend' },
    { name: 'Keras', icon: SiKeras, color: '#D00000', category: 'backend' },
    { name: 'NodeJs', icon: FaNodeJs, color: '#339933', category: 'backend' },
    { name: 'Python Django', icon: SiDjango, color: '#092E20', category: 'backend' },
    { name: 'Python Flask', icon: SiFlask, color: '#000000', category: 'backend' },
    { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00', category: 'backend' },
    
    // DevOps
    { name: 'CI/CD', icon: SiJenkins, color: '#D33833', category: 'devops' },
    { name: 'Docker', icon: FaDocker, color: '#2496ED', category: 'devops' },
    { name: 'Jenkins', icon: SiJenkins, color: '#D33833', category: 'devops' },
    { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5', category: 'devops' },
    
    // Cloud Platforms
    { name: 'AWS Cognito', icon: FaAws, color: '#FF9900', category: 'cloud' },
    { name: 'AWS Lambda', icon: FaAws, color: '#FF9900', category: 'cloud' },
    { name: 'Digital Ocean', icon: SiDigitalocean, color: '#0080FF', category: 'cloud' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', category: 'cloud' },
    { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4', category: 'cloud' },
    
    // Design
    { name: 'Adobe Illustrator', icon: SiAdobeillustrator, color: '#FF9A00', category: 'design' },
    { name: 'Adobe Photoshop', icon: SiAdobephotoshop, color: '#31A8FF', category: 'design' },
    { name: 'Adobe XD', icon: SiAdobexd, color: '#FF61F6', category: 'design' },
    { name: 'Figma', icon: FaFigma, color: '#F24E1E', category: 'design' },
    { name: 'Affinity Design', icon: SiAdobeillustrator, color: '#1B72BE', category: 'design' },
    { name: 'Affinity Photo', icon: SiAdobephotoshop, color: '#7E4DD2', category: 'design' },
    
    // Digital Marketing
    { name: 'Facebook Ads', icon: FaFacebook, color: '#1877F2', category: 'marketing' },
    { name: 'Facebook Pixel', icon: FaFacebook, color: '#1877F2', category: 'marketing' },
    { name: 'Google Analytics', icon: FaGoogle, color: '#E37400', category: 'marketing' },
    { name: 'Yoast', icon: FaGoogle, color: '#A4286A', category: 'marketing' },
    
    // IoT
    { name: 'AWS Greengrass', icon: FaAws, color: '#FF9900', category: 'iot' },
    { name: 'Eclipse IoT', icon: SiQt, color: '#F7931E', category: 'iot' },
    { name: 'Cisco IoT', icon: SiCisco, color: '#1BA0D7', category: 'iot' },
    { name: 'Qt', icon: SiQt, color: '#41CD52', category: 'iot' },
    { name: 'Blynk IoT', icon: SiQt, color: '#23C48E', category: 'iot' },
    { name: 'Particle', icon: SiQt, color: '#00AEEF', category: 'iot' }
  ];
  
  const filteredTechnologies = activeCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate tech cards on scroll
      gsap.utils.toArray('.tech-card').forEach((card, index) => {
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
            duration: 0.6,
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

      // Animate section title
      gsap.fromTo('.tech-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.tech-title',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Refresh ScrollTrigger when filtered technologies change
  useEffect(() => {
    // Use a timeout to ensure DOM has updated
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
      // Force refresh of all scroll triggers to prevent layout issues
      ScrollTrigger.getAll().forEach(trigger => trigger.refresh());
    }, 150);
    
    return () => clearTimeout(timeoutId);
  }, [filteredTechnologies, activeCategory]);

  // Prevent layout shifts that could affect subsequent sections
  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      // Ensure section maintains stable height during filtering
      const observer = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      observer.observe(section);
      
      return () => observer.disconnect();
    }
  }, []);

  const handleCardHover = (e) => {
    const card = e.currentTarget;
    const shine = card.querySelector('.tech-shine');
    
    gsap.to(card, {
      rotationY: 15,
      rotationX: 5,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });

    if (shine) {
      gsap.fromTo(shine,
        { x: '-100%', opacity: 0 },
        { x: '100%', opacity: 1, duration: 0.6, ease: "power2.inOut" }
      );
    }
  };

  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section ref={sectionRef} className="tech-stack-section bg-gradient-to-br from-[#1a1625] via-[#2a2438] to-[#1a1625] py-20 relative filter-stable" style={{ isolation: 'isolate' }}>
      <div className="container-custom">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="tech-title"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Technologies</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            We leverage cutting-edge technologies and frameworks to build scalable, 
            performant, and future-ready solutions for our clients.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-[#2a2438] border border-[#4a4458] text-gray-300 hover:bg-[#3a3448] hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <div 
        ref={gridRef}
        className="tech-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 optimize-cls"
        style={{ minHeight: '400px', contain: 'layout' }}
      >
        <AnimatePresence mode="popLayout">
          {filteredTechnologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={`${tech.name}-${tech.category}`}
                className="tech-card relative group cursor-pointer"
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                style={{ perspective: '1000px' }}
                layout
              >
              {/* Background rotating div */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:rotate-6 group-hover:scale-105 z-0"
                style={{ 
                  background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}40, ${tech.color}20)`,
                  filter: 'blur(8px)'
                }}
              ></div>

              {/* Shine effect */}
              <div className="tech-shine absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 opacity-0 z-10"></div>
              
              {/* Main card */}
              <div className="relative bg-[#1e1b2e] rounded-2xl p-6 border-2 transition-all duration-500 overflow-hidden group-hover:bg-[#2a2438] w-full h-40 flex flex-col items-center justify-center text-center z-20 group-hover:shadow-2xl"
                style={{
                  borderColor: 'transparent',
                  background: 'linear-gradient(135deg, #1e1b2e, #2a2438)',
                }}
              >
                {/* Animated border */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"
                  style={{ 
                    background: `linear-gradient(45deg, ${tech.color}, transparent, ${tech.color}, transparent, ${tech.color})`,
                    backgroundSize: '400% 400%',
                    animation: 'gradient-shift 3s ease infinite',
                    padding: '2px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor'
                  }}
                ></div>

                {/* Icon Container */}
                <div className="relative mb-3 group-hover:scale-125 transition-all duration-500 transform group-hover:rotate-12">
                  <div className="w-16 h-16 flex items-center justify-center relative">
                    {/* Icon glow effect */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 blur-xl"
                      style={{ backgroundColor: tech.color }}
                    ></div>
                    <Icon 
                      className="w-10 h-10 transition-all duration-500 relative z-10 group-hover:drop-shadow-lg" 
                      style={{ 
                        color: tech.color,
                        filter: `drop-shadow(0 0 8px ${tech.color}60)`
                      }}
                    />
                  </div>
                </div>
                
                <h3 className="text-sm font-semibold text-white group-hover:text-gray-100 transition-all duration-300 relative z-10"
                  style={{
                    textShadow: `0 0 10px ${tech.color}40`
                  }}
                >
                  {tech.name}
                </h3>

                {/* Particle effects */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full animate-ping"
                      style={{
                        backgroundColor: tech.color,
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '2s'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-6">
            Want to see these technologies in action?
          </p>
          <motion.a
            href="/portfolio"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transform hover:-translate-y-1 border border-cyan-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Our Projects
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default TechStackSection;
