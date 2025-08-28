# Vercel Backend Deployment Guide (Permanent Free)

## Why Vercel?
- **Permanent Free**: Unlimited serverless functions
- **No cold starts**: Instant response
- **GitHub integration**: Auto-deploy
- **Custom domains**: Free SSL
- **Best performance**: Global edge network

## Step-by-Step Deployment

### 1. Restructure Backend for Serverless
Create `api/` folder in your project root:
```
techtornix/
├── frontend/
├── backend/          (keep existing)
├── api/              (new - for Vercel)
│   ├── auth/
│   │   └── login.js
│   ├── services/
│   │   └── index.js
│   ├── contact/
│   │   └── index.js
│   └── health.js
└── vercel.json
```

### 2. Create Vercel Configuration
Create `vercel.json` in project root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/build/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/build/$1"
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb_uri",
    "JWT_SECRET": "@jwt_secret",
    "NODE_ENV": "production"
  }
}
```

### 3. Convert Express Routes to Serverless Functions
Example: `api/health.js`
```javascript
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  });
}
```

### 4. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Set environment variables in dashboard
5. Deploy automatically

## Environment Variables
Set in Vercel dashboard:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techtornix
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

## Your Vercel URLs
- **Frontend**: `https://techtornix.vercel.app`
- **API**: `https://techtornix.vercel.app/api/health`
- **Custom Domain**: `https://techtornix.com` (configure in dashboard)

## Advantages
- **No cold starts**: Instant response
- **Global CDN**: Fast worldwide
- **Automatic scaling**: Handle traffic spikes
- **Zero maintenance**: Fully managed

## Limitations
- **Function timeout**: 10 seconds on free tier
- **File uploads**: Need external storage (Cloudinary)
- **Stateless**: No persistent file system
