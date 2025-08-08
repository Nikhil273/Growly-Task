# Deployment Guide for Growly Landing Page

This document contains deployment instructions for both frontend and backend components of the Growly landing page.

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Vercel account (for frontend)
- Render account (for backend)
- Email service credentials (Gmail with App Password)

## 🚀 Quick Start (Local Development)

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd growly-landing
   ```

2. **Install all dependencies**

   ```bash
   npm run install-deps
   ```

3. **Set up environment variables**

   ```bash
   # Copy environment templates
   cp server/.env.example server/.env
   cp client/.env.example client/.env

   # Edit the .env files with your actual credentials
   ```

4. **Start development servers**

   ```bash
   npm run dev
   ```

   This will start:

   - Backend server on http://localhost:5000
   - Frontend development server on http://localhost:3000

## 🌐 Frontend Deployment (Vercel)

### Option 1: Deploy from Git Repository

1. **Prepare for deployment**

   ```bash
   cd client
   npm run build
   ```

2. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Deploy on Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: `Vite`
     - Root Directory: `client`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add environment variables:
     - `VITE_API_URL`: Your backend URL (e.g., `https://your-app.render.com`)

### Option 2: Manual Deployment

1. **Build the project**

   ```bash
   cd client
   npm run build
   ```

2. **Deploy the `dist` folder to your hosting provider**

## 🔧 Backend Deployment (Render)

### 1. Prepare for Deployment

1. **Update package.json** (already configured)

   ```json
   {
     "scripts": {
       "start": "node index.js",
       "dev": "nodemon index.js"
     }
   }
   ```

2. **Create render.yaml** (optional)
   ```yaml
   services:
     - type: web
       name: growly-api
       env: node
       plan: free
       buildCommand: npm install
       startCommand: npm start
       envVars:
         - key: NODE_ENV
           value: production
   ```

### 2. Deploy on Render

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Backend ready for deployment"
   git push origin main
   ```

2. **Create new Web Service on Render**

   - Go to [Render Dashboard](https://render.com/dashboard)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure service:
     - Name: `growly-api`
     - Root Directory: `server`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`

3. **Add Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/growly
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-vercel-app.vercel.app
   JWT_SECRET=your_super_secure_jwt_secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_TO=hr@geneisisflare.com
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Cluster**

   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a new cluster
   - Set up database user and password
   - Whitelist IP addresses (or use 0.0.0.0/0 for all IPs)

2. **Get Connection String**
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/growly`
   - Use this in your `MONGODB_URI` environment variable

## 📧 Email Configuration

1. **Gmail Setup**

   - Enable 2-Factor Authentication
   - Generate App Password:
     - Go to Google Account settings
     - Security → 2-Step Verification → App passwords
     - Generate password for "Mail"
   - Use this app password in `EMAIL_PASS`

2. **Alternative Email Services**
   - SendGrid, Mailgun, or any SMTP service
   - Update `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` accordingly

## 🔒 Security Checklist

- [ ] Use strong JWT secret
- [ ] Set up proper CORS origins
- [ ] Use HTTPS in production
- [ ] Secure MongoDB connection
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Validate all user inputs
- [ ] Use secure email credentials

## 📊 Monitoring & Analytics

### Backend Monitoring

- Monitor API response times
- Track error rates
- Monitor database performance
- Set up logging (consider services like LogRocket or Sentry)

### Frontend Analytics

- Google Analytics
- Hotjar for user behavior
- Performance monitoring (Web Vitals)

## 🚀 Performance Optimizations

### Frontend

- Lazy loading for components
- Image optimization
- Bundle size optimization
- CDN usage for static assets

### Backend

- Database indexing
- Response caching
- Connection pooling
- Load balancing (for scale)

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Example

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"
      - name: Install dependencies
        run: npm run install-deps
      - name: Build frontend
        run: cd client && npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure `FRONTEND_URL` is correctly set in backend
   - Check Vercel deployment URL

2. **Database Connection Issues**

   - Verify MongoDB connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has proper permissions

3. **Email Not Sending**

   - Verify Gmail app password
   - Check email configuration
   - Test with email testing tools

4. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all environment variables are set

### Logs and Debugging

1. **Backend Logs**

   - Check Render logs in dashboard
   - Add console.log statements for debugging
   - Use morgan for request logging

2. **Frontend Issues**
   - Check browser console
   - Use React Developer Tools
   - Monitor network requests

## 📱 Testing

### Manual Testing Checklist

- [ ] Landing page loads correctly
- [ ] Form validation works
- [ ] Form submission successful
- [ ] Email notifications sent
- [ ] Admin dashboard accessible
- [ ] Responsive design on mobile
- [ ] Dark mode toggle works
- [ ] All links and buttons functional

### Automated Testing (Future Enhancement)

- Unit tests with Jest
- Integration tests with Cypress
- API testing with Postman/Newman

## 📞 Support

For deployment support:

- Check the GitHub repository issues
- Review error logs in hosting platforms
- Contact the development team

---

**Last Updated:** January 2024
**Version:** 1.0.0
