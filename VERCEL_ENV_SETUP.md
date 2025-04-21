# Vercel Environment Setup for Tumia

This guide explains how to set up the required environment variables for deploying the Tumia landing page to Vercel.

## Required Environment Variables

The website requires the following environment variables to function properly:

### 1. DATABASE_URL (Required for dynamic waitlist)

This is the connection string for your PostgreSQL database. If not provided, the site will fall back to a static mode using FormSpree for form submissions.

Example format:
```
postgresql://username:password@host:port/database
```

### 2. SENDGRID_API_KEY (Required for email notifications)

This is your SendGrid API key for sending email notifications when someone joins the waitlist. If not provided, email notifications will be disabled but the site will continue to function.

### 3. VITE_FORMSPREE_FORM_ID (For static mode only)

If you are using the static mode (without a database), you need to set up a FormSpree account and provide your form ID. This is used for the waitlist form submissions in static mode.

### 4. VITE_FORCE_STATIC_MODE (Optional)

Set this to "true" if you want to force the site to use the static version even if a database connection is available. This is useful for testing or when you want to use FormSpree instead of your database.

## Setting up Environment Variables in Vercel

1. Go to your project dashboard in Vercel
2. Navigate to the "Settings" tab
3. Click on "Environment Variables" in the sidebar
4. Add each environment variable with its corresponding value

## Creating a Database (Recommended: Neon)

1. Sign up for a free account at [Neon](https://neon.tech/)
2. Create a new project
3. Get your connection string from the dashboard
4. Add it as the `DATABASE_URL` environment variable in Vercel

## Setting Up SendGrid

1. Sign up for a [SendGrid account](https://sendgrid.com/)
2. Create an API key with "Mail Send" permissions
3. Verify your sender domain or email address (noreply@tumia.app)
4. Add the API key as the `SENDGRID_API_KEY` environment variable in Vercel

## Setting Up FormSpree (for Static Mode)

1. Sign up for a [FormSpree account](https://formspree.io/)
2. Create a new form
3. Get your form ID (it's the code in the form endpoint URL: `https://formspree.io/f/YOUR_FORM_ID`)
4. Add it as the `VITE_FORMSPREE_FORM_ID` environment variable in Vercel

## Troubleshooting

- If you see database connection errors, check that your `DATABASE_URL` is correct and that your database is accessible from Vercel.
- If the site loads but form submissions fail, check that either your database connection is working or your FormSpree form ID is correct.
- If the site falls back to static mode unexpectedly, it might mean the database connection is failing.