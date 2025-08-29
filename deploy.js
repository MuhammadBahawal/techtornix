#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 TechTornix Backend Deployment Script');
console.log('=====================================\n');

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
} catch (error) {
  console.log('❌ Vercel CLI not found. Installing...');
  execSync('npm install -g vercel', { stdio: 'inherit' });
}

// Read environment variables from .env.production
const envPath = path.join(__dirname, '.env.production');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.production file not found!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

console.log('📋 Environment variables loaded from .env.production');
console.log('🌐 Target domain: https://techtornix.com');
console.log('📦 Deploying backend to Vercel...\n');

try {
  // Deploy to Vercel with specific project name
  console.log('⚡ Starting deployment...');
  execSync('vercel --prod --yes', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      ...envVars
    }
  });
  
  console.log('\n✅ Deployment completed successfully!');
  console.log('🎉 Your backend is now live on Vercel');
  console.log('🔗 It will automatically connect to your frontend at https://techtornix.com');
  
} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  console.log('\n💡 Make sure you have:');
  console.log('   1. Logged in to Vercel CLI (run: vercel login)');
  console.log('   2. Set up your environment variables in Vercel dashboard');
  console.log('   3. Updated your .env.production with correct credentials');
  process.exit(1);
}
