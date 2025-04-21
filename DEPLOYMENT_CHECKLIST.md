# Tumia Website Deployment Checklist

This document provides a quick checklist for deploying the Tumia landing page to Vercel. For more detailed instructions, please refer to `VERCEL_ENV_SETUP.md`.

## Pre-Deployment Checklist

### Database Setup
- [ ] Create a PostgreSQL database (recommended: [Neon](https://neon.tech/))
- [ ] Get your database connection string

### Google Sheets Setup (for waitlist entries)
- [ ] Create a Google Sheet
- [ ] Create a Google Cloud project
- [ ] Enable Google Sheets API
- [ ] Create a service account with appropriate permissions
- [ ] Download the service account key (JSON)
- [ ] Encode the key as base64
- [ ] Share the Google Sheet with the service account email

### Environment Variables
- [ ] DATABASE_URL: PostgreSQL connection string
- [ ] GOOGLE_SHEET_ID: ID of your Google Sheet
- [ ] GOOGLE_SERVICE_ACCOUNT_KEY: Base64-encoded service account key

### FormSpree Setup (for Static Mode)
- [ ] FormSpree account (if using static mode)
- [ ] Set VITE_FORMSPREE_FORM_ID environment variable

## Deployment Steps

1. Push code to a Git repository
2. Import the repository in Vercel
3. Configure build settings:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Add environment variables (DATABASE_URL, GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_KEY)
5. Deploy
6. Verify waitlist form functionality after deployment

## Post-Deployment

1. Set up a custom domain (if needed)
2. Test the waitlist form submission
3. Verify waitlist entries are being added to your Google Sheet

## Notes

- The landing page is designed to work with Vercel's serverless functions
- The database schema will be automatically created on first run
- Static files are served from the `dist` directory