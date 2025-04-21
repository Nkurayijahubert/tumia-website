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

2. **Set up FormSpree for the waitlist form:**
   We've created a static version of the waitlist form in `client/src/components/StaticWaitlistSection.tsx` that uses FormSpree as the form handler.
   
   To set up FormSpree:
   1. Go to [FormSpree.io](https://formspree.io/) and create an account
   2. Create a new form and get your form ID (it will look like `xrgjaklp`)
   3. Add the form ID as a repository secret in your GitHub repository:
      - Go to your repository settings → Secrets and variables → Actions
      - Add a new repository secret with the name `FORMSPREE_FORM_ID` and your form ID as the value
   
   The GitHub Actions workflow will automatically replace the placeholder in the code with your actual FormSpree ID.

3. **Set up GitHub Pages:**
   - Push your code to a GitHub repository
   - Go to repository Settings → Pages
   - Select "GitHub Actions" as the source
   - Choose a static site workflow template

4. **Use the provided GitHub Actions workflow:**
   We've created a workflow file at `.github/workflows/deploy.yml` that handles the build and deployment process. The workflow includes:

   - **Automatic FormSpree configuration**: Inserts your FormSpree form ID into the static waitlist component
   - **Custom Vite build configuration**: Uses a special Vite config for GitHub Pages compatibility
   - **Proper asset paths**: Ensures all assets load correctly on GitHub Pages subdomain
   
   The workflow will run automatically when you push to the main branch, or you can trigger it manually from the Actions tab in your repository.

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