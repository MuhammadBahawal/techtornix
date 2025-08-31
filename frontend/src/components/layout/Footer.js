import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFacebook, 
  FiLinkedin, 
  FiInstagram,
  FiGithub,
  FiArrowRight
} from 'react-icons/fi';
import XIcon from '../icons/XIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Career', href: '/career' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    { name: 'Website Development', href: '/services/website-development' },
    { name: 'Mobile App Development', href: '/services/mobile-app-development' },
    { name: 'AI Solutions', href: '/services/ai-solutions' },
    { name: 'UI/UX Design', href: '/services/uiux-design' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
    { name: 'SaaS Products', href: '/services/saas-products' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61574180353179', icon: FiFacebook },
    { name: 'X (Twitter)', href: 'https://www.linkedin.com/company/techtornix-solutions', icon: XIcon },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/techtornix-solutions', icon: FiLinkedin },
    { name: 'Instagram', href: 'https://instagram.com/techtornixsolutions', icon: FiInstagram },
    { name: 'GitHub', href: 'https://github.com/techtornix/', icon: FiGithub },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 py-12">
  <div className="container-custom">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Our Newsletter</h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Get the latest insights on technology trends, development tips, and company updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2">
                <span>Subscribe</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
  <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="text-2xl font-bold gradient-text">Techtornix</span>
              </Link>
             {/* <p className="text-gray-400 mb-6 leading-relaxed">
                We are a modern software house delivering cutting-edge solutions in web development, 
                mobile apps, AI, and digital transformation services.
              </p>*/}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <FiMapPin className="w-18 h-18 text-primary-500" />
                  <span>TechTornix Solutions 2nd Floor, Paradise Workspace Opposite Chase Value, near McDonald's, Faisalabad</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <FiPhone className="w-5 h-5 text-primary-500" />
                  <span><a href="tel:+929101329836">+92 910 132 9836</a></span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <FiMail className="w-5 h-5 text-primary-500" />
                  <span><a href="mailto:info@techtornix.com">info@techtornix.com</a></span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2 group"
                    >
                      <span>{link.name}</span>
                      <FiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      to={service.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2 group"
                    >
                      <span>{service.name}</span>
                      <FiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Connect With Us</h4>
              <p className="text-gray-400 mb-4">
                Follow us on social media for the latest updates and tech insights.
              </p>
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-medium mb-2">Ready to Start Your Project?</h5>
                <p className="text-gray-400 text-sm mb-3">
                  Let's discuss how we can help bring your ideas to life.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 font-medium text-sm"
                >
                  <span>Get in Touch</span>
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Techtornix. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
            <div className="text-gray-400 text-sm">
              Developed by Muhammad Bahawal
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
