import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiCalendar, 
  FiUser, 
  FiTag,
  FiArrowLeft,
  FiShare2,
  FiBookmark,
  FiClock
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const BlogDetail = () => {
  const { slug } = useParams();
  const sectionRef = useRef(null);
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  // Mock blog post data - in real app, fetch from API
  const mockPost = {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2025',
    slug: 'future-web-development-2025',
    excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps.',
    content: `
      <h2>Introduction</h2>
      <p>The web development landscape is constantly evolving, and 2025 promises to bring exciting new trends and technologies that will reshape how we build and interact with web applications.</p>
      
      <h2>AI-Powered Development</h2>
      <p>Artificial Intelligence is revolutionizing web development in unprecedented ways. From automated code generation to intelligent debugging, AI tools are becoming indispensable for modern developers.</p>
      
      <h3>Key AI Developments:</h3>
      <ul>
        <li>GitHub Copilot and similar AI coding assistants</li>
        <li>Automated testing and quality assurance</li>
        <li>Intelligent UI/UX optimization</li>
        <li>Natural language to code conversion</li>
      </ul>
      
      <h2>Progressive Web Apps (PWAs)</h2>
      <p>PWAs continue to bridge the gap between web and native applications, offering users app-like experiences directly in their browsers.</p>
      
      <h2>WebAssembly (WASM)</h2>
      <p>WebAssembly is enabling high-performance applications in the browser, opening doors for complex applications that were previously impossible on the web.</p>
      
      <h2>Conclusion</h2>
      <p>The future of web development is bright, with these emerging technologies promising to make the web more powerful, accessible, and user-friendly than ever before.</p>
    `,
    category: 'technology',
    author: 'John Smith',
    date: '2025-01-15',
    readTime: '5 min read',
    image: '/images/blog/web-dev-trends.jpg',
    tags: ['Web Development', 'AI', 'PWA', 'Trends'],
    featured: true
  };

  const mockRelatedPosts = [
    {
      id: 2,
      title: 'Creating Intuitive User Interfaces: A Designer\'s Guide',
      slug: 'intuitive-user-interfaces-guide',
      excerpt: 'Learn the principles and best practices for designing user interfaces that users love to interact with.',
      category: 'design',
      author: 'Sarah Johnson',
      date: '2025-01-10',
      readTime: '7 min read',
      image: '/images/blog/ui-design.jpg'
    },
    {
      id: 3,
      title: 'How AI is Transforming Business Operations',
      slug: 'ai-transforming-business-operations',
      excerpt: 'Discover how artificial intelligence is revolutionizing the way businesses operate and compete.',
      category: 'business',
      author: 'Mike Chen',
      date: '2025-01-05',
      readTime: '6 min read',
      image: '/images/blog/ai-business.jpg'
    }
  ];

  useEffect(() => {
    // In real app, fetch post by slug
    setPost(mockPost);
    setRelatedPosts(mockRelatedPosts);
  }, [slug]);

  useEffect(() => {
    if (post) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.blog-content > *',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.blog-content',
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [post]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots mb-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Techtornix Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
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
              to="/blog"
              className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full font-medium capitalize">
                  {post.category}
                </span>
                <div className="flex items-center space-x-1">
                  <FiCalendar className="w-4 h-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiClock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center justify-center space-x-6 text-gray-600 dark:text-gray-400 mb-8">
                <div className="flex items-center space-x-2">
                  <FiUser className="w-5 h-5" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <FiShare2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  <FiBookmark className="w-5 h-5" />
                  <span>Save</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-64 md:h-96 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold text-white/30">
                    {post.title.split(' ')[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <div 
                    className="blog-content prose prose-lg dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2 mb-4">
                      <FiTag className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-8">
                    {/* Author Info */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        About the Author
                      </h3>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                          <FiUser className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Senior Developer</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Passionate about creating amazing web experiences and sharing knowledge with the developer community.
                      </p>
                    </div>

                    {/* Table of Contents */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Table of Contents
                      </h3>
                      <nav className="space-y-2">
                        <a href="#introduction" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                          Introduction
                        </a>
                        <a href="#ai-powered" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                          AI-Powered Development
                        </a>
                        <a href="#pwa" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                          Progressive Web Apps
                        </a>
                        <a href="#webassembly" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                          WebAssembly
                        </a>
                        <a href="#conclusion" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                          Conclusion
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="section-padding bg-gray-50 dark:bg-gray-800">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <Link to={`/blog/${relatedPost.slug}`} className="block">
                      <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-gray-600 dark:to-gray-500">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-xl font-bold text-white/30">
                              {relatedPost.title.split(' ')[0]}
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium capitalize">
                              {relatedPost.category}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {relatedPost.readTime}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                            {relatedPost.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <FiUser className="w-4 h-4 mr-1" />
                            <span className="mr-4">{relatedPost.author}</span>
                            <FiCalendar className="w-4 h-4 mr-1" />
                            <span>{formatDate(relatedPost.date)}</span>
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
      </motion.div>
    </>
  );
};

export default BlogDetail;
