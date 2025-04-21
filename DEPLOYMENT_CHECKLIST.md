# Tumia Deployment Checklist

This document provides a step-by-step guide to ensure a successful deployment of the Tumia landing page on Vercel.

## Pre-Deployment Checks

1. **Verify Google Sheets Integration**
   - Run `npx tsx server/deploy-verify.ts` to check Google Sheets configuration
   - Ensure the service account key is valid and correctly formatted
   - Confirm the spreadsheet exists and is accessible by the service account
   - Ensure Sheet1 exists within the spreadsheet

2. **Test Database Connection**
   - Run `npx tsx server/deploy-verify.ts` to verify database connectivity
   - Check that the waitlist_entries table exists and has the correct schema
   - If the table doesn't exist, the script will attempt to create it

3. **Code Verification**
   - Ensure all changes are committed to your repository
   - Verify the static fallback mode works by setting `VITE_FORCE_STATIC_MODE=true` locally
   - If using static mode, test FormSpree integration by submitting a test form

## Deployment on Vercel

1. **Set Up Vercel Project**
   - Create a new project on Vercel connected to your GitHub repository
   - Select the project and go to the Settings tab

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Node.js Version: 18.x (or higher)

3. **Set Environment Variables**
   - Go to Settings > Environment Variables and add:
   
   **Required Variables:**
   - `DATABASE_URL`: Your Neon or other PostgreSQL connection string
   - `GOOGLE_SHEET_ID`: The ID of your Google Sheet (from the URL)
   - `GOOGLE_SERVICE_ACCOUNT_KEY`: The base64-encoded JSON service account key
   
   **Optional Variables:**
   - `VITE_FORMSPREE_FORM_ID`: Your FormSpree form ID for static fallback mode
   - `VITE_FORCE_STATIC_MODE`: Set to "true" to force static mode (for debugging)

4. **Deploy Again**
   - After setting all environment variables, trigger a new deployment
   - This can be done by clicking "Redeploy" in the Vercel dashboard

## Post-Deployment Verification

1. **Check Frontend Loading**
   - Visit your deployed site (e.g., tumia.app)
   - Ensure the page loads and all sections are visible
   - Verify all images and styling are correct

2. **Test API Connectivity**
   - Visit `/api/health` on your domain to verify the API is running
   - Visit `/api/health-debug` for more detailed diagnostic information
   - This will show the status of your database and Google Sheets integration

3. **Test Waitlist Form**
   - Fill out and submit the waitlist form on your site
   - Check if the submission is successfully saved
   - Verify the entry appears in your Google Sheet

4. **Troubleshooting Common Issues**
   - If the site loads but API calls fail, check API routes in Vercel
   - If the database connection fails, verify your DATABASE_URL
   - If Google Sheets integration fails, check GOOGLE_SERVICE_ACCOUNT_KEY formatting
   - If all else fails, set VITE_FORCE_STATIC_MODE=true to use FormSpree

## Additional Resources

- **Server Logs**: Check Function Logs in Vercel dashboard for API errors
- **Database Management**: Use the Neon console to manage your database
- **Manual Export**: Visit `/api/waitlist/export` to download all entries as CSV

## Emergency Fallback

If you need to quickly get a working site without backend functionality:

1. Set `VITE_FORCE_STATIC_MODE=true` in Vercel environment variables
2. Set `VITE_FORMSPREE_FORM_ID` to your FormSpree form ID
3. Redeploy your application

This will bypass all backend API calls and use FormSpree for form submissions.