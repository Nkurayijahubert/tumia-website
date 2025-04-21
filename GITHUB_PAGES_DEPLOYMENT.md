# Deploying Tumia to GitHub Pages

This guide explains how to deploy the Tumia landing page to GitHub Pages.

## Option 1: Static Site with Third-Party Form Handler (Recommended)

Since GitHub Pages only hosts static content, we'll need to adapt our approach by using a third-party service to handle form submissions.

### Prerequisites:
1. A GitHub account
2. A third-party form handling service (FormSpree, Netlify Forms, GetForm, etc.)

### Steps:

1. **Create a static version of the website:**
   ```bash
   npm run build
   ```

2. **Modify the waitlist form:**
   Replace the form in `client/src/components/WaitlistSection.tsx` with code that uses a third-party form handler instead of our API endpoint.

   Example with FormSpree:
   ```jsx
   <form action="https://formspree.io/f/your-form-id" method="POST" className="space-y-6">
     {/* Keep the same form fields, but remove the React Hook Form logic */}
   </form>
   ```

3. **Set up GitHub Pages:**
   - Push your code to a GitHub repository
   - Go to repository Settings → Pages
   - Select "GitHub Actions" as the source
   - Choose a static site workflow template

4. **Create GitHub Actions workflow:**
   Create a file at `.github/workflows/static.yml` with the following content:

   ```yaml
   name: Deploy static site to Pages

   on:
     push:
       branches: ["main"]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: false

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v3
         - name: Setup Node
           uses: actions/setup-node@v3
           with:
             node-version: "18"
             cache: 'npm'
         - name: Install dependencies
           run: npm ci
         - name: Build
           run: npm run build
         - name: Setup Pages
           uses: actions/configure-pages@v3
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v2
           with:
             path: 'dist'
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v2
   ```

5. **Configure email notifications:**
   Most form services allow you to forward submissions to an email address (team@tumia.app).

## Option 2: Static Front-End with Separate Backend

Another approach is to separate your application - host the front-end on GitHub Pages and the back-end elsewhere.

1. Deploy only the front-end (React app) on GitHub Pages
2. Deploy the API (Express) on a platform that supports server-side code like:
   - Vercel Serverless Functions
   - Netlify Functions
   - Railway
   - Render

3. Update the front-end to point to your API's new URL

## Option 3: Consider Using a Different Hosting Platform

For a full-stack application like this, consider using a platform that supports both static content and server-side functionality:

- Vercel (recommended for this project)
- Netlify
- Render
- Railway

These platforms offer free tiers and seamless deployment from GitHub repositories.

---

## Limitations of GitHub Pages for This Project

GitHub Pages is not ideal for this project because:

1. No server-side processing - can't run Express or handle API requests
2. No database connectivity - can't store waitlist entries
3. No environment variables - can't securely store database credentials or API keys

If you proceed with GitHub Pages, you'll need to make significant adjustments to your application architecture.