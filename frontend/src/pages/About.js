import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiUsers, 
  FiTarget, 
  FiAward, 
  FiHeart,
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiArrowRight
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  const stats = [
    { number: '50+', label: 'Team Members', icon: FiUsers },
    { number: '200+', label: 'Projects Completed', icon: FiTarget },
    { number: '15+', label: 'Awards Won', icon: FiAward },
    { number: '98%', label: 'Client Satisfaction', icon: FiHeart }
  ];

  const team = [
    {
      name: 'John Smith',
      position: 'CEO & Founder',
      image: '/images/team/john-smith.jpg',
      bio: 'Visionary leader with 15+ years in tech industry',
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    {
      name: 'Sarah Johnson',
      position: 'CTO',
      image: '/images/team/sarah-johnson.jpg',
      bio: 'Tech expert specializing in scalable architectures',
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    {
      name: 'Mike Chen',
      position: 'Lead Designer',
      image: '/images/team/mike-chen.jpg',
      bio: 'Creative designer with passion for user experience',
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    {
      name: 'Emily Davis',
      position: 'Project Manager',
      image: '/images/team/emily-davis.jpg',
      bio: 'Experienced PM ensuring project success',
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.',
      icon: '🚀'
    },
    {
      title: 'Quality',
      description: 'We maintain the highest standards in everything we do, from code quality to client service.',
      icon: '⭐'
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and open communication to achieve extraordinary results.',
      icon: '🤝'
    },
    {
      title: 'Growth',
      description: 'We are committed to continuous learning and helping our clients and team members grow.',
      icon: '📈'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats
      gsap.utils.toArray('.stat-card').forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.6, delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Animate team cards
      gsap.utils.toArray('.team-card').forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
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
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us - Techtornix | Our Story, Team & Values</title>
        <meta name="description" content="Learn about Techtornix - our story, mission, values, and the amazing team behind our innovative software solutions." />
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
                About <span className="gradient-text">Techtornix</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                We are a passionate team of innovators, creators, and problem-solvers 
                dedicated to building the future of technology, one solution at a time.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding bg-white dark:bg-gray-900">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-padding bg-gray-50 dark:bg-gray-800">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>
                    Founded in 2018, Techtornix began as a small team of passionate developers 
                    with a big vision: to create technology solutions that make a real difference 
                    in people's lives and businesses.
                  </p>
                  <p>
                    What started as a garage startup has grown into a thriving software house 
                    with over 50 talented professionals. We've completed more than 200 projects 
                    across various industries, from startups to Fortune 500 companies.
                  </p>
                  <p>
                    Our journey has been driven by our commitment to innovation, quality, and 
                    client satisfaction. Every project we take on is an opportunity to push 
                    boundaries and create something extraordinary.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-primary-100 leading-relaxed">
                    To empower businesses and individuals with innovative technology solutions 
                    that drive growth, efficiency, and success in the digital age.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="section-padding bg-white dark:bg-gray-900">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                These core values guide everything we do and shape our company culture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="section-padding bg-gray-50 dark:bg-gray-800">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                The brilliant minds behind our innovative solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  className="team-card bg-white dark:bg-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {member.bio}
                  </p>
                  <div className="flex justify-center space-x-3">
                    <a
                      href={member.linkedin}
                      className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors duration-200"
                    >
                      <FiLinkedin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </a>
                    <a
                      href={member.twitter}
                      className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors duration-200"
                    >
                      <FiTwitter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </a>
                    <a
                      href={member.github}
                      className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors duration-200"
                    >
                      <FiGithub className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </a>
                  </div>
                </motion.div>
              ))}
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
                Ready to Work Together?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help bring your ideas to life with our expertise and passion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Get In Touch
                  <FiArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/career" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600">
                  Join Our Team
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default About;
