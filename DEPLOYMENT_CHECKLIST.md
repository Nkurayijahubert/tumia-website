# Tumia Website Deployment Checklist

This document provides a quick checklist for deploying the Tumia landing page to Vercel. For more detailed instructions, please refer to `VERCEL_DEPLOYMENT.md`.

## Pre-Deployment Checklist

### Database Setup
- [ ] Create a PostgreSQL database (recommended: [Neon](https://neon.tech/))
- [ ] Get your database connection string

### SendGrid Setup
- [ ] Create a SendGrid account
- [ ] Verify the sender domain or email (noreply@tumia.app)
- [ ] Create an API key
- [ ] Verify the sender email is authorized

### Environment Variables
- [ ] DATABASE_URL: PostgreSQL connection string
- [ ] SENDGRID_API_KEY: Your SendGrid API key

### GitHub Pages (Alternative Deployment)
- [ ] FormSpree account (if using GitHub Pages)
- [ ] Set VITE_FORMSPREE_FORM_ID environment variable

## Deployment Steps

1. Push code to a Git repository
2. Import the repository in Vercel
3. Configure build settings:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Add environment variables (DATABASE_URL, SENDGRID_API_KEY)
5. Deploy
6. Verify waitlist form functionality after deployment

## Post-Deployment

1. Set up a custom domain (if needed)
2. Test the waitlist form submission
3. Verify email notifications are being sent to team@tumia.app

## Notes

- The landing page is designed to work with Vercel's serverless functions
- The database schema will be automatically created on first run
- Static files are served from the `dist` directory