# Tumia - Financial Copilot for Africa's Startup Ecosystem

This project is a pre-launch SaaS landing page for Tumia, designed to capture potential customer interest through an engaging waitlist signup process.

## Key Technologies

- React frontend
- PostgreSQL database
- Drizzle ORM
- TypeScript
- Tailwind CSS for responsive design

## Deployment Instructions for Vercel

### Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A PostgreSQL database (we recommend using [Neon](https://neon.tech/) for Vercel deployments)
3. SendGrid account for email notifications

### Steps to Deploy

1. **Clone and push this repository to GitHub**

2. **Connect repository to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Configure the following environment variables:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `SENDGRID_API_KEY`: Your SendGrid API key

3. **Deploy**
   - Click "Deploy" and Vercel will handle the build and deployment process

### Post-Deployment Steps

1. **Set up custom domain (optional)**
   - Go to your project settings in Vercel
   - Navigate to the "Domains" section
   - Add your custom domain and follow the verification steps

2. **Configure Vercel-Neon Integration (recommended)**
   - If using Neon, set up the Vercel-Neon integration for better performance

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your environment variables
4. Run the development server: `npm run dev`

## Project Structure

- `/client`: Frontend React application
- `/server`: Backend Express API
- `/shared`: Shared code between frontend and backend
- `/api`: Vercel-specific API endpoints