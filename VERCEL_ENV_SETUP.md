# Vercel Environment Variable Setup

This guide explains how to set up environment variables in Vercel for the Tumia website. For the static site deployment, you won't need any environment variables, but this guide is included in case you decide to enable the server-side API features in the future.

## Static Site Deployment (Current Configuration)

The current configuration uses FormSpree for form handling and doesn't require any environment variables in Vercel.

## Optional: Enabling Server-Side API (Advanced)

If you want to use the server-side API endpoints in `/vercel-api`, you'll need to set up the following environment variables:

### 1. Google Sheets Integration

To enable storing waitlist submissions in Google Sheets, add these variables:

| Variable Name | Description |
|---------------|-------------|
| `GOOGLE_SERVICE_ACCOUNT_KEY` | The JSON key for your Google service account (base64 encoded) |
| `GOOGLE_SHEET_ID` | The ID of your Google Sheet (found in the URL) |

### Setting Up Environment Variables in Vercel

1. **Go to your project settings in Vercel**
   - Navigate to your project dashboard
   - Click on "Settings" tab

2. **Add environment variables**
   - Click on "Environment Variables"
   - Add each variable with its name and value
   - Optionally scope variables to specific environments (Production, Preview, Development)

3. **Redeploy your application**
   - After adding variables, redeploy your application
   - Vercel will automatically include these variables in your serverless functions

## Security Considerations

- Never commit sensitive environment variables to your repository
- Use Vercel's environment variable encryption for sensitive values
- For local development, create a `.env` file (which should be git-ignored)