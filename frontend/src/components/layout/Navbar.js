import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiSettings,
  FiCode,
  FiSmartphone,
  FiGlobe,
  FiCpu,
  FiImage,
  FiTrendingUp,
  FiWifi
} from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const services = [
  { name: 'Website Development', href: '/services/website-development', icon: FiGlobe },
  { name: 'iOS Development', href: '/services/ios-development', icon: FiSmartphone },
  { name: 'Android Development', href: '/services/android-development', icon: FiSmartphone },
  { name: 'SaaS Products', href: '/services/saas-products', icon: FiCode },
  { name: 'AI Solutions', href: '/services/ai-solutions', icon: FiCpu },
  { name: 'UI/UX Design', href: '/services/uiux-design', icon: FiImage },
  { name: 'Digital Marketing', href: '/services/digital-marketing', icon: FiTrendingUp },
  { name: 'IoT Solutions', href: '/services/iot-solutions', icon: FiWifi },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const navRef = useRef(null);
  const servicesRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        backgroundColor: isDark ? 'rgba(17, 24, 39, 0.98)' : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(12px)',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : '0 2px 10px rgba(0, 0, 0, 0.08)',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [isScrolled, isDark]);

  useEffect(() => {
    setIsOpen(false);
    setShowServices(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Career', href: '/career' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleServicesToggle = () => {
    setShowServices(!showServices);
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const servicesDropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <nav
      ref={navRef}
      className="navbar-container fixed top-0 left-0 right-0 transition-all duration-300"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999999,
        isolation: 'isolate',
        backgroundColor: isDark ? 'rgba(17, 24, 39, 0.98)' : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
      }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-0">
          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <div className="w-20 h-20 md:w-20 md:h-20 from-primary-600 to-accent-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 p-1">
              <img
                src={`${process.env.PUBLIC_URL}/images/logos/logo.png`}
                alt="Techtornix Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `${process.env.PUBLIC_URL}/images/logos/techtornixLogo.png`;
                }}
                onLoad={() => console.log('Logo loaded successfully')}
              />
            </div>

            <span className="ml-1 text-xl md:text-2xl font-bold gradient-text transform group-hover:scale-110 transition-transform duration-300">Techtornix</span>
          </Link>



          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`navbar-item px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive(item.href)
                  ? 'active'
                  : ''
                  }`}
                style={{
                  background: 'transparent',
                  color: isDark ? '#fff' : '#1f2937',
                  opacity: isActive(item.href) ? 1 : 0.85,
                  fontWeight: isActive(item.href) ? 700 : 500
                }}
              >
                {item.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => setShowServices(true)} onMouseLeave={() => setShowServices(false)}>
              <button
                onClick={handleServicesToggle}
                className={`navbar-item flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200`}
                style={{
                  color: isDark ? '#fff' : '#1f2937',
                  opacity: location.pathname.startsWith('/services') ? 1 : 0.85,
                  fontWeight: location.pathname.startsWith('/services') ? 700 : 500
                }}
              >
                <span>Services</span>
                <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${showServices ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showServices && (
                  <motion.div
                    ref={servicesRef}
                    variants={servicesDropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute top-full left-0 mt-2 w-64 rounded-xl shadow-xl border overflow-hidden z-50"
                    style={{
                      background: isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                      color: isDark ? '#fff' : '#1f2937',
                      borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {services.map((service, index) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.name}
                          to={service.href}
                          className="flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-200"
                          style={{
                            background: 'transparent',
                            color: isDark ? '#fff' : '#1f2937',
                            opacity: 0.95,
                            fontWeight: 500,
                            boxShadow: 'none',
                            border: 'none'
                          }}
                          onMouseOver={e => {
                            e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
                            e.currentTarget.style.color = isDark ? '#fff' : '#1f2937';
                          }}
                          onMouseOut={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = isDark ? '#fff' : '#1f2937';
                          }}
                          onClick={() => setShowServices(false)}
                        >
                          <Icon className="w-5 h-5" style={{ color: isDark ? '#fff' : '#1f2937' }} />
                          <span>{service.name}</span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
             hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 
             flex items-center justify-center z-[99999]"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileMenuRef}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="mobile-menu-panel lg:hidden fixed inset-y-0 right-0 w-80 max-w-[90vw] overflow-y-auto"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000000,
              backgroundColor: isDark ? '#130d29' : '#ffffff',
              boxShadow: isDark ? '-10px 0 30px rgba(0, 0, 0, 0.5)' : '-10px 0 30px rgba(0, 0, 0, 0.1)',
              isolation: 'isolate'
            }}
          >
            <div className="p-6 h-full" style={{ backgroundColor: isDark ? '#130d29' : '#ffffff' }}>
              <div className="flex items-center justify-between mb-8 pt-4 border-b-2 pb-4" style={{ borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}>
                <span className="text-2xl font-bold" style={{ color: isDark ? '#ffffff' : '#1f2937' }}>Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: isDark ? "#130d29" : "#ffffff",
                    color: isDark ? "#ffffff" : "#1f2937"
                  }}
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>


              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-6 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 relative z-10  mb-3 ${isActive(item.href)
                      ? 'bg-primary-600 text-white border-primary-600 shadow-lg'
                      : ''
                      }`}
                    style={{
                      background: isActive(item.href) ? '#2563eb' : 'transparent',
                      color: isActive(item.href) ? '#fff' : (isDark ? '#fff' : '#1f2937'),
                      borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                      fontWeight: isActive(item.href) ? 700 : 500
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Services (Dropdown) */}
                <div className="border-t-2 pt-6 mt-6" style={{ borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between px-4 py-2 
             text-lg font-semibold uppercase tracking-wider mb-3
              rounded-lg shadow-md hover:shadow-lg 
             active:scale-95 transition-all duration-300"
                    style={{ color: isDark ? '#fff' : '#1f2937' }}
                  >
                    <span>Services</span>
                    <FiChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>


                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        {services.map((service) => {
                          const Icon = service.icon;
                          return (
                            <Link
                              key={service.name}
                              to={service.href}
                              className="flex items-center space-x-3 px-6 py-4 rounded-lg transition-colors duration-200 relative z-10 mb-3"
                              style={{
                                background: 'transparent',
                                color: isDark ? '#fff' : '#1f2937',
                                border: 'none',
                                fontWeight: 600
                              }}
                              onMouseOver={e => {
                                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)';
                                e.currentTarget.style.color = isDark ? '#fff' : '#1f2937';
                              }}
                              onMouseOut={e => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = isDark ? '#fff' : '#1f2937';
                              }}
                              onClick={() => setIsOpen(false)}
                            >
                              <Icon className="w-6 h-6" style={{ color: isDark ? '#fff' : '#1f2937' }} />
                              <span>{service.name}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu-overlay lg:hidden fixed inset-0 bg-black bg-opacity-60"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999999,
              backdropFilter: 'blur(4px)'
            }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;