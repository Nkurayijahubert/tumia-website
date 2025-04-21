# Tumia Website - GitHub Pages Deployment

This is a simplified, static version of the Tumia website ready for GitHub Pages deployment.

## Quick Deployment Instructions

1. Create a new repository on GitHub
2. Upload all files and folders from this directory to that repository
3. Go to Settings > Pages in your GitHub repository
4. Select "GitHub Actions" as the source
5. The site will be automatically deployed by the GitHub Actions workflow

## What's Included

- `index.html` - Complete, self-contained website with all styles and scripts embedded
- `.nojekyll` - Special file to bypass GitHub Pages' Jekyll processing
- `.github/workflows/pages.yml` - Automated deployment workflow

## Custom Domain Setup (Optional)

1. Go to Settings > Pages in your GitHub repository
2. Under "Custom domain," enter your domain (e.g., tumia.app)
3. Save and wait for DNS verification
4. Set up the correct DNS records with your domain provider:
   - For an apex domain (example.com): Create an A record pointing to GitHub Pages IP addresses
   - For a subdomain (www.example.com): Create a CNAME record pointing to your-username.github.io

## Form Handling

The waitlist form uses FormSpree to handle submissions. All submissions will be sent to the email associated with the FormSpree account.

## Need Help?

If you encounter any issues with the deployment process, please check GitHub's documentation on GitHub Pages:
https://docs.github.com/en/pages