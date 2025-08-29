# TechTornix Backend Deployment Guide

## Quick Setup for Vercel Deployment

Your backend is now ready for Vercel deployment with these simple steps:

### 1. Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy with One Command
```bash
node deploy.js
```

## What's Configured

✅ **Backend Structure**: All API endpoints in `/api` folder  
✅ **CORS Setup**: Configured for `https://techtornix.com` and `https://www.techtornix.com`  
✅ **Environment Variables**: Using real credentials from `.env.production`  
✅ **Serverless Functions**: All endpoints work as Vercel serverless functions  
✅ **MongoDB Integration**: Database connection optimized for serverless  

## API Endpoints Available

- `GET /api/health` - Health check
- `POST /api/auth/login` - Admin login
- `GET /api/blog` - Get blog posts
- `POST /api/blog` - Create blog post (admin)
- `GET /api/portfolio` - Get portfolio items
- `POST /api/contact` - Contact form
- `GET /api/services` - Get services
- `GET /api/careers` - Get job openings
- `GET /api/admin/analytics` - Analytics data

## Environment Variables (Auto-configured)

The deployment script automatically uses your `.env.production` file:

- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `EMAIL_USER` - Email configuration
- `EMAIL_PASS` - Email password
- `CLIENT_URL` - Frontend URL (https://techtornix.com)
- `NODE_ENV` - Production environment

## Frontend Integration

Your frontend at `https://techtornix.com` will automatically connect to the Vercel backend. Update your frontend API base URL to your Vercel deployment URL after deployment.

## Troubleshooting

If deployment fails:
1. Make sure you're logged in to Vercel: `vercel login`
2. Check your `.env.production` file has valid credentials
3. Ensure MongoDB URI is accessible from Vercel
4. Run `vercel --debug` for detailed logs

## Manual Deployment (Alternative)

```bash
# Deploy to production
vercel --prod

# Deploy for testing
vercel
```
