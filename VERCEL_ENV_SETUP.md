# Vercel Environment Setup for Tumia with Google Sheets Integration

This guide explains how to set up the required environment variables for deploying the Tumia landing page to Vercel with Google Sheets integration for waitlist submissions.

## Required Environment Variables for Google Sheets Integration

### 1. GOOGLE_SHEET_ID

This is the ID of your Google Sheet where waitlist entries will be stored.

For Tumia, the Google Sheet ID is:
```
1r40aCV0CEeJZGXn815a71YGRi5GLWCYE2Uh9o1gMsqQ
```

This ID is already configured in the vercel.json file, but you can also set it as an environment variable in Vercel.

### 2. GOOGLE_SERVICE_ACCOUNT_KEY

This is the service account key for Google Sheets API access. The service account for Tumia is:
```
waiting-list@tumia-457511.iam.gserviceaccount.com
```

The key needs to be provided as an environment secret in Vercel, as it contains sensitive credentials.

## Setting up Environment Variables in Vercel

1. Go to your project dashboard in Vercel after connecting your GitHub repository
2. Navigate to the "Settings" tab
3. Click on "Environment Variables" in the sidebar
4. Add the following environment variables:
   - `GOOGLE_SHEET_ID`: `1r40aCV0CEeJZGXn815a71YGRi5GLWCYE2Uh9o1gMsqQ`
   - `GOOGLE_SERVICE_ACCOUNT_KEY`: [Your service account key JSON]

## Optional Database Integration

If you also want to store waitlist entries in a database, you can set up a PostgreSQL database:

1. Sign up for a free account at [Neon](https://neon.tech/)
2. Create a new project
3. Get your connection string from the dashboard
4. Add it as the `DATABASE_URL` environment variable in Vercel

## Deployment Process

1. Connect your GitHub repository to Vercel
2. Set up the environment variables as described above
3. Deploy your project
4. Vercel will automatically build and deploy your site with the Google Sheets integration

## Verifying the Integration

After deployment, you can verify that the Google Sheets integration is working by:

1. Submitting a test entry through the waitlist form
2. Checking your Google Sheet to confirm the entry was added
3. You can also check the Vercel function logs for success messages

## Troubleshooting

- If waitlist entries aren't being added to your Google Sheet, verify that your service account has edit access to the sheet.
- Check the Vercel function logs for any errors related to Google Sheets authentication.
- Ensure the GOOGLE_SERVICE_ACCOUNT_KEY is properly formatted and includes all necessary credentials.
- Make sure the Google Sheet exists and is accessible to the service account.