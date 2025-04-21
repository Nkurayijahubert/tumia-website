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

### 2. GOOGLE_SHEET_ID (For Google Sheets integration)

This is the ID of your Google Sheet where waitlist entries will be stored. You can find this ID in the URL of your Google Sheet:
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
```

### 3. GOOGLE_SERVICE_ACCOUNT_KEY (For Google Sheets integration)

This is a base64-encoded JSON key for a Google Service Account that has access to your Google Sheet. The key should be created with the Google Sheets API enabled.

Steps to create and encode a service account key:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API
4. Create a service account
5. Create a JSON key for the service account
6. Encode the JSON key as base64:
   ```
   cat your-service-account-key.json | base64
   ```
7. Share your Google Sheet with the service account email (it looks like: `service-account-name@project-id.iam.gserviceaccount.com`)

### 4. VITE_FORMSPREE_FORM_ID (For static mode only)

If you are using the static mode (without a database), you need to set up a FormSpree account and provide your form ID. This is used for the waitlist form submissions in static mode.

### 5. VITE_FORCE_STATIC_MODE (Optional)

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

## Setting Up Google Sheets Integration

1. Create a Google Sheet for storing waitlist entries
2. Set up a Google Cloud project and enable the Google Sheets API
3. Create a service account and download the JSON key
4. Share your Google Sheet with the service account email
5. Encode the JSON key as base64 and add it as the `GOOGLE_SERVICE_ACCOUNT_KEY` environment variable
6. Add your Google Sheet ID as the `GOOGLE_SHEET_ID` environment variable

## Setting Up FormSpree (for Static Mode)

1. Sign up for a [FormSpree account](https://formspree.io/)
2. Create a new form
3. Get your form ID (it's the code in the form endpoint URL: `https://formspree.io/f/YOUR_FORM_ID`)
4. Add it as the `VITE_FORMSPREE_FORM_ID` environment variable in Vercel

## Troubleshooting

- If you see database connection errors, check that your `DATABASE_URL` is correct and that your database is accessible from Vercel.
- If the site loads but form submissions fail, check that either your database connection is working or your Google Sheets/FormSpree configuration is correct.
- If entries aren't being added to your Google Sheet, verify that your service account has edit access to the sheet and the key is correctly encoded.