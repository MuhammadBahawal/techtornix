import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiCalendar,
  FiUser,
  FiTag,
  FiArrowRight,
  FiSearch,
  FiFilter
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// Real SEO-Friendly Blog Posts Data
const demoBlogPosts = [
  {
    id: 1,
    title: 'Complete Guide to React.js Development in 2024: Best Practices and Performance Optimization',
    slug: 'complete-guide-react-development-2024',
    excerpt: 'Master React.js development with our comprehensive guide covering hooks, performance optimization, state management, and modern best practices for building scalable web applications.',
    content: 'React.js continues to dominate the frontend development landscape in 2024. This comprehensive guide covers everything from basic concepts to advanced optimization techniques...',
    author: 'Muhammad Bahawal',
    authorRole: 'Senior Full Stack Developer',
    authorImage: '/images/team/bahawal.png',
    category: 'Web Development',
    tags: ['React.js', 'JavaScript', 'Frontend', 'Performance', 'Hooks'],
    publishedAt: '2024-01-15',
    readTime: '12 min read',
    views: 2847,
    featured: true,
    image: '/images/blog/react-guide-2024.jpg',
    metaDescription: 'Learn React.js development best practices, performance optimization, and modern techniques for building scalable web applications in 2024.',
    keywords: ['React development', 'JavaScript frameworks', 'frontend optimization', 'React hooks', 'web development']
  },
  {
    id: 2,
    title: 'Node.js Microservices Architecture: Building Scalable Backend Systems',
    slug: 'nodejs-microservices-architecture-guide',
    excerpt: 'Learn how to design and implement microservices architecture using Node.js, Docker, and Kubernetes for building highly scalable and maintainable backend systems.',
    content: 'Microservices architecture has revolutionized how we build and deploy backend systems. In this detailed guide, we explore Node.js microservices patterns...',
    author: 'Sarah Ahmed',
    authorRole: 'Backend Architect',
    authorImage: '/images/team/sarah.jpg',
    category: 'Backend Development',
    tags: ['Node.js', 'Microservices', 'Docker', 'Kubernetes', 'API Design'],
    publishedAt: '2024-01-10',
    readTime: '15 min read',
    views: 1923,
    featured: true,
    image: '/images/blog/nodejs-microservices.jpg',
    metaDescription: 'Complete guide to building scalable microservices architecture with Node.js, Docker, and Kubernetes for enterprise applications.',
    keywords: ['Node.js microservices', 'backend architecture', 'Docker containers', 'API development', 'scalable systems']
  },
  {
    id: 3,
    title: 'AI-Powered Web Development: Integrating Machine Learning APIs in Modern Applications',
    slug: 'ai-powered-web-development-machine-learning',
    excerpt: 'Discover how to integrate AI and machine learning capabilities into web applications using popular APIs, frameworks, and best practices for intelligent user experiences.',
    content: 'Artificial Intelligence is transforming web development. This guide shows you how to integrate ML APIs, implement AI features, and create intelligent applications...',
    author: 'Dr. Ali Hassan',
    authorRole: 'AI/ML Engineer',
    authorImage: '/images/team/ali.jpg',
    category: 'Artificial Intelligence',
    tags: ['AI', 'Machine Learning', 'APIs', 'Web Development', 'TensorFlow'],
    publishedAt: '2024-01-08',
    readTime: '18 min read',
    views: 3156,
    featured: true,
    image: '/images/blog/ai-web-development.jpg',
    metaDescription: 'Learn to integrate AI and machine learning APIs into web applications for intelligent user experiences and automated features.',
    keywords: ['AI web development', 'machine learning APIs', 'intelligent applications', 'TensorFlow.js', 'AI integration']
  },
  {
    id: 4,
    title: 'Cybersecurity Best Practices for Web Applications: Protecting Against Modern Threats',
    slug: 'cybersecurity-best-practices-web-applications',
    excerpt: 'Essential cybersecurity practices every developer should implement to protect web applications from SQL injection, XSS attacks, and other security vulnerabilities.',
    content: 'Web application security is more critical than ever. This comprehensive guide covers OWASP top 10 vulnerabilities, security headers, authentication...',
    author: 'Fatima Khan',
    authorRole: 'Cybersecurity Specialist',
    authorImage: '/images/team/fatima.jpg',
    category: 'Security',
    tags: ['Cybersecurity', 'Web Security', 'OWASP', 'Authentication', 'Encryption'],
    publishedAt: '2024-01-05',
    readTime: '14 min read',
    views: 2234,
    featured: false,
    image: '/images/blog/web-security.jpg',
    metaDescription: 'Comprehensive guide to web application security best practices, OWASP guidelines, and protection against modern cyber threats.',
    keywords: ['web security', 'cybersecurity practices', 'OWASP top 10', 'application security', 'threat protection']
  },
  {
    id: 5,
    title: 'Flutter vs React Native: Complete Mobile Development Framework Comparison 2024',
    slug: 'flutter-vs-react-native-comparison-2024',
    excerpt: 'Detailed comparison of Flutter and React Native for mobile app development, covering performance, development experience, and platform-specific considerations.',
    content: 'Choosing the right mobile development framework is crucial for project success. This in-depth comparison analyzes Flutter vs React Native...',
    author: 'Ahmed Malik',
    authorRole: 'Mobile App Developer',
    authorImage: '/images/team/ahmed.jpg',
    category: 'Mobile Development',
    tags: ['Flutter', 'React Native', 'Mobile Development', 'Cross-platform', 'Performance'],
    publishedAt: '2024-01-03',
    readTime: '16 min read',
    views: 1876,
    featured: false,
    image: '/images/blog/flutter-vs-react-native.jpg',
    metaDescription: 'Complete comparison of Flutter vs React Native for mobile app development in 2024, including performance benchmarks and use cases.',
    keywords: ['Flutter vs React Native', 'mobile development', 'cross-platform apps', 'mobile frameworks', 'app development']
  },
  {
    id: 6,
    title: 'DevOps Automation: CI/CD Pipeline Implementation with GitHub Actions and AWS',
    slug: 'devops-automation-cicd-github-actions-aws',
    excerpt: 'Step-by-step guide to implementing automated CI/CD pipelines using GitHub Actions and AWS services for efficient software deployment and delivery.',
    content: 'DevOps automation is essential for modern software development. Learn how to set up robust CI/CD pipelines using GitHub Actions and AWS...',
    author: 'Omar Siddique',
    authorRole: 'DevOps Engineer',
    authorImage: '/images/team/omar.jpg',
    category: 'DevOps',
    tags: ['DevOps', 'CI/CD', 'GitHub Actions', 'AWS', 'Automation'],
    publishedAt: '2024-01-01',
    readTime: '20 min read',
    views: 1654,
    featured: false,
    image: '/images/blog/devops-cicd.jpg',
    metaDescription: 'Learn to implement automated CI/CD pipelines with GitHub Actions and AWS for efficient software deployment and continuous delivery.',
    keywords: ['DevOps automation', 'CI/CD pipeline', 'GitHub Actions', 'AWS deployment', 'continuous integration']
  },
  {
    id: 7,
    title: 'Progressive Web Apps (PWA): Building App-Like Experiences for the Modern Web',
    slug: 'progressive-web-apps-pwa-development-guide',
    excerpt: 'Comprehensive guide to building Progressive Web Apps with service workers, offline functionality, and native app-like features for enhanced user experience.',
    content: 'Progressive Web Apps represent the future of web development. This guide covers PWA fundamentals, service workers, caching strategies...',
    author: 'Zainab Ali',
    authorRole: 'Frontend Specialist',
    authorImage: '/images/team/zainab.jpg',
    category: 'Web Development',
    tags: ['PWA', 'Service Workers', 'Offline-first', 'Web APIs', 'Performance'],
    publishedAt: '2023-12-28',
    readTime: '13 min read',
    views: 2198,
    featured: false,
    image: '/images/blog/progressive-web-apps.jpg',
    metaDescription: 'Complete guide to building Progressive Web Apps with offline functionality, service workers, and native app-like experiences.',
    keywords: ['Progressive Web Apps', 'PWA development', 'service workers', 'offline functionality', 'web app manifest']
  },
  {
    id: 8,
    title: 'Database Optimization Techniques: MySQL Performance Tuning for High-Traffic Applications',
    slug: 'database-optimization-mysql-performance-tuning',
    excerpt: 'Advanced MySQL optimization techniques including indexing strategies, query optimization, and performance monitoring for high-traffic web applications.',
    content: 'Database performance is critical for application success. This comprehensive guide covers MySQL optimization techniques, indexing strategies...',
    author: 'Hassan Raza',
    authorRole: 'Database Administrator',
    authorImage: '/images/team/hassan.jpg',
    category: 'Database',
    tags: ['MySQL', 'Database Optimization', 'Performance', 'Indexing', 'Query Optimization'],
    publishedAt: '2023-12-25',
    readTime: '17 min read',
    views: 1543,
    featured: false,
    image: '/images/blog/mysql-optimization.jpg',
    metaDescription: 'Learn advanced MySQL optimization techniques, indexing strategies, and performance tuning for high-traffic applications.',
    keywords: ['MySQL optimization', 'database performance', 'query optimization', 'database indexing', 'MySQL tuning']
  },
  {
    id: 9,
    title: 'Cloud Architecture Patterns: Designing Scalable Applications on AWS and Azure',
    slug: 'cloud-architecture-patterns-aws-azure',
    excerpt: 'Essential cloud architecture patterns and best practices for building scalable, resilient applications on AWS and Microsoft Azure platforms.',
    content: 'Cloud architecture requires careful planning and design. This guide explores proven patterns for building scalable applications on major cloud platforms...',
    author: 'Ayesha Tariq',
    authorRole: 'Cloud Architect',
    authorImage: '/images/team/ayesha.jpg',
    category: 'Cloud Computing',
    tags: ['Cloud Architecture', 'AWS', 'Azure', 'Scalability', 'Microservices'],
    publishedAt: '2023-12-22',
    readTime: '19 min read',
    views: 1987,
    featured: false,
    image: '/images/blog/cloud-architecture.jpg',
    metaDescription: 'Explore cloud architecture patterns and best practices for building scalable applications on AWS and Azure platforms.',
    keywords: ['cloud architecture', 'AWS patterns', 'Azure architecture', 'scalable applications', 'cloud design patterns']
  }
];

const Blog = () => {
  const sectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [blogPosts] = useState(demoBlogPosts);
  const [loading] = useState(false);

  // Generate categories from blog posts
  const categories = React.useMemo(() => {
    const categoryMap = new Map();
    categoryMap.set('all', { id: 'all', name: 'All Posts', count: blogPosts.length });

    blogPosts.forEach(post => {
      const cat = post.category.toLowerCase().replace(/\s+/g, '-');
      if (categoryMap.has(cat)) {
        categoryMap.get(cat).count++;
      } else {
        categoryMap.set(cat, {
          id: cat,
          name: post.category,
          count: 1
        });
      }
    });

    return Array.from(categoryMap.values());
  }, [blogPosts]);

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content ? content.split(' ').length : 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.blog-card').forEach((card, index) => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredPosts]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Blog - Techtornix | Latest Tech Insights & Tutorials</title>
        <meta name="description" content="Stay updated with the latest technology trends, tutorials, and insights from the Techtornix team." />
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
                Our <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Stay updated with the latest technology trends, insights, and tutorials
                from our team of experts.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="section-padding bg-white dark:bg-gray-900">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Featured Posts
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="blog-card group cursor-pointer"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                        {/* Image */}
                        <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-2xl font-bold text-white/30">
                              {post.title.split(' ')[0]}
                            </div>
                          </div>
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-xs font-bold">
                              FEATURED
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <div className="flex items-center space-x-1">
                              <FiCalendar className="w-4 h-4" />
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FiUser className="w-4 h-4" />
                              <span>{post.author}</span>
                            </div>
                            <span>{post.readTime}</span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                            {post.title}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <FiArrowRight className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform duration-200" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800 sticky top-20 z-40 border-b border-gray-200 dark:border-gray-700">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

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

        {/* Blog Posts Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${searchTerm}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        className="blog-card group cursor-pointer"
                        whileHover={{ y: -5 }}
                      >
                        <Link to={`/blog/${post.slug}`} className="block">
                          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                            {/* Image */}
                            <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-2xl font-bold text-white/30">
                                  {post.title.split(' ')[0]}
                                </div>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-3">
                                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium capitalize">
                                  {post.category}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {post.readTime}
                                </span>
                              </div>

                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                                {post.title}
                              </h3>

                              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                                {post.excerpt}
                              </p>

                              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <div className="flex items-center space-x-1">
                                  <FiUser className="w-4 h-4" />
                                  <span>{post.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <FiCalendar className="w-4 h-4" />
                                  <span>{formatDate(post.publishedAt)}</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-1">
                                  {post.tags.slice(0, 2).map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <FiArrowRight className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform duration-200" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      No posts found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Try adjusting your search or filter criteria.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                      }}
                      className="btn-primary"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Blog;
