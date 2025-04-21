# Vercel Deployment Guide for Tumia Website

This repository is configured for deployment on Vercel as a static site.

## Configuration Overview

The Tumia website is set up as a pure static site with:

- `index.html` - Complete, self-contained website with all styles and scripts embedded
- `public/index.html` - Same file, placed in the public directory for Vercel's static site hosting
- `vercel.json` - Configuration file that tells Vercel to treat this as a static site with no build steps

## Deployment Instructions

1. **Connect Vercel to GitHub**
   - Log in to your Vercel account
   - Go to "Add New..." > "Project"
   - Choose to import your GitHub repository

2. **Configure Deployment Settings**
   - Framework Preset: Select "Other" (since this is a static site)
   - Build Command: Leave empty (our vercel.json sets this to null)
   - Output Directory: Leave as "public" (default for static sites)
   - Environment Variables: None needed for static deployment

3. **Deploy**
   - Click "Deploy"
   - Vercel will deploy your static site without running any build commands

## Custom Domain Setup

1. **Navigate to Domain Settings**
   - Go to your project in Vercel
   - Click "Settings" > "Domains"

2. **Add Your Domain**
   - Enter your domain (e.g., tumia.app)
   - Follow Vercel's instructions to verify domain ownership
   - Update your DNS records as instructed by Vercel

## Troubleshooting

If deployment fails, check the following:

1. **Vercel Configuration**
   - Ensure vercel.json has the correct format:
   ```json
   {
     "buildCommand": null,
     "installCommand": null,
     "framework": null
   }
   ```

2. **File Structure**
   - Confirm index.html exists in the root directory
   - Confirm index.html also exists in the public directory

3. **Large Files**
   - Ensure no individual file exceeds Vercel's size limits
   - All images are externally hosted on GitHub, so this shouldn't be an issue

4. **Build Errors**
   - If you see build errors, it might mean Vercel is trying to run a build process
   - Double-check that vercel.json is being properly recognized

## Support

If you're still encountering issues, Vercel's support documentation is available at: https://vercel.com/docs