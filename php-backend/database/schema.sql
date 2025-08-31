-- Techtornix Database Schema
-- Created: January 2024
-- Author: Techtornix Development Team

-- Create database
CREATE DATABASE IF NOT EXISTS techtornix_db;
USE techtornix_db;

-- Admin users table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'super_admin') DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- OTP verification table
CREATE TABLE IF NOT EXISTS admin_otps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    attempts_remaining INT DEFAULT 3,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
    INDEX idx_admin_id (admin_id),
    INDEX idx_expires_at (expires_at)
);

-- Admin sessions table
CREATE TABLE IF NOT EXISTS admin_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    session_id VARCHAR(128) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
    INDEX idx_session_id (session_id),
    INDEX idx_expires_at (expires_at)
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_active (is_active)
);

-- Products/Services table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    short_description TEXT,
    description TEXT,
    images JSON,
    features JSON,
    specifications JSON,
    stock INT DEFAULT 0,
    sku VARCHAR(100),
    price DECIMAL(10,2) DEFAULT 0.00,
    sale_price DECIMAL(10,2),
    status ENUM('active', 'inactive') DEFAULT 'active',
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    meta_title VARCHAR(200),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_category (category_id),
    INDEX idx_featured (is_featured),
    INDEX idx_status (status)
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    featured_image VARCHAR(255),
    author VARCHAR(100),
    author_id INT,
    category VARCHAR(100),
    tags JSON,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    views INT DEFAULT 0,
    meta_title VARCHAR(200),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES admins(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_published_at (published_at),
    INDEX idx_category (category)
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_position VARCHAR(100),
    client_company VARCHAR(100),
    client_image VARCHAR(255),
    content TEXT NOT NULL,
    rating INT DEFAULT 5,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_featured (is_featured),
    INDEX idx_active (is_active)
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_read (is_read),
    INDEX idx_created_at (created_at)
);

-- Site settings table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value LONGTEXT,
    setting_type ENUM('text', 'number', 'boolean', 'json') DEFAULT 'text',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (setting_key)
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_url VARCHAR(255) NOT NULL,
    visitor_ip VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(255),
    session_id VARCHAR(128),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_page_url (page_url),
    INDEX idx_created_at (created_at),
    INDEX idx_session_id (session_id)
);

-- Insert default admin user
INSERT INTO admins (username, email, password, role) VALUES 
('muhammadbahawal', 'bahawal.dev@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin');

-- Note: The password hash above is for 'Bahawal@6432'
-- In production, this will be generated dynamically

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES 
('Web Development', 'web-development', 'Custom web applications and websites'),
('Mobile Apps', 'mobile-apps', 'iOS and Android mobile applications'),
('Digital Marketing', 'digital-marketing', 'SEO, social media, and online marketing'),
('UI/UX Design', 'ui-ux-design', 'User interface and experience design');

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, setting_type, description) VALUES 
('site_name', 'Techtornix', 'text', 'Website name'),
('site_description', 'Leading technology solutions provider', 'text', 'Website description'),
('contact_email', 'info@techtornix.com', 'text', 'Primary contact email'),
('contact_phone', '+1 (555) 123-4567', 'text', 'Primary contact phone'),
('address', '123 Tech Street, Digital City, TC 12345', 'text', 'Business address'),
('social_facebook', 'https://facebook.com/techtornix', 'text', 'Facebook page URL'),
('social_twitter', 'https://twitter.com/techtornix', 'text', 'Twitter profile URL'),
('social_linkedin', 'https://linkedin.com/company/techtornix', 'text', 'LinkedIn company URL'),
('social_instagram', 'https://instagram.com/techtornix', 'text', 'Instagram profile URL');

-- Create indexes for better performance
CREATE INDEX idx_admins_email ON admins(email);
CREATE INDEX idx_admins_username ON admins(username);
CREATE INDEX idx_products_title ON products(name);
CREATE INDEX idx_blogs_title ON blogs(title);
CREATE INDEX idx_contacts_email ON contacts(email);
