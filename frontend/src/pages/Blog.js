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

const Blog = () => {
  const sectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts', count: 12 },
    { id: 'technology', name: 'Technology', count: 5 },
    { id: 'design', name: 'Design', count: 3 },
    { id: 'business', name: 'Business', count: 2 },
    { id: 'tutorials', name: 'Tutorials', count: 2 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      slug: 'future-web-development-2024',
      excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps.',
      content: 'Full blog content would go here...',
      category: 'technology',
      author: 'John Smith',
      date: '2024-01-15',
      readTime: '5 min read',
      image: '/images/blog/web-dev-trends.jpg',
      tags: ['Web Development', 'AI', 'PWA', 'Trends'],
      featured: true
    },
    {
      id: 2,
      title: 'Creating Intuitive User Interfaces: A Designer\'s Guide',
      slug: 'intuitive-user-interfaces-guide',
      excerpt: 'Learn the principles and best practices for designing user interfaces that users love to interact with.',
      content: 'Full blog content would go here...',
      category: 'design',
      author: 'Sarah Johnson',
      date: '2024-01-10',
      readTime: '7 min read',
      image: '/images/blog/ui-design.jpg',
      tags: ['UI/UX', 'Design', 'User Experience'],
      featured: false
    },
    {
      id: 3,
      title: 'How AI is Transforming Business Operations',
      slug: 'ai-transforming-business-operations',
      excerpt: 'Discover how artificial intelligence is revolutionizing the way businesses operate and compete.',
      content: 'Full blog content would go here...',
      category: 'business',
      author: 'Mike Chen',
      date: '2024-01-05',
      readTime: '6 min read',
      image: '/images/blog/ai-business.jpg',
      tags: ['AI', 'Business', 'Automation'],
      featured: true
    },
    {
      id: 4,
      title: 'React Best Practices: Writing Clean and Maintainable Code',
      slug: 'react-best-practices-clean-code',
      excerpt: 'Master the art of writing clean, maintainable React code with these proven best practices.',
      content: 'Full blog content would go here...',
      category: 'tutorials',
      author: 'Emily Davis',
      date: '2024-01-01',
      readTime: '10 min read',
      image: '/images/blog/react-best-practices.jpg',
      tags: ['React', 'JavaScript', 'Best Practices'],
      featured: false
    },
    {
      id: 5,
      title: 'Mobile-First Design: Why It Matters More Than Ever',
      slug: 'mobile-first-design-importance',
      excerpt: 'Understanding the importance of mobile-first design in today\'s digital landscape.',
      content: 'Full blog content would go here...',
      category: 'design',
      author: 'Alex Wilson',
      date: '2023-12-28',
      readTime: '4 min read',
      image: '/images/blog/mobile-first.jpg',
      tags: ['Mobile Design', 'Responsive', 'UX'],
      featured: false
    },
    {
      id: 6,
      title: 'Building Scalable Node.js Applications',
      slug: 'scalable-nodejs-applications',
      excerpt: 'Learn how to build Node.js applications that can handle growth and scale effectively.',
      content: 'Full blog content would go here...',
      category: 'tutorials',
      author: 'David Brown',
      date: '2023-12-25',
      readTime: '8 min read',
      image: '/images/blog/nodejs-scalable.jpg',
      tags: ['Node.js', 'Backend', 'Scalability'],
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
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
                              <span>{formatDate(post.date)}</span>
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

              {/* Categories */}
              <div className="flex flex-wrap items-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <FiFilter className="w-4 h-4" />
                    <span>{category.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
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
                                  <span>{formatDate(post.date)}</span>
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
