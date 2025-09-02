-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 02, 2025 at 02:44 AM
-- Server version: 10.11.10-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u167676007_techtornix`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','super_admin') DEFAULT 'admin',
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` timestamp NULL DEFAULT NULL,
  `login_attempts` int(11) DEFAULT 0,
  `locked_until` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `email`, `password`, `role`, `is_active`, `last_login`, `login_attempts`, `locked_until`, `created_at`, `updated_at`) VALUES
(1, 'muhammadbahawal', 'bahawal.dev@gmail.com', '$2y$10$yU9Qu6RwmWuoN9eFiC8Vxe9Md4Uw1O5DKOa12nX6x0QMYSP2W27eC', 'super_admin', 1, NULL, 0, NULL, '2025-08-30 16:05:57', '2025-08-30 16:05:57');

-- --------------------------------------------------------

--
-- Table structure for table `admin_otps`
--

CREATE TABLE `admin_otps` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `otp_code` varchar(6) NOT NULL,
  `attempts_remaining` int(11) DEFAULT 3,
  `expires_at` timestamp NOT NULL,
  `is_used` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin_sessions`
--

CREATE TABLE `admin_sessions` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `session_id` varchar(128) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `expires_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `analytics`
--

CREATE TABLE `analytics` (
  `id` int(11) NOT NULL,
  `page_url` varchar(255) NOT NULL,
  `visitor_ip` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `referrer` varchar(255) DEFAULT NULL,
  `session_id` varchar(128) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext NOT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `status` enum('draft','published','archived') DEFAULT 'draft',
  `is_featured` tinyint(1) DEFAULT 0,
  `published_at` timestamp NULL DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `meta_title` varchar(200) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `author`, `author_id`, `category`, `tags`, `status`, `is_featured`, `published_at`, `views`, `meta_title`, `meta_description`, `created_at`, `updated_at`) VALUES
(1, 'The Future of Web Development: React vs Vue vs Angular', 'future-web-development-react-vue-angular', 'Exploring the latest trends in frontend frameworks and what developers should know in 2024.', '<h2>Introduction</h2><p>The world of web development is constantly evolving, with new frameworks and technologies emerging regularly. In this comprehensive guide, we\'ll explore the current state of the three major frontend frameworks: React, Vue, and Angular.</p>\r\n\r\n<h3>React: The Industry Leader</h3>\r\n<p>React continues to dominate the frontend landscape with its component-based architecture and extensive ecosystem. Key advantages include:</p>\r\n<ul>\r\n<li>Large community support</li>\r\n<li>Extensive third-party libraries</li>\r\n<li>Strong job market demand</li>\r\n<li>Excellent performance with Virtual DOM</li>\r\n</ul>\r\n\r\n<h3>Vue: The Developer-Friendly Option</h3>\r\n<p>Vue.js has gained significant traction due to its gentle learning curve and excellent documentation. Benefits include:</p>\r\n<ul>\r\n<li>Easy to learn and implement</li>\r\n<li>Great documentation</li>\r\n<li>Flexible architecture</li>\r\n<li>Strong performance</li>\r\n</ul>\r\n\r\n<h3>Angular: The Enterprise Choice</h3>\r\n<p>Angular remains popular for large-scale enterprise applications with its comprehensive framework approach:</p>\r\n<ul>\r\n<li>Full-featured framework</li>\r\n<li>TypeScript by default</li>\r\n<li>Powerful CLI tools</li>\r\n<li>Strong testing capabilities</li>\r\n</ul>\r\n\r\n<h2>Conclusion</h2>\r\n<p>Each framework has its strengths and ideal use cases. The choice depends on your project requirements, team expertise, and long-term goals.</p>', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800', 'Muhammad Bahawal', 1, 'Web Development', '[\"React\", \"Vue\", \"Angular\", \"Frontend\", \"JavaScript\", \"Web Development\"]', 'published', 1, '2025-08-31 01:46:26', 245, 'The Future of Web Development: React vs Vue vs Angular', 'Exploring the latest trends in frontend frameworks and what developers should know in 2024.', '2025-08-31 01:46:26', '2025-08-31 01:46:26'),
(2, 'Building Scalable Mobile Apps with React Native', 'building-scalable-mobile-apps-react-native', 'Learn how to create cross-platform mobile applications that perform like native apps.', '<h2>Why React Native?</h2>\r\n<p>React Native has revolutionized mobile app development by allowing developers to write once and deploy on both iOS and Android platforms. This approach significantly reduces development time and costs while maintaining near-native performance.</p>\r\n\r\n<h3>Key Benefits</h3>\r\n<ul>\r\n<li>Cross-platform development</li>\r\n<li>Code reusability</li>\r\n<li>Hot reloading for faster development</li>\r\n<li>Large community and ecosystem</li>\r\n<li>Native performance</li>\r\n</ul>\r\n\r\n<h3>Best Practices for Scalable Apps</h3>\r\n<p>When building scalable mobile applications, consider these important factors:</p>\r\n<ol>\r\n<li><strong>State Management:</strong> Use Redux or Context API for complex state management</li>\r\n<li><strong>Navigation:</strong> Implement React Navigation for smooth user experience</li>\r\n<li><strong>Performance:</strong> Optimize images and use lazy loading</li>\r\n<li><strong>Testing:</strong> Write comprehensive unit and integration tests</li>\r\n<li><strong>Code Organization:</strong> Follow proper folder structure and naming conventions</li>\r\n</ol>\r\n\r\n<h2>Getting Started</h2>\r\n<p>To start your React Native journey, you\'ll need to set up your development environment and understand the core concepts of mobile app development.</p>', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800', 'Muhammad Bahawal', 1, 'Mobile Development', '[\"React Native\", \"Mobile Apps\", \"Cross-platform\", \"iOS\", \"Android\", \"JavaScript\"]', 'published', 0, '2025-08-31 01:46:26', 189, 'Building Scalable Mobile Apps with React Native', 'Learn how to create cross-platform mobile applications that perform like native apps.', '2025-08-31 01:46:26', '2025-08-31 01:46:26'),
(3, 'AI and Machine Learning in Modern Web Applications', 'ai-machine-learning-modern-web-applications', 'Discover how AI is transforming web development and user experiences.', '<h2>The AI Revolution in Web Development</h2>\r\n<p>Artificial Intelligence and Machine Learning are no longer just buzzwords – they\'re becoming integral parts of modern web applications, enhancing user experiences and providing intelligent features.</p>\r\n\r\n<h3>Common AI Applications in Web Development</h3>\r\n<ul>\r\n<li><strong>Chatbots and Virtual Assistants:</strong> Providing 24/7 customer support</li>\r\n<li><strong>Personalization:</strong> Tailoring content based on user behavior</li>\r\n<li><strong>Recommendation Systems:</strong> Suggesting relevant products or content</li>\r\n<li><strong>Image Recognition:</strong> Automatic tagging and content moderation</li>\r\n<li><strong>Natural Language Processing:</strong> Understanding and processing text</li>\r\n</ul>\r\n\r\n<h3>Popular AI Libraries and APIs</h3>\r\n<p>Developers can leverage various tools to integrate AI into their applications:</p>\r\n<ul>\r\n<li>TensorFlow.js for browser-based ML</li>\r\n<li>OpenAI API for language processing</li>\r\n<li>Google Cloud AI services</li>\r\n<li>AWS Machine Learning services</li>\r\n<li>Azure Cognitive Services</li>\r\n</ul>\r\n\r\n<h2>Future Trends</h2>\r\n<p>As AI technology continues to advance, we can expect even more sophisticated applications in web development, including better voice interfaces, predictive analytics, and automated code generation.</p>', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', 'Muhammad Bahawal', 1, 'AI & Technology', '[\"AI\", \"Machine Learning\", \"Web Development\", \"TensorFlow\", \"Chatbots\", \"Automation\"]', 'published', 1, '2025-08-31 01:46:26', 312, 'AI and Machine Learning in Modern Web Applications', 'Discover how AI is transforming web development and user experiences.', '2025-08-31 01:46:26', '2025-08-31 01:46:26'),
(4, 'Complete Guide to Modern CSS: Grid, Flexbox, and Beyond', 'complete-guide-modern-css-grid-flexbox', 'Master modern CSS layout techniques and create responsive, beautiful web designs.', '<h2>Modern CSS Layout Revolution</h2>\r\n<p>CSS has evolved tremendously over the years, and modern layout techniques like Grid and Flexbox have revolutionized how we approach web design. This guide covers everything you need to know about contemporary CSS.</p>\r\n\r\n<h3>CSS Grid: The Ultimate Layout System</h3>\r\n<p>CSS Grid provides a two-dimensional layout system that\'s perfect for complex designs:</p>\r\n<ul>\r\n<li>Two-dimensional layouts (rows and columns)</li>\r\n<li>Precise control over element positioning</li>\r\n<li>Responsive design capabilities</li>\r\n<li>Simplified complex layouts</li>\r\n</ul>\r\n\r\n<h3>Flexbox: One-Dimensional Layouts Made Easy</h3>\r\n<p>Flexbox excels at one-dimensional layouts and component-level design:</p>\r\n<ul>\r\n<li>Perfect for navigation bars</li>\r\n<li>Easy vertical and horizontal centering</li>\r\n<li>Flexible item sizing</li>\r\n<li>Great for responsive components</li>\r\n</ul>\r\n\r\n<h3>Modern CSS Features</h3>\r\n<p>Beyond Grid and Flexbox, modern CSS includes many powerful features:</p>\r\n<ul>\r\n<li>CSS Custom Properties (Variables)</li>\r\n<li>CSS Container Queries</li>\r\n<li>CSS Subgrid</li>\r\n<li>Advanced Selectors</li>\r\n<li>CSS Functions and Calculations</li>\r\n</ul>\r\n\r\n<h2>Best Practices</h2>\r\n<p>When working with modern CSS, always consider accessibility, performance, and maintainability in your designs.</p>', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', 'Muhammad Bahawal', 1, 'Web Design', '[\"CSS\", \"Grid\", \"Flexbox\", \"Responsive Design\", \"Web Design\", \"Frontend\"]', 'published', 0, '2025-08-31 01:46:26', 156, 'Complete Guide to Modern CSS: Grid, Flexbox, and Beyond', 'Master modern CSS layout techniques and create responsive, beautiful web designs.', '2025-08-31 01:46:26', '2025-08-31 01:46:26'),
(5, 'Cybersecurity Best Practices for Web Developers', 'cybersecurity-best-practices-web-developers', 'Essential security measures every web developer should implement to protect applications and users.', '<h2>The Importance of Web Security</h2>\r\n<p>In today\'s digital landscape, cybersecurity is not optional – it\'s essential. Web developers play a crucial role in protecting applications and user data from various threats.</p>\r\n\r\n<h3>Common Security Vulnerabilities</h3>\r\n<p>Understanding common vulnerabilities is the first step in prevention:</p>\r\n<ul>\r\n<li><strong>SQL Injection:</strong> Malicious SQL code injection</li>\r\n<li><strong>Cross-Site Scripting (XSS):</strong> Malicious script injection</li>\r\n<li><strong>Cross-Site Request Forgery (CSRF):</strong> Unauthorized actions on behalf of users</li>\r\n<li><strong>Insecure Authentication:</strong> Weak login systems</li>\r\n<li><strong>Data Exposure:</strong> Unprotected sensitive information</li>\r\n</ul>\r\n\r\n<h3>Essential Security Measures</h3>\r\n<ol>\r\n<li><strong>Input Validation:</strong> Always validate and sanitize user input</li>\r\n<li><strong>HTTPS Everywhere:</strong> Use SSL/TLS for all communications</li>\r\n<li><strong>Strong Authentication:</strong> Implement multi-factor authentication</li>\r\n<li><strong>Regular Updates:</strong> Keep dependencies and frameworks updated</li>\r\n<li><strong>Security Headers:</strong> Implement proper HTTP security headers</li>\r\n</ol>\r\n\r\n<h3>Security Tools and Resources</h3>\r\n<p>Leverage these tools to enhance your application security:</p>\r\n<ul>\r\n<li>OWASP Security Guidelines</li>\r\n<li>Security scanners and auditing tools</li>\r\n<li>Dependency vulnerability checkers</li>\r\n<li>Penetration testing services</li>\r\n</ul>\r\n\r\n<h2>Conclusion</h2>\r\n<p>Security should be built into every stage of development, not added as an afterthought. Stay informed about the latest threats and best practices.</p>', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800', 'Muhammad Bahawal', 1, 'Security', '[\"Cybersecurity\", \"Web Security\", \"OWASP\", \"Authentication\", \"Data Protection\", \"Best Practices\"]', 'published', 0, '2025-08-31 01:46:26', 203, 'Cybersecurity Best Practices for Web Developers', 'Essential security measures every web developer should implement to protect applications and users.', '2025-08-31 01:46:26', '2025-08-31 01:46:26');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `sort_order` int(11) DEFAULT 0,
  `meta_title` varchar(200) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `status`, `sort_order`, `meta_title`, `meta_description`, `created_at`, `updated_at`) VALUES
(1, 'Web Development', 'web-development', 'Custom web applications and websites', NULL, 'active', 0, NULL, NULL, '2025-08-30 16:05:57', '2025-08-30 16:05:57'),
(2, 'Mobile Apps', 'mobile-apps', 'iOS and Android mobile applications', NULL, 'active', 0, NULL, NULL, '2025-08-30 16:05:57', '2025-08-30 16:05:57'),
(3, 'Digital Marketing', 'digital-marketing', 'SEO, social media, and online marketing', NULL, 'active', 0, NULL, NULL, '2025-08-30 16:05:57', '2025-08-30 16:05:57'),
(4, 'UI/UX Design', 'ui-ux-design', 'User interface and experience design', NULL, 'active', 0, NULL, NULL, '2025-08-30 16:05:57', '2025-08-30 16:05:57');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gemini_configs`
--

CREATE TABLE `gemini_configs` (
  `id` int(11) NOT NULL,
  `config_name` varchar(100) NOT NULL,
  `model_name` varchar(50) DEFAULT 'gemini-pro',
  `temperature` decimal(3,2) DEFAULT 0.70,
  `top_k` int(11) DEFAULT 40,
  `top_p` decimal(3,2) DEFAULT 0.95,
  `max_output_tokens` int(11) DEFAULT 1024,
  `system_prompt` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gemini_configs`
--

INSERT INTO `gemini_configs` (`id`, `config_name`, `model_name`, `temperature`, `top_k`, `top_p`, `max_output_tokens`, `system_prompt`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'default', 'gemini-pro', 0.70, 40, 0.95, 1024, 'You are TechBot, an AI assistant for TechTornix, a leading technology company. Your role is to provide helpful, accurate, and positive information about TechTornix and technology topics.\r\n\r\nCOMPANY INFORMATION:\r\n- Company: TechTornix\r\n- Leadership: Muhammad Bahawal (CEO), Naveed Sarwar, Aroma Tariq (COO), Umair Arshad (CTO)\r\n- Services: Custom software development, web applications, mobile apps, cloud solutions, AI integration, digital consulting\r\n- Technologies: React, Node.js, Python, JavaScript, TypeScript, AI/ML, AWS, Azure, Google Cloud\r\n- Contact: bahawal.dev@gmail.com, techtornix.com\r\n\r\nRESPONSE GUIDELINES:\r\n1. Always be positive, helpful, and professional\r\n2. Focus on TechTornix services and technology topics\r\n3. Politely redirect off-topic questions to company or tech topics\r\n4. Use emojis appropriately to make responses engaging\r\n5. Provide detailed, informative answers about our services\r\n6. Encourage users to contact us for project discussions\r\n7. Keep responses concise but comprehensive\r\n8. Always maintain an enthusiastic tone about technology\r\n\r\nRemember: You represent TechTornix, so always showcase our expertise and encourage potential clients to reach out!', 1, '2025-09-02 02:43:57', '2025-09-02 02:43:57');

-- --------------------------------------------------------

--
-- Table structure for table `gemini_logs`
--

CREATE TABLE `gemini_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `request_text` text NOT NULL,
  `response_text` text NOT NULL,
  `tokens_used` int(11) DEFAULT 0,
  `response_time_ms` int(11) DEFAULT 0,
  `status` enum('success','error','fallback') DEFAULT 'success',
  `error_message` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `short_description` text DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `price` decimal(10,2) DEFAULT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `specifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`specifications`)),
  `stock` int(11) DEFAULT 0,
  `sku` varchar(100) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `status` enum('active','inactive','draft') DEFAULT 'active',
  `sort_order` int(11) DEFAULT 0,
  `meta_title` varchar(200) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `short_description`, `description`, `images`, `price`, `sale_price`, `features`, `specifications`, `stock`, `sku`, `is_featured`, `status`, `sort_order`, `meta_title`, `meta_description`, `created_at`, `updated_at`) VALUES
(1, 1, 'E-Commerce Platform - TechMart', 'ecommerce-platform-techmart', 'A comprehensive e-commerce solution built with React and Node.js, featuring advanced inventory management and payment processing.', 'TechMart is a full-featured e-commerce platform designed for modern online retailers. Built using cutting-edge technologies, it provides a seamless shopping experience for customers while offering powerful management tools for administrators.\r\n\r\nThe platform features a responsive design that works perfectly across all devices, from desktop computers to mobile phones. The user interface is intuitive and modern, making it easy for customers to browse products, add items to their cart, and complete purchases.\r\n\r\nKey features include advanced product catalog management, real-time inventory tracking, multiple payment gateway integration, order management system, customer account management, and comprehensive analytics dashboard.\r\n\r\nThe backend is built with Node.js and Express, providing a robust and scalable API. The database uses MongoDB for flexible data storage, while Redis is used for session management and caching to ensure optimal performance.\r\n\r\nSecurity is a top priority, with features like secure authentication, encrypted data transmission, PCI DSS compliance for payment processing, and regular security audits.', '[\"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800\", \"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800\", \"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800\"]', 15000.00, 12000.00, '[\"React.js Frontend\", \"Node.js Backend\", \"MongoDB Database\", \"Payment Gateway Integration\", \"Real-time Inventory\", \"Admin Dashboard\", \"Mobile Responsive\", \"SEO Optimized\", \"Advanced Search\", \"Multi-language Support\"]', '{\"client\": \"TechMart Solutions\", \"duration\": \"4 months\", \"teamSize\": 5, \"projectUrl\": \"https://techmart-demo.techtornix.com\", \"githubUrl\": \"https://github.com/techtornix/techmart\", \"technologies\": [\"React\", \"Node.js\", \"MongoDB\", \"Express\", \"Redux\", \"Stripe API\", \"AWS\"], \"features\": [\"Product Catalog\", \"Shopping Cart\", \"Payment Processing\", \"Order Management\", \"User Authentication\", \"Admin Panel\"], \"challenges\": \"Implementing real-time inventory updates and handling high traffic loads\", \"results\": \"40% increase in online sales and 60% improvement in user engagement\"}', 0, 'PROJ-001', 1, 'active', 1, 'E-Commerce Platform - TechMart | Techtornix Portfolio', 'A comprehensive e-commerce solution built with React and Node.js, featuring advanced inventory management and payment processing.', '2025-08-31 01:46:26', '2025-08-31 01:46:26'),
(2, 2, 'HealthTracker Mobile App', 'healthtracker-mobile-app', 'Cross-platform health and fitness tracking app built with React Native, featuring AI-powered insights and wearable device integration.', 'HealthTracker is a comprehensive mobile application designed to help users monitor and improve their health and fitness. Built with React Native, the app provides a seamless experience across both iOS and Android platforms.\r\n\r\nThe app integrates with popular wearable devices and fitness trackers to automatically collect health data including steps, heart rate, sleep patterns, and workout activities. Users can also manually log meals, water intake, medications, and other health metrics.\r\n\r\nOne of the standout features is the AI-powered insights engine that analyzes user data to provide personalized recommendations for improving health outcomes. The app uses machine learning algorithms to identify patterns and suggest actionable improvements.\r\n\r\nThe user interface is designed with accessibility in mind, featuring large, easy-to-read text, high contrast colors, and voice navigation options. The app supports multiple languages and can be customized to meet individual user preferences.\r\n\r\nData security and privacy are paramount, with end-to-end encryption for all health data, HIPAA compliance, and granular privacy controls that allow users to control exactly what information is shared and with whom.\r\n\r\nThe app includes social features that allow users to connect with friends and family, share achievements, and participate in health challenges, creating a supportive community around health and wellness goals.', '[\"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800\", \"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800\", \"https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800\"]', 25000.00, 20000.00, '[\"React Native\", \"AI-Powered Insights\", \"Wearable Integration\", \"Cross-platform\", \"Health Analytics\", \"Social Features\", \"Offline Mode\", \"Data Encryption\", \"Push Notifications\", \"Cloud Sync\"]', '{\"client\": \"HealthTech Innovations\", \"duration\": \"6 months\", \"teamSize\": 4, \"projectUrl\": \"https://apps.apple.com/healthtracker\", \"githubUrl\": \"https://github.com/techtornix/healthtracker\", \"technologies\": [\"React Native\", \"TensorFlow\", \"Firebase\", \"HealthKit\", \"Google Fit\", \"AWS\"], \"features\": [\"Health Monitoring\", \"AI Insights\", \"Wearable Sync\", \"Social Sharing\", \"Goal Setting\", \"Progress Tracking\"], \"challenges\": \"Integrating with multiple wearable devices and ensuring data accuracy\", \"results\": \"50,000+ downloads in first month and 4.8 star rating\"}', 0, 'PROJ-002', 1, 'active', 2, 'HealthTracker Mobile App | Techtornix Portfolio', 'Cross-platform health and fitness tracking app built with React Native, featuring AI-powered insights and wearable device integration.', '2025-08-31 01:46:26', '2025-08-31 01:46:26'),
(3, 3, 'Digital Marketing Dashboard - MarketPro', 'digital-marketing-dashboard-marketpro', 'Comprehensive marketing analytics platform with real-time campaign tracking, ROI analysis, and automated reporting features.', 'MarketPro is a sophisticated digital marketing dashboard that provides marketers and agencies with comprehensive insights into their campaigns across multiple channels. The platform aggregates data from various sources to provide a unified view of marketing performance.\r\n\r\nThe dashboard features real-time analytics that track key performance indicators across social media, email marketing, paid advertising, SEO, and content marketing campaigns. Users can create custom reports, set up automated alerts, and generate white-label reports for clients.\r\n\r\nThe platform integrates with major marketing platforms including Google Ads, Facebook Ads, Instagram, Twitter, LinkedIn, Mailchimp, HubSpot, and many others. This integration allows for automatic data collection and eliminates the need for manual reporting.\r\n\r\nAdvanced features include predictive analytics that use machine learning to forecast campaign performance, A/B testing tools for optimizing campaigns, and ROI calculators that help determine the most effective marketing channels.\r\n\r\nThe user interface is highly customizable, allowing users to create personalized dashboards with drag-and-drop widgets. The platform supports team collaboration with role-based access controls, shared dashboards, and commenting features.\r\n\r\nData visualization is a key strength, with interactive charts, graphs, and heat maps that make complex data easy to understand. The platform also includes goal tracking, conversion funnel analysis, and customer journey mapping tools.', '[\"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800\", \"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800\", \"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800\"]', 18000.00, 15000.00, '[\"Real-time Analytics\", \"Multi-platform Integration\", \"Custom Reporting\", \"Predictive Analytics\", \"ROI Tracking\", \"Team Collaboration\", \"White-label Reports\", \"A/B Testing\", \"Goal Tracking\", \"Data Visualization\"]', '{\"client\": \"MarketPro Agency\", \"duration\": \"5 months\", \"teamSize\": 6, \"projectUrl\": \"https://marketpro-demo.techtornix.com\", \"githubUrl\": \"https://github.com/techtornix/marketpro\", \"technologies\": [\"Vue.js\", \"Python\", \"Django\", \"PostgreSQL\", \"Redis\", \"Celery\", \"Chart.js\"], \"features\": [\"Campaign Analytics\", \"Multi-channel Integration\", \"Custom Dashboards\", \"Automated Reporting\", \"Team Management\", \"API Access\"], \"challenges\": \"Handling large volumes of data from multiple APIs and ensuring real-time updates\", \"results\": \"300% improvement in reporting efficiency and 150% increase in client satisfaction\"}', 0, 'PROJ-003', 0, 'active', 3, 'Digital Marketing Dashboard - MarketPro | Techtornix Portfolio', 'Comprehensive marketing analytics platform with real-time campaign tracking, ROI analysis, and automated reporting features.', '2025-08-31 01:46:26', '2025-08-31 01:46:26'),
(4, 4, 'Restaurant Management System - DineFlow', 'restaurant-management-system-dineflow', 'Complete restaurant management solution with POS integration, inventory management, staff scheduling, and customer analytics.', 'DineFlow is a comprehensive restaurant management system designed to streamline operations for restaurants of all sizes. The system combines point-of-sale functionality with advanced management tools to help restaurant owners optimize their business.\r\n\r\nThe POS system features an intuitive touch interface that makes it easy for staff to take orders, process payments, and manage tables. The system supports multiple payment methods including cash, credit cards, mobile payments, and gift cards.\r\n\r\nInventory management is automated with real-time tracking of ingredients and supplies. The system can automatically generate purchase orders when stock levels are low and provides detailed cost analysis to help optimize food costs.\r\n\r\nStaff scheduling and management features include shift planning, time tracking, payroll integration, and performance analytics. Managers can easily create schedules, track employee hours, and monitor productivity.\r\n\r\nCustomer relationship management tools help build loyalty through integrated loyalty programs, customer profiles, and targeted marketing campaigns. The system tracks customer preferences and ordering history to provide personalized service.\r\n\r\nAdvanced analytics provide insights into sales trends, popular menu items, peak hours, and customer behavior. These insights help restaurant owners make data-driven decisions to improve profitability and customer satisfaction.\r\n\r\nThe system is cloud-based, allowing access from anywhere, and includes mobile apps for managers to monitor operations remotely. All data is automatically backed up and secured with enterprise-grade security measures.', '[\"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800\", \"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800\", \"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800\"]', 22000.00, 18000.00, '[\"POS Integration\", \"Inventory Management\", \"Staff Scheduling\", \"Customer Analytics\", \"Mobile App\", \"Cloud-based\", \"Payment Processing\", \"Loyalty Programs\", \"Real-time Reporting\", \"Multi-location Support\"]', '{\"client\": \"DineFlow Restaurants\", \"duration\": \"7 months\", \"teamSize\": 8, \"projectUrl\": \"https://dineflow-demo.techtornix.com\", \"githubUrl\": \"https://github.com/techtornix/dineflow\", \"technologies\": [\"Angular\", \"Node.js\", \"PostgreSQL\", \"Socket.io\", \"Stripe\", \"Twilio\", \"AWS\"], \"features\": [\"POS System\", \"Inventory Tracking\", \"Staff Management\", \"Customer CRM\", \"Analytics Dashboard\", \"Mobile Access\"], \"challenges\": \"Ensuring system reliability during peak hours and integrating with existing hardware\", \"results\": \"25% reduction in food waste and 35% improvement in order processing speed\"}', 0, 'PROJ-004', 1, 'active', 4, 'Restaurant Management System - DineFlow | Techtornix Portfolio', 'Complete restaurant management solution with POS integration, inventory management, staff scheduling, and customer analytics.', '2025-08-31 01:46:26', '2025-08-31 01:46:26'),
(5, 1, 'Learning Management System - EduHub', 'learning-management-system-eduhub', 'Modern e-learning platform with interactive courses, live streaming, assessments, and progress tracking for educational institutions.', 'EduHub is a state-of-the-art learning management system designed for educational institutions, corporate training, and online course providers. The platform provides a comprehensive solution for creating, delivering, and managing educational content.\r\n\r\nThe system supports multiple content types including video lectures, interactive presentations, documents, quizzes, and assignments. Course creators can easily build engaging learning experiences using the intuitive course builder with drag-and-drop functionality.\r\n\r\nLive streaming capabilities allow for real-time classes and webinars with features like screen sharing, interactive whiteboards, breakout rooms, and recording functionality. Students can participate through video, audio, or text chat.\r\n\r\nAssessment tools include various question types, timed exams, plagiarism detection, and automated grading. Instructors can create custom rubrics and provide detailed feedback to students.\r\n\r\nThe platform includes advanced analytics that track student progress, engagement levels, and learning outcomes. These insights help instructors identify students who may need additional support and optimize course content.\r\n\r\nStudent features include personalized dashboards, progress tracking, discussion forums, peer-to-peer learning tools, and mobile access. The platform supports multiple learning paths and adaptive learning based on individual performance.\r\n\r\nAdministrative tools provide comprehensive management of users, courses, enrollments, and reporting. The system integrates with popular tools like Zoom, Google Workspace, Microsoft Teams, and various payment gateways.', '[\"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800\", \"https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800\", \"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800\"]', 30000.00, 25000.00, '[\"Interactive Courses\", \"Live Streaming\", \"Assessment Tools\", \"Progress Tracking\", \"Mobile Learning\", \"Discussion Forums\", \"Analytics Dashboard\", \"Multi-language Support\", \"Integration APIs\", \"Cloud Storage\"]', '{\"client\": \"EduTech Solutions\", \"duration\": \"8 months\", \"teamSize\": 10, \"projectUrl\": \"https://eduhub-demo.techtornix.com\", \"githubUrl\": \"https://github.com/techtornix/eduhub\", \"technologies\": [\"React\", \"Node.js\", \"MongoDB\", \"WebRTC\", \"Socket.io\", \"AWS\", \"FFmpeg\"], \"features\": [\"Course Management\", \"Live Classes\", \"Student Portal\", \"Assessment System\", \"Analytics\", \"Mobile App\"], \"challenges\": \"Ensuring smooth video streaming for large audiences and maintaining engagement\", \"results\": \"10,000+ active users and 95% student satisfaction rate\"}', 0, 'PROJ-005', 0, 'active', 5, 'Learning Management System - EduHub | Techtornix Portfolio', 'Modern e-learning platform with interactive courses, live streaming, assessments, and progress tracking for educational institutions.', '2025-08-31 01:46:26', '2025-08-31 01:46:26');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` longtext DEFAULT NULL,
  `setting_type` enum('text','number','boolean','json') DEFAULT 'text',
  `description` text DEFAULT NULL,
  `category` varchar(50) DEFAULT 'general',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `setting_key`, `setting_value`, `setting_type`, `description`, `category`, `created_at`, `updated_at`) VALUES
(1, 'site_name', 'Techtornix', 'text', 'Website name', 'general', '2025-08-30 16:05:57', '2025-08-30 16:05:57'),
(2, 'site_description', 'Leading technology solutions provider', 'text', 'Website description', 'general', '2025-08-30 16:05:57', '2025-08-30 16:05:57'),
(3, 'contact_email', 'info@techtornix.com', 'text', 'Primary contact email', 'general', '2025-08-30 16:05:57', '2025-08-30 16:05:57'),
(4, 'contact_phone', '+1 (555) 123-4567', 'text', 'Primary contact phone', 'general', '2025-08-30 16:05:57', '2025-08-30 16:05:57'),
(5, 'address', '123 Tech Street, Digital City, TC 12345', 'text', 'Business address', 'general', '2025-08-30 16:05:57', '2025-08-30 16:05:57'),
(6, 'social_facebook', 'https://facebook.com/techtornix', 'text', 'Facebook page URL', 'general', '2025-08-30 16:05:57', '2025-08-30 16:05:57'),
(7, 'social_twitter', 'https://twitter.com/techtornix', 'text', 'Twitter profile URL', 'general', '2025-08-30 16:05:57', '2025-08-30 16:05:57'),
(8, 'social_linkedin', 'https://linkedin.com/company/techtornix', 'text', 'LinkedIn company URL', 'general', '2025-08-30 16:05:57', '2025-08-30 16:05:57'),
(9, 'social_instagram', 'https://instagram.com/techtornix', 'text', 'Instagram profile URL', 'general', '2025-08-30 16:05:57', '2025-08-30 16:05:57'),
(10, 'gemini_enabled', '1', 'text', 'Enable or disable Gemini API', 'gemini', '2025-09-02 02:43:57', '2025-09-02 02:43:57'),
(11, 'gemini_fallback_enabled', '1', 'text', 'Enable fallback responses when API fails', 'gemini', '2025-09-02 02:43:57', '2025-09-02 02:43:57'),
(12, 'gemini_log_requests', '1', 'text', 'Log all API requests and responses', 'gemini', '2025-09-02 02:43:57', '2025-09-02 02:43:57'),
(13, 'gemini_rate_limit', '100', 'text', 'Requests per hour limit', 'gemini', '2025-09-02 02:43:57', '2025-09-02 02:43:57'),
(14, 'gemini_timeout', '30', 'text', 'API request timeout in seconds', 'gemini', '2025-09-02 02:43:57', '2025-09-02 02:43:57');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `position` varchar(100) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `rating` int(11) DEFAULT 5,
  `is_featured` tinyint(1) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_admins_email` (`email`),
  ADD KEY `idx_admins_username` (`username`);

--
-- Indexes for table `admin_otps`
--
ALTER TABLE `admin_otps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_admin_id` (`admin_id`),
  ADD KEY `idx_expires_at` (`expires_at`);

--
-- Indexes for table `admin_sessions`
--
ALTER TABLE `admin_sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_id` (`session_id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `idx_session_id` (`session_id`),
  ADD KEY `idx_expires_at` (`expires_at`);

--
-- Indexes for table `analytics`
--
ALTER TABLE `analytics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_page_url` (`page_url`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_session_id` (`session_id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `idx_slug` (`slug`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_published_at` (`published_at`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_title` (`title`),
  ADD KEY `idx_blogs_title` (`title`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_slug` (`slug`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_read` (`is_read`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_contacts_email` (`email`);

--
-- Indexes for table `gemini_configs`
--
ALTER TABLE `gemini_configs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `config_name` (`config_name`),
  ADD KEY `idx_config_name` (`config_name`),
  ADD KEY `idx_active` (`is_active`);

--
-- Indexes for table `gemini_logs`
--
ALTER TABLE `gemini_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_slug` (`slug`),
  ADD KEY `idx_category` (`category_id`),
  ADD KEY `idx_featured` (`is_featured`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_name` (`name`),
  ADD KEY `idx_products_name` (`name`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`),
  ADD KEY `idx_key` (`setting_key`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_featured` (`is_featured`),
  ADD KEY `idx_status` (`status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admin_otps`
--
ALTER TABLE `admin_otps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admin_sessions`
--
ALTER TABLE `admin_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `analytics`
--
ALTER TABLE `analytics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gemini_configs`
--
ALTER TABLE `gemini_configs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gemini_logs`
--
ALTER TABLE `gemini_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_otps`
--
ALTER TABLE `admin_otps`
  ADD CONSTRAINT `admin_otps_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `admin_sessions`
--
ALTER TABLE `admin_sessions`
  ADD CONSTRAINT `admin_sessions_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `admins` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
