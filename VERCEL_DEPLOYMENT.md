# Deploying Tumia to Vercel

This guide will walk you through the process of deploying your Tumia landing page to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A GitHub, GitLab, or Bitbucket account to host your code
3. A PostgreSQL database (Recommended: [Neon](https://neon.tech/) for serverless Postgres)
4. A [SendGrid account](https://sendgrid.com/) for email notifications

## Step 1: Prepare Your Repository

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Make sure your repository includes all the files in this project

## Step 2: Set Up Your Database

1. Create a PostgreSQL database (we recommend Neon for Vercel deployments)
2. Get your database connection string, which should look like: `postgresql://username:password@host:port/database`

## Step 3: Set Up SendGrid

1. Create a SendGrid account if you don't have one
2. Verify your sender domain or email address
3. Create an API key for your application
4. Make sure to verify 'noreply@tumia.app' as a sender, or change the from email in server/email.ts

## Step 4: Deploy to Vercel

1. Log in to your Vercel account
2. Click "Add New" → "Project"
3. Import your Git repository
4. Configure the project with the following settings:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Set up the following environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SENDGRID_API_KEY`: Your SendGrid API key

6. Click "Deploy"

## Step 5: Configure Your Domain (Optional)

1. After deployment, go to your project settings
2. Navigate to the "Domains" section
3. Add your custom domain and follow the verification steps

## Step 6: Test Your Deployment

1. After deployment is complete, visit your Vercel URL
2. Test the waitlist form to ensure it's working properly
3. Check that emails are being sent to team@tumia.app when someone signs up

## Troubleshooting

If you encounter any issues:

1. Check the Vercel deployment logs
2. Ensure your environment variables are set correctly
3. Make sure your database is accessible from Vercel
4. Verify that your SendGrid sender email is properly authenticated

## Updating Your Deployment

Any changes pushed to your main branch will automatically trigger a new deployment.

---

For additional support, please contact the development team.