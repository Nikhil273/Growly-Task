# Growly - AI Ad Creative Generator Landing Page

A modern, fully functional landing page for Growly, an AI-powered ad creative generator that helps small businesses create high-converting ads for Meta and Google Ads.

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Hosting**: Vercel (Frontend) + Render (Backend)

## Features

- Modern, responsive landing page design
- Lead capture form with validation
- MongoDB database integration
- Admin dashboard to view leads
- Dark/Light mode toggle
- Real-time form submission
- Error handling and success messages
- Mobile-first responsive design

## Project Structure

````
growly-landing/
├── client/          # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/          # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── package.json
├── README.md

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Clone the repository

```bash
git clone https://github.com/Nikhil273/Growly-Task
cd growly-landing
````

### Install dependencies

```bash
cd client
npm install
cd ../server
npm install
```

### Environment Setup

1. Create `.env` file in the `server` directory:

```bash
cd server/.env.example server/.env
```

2. Update the `.env` file with your credentials:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

### Run the application

#### Development mode (both frontend and backend)

```bash
npm run dev
```

#### Run separately

```bash
# Backend only
npm run server

# Frontend only
npm run client
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🌐 Hosted Links

- **Frontend**: [https://yourusername.github.io/growly-client](https://yourusername.github.io/growly-client)
- **Backend**: [https://growly-api.render.com](https://growly-api.render.com)

## 📱 Pages & Routes

### Frontend Routes

- `/` - Landing page with hero, features, and lead form
- `/admin` - Admin dashboard to view submitted leads

### Backend API Routes

- `POST /api/leads` - Submit lead form data
- `GET /api/leads` - Get all leads (admin)
- `GET /api/health` - Health check

## 🎨 UI Components

### Landing Page Sections

1. **Hero Section** - Main headline, subheadline, and CTA
2. **How It Works** - 3-step process explanation
3. **Key Features** - AI features showcase
4. **Lead Capture Form** - Contact form with validation

### Form Fields

- Name (required)
- Email (required, validated)
- Phone (required)
- Business Type (dropdown)
- Message (optional)

## 🔒 Security Features

- Input validation and sanitization
- CORS configuration
- Rate limiting
- Environment variables for sensitive data
- Error handling middleware

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd client
npm run build
# Deploy to Vercel
```

### Backend (Render)

```bash
# Push to GitHub and connect to Render
# Set environment variables in Render dashboard
```

## 🧪 Testing

The application includes:

- Form validation testing
- API endpoint testing
- Responsive design testing
- Cross-browser compatibility

## 📊 Database Schema

### Leads Collection

```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  businessType: String (required),
  message: String,
  createdAt: Date (default: Date.now)
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For any questions or support, please contact [your-email@example.com](mailto:your-email@example.com)



MONGODB_URI=mongodb+srv://Nikhil:meradbpass@cluster0.v3q8r.mongodb.net/growly
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173 
FRONTEND_PRODUCTION_URL=https://growly-task.vercel.app
JWT_SECRET=growly_super_secure_jwt_secret_key_2024
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_PASS=tuerqerhpdaldmmh
EMAIL_USER=nmaurya153@gmail.com
EMAIL_TO=nikhilmaurya.it@gmail.com

