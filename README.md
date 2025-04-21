# Tumia - The Financial Copilot for Africa's Startup Ecosystem

A static landing page for Tumia designed to capture potential customer interest through a clean and straightforward waitlist signup experience.

## Overview

This repository contains a pure static website for Tumia with:
- Modern, responsive design
- Waitlist form powered by FormSpree
- Custom branding and styling
- Professional animations and layout

## Tech Stack

- Pure HTML/CSS with minimal JavaScript
- TailwindCSS (via CDN)
- FormSpree for form processing
- Vercel for hosting

## Deployment on Vercel

This repository is configured for immediate deployment on Vercel:

1. **Import this repository to Vercel**
   - Go to [Vercel](https://vercel.com/new)
   - Select "Import Git Repository"
   - Choose this repository
   - Select "Deploy"

2. **Configuration**
   - The `vercel.json` file is already configured with the correct settings
   - No build step is required as this is a static site
   - All assets are loaded from GitHub URLs

3. **Custom Domain Setup**
   - After deployment, go to your project settings in Vercel
   - Add your custom domain (e.g., tumia.app)
   - Follow Vercel's instructions to configure DNS

## Form Submissions

The waitlist form on the website uses FormSpree to handle submissions:
- All submissions are sent to the email associated with the FormSpree account
- Success and error handling is built into the page
- No server-side code is required

## Local Development

To run the site locally:
1. Clone this repository
2. Open `index.html` in your browser
3. For form testing, use the FormSpree test mode

## Key Files

- `index.html` - The main website file with embedded styles
- `public/index.html` - Same file for Vercel static hosting
- `vercel.json` - Configuration for Vercel deployment

For more detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).