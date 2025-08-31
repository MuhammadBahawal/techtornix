# Techtornix PHP Backend

A pure PHP backend API for the Techtornix website with MySQL database, OTP-based admin authentication, and comprehensive CRUD operations.

## Features

- **Pure PHP Implementation**: No frameworks, compatible with shared hosting
- **OTP Authentication**: Secure admin login with email-based OTP verification
- **RESTful API**: Complete CRUD operations for all entities
- **MySQL Database**: Robust data storage with proper relationships
- **Security**: Password hashing, session management, input sanitization
- **CORS Support**: Configured for frontend integration

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)
- PHP Extensions:
  - PDO
  - PDO_MySQL
  - mbstring
  - openssl
  - mail (for OTP emails)

## Installation

### 1. Database Setup

Create a MySQL database and import the schema:

```sql
CREATE DATABASE techtornix_db;
USE techtornix_db;

-- Run the SQL schema from database/schema.sql
```

### 2. Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_NAME=techtornix_db
DB_USER=your_db_user
DB_PASS=your_db_password

# Application Settings
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Email Configuration (for OTP)
MAIL_FROM=noreply@yourdomain.com
MAIL_FROM_NAME="Techtornix Admin"

# Security
SESSION_LIFETIME=3600
OTP_EXPIRY=300
MAX_LOGIN_ATTEMPTS=5
```

### 3. File Permissions

Set proper permissions:

```bash
chmod 755 /path/to/php-backend
chmod 644 /path/to/php-backend/.env
chmod 755 /path/to/php-backend/api
chmod 755 /path/to/php-backend/config
chmod 755 /path/to/php-backend/utils
```

### 4. Web Server Configuration

#### Apache (.htaccess)

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php [QSA,L]

# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# CORS Headers
Header always set Access-Control-Allow-Origin "https://yourdomain.com"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
Header always set Access-Control-Allow-Credentials true
```

#### Nginx

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    root /path/to/php-backend;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    
    # CORS headers
    add_header Access-Control-Allow-Origin "https://yourdomain.com";
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
    add_header Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With";
    add_header Access-Control-Allow-Credentials true;
}
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login (sends OTP)
- `POST /api/auth/verify-otp` - Verify OTP and complete login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current admin info

### Content Management

- `GET /api/products` - List products
- `POST /api/products` - Create product (auth required)
- `PUT /api/products/{id}` - Update product (auth required)
- `DELETE /api/products/{id}` - Delete product (auth required)

- `GET /api/categories` - List categories
- `POST /api/categories` - Create category (auth required)
- `PUT /api/categories/{id}` - Update category (auth required)
- `DELETE /api/categories/{id}` - Delete category (auth required)

- `GET /api/blogs` - List blog posts
- `POST /api/blogs` - Create blog post (auth required)
- `PUT /api/blogs/{id}` - Update blog post (auth required)
- `DELETE /api/blogs/{id}` - Delete blog post (auth required)

- `GET /api/testimonials` - List testimonials
- `POST /api/testimonials` - Create testimonial (auth required)
- `PUT /api/testimonials/{id}` - Update testimonial (auth required)
- `DELETE /api/testimonials/{id}` - Delete testimonial (auth required)

- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update site settings (auth required)

### Health Check

- `GET /api/health` - API health status

## Frontend Integration

Update your React frontend's API configuration:

```javascript
// src/config/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.yourdomain.com/api';

export default API_BASE_URL;
```

## Security Features

### Password Security
- Passwords hashed using PHP's `password_hash()`
- Secure password verification with `password_verify()`

### OTP System
- 6-digit OTP generated using `random_int()`
- OTP expires after 5 minutes
- Maximum 3 OTP attempts before lockout
- OTP hashed before database storage

### Session Management
- Secure session handling with regeneration
- Session timeout after inactivity
- Proper session cleanup on logout

### Input Validation
- All inputs sanitized and validated
- Prepared statements prevent SQL injection
- XSS protection with `htmlspecialchars()`

### Rate Limiting
- Failed login attempt tracking
- Account lockout after 5 failed attempts
- IP-based rate limiting (recommended to implement at web server level)

## Monitoring and Logging

### Error Logging
Errors are logged to PHP error log. Monitor these files:
- `/var/log/php_errors.log`
- Application-specific logs in `/logs/` directory

### Health Monitoring
Use the health check endpoint to monitor API status:

```bash
curl https://api.yourdomain.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00Z",
  "database": "connected"
}
```

## Backup and Maintenance

### Database Backup
```bash
# Daily backup
mysqldump -u username -p techtornix_db > backup_$(date +%Y%m%d).sql

# Automated backup script
0 2 * * * /usr/bin/mysqldump -u username -p'password' techtornix_db > /backups/techtornix_$(date +\%Y\%m\%d).sql
```

### File Backup
```bash
# Backup application files
tar -czf techtornix_backend_$(date +%Y%m%d).tar.gz /path/to/php-backend
```

### Updates
1. Backup database and files
2. Test updates in staging environment
3. Deploy during low-traffic periods
4. Monitor logs after deployment

## Troubleshooting

### Common Issues

**Database Connection Failed**
- Check database credentials in `.env`
- Verify MySQL service is running
- Check database user permissions

**OTP Emails Not Sending**
- Verify PHP mail configuration
- Check server mail logs
- Consider using SMTP instead of PHP mail()

**CORS Errors**
- Verify frontend domain in CORS headers
- Check web server configuration
- Ensure credentials are included in requests

**Session Issues**
- Check PHP session configuration
- Verify session directory permissions
- Clear browser cookies and try again

### Debug Mode
Enable debug mode in development:

```env
APP_ENV=development
APP_DEBUG=true
```

This will show detailed error messages. **Never enable in production.**

## Performance Optimization

### Database
- Add indexes for frequently queried columns
- Use connection pooling if available
- Regular database maintenance and optimization

### Caching
- Implement Redis/Memcached for session storage
- Cache frequently accessed data
- Use HTTP caching headers

### Web Server
- Enable gzip compression
- Configure proper caching headers
- Use a CDN for static assets

## Support

For issues and questions:
- Check the troubleshooting section
- Review server error logs
- Contact the development team

---

**Version**: 1.0.0  
**Last Updated**: January 2024  
**Author**: Techtornix Development Team
