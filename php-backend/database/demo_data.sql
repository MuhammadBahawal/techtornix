-- Demo Data for Techtornix Blog and Portfolio
-- This file contains sample data for testing CRUD operations

-- Insert demo blog posts
INSERT INTO blogs (title, slug, excerpt, content, featured_image, author, author_id, category, tags, status, is_featured, published_at, views, meta_title, meta_description) VALUES 

('The Future of Web Development: React vs Vue vs Angular', 'future-web-development-react-vue-angular', 'Exploring the latest trends in frontend frameworks and what developers should know in 2024.', 
'<h2>Introduction</h2><p>The world of web development is constantly evolving, with new frameworks and technologies emerging regularly. In this comprehensive guide, we''ll explore the current state of the three major frontend frameworks: React, Vue, and Angular.</p>

<h3>React: The Industry Leader</h3>
<p>React continues to dominate the frontend landscape with its component-based architecture and extensive ecosystem. Key advantages include:</p>
<ul>
<li>Large community support</li>
<li>Extensive third-party libraries</li>
<li>Strong job market demand</li>
<li>Excellent performance with Virtual DOM</li>
</ul>

<h3>Vue: The Developer-Friendly Option</h3>
<p>Vue.js has gained significant traction due to its gentle learning curve and excellent documentation. Benefits include:</p>
<ul>
<li>Easy to learn and implement</li>
<li>Great documentation</li>
<li>Flexible architecture</li>
<li>Strong performance</li>
</ul>

<h3>Angular: The Enterprise Choice</h3>
<p>Angular remains popular for large-scale enterprise applications with its comprehensive framework approach:</p>
<ul>
<li>Full-featured framework</li>
<li>TypeScript by default</li>
<li>Powerful CLI tools</li>
<li>Strong testing capabilities</li>
</ul>

<h2>Conclusion</h2>
<p>Each framework has its strengths and ideal use cases. The choice depends on your project requirements, team expertise, and long-term goals.</p>', 
'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800', 'Muhammad Bahawal', 1, 'Web Development', 
'["React", "Vue", "Angular", "Frontend", "JavaScript", "Web Development"]', 'published', 1, NOW(), 245, 
'The Future of Web Development: React vs Vue vs Angular', 'Exploring the latest trends in frontend frameworks and what developers should know in 2024.'),

('Building Scalable Mobile Apps with React Native', 'building-scalable-mobile-apps-react-native', 'Learn how to create cross-platform mobile applications that perform like native apps.', 
'<h2>Why React Native?</h2>
<p>React Native has revolutionized mobile app development by allowing developers to write once and deploy on both iOS and Android platforms. This approach significantly reduces development time and costs while maintaining near-native performance.</p>

<h3>Key Benefits</h3>
<ul>
<li>Cross-platform development</li>
<li>Code reusability</li>
<li>Hot reloading for faster development</li>
<li>Large community and ecosystem</li>
<li>Native performance</li>
</ul>

<h3>Best Practices for Scalable Apps</h3>
<p>When building scalable mobile applications, consider these important factors:</p>
<ol>
<li><strong>State Management:</strong> Use Redux or Context API for complex state management</li>
<li><strong>Navigation:</strong> Implement React Navigation for smooth user experience</li>
<li><strong>Performance:</strong> Optimize images and use lazy loading</li>
<li><strong>Testing:</strong> Write comprehensive unit and integration tests</li>
<li><strong>Code Organization:</strong> Follow proper folder structure and naming conventions</li>
</ol>

<h2>Getting Started</h2>
<p>To start your React Native journey, you''ll need to set up your development environment and understand the core concepts of mobile app development.</p>', 
'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800', 'Muhammad Bahawal', 1, 'Mobile Development', 
'["React Native", "Mobile Apps", "Cross-platform", "iOS", "Android", "JavaScript"]', 'published', 0, NOW(), 189, 
'Building Scalable Mobile Apps with React Native', 'Learn how to create cross-platform mobile applications that perform like native apps.'),

('AI and Machine Learning in Modern Web Applications', 'ai-machine-learning-modern-web-applications', 'Discover how AI is transforming web development and user experiences.', 
'<h2>The AI Revolution in Web Development</h2>
<p>Artificial Intelligence and Machine Learning are no longer just buzzwords – they''re becoming integral parts of modern web applications, enhancing user experiences and providing intelligent features.</p>

<h3>Common AI Applications in Web Development</h3>
<ul>
<li><strong>Chatbots and Virtual Assistants:</strong> Providing 24/7 customer support</li>
<li><strong>Personalization:</strong> Tailoring content based on user behavior</li>
<li><strong>Recommendation Systems:</strong> Suggesting relevant products or content</li>
<li><strong>Image Recognition:</strong> Automatic tagging and content moderation</li>
<li><strong>Natural Language Processing:</strong> Understanding and processing text</li>
</ul>

<h3>Popular AI Libraries and APIs</h3>
<p>Developers can leverage various tools to integrate AI into their applications:</p>
<ul>
<li>TensorFlow.js for browser-based ML</li>
<li>OpenAI API for language processing</li>
<li>Google Cloud AI services</li>
<li>AWS Machine Learning services</li>
<li>Azure Cognitive Services</li>
</ul>

<h2>Future Trends</h2>
<p>As AI technology continues to advance, we can expect even more sophisticated applications in web development, including better voice interfaces, predictive analytics, and automated code generation.</p>', 
'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', 'Muhammad Bahawal', 1, 'AI & Technology', 
'["AI", "Machine Learning", "Web Development", "TensorFlow", "Chatbots", "Automation"]', 'published', 1, NOW(), 312, 
'AI and Machine Learning in Modern Web Applications', 'Discover how AI is transforming web development and user experiences.'),

('Complete Guide to Modern CSS: Grid, Flexbox, and Beyond', 'complete-guide-modern-css-grid-flexbox', 'Master modern CSS layout techniques and create responsive, beautiful web designs.', 
'<h2>Modern CSS Layout Revolution</h2>
<p>CSS has evolved tremendously over the years, and modern layout techniques like Grid and Flexbox have revolutionized how we approach web design. This guide covers everything you need to know about contemporary CSS.</p>

<h3>CSS Grid: The Ultimate Layout System</h3>
<p>CSS Grid provides a two-dimensional layout system that''s perfect for complex designs:</p>
<ul>
<li>Two-dimensional layouts (rows and columns)</li>
<li>Precise control over element positioning</li>
<li>Responsive design capabilities</li>
<li>Simplified complex layouts</li>
</ul>

<h3>Flexbox: One-Dimensional Layouts Made Easy</h3>
<p>Flexbox excels at one-dimensional layouts and component-level design:</p>
<ul>
<li>Perfect for navigation bars</li>
<li>Easy vertical and horizontal centering</li>
<li>Flexible item sizing</li>
<li>Great for responsive components</li>
</ul>

<h3>Modern CSS Features</h3>
<p>Beyond Grid and Flexbox, modern CSS includes many powerful features:</p>
<ul>
<li>CSS Custom Properties (Variables)</li>
<li>CSS Container Queries</li>
<li>CSS Subgrid</li>
<li>Advanced Selectors</li>
<li>CSS Functions and Calculations</li>
</ul>

<h2>Best Practices</h2>
<p>When working with modern CSS, always consider accessibility, performance, and maintainability in your designs.</p>', 
'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', 'Muhammad Bahawal', 1, 'Web Design', 
'["CSS", "Grid", "Flexbox", "Responsive Design", "Web Design", "Frontend"]', 'published', 0, NOW(), 156, 
'Complete Guide to Modern CSS: Grid, Flexbox, and Beyond', 'Master modern CSS layout techniques and create responsive, beautiful web designs.'),

('Cybersecurity Best Practices for Web Developers', 'cybersecurity-best-practices-web-developers', 'Essential security measures every web developer should implement to protect applications and users.', 
'<h2>The Importance of Web Security</h2>
<p>In today''s digital landscape, cybersecurity is not optional – it''s essential. Web developers play a crucial role in protecting applications and user data from various threats.</p>

<h3>Common Security Vulnerabilities</h3>
<p>Understanding common vulnerabilities is the first step in prevention:</p>
<ul>
<li><strong>SQL Injection:</strong> Malicious SQL code injection</li>
<li><strong>Cross-Site Scripting (XSS):</strong> Malicious script injection</li>
<li><strong>Cross-Site Request Forgery (CSRF):</strong> Unauthorized actions on behalf of users</li>
<li><strong>Insecure Authentication:</strong> Weak login systems</li>
<li><strong>Data Exposure:</strong> Unprotected sensitive information</li>
</ul>

<h3>Essential Security Measures</h3>
<ol>
<li><strong>Input Validation:</strong> Always validate and sanitize user input</li>
<li><strong>HTTPS Everywhere:</strong> Use SSL/TLS for all communications</li>
<li><strong>Strong Authentication:</strong> Implement multi-factor authentication</li>
<li><strong>Regular Updates:</strong> Keep dependencies and frameworks updated</li>
<li><strong>Security Headers:</strong> Implement proper HTTP security headers</li>
</ol>

<h3>Security Tools and Resources</h3>
<p>Leverage these tools to enhance your application security:</p>
<ul>
<li>OWASP Security Guidelines</li>
<li>Security scanners and auditing tools</li>
<li>Dependency vulnerability checkers</li>
<li>Penetration testing services</li>
</ul>

<h2>Conclusion</h2>
<p>Security should be built into every stage of development, not added as an afterthought. Stay informed about the latest threats and best practices.</p>', 
'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800', 'Muhammad Bahawal', 1, 'Security', 
'["Cybersecurity", "Web Security", "OWASP", "Authentication", "Data Protection", "Best Practices"]', 'published', 0, NOW(), 203, 
'Cybersecurity Best Practices for Web Developers', 'Essential security measures every web developer should implement to protect applications and users.');

-- Insert demo portfolio projects
INSERT INTO products (category_id, name, slug, short_description, description, images, features, specifications, stock, sku, price, sale_price, status, is_featured, sort_order, meta_title, meta_description) VALUES 

(1, 'E-Commerce Platform - TechMart', 'ecommerce-platform-techmart', 'A comprehensive e-commerce solution built with React and Node.js, featuring advanced inventory management and payment processing.', 
'TechMart is a full-featured e-commerce platform designed for modern online retailers. Built using cutting-edge technologies, it provides a seamless shopping experience for customers while offering powerful management tools for administrators.

The platform features a responsive design that works perfectly across all devices, from desktop computers to mobile phones. The user interface is intuitive and modern, making it easy for customers to browse products, add items to their cart, and complete purchases.

Key features include advanced product catalog management, real-time inventory tracking, multiple payment gateway integration, order management system, customer account management, and comprehensive analytics dashboard.

The backend is built with Node.js and Express, providing a robust and scalable API. The database uses MongoDB for flexible data storage, while Redis is used for session management and caching to ensure optimal performance.

Security is a top priority, with features like secure authentication, encrypted data transmission, PCI DSS compliance for payment processing, and regular security audits.', 
'["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"]', 
'["React.js Frontend", "Node.js Backend", "MongoDB Database", "Payment Gateway Integration", "Real-time Inventory", "Admin Dashboard", "Mobile Responsive", "SEO Optimized", "Advanced Search", "Multi-language Support"]', 
'{"client": "TechMart Solutions", "duration": "4 months", "teamSize": 5, "projectUrl": "https://techmart-demo.techtornix.com", "githubUrl": "https://github.com/techtornix/techmart", "technologies": ["React", "Node.js", "MongoDB", "Express", "Redux", "Stripe API", "AWS"], "features": ["Product Catalog", "Shopping Cart", "Payment Processing", "Order Management", "User Authentication", "Admin Panel"], "challenges": "Implementing real-time inventory updates and handling high traffic loads", "results": "40% increase in online sales and 60% improvement in user engagement"}', 
0, 'PROJ-001', 15000.00, 12000.00, 'active', 1, 1, 
'E-Commerce Platform - TechMart | Techtornix Portfolio', 'A comprehensive e-commerce solution built with React and Node.js, featuring advanced inventory management and payment processing.'),

(2, 'HealthTracker Mobile App', 'healthtracker-mobile-app', 'Cross-platform health and fitness tracking app built with React Native, featuring AI-powered insights and wearable device integration.', 
'HealthTracker is a comprehensive mobile application designed to help users monitor and improve their health and fitness. Built with React Native, the app provides a seamless experience across both iOS and Android platforms.

The app integrates with popular wearable devices and fitness trackers to automatically collect health data including steps, heart rate, sleep patterns, and workout activities. Users can also manually log meals, water intake, medications, and other health metrics.

One of the standout features is the AI-powered insights engine that analyzes user data to provide personalized recommendations for improving health outcomes. The app uses machine learning algorithms to identify patterns and suggest actionable improvements.

The user interface is designed with accessibility in mind, featuring large, easy-to-read text, high contrast colors, and voice navigation options. The app supports multiple languages and can be customized to meet individual user preferences.

Data security and privacy are paramount, with end-to-end encryption for all health data, HIPAA compliance, and granular privacy controls that allow users to control exactly what information is shared and with whom.

The app includes social features that allow users to connect with friends and family, share achievements, and participate in health challenges, creating a supportive community around health and wellness goals.', 
'["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800"]', 
'["React Native", "AI-Powered Insights", "Wearable Integration", "Cross-platform", "Health Analytics", "Social Features", "Offline Mode", "Data Encryption", "Push Notifications", "Cloud Sync"]', 
'{"client": "HealthTech Innovations", "duration": "6 months", "teamSize": 4, "projectUrl": "https://apps.apple.com/healthtracker", "githubUrl": "https://github.com/techtornix/healthtracker", "technologies": ["React Native", "TensorFlow", "Firebase", "HealthKit", "Google Fit", "AWS"], "features": ["Health Monitoring", "AI Insights", "Wearable Sync", "Social Sharing", "Goal Setting", "Progress Tracking"], "challenges": "Integrating with multiple wearable devices and ensuring data accuracy", "results": "50,000+ downloads in first month and 4.8 star rating"}', 
0, 'PROJ-002', 25000.00, 20000.00, 'active', 1, 2, 
'HealthTracker Mobile App | Techtornix Portfolio', 'Cross-platform health and fitness tracking app built with React Native, featuring AI-powered insights and wearable device integration.'),

(3, 'Digital Marketing Dashboard - MarketPro', 'digital-marketing-dashboard-marketpro', 'Comprehensive marketing analytics platform with real-time campaign tracking, ROI analysis, and automated reporting features.', 
'MarketPro is a sophisticated digital marketing dashboard that provides marketers and agencies with comprehensive insights into their campaigns across multiple channels. The platform aggregates data from various sources to provide a unified view of marketing performance.

The dashboard features real-time analytics that track key performance indicators across social media, email marketing, paid advertising, SEO, and content marketing campaigns. Users can create custom reports, set up automated alerts, and generate white-label reports for clients.

The platform integrates with major marketing platforms including Google Ads, Facebook Ads, Instagram, Twitter, LinkedIn, Mailchimp, HubSpot, and many others. This integration allows for automatic data collection and eliminates the need for manual reporting.

Advanced features include predictive analytics that use machine learning to forecast campaign performance, A/B testing tools for optimizing campaigns, and ROI calculators that help determine the most effective marketing channels.

The user interface is highly customizable, allowing users to create personalized dashboards with drag-and-drop widgets. The platform supports team collaboration with role-based access controls, shared dashboards, and commenting features.

Data visualization is a key strength, with interactive charts, graphs, and heat maps that make complex data easy to understand. The platform also includes goal tracking, conversion funnel analysis, and customer journey mapping tools.', 
'["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800", "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800"]', 
'["Real-time Analytics", "Multi-platform Integration", "Custom Reporting", "Predictive Analytics", "ROI Tracking", "Team Collaboration", "White-label Reports", "A/B Testing", "Goal Tracking", "Data Visualization"]', 
'{"client": "MarketPro Agency", "duration": "5 months", "teamSize": 6, "projectUrl": "https://marketpro-demo.techtornix.com", "githubUrl": "https://github.com/techtornix/marketpro", "technologies": ["Vue.js", "Python", "Django", "PostgreSQL", "Redis", "Celery", "Chart.js"], "features": ["Campaign Analytics", "Multi-channel Integration", "Custom Dashboards", "Automated Reporting", "Team Management", "API Access"], "challenges": "Handling large volumes of data from multiple APIs and ensuring real-time updates", "results": "300% improvement in reporting efficiency and 150% increase in client satisfaction"}', 
0, 'PROJ-003', 18000.00, 15000.00, 'active', 0, 3, 
'Digital Marketing Dashboard - MarketPro | Techtornix Portfolio', 'Comprehensive marketing analytics platform with real-time campaign tracking, ROI analysis, and automated reporting features.'),

(4, 'Restaurant Management System - DineFlow', 'restaurant-management-system-dineflow', 'Complete restaurant management solution with POS integration, inventory management, staff scheduling, and customer analytics.', 
'DineFlow is a comprehensive restaurant management system designed to streamline operations for restaurants of all sizes. The system combines point-of-sale functionality with advanced management tools to help restaurant owners optimize their business.

The POS system features an intuitive touch interface that makes it easy for staff to take orders, process payments, and manage tables. The system supports multiple payment methods including cash, credit cards, mobile payments, and gift cards.

Inventory management is automated with real-time tracking of ingredients and supplies. The system can automatically generate purchase orders when stock levels are low and provides detailed cost analysis to help optimize food costs.

Staff scheduling and management features include shift planning, time tracking, payroll integration, and performance analytics. Managers can easily create schedules, track employee hours, and monitor productivity.

Customer relationship management tools help build loyalty through integrated loyalty programs, customer profiles, and targeted marketing campaigns. The system tracks customer preferences and ordering history to provide personalized service.

Advanced analytics provide insights into sales trends, popular menu items, peak hours, and customer behavior. These insights help restaurant owners make data-driven decisions to improve profitability and customer satisfaction.

The system is cloud-based, allowing access from anywhere, and includes mobile apps for managers to monitor operations remotely. All data is automatically backed up and secured with enterprise-grade security measures.', 
'["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800", "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"]', 
'["POS Integration", "Inventory Management", "Staff Scheduling", "Customer Analytics", "Mobile App", "Cloud-based", "Payment Processing", "Loyalty Programs", "Real-time Reporting", "Multi-location Support"]', 
'{"client": "DineFlow Restaurants", "duration": "7 months", "teamSize": 8, "projectUrl": "https://dineflow-demo.techtornix.com", "githubUrl": "https://github.com/techtornix/dineflow", "technologies": ["Angular", "Node.js", "PostgreSQL", "Socket.io", "Stripe", "Twilio", "AWS"], "features": ["POS System", "Inventory Tracking", "Staff Management", "Customer CRM", "Analytics Dashboard", "Mobile Access"], "challenges": "Ensuring system reliability during peak hours and integrating with existing hardware", "results": "25% reduction in food waste and 35% improvement in order processing speed"}', 
0, 'PROJ-004', 22000.00, 18000.00, 'active', 1, 4, 
'Restaurant Management System - DineFlow | Techtornix Portfolio', 'Complete restaurant management solution with POS integration, inventory management, staff scheduling, and customer analytics.'),

(1, 'Learning Management System - EduHub', 'learning-management-system-eduhub', 'Modern e-learning platform with interactive courses, live streaming, assessments, and progress tracking for educational institutions.', 
'EduHub is a state-of-the-art learning management system designed for educational institutions, corporate training, and online course providers. The platform provides a comprehensive solution for creating, delivering, and managing educational content.

The system supports multiple content types including video lectures, interactive presentations, documents, quizzes, and assignments. Course creators can easily build engaging learning experiences using the intuitive course builder with drag-and-drop functionality.

Live streaming capabilities allow for real-time classes and webinars with features like screen sharing, interactive whiteboards, breakout rooms, and recording functionality. Students can participate through video, audio, or text chat.

Assessment tools include various question types, timed exams, plagiarism detection, and automated grading. Instructors can create custom rubrics and provide detailed feedback to students.

The platform includes advanced analytics that track student progress, engagement levels, and learning outcomes. These insights help instructors identify students who may need additional support and optimize course content.

Student features include personalized dashboards, progress tracking, discussion forums, peer-to-peer learning tools, and mobile access. The platform supports multiple learning paths and adaptive learning based on individual performance.

Administrative tools provide comprehensive management of users, courses, enrollments, and reporting. The system integrates with popular tools like Zoom, Google Workspace, Microsoft Teams, and various payment gateways.', 
'["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800", "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800", "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800"]', 
'["Interactive Courses", "Live Streaming", "Assessment Tools", "Progress Tracking", "Mobile Learning", "Discussion Forums", "Analytics Dashboard", "Multi-language Support", "Integration APIs", "Cloud Storage"]', 
'{"client": "EduTech Solutions", "duration": "8 months", "teamSize": 10, "projectUrl": "https://eduhub-demo.techtornix.com", "githubUrl": "https://github.com/techtornix/eduhub", "technologies": ["React", "Node.js", "MongoDB", "WebRTC", "Socket.io", "AWS", "FFmpeg"], "features": ["Course Management", "Live Classes", "Student Portal", "Assessment System", "Analytics", "Mobile App"], "challenges": "Ensuring smooth video streaming for large audiences and maintaining engagement", "results": "10,000+ active users and 95% student satisfaction rate"}', 
0, 'PROJ-005', 30000.00, 25000.00, 'active', 0, 5, 
'Learning Management System - EduHub | Techtornix Portfolio', 'Modern e-learning platform with interactive courses, live streaming, assessments, and progress tracking for educational institutions.');

-- Insert visitor analytics data for demonstration
INSERT INTO analytics (page_url, visitor_ip, user_agent, referrer, session_id, created_at) VALUES 
('/', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'https://google.com', 'sess_001', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('/blog', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', 'https://facebook.com', 'sess_002', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('/portfolio', '192.168.1.102', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15', 'direct', 'sess_003', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('/services', '192.168.1.103', 'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0', 'https://twitter.com', 'sess_004', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('/contact', '192.168.1.104', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'https://linkedin.com', 'sess_005', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('/', '192.168.1.105', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', 'https://google.com', 'sess_006', DATE_SUB(NOW(), INTERVAL 2 HOURS)),
('/blog/future-web-development-react-vue-angular', '192.168.1.106', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'https://google.com', 'sess_007', DATE_SUB(NOW(), INTERVAL 1 HOUR)),
('/portfolio/ecommerce-platform-techmart', '192.168.1.107', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15', 'direct', 'sess_008', DATE_SUB(NOW(), INTERVAL 30 MINUTE)),
('/about', '192.168.1.108', 'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0', 'https://facebook.com', 'sess_009', DATE_SUB(NOW(), INTERVAL 15 MINUTE)),
('/', '192.168.1.109', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'direct', 'sess_010', NOW());
