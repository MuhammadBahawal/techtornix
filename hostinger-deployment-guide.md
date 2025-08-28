# Hostinger Frontend Deployment Guide

## Prerequisites
1. Hostinger shared hosting account
2. Domain configured (techtornix.com)
3. Built React application

## Step-by-Step Deployment

### 1. Build the Frontend
Run the build script:
```bash
# Windows
build-and-deploy.bat

# Or manually
cd frontend
npm install
npm run build
```

### 2. Upload to Hostinger
1. Login to Hostinger control panel
2. Go to "File Manager" or use FTP client
3. Navigate to `public_html` folder
4. DELETE any existing files in public_html (if this is first deployment)
5. Upload ALL contents from `frontend/build/` folder:
   - index.html
   - static/ folder (contains CSS, JS, images)
   - manifest.json
   - favicon.ico
   - robots.txt
   - Any other files from build folder
6. Upload the .htaccess file from frontend folder to public_html root

### 3. File Structure on Hostinger
```
public_html/
├── index.html
├── .htaccess (from frontend/.htaccess)
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── favicon.ico
├── manifest.json
├── robots.txt
└── asset-manifest.json (auto-generated)
```

### 4. Configure Environment
- Frontend uses `.env.production` for API URL
- Current API URL: `https://techtornix-backend.railway.app`
- Update this URL after Railway deployment

### 5. Verify Deployment
1. Visit https://techtornix.com
2. Check all routes work (React Router)
3. Test API connections
4. Verify responsive design

## Important Files

### .htaccess Configuration
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QR,L]

# Enable compression and caching
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/css application/javascript
</IfModule>
```

### Environment Variables
```
REACT_APP_API_URL=https://techtornix-backend.railway.app
```

## Important Notes
- **Build Process**: The `build-and-deploy.bat` script automatically copies .htaccess to build folder
- **File Upload**: Upload ONLY the contents of `frontend/build/` folder, not the build folder itself
- **Domain Setup**: Ensure techtornix.com points to Hostinger nameservers
- **SSL Certificate**: Hostinger provides free SSL - enable it in control panel

## Troubleshooting
- **404 errors on refresh**: Check .htaccess file is uploaded to public_html root
- **API connection failed**: Verify backend URL in .env.production matches Railway deployment
- **Slow loading**: Enable compression and caching in .htaccess (already configured)
- **CORS errors**: Check backend CORS configuration includes techtornix.com
- **Missing files**: Ensure all files from build folder are uploaded including favicon.ico, manifest.json, robots.txt

## Quick Upload Checklist
- [ ] Run `build-and-deploy.bat` successfully
- [ ] Login to Hostinger File Manager
- [ ] Clear public_html folder (first deployment)
- [ ] Upload all contents from `frontend/build/`
- [ ] Verify .htaccess is in public_html root
- [ ] Test website at https://techtornix.com
- [ ] Check React routing works (refresh any page)
- [ ] Verify API calls to backend work
