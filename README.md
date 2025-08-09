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
- Real-time form submission
- Error handling and success messages
- Mobile-first responsive design

## Project Structure

```
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
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Clone the repository

```bash
git clone https://github.com/Nikhil273/Growly-Task
cd growly-landing
```

### Install dependencies

```bash
cd client
npm install
cd ../server
npm install
```

### Environment Setup

1. Create `.env` file in the `server` directory:

2. Update the `.env` file with your credentials:

```bash
MONGODB_URI=
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
FRONTEND_PRODUCTION_URL=https://growly-task.vercel.app
JWT_SECRET=
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_PASS=
EMAIL_USER=
EMAIL_TO=
```

### Run the application

#### Run separately

```bash
# Backend only
npm run start
# Frontend only
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Hosted Links

- **Frontend**: [https://growly-task.vercel.app/](https://growly-task.vercel.app/)
- **Backend**: [https://growly-task.onrender.com](https://growly-task.onrender.com)

## Pages & Routes

### Frontend Routes

- `/` - Landing page with hero, features, and lead form

- `/admin` -I have added a button in header to go to admin dashboard but you can also access it directly at `/admin`

### Backend API Routes

- `POST /api/leads` - Submit lead form data
- `GET /api/leads` - Get all leads (admin)
- `GET /api/health` - Health check

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

## Security Features

- Input validation and sanitization
- CORS configuration
- Environment variables for sensitive data
- Error handling middleware
