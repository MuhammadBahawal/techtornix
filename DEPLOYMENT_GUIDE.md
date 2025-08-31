# 🚀 Techtornix Deployment Guide - Hostinger Shared Hosting

Complete step-by-step guide to deploy your Techtornix project on Hostinger shared hosting with domain techtornix.com.

## 📋 Pre-Deployment Checklist

### 1. Hostinger Account Setup
- ✅ Hostinger shared hosting account active
- ✅ Domain techtornix.com pointed to hosting
- ✅ SSL certificate enabled (Let's Encrypt)
- ✅ File Manager or FTP access available

### 2. Database Setup Required
- ✅ MySQL database created in Hostinger panel
- ✅ Database user with full privileges
- ✅ Database credentials noted

## 🗄️ Step 1: Database Setup

### Create Database in Hostinger Panel
1. Login to Hostinger control panel
2. Go to **Databases** → **MySQL Databases**
3. Create new database:
   - **Database Name**: `u123456789_techtornix` (replace with your actual prefix)
   - **Username**: `u123456789_techtornix`
   - **Password**: Create strong password
4. Note down these credentials for `.env` file

### Import Database Schema
1. Go to **phpMyAdmin** in Hostinger panel
2. Select your database
3. Go to **Import** tab
4. Upload and execute: `php-backend/database/schema.sql`

## 🔧 Step 2: Backend Deployment

### Upload Backend Files
1. Using File Manager or FTP, upload entire `php-backend` folder to:
   ```
   public_html/api/
   ```
   
2. Your structure should look like:
   ```
   public_html/
   ├── api/
   │   ├── api/
   │   ├── config/
   │   ├── database/
   │   ├── utils/
   │   ├── .env
   │   ├── .htaccess
   │   └── index.php
   ```

### Configure Environment Variables
1. Edit `public_html/api/.env` with your Hostinger database details:
   ```env
   DB_HOST=localhost
   DB_NAME=u123456789_techtornix
   DB_USER=u123456789_techtornix
   DB_PASS=YOUR_ACTUAL_PASSWORD
   
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://techtornix.com
   CORS_ORIGIN=https://techtornix.com
   ```

### Test Backend API
Visit: `https://techtornix.com/api/`
You should see the API documentation with available endpoints.

## 🌐 Step 3: Frontend Deployment

### Build Frontend for Production
1. On your local machine, navigate to `frontend/` folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. This creates a `build/` folder with optimized files

### Upload Frontend Files
1. Upload contents of `build/` folder to:
   ```
   public_html/
   ```
2. Your structure should look like:
   ```
   public_html/
   ├── api/          (backend files)
   ├── static/       (CSS, JS files)
   ├── images/       (if any)
   ├── index.html
   ├── favicon.ico
   └── manifest.json
   ```

### Create Frontend .htaccess
Create `public_html/.htaccess` for React routing:

```apache
# React Router - Handle client-side routing
Options -MultiViews
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteCond %{HTTP_HOST} ^techtornix\.com$ [NC]
RewriteRule ^(.*)$ https://techtornix.com/$1 [R=301,L]

# API requests - proxy to backend
RewriteCond %{REQUEST_URI} ^/api/(.*)$
RewriteRule ^api/(.*)$ /api/index.php [QSA,L]

# Handle React Router (client-side routing)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule . /index.html [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
</IfModule>
```

## 🔐 Step 4: Security & Permissions

### Set File Permissions
```bash
# Folders: 755
# Files: 644
# .env files: 600 (if possible)
```

### Verify Security
1. Test that `.env` files are not accessible via browser
2. Verify API endpoints work with HTTPS
3. Check CORS headers are properly set

## 🧪 Step 5: Testing Deployment

### Frontend Testing
1. Visit `https://techtornix.com`
2. Check all pages load correctly:
   - ✅ Home page
   - ✅ Services page
   - ✅ Portfolio page
   - ✅ About page
   - ✅ Blog page
   - ✅ Contact page
3. Test responsive design on mobile/tablet
4. Verify dark/light mode toggle works

### Backend API Testing
1. Test API endpoints:
   ```bash
   # Health check
   https://techtornix.com/api/
   
   # Test specific endpoints
   https://techtornix.com/api/blogs
   https://techtornix.com/api/products
   https://techtornix.com/api/categories
   ```

### Admin Panel Testing
1. Go to `https://techtornix.com/admin/login`
2. Login with credentials:
   - **Email**: bahawal.dev@gmail.com
   - **Password**: Bahawal@6432
3. Test all CRUD operations:
   - ✅ Create blog post
   - ✅ Edit blog post
   - ✅ Delete blog post
   - ✅ Manage products/services
   - ✅ Manage categories
   - ✅ Manage testimonials
   - ✅ View contacts
   - ✅ Update settings

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. API Not Working
**Problem**: 404 errors on API calls
**Solution**: 
- Check `.htaccess` in `/api/` folder
- Verify mod_rewrite is enabled
- Check file permissions

#### 2. Database Connection Failed
**Problem**: Database connection errors
**Solution**:
- Verify database credentials in `.env`
- Check if database exists in Hostinger panel
- Ensure user has proper privileges

#### 3. CORS Errors
**Problem**: Frontend can't connect to API
**Solution**:
- Check CORS_ORIGIN in `.env`
- Verify .htaccess CORS headers
- Ensure API URL is correct in frontend

#### 4. React Routes Not Working
**Problem**: 404 on direct URL access
**Solution**:
- Check main `.htaccess` file
- Verify React Router configuration
- Ensure fallback to index.html

#### 5. Admin Login Issues
**Problem**: OTP not working or login fails
**Solution**:
- Check email configuration
- Verify admin credentials in database
- Check session configuration

### Performance Optimization

#### Enable Gzip Compression
Already configured in `.htaccess`

#### Optimize Images
- Compress images before upload
- Use WebP format when possible
- Implement lazy loading

#### Database Optimization
- Add indexes for frequently queried columns
- Regular database cleanup
- Monitor query performance

## 📊 Monitoring & Maintenance

### Regular Tasks
1. **Weekly**:
   - Check error logs
   - Monitor site performance
   - Backup database

2. **Monthly**:
   - Update dependencies
   - Review security logs
   - Performance audit

3. **Quarterly**:
   - Full backup
   - Security audit
   - Performance optimization

### Log Files Locations
- **PHP Errors**: Check Hostinger error logs
- **Access Logs**: Available in Hostinger panel
- **Application Logs**: Custom logging in PHP backend

## 🔄 Updates & Maintenance

### Frontend Updates
1. Make changes locally
2. Run `npm run build`
3. Upload new build files
4. Clear browser cache

### Backend Updates
1. Test changes locally
2. Upload modified PHP files
3. Update database schema if needed
4. Test API endpoints

## 📞 Support Contacts

- **Hostinger Support**: Available 24/7
- **Domain Issues**: Check DNS settings
- **SSL Issues**: Hostinger auto-renewal
- **Email Issues**: Configure in Hostinger panel

## ✅ Deployment Checklist

- [ ] Database created and schema imported
- [ ] Backend files uploaded to `/api/`
- [ ] Environment variables configured
- [ ] Frontend built and uploaded
- [ ] .htaccess files configured
- [ ] HTTPS working
- [ ] API endpoints tested
- [ ] Admin panel functional
- [ ] All CRUD operations working
- [ ] Email notifications working
- [ ] Performance optimized
- [ ] Security headers set
- [ ] Monitoring configured

---

**🎉 Your Techtornix project is now live at https://techtornix.com!**

For any issues, check the troubleshooting section or contact support.
