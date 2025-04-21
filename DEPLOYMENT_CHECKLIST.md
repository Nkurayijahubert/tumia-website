# Deployment Checklist for Tumia

## Vercel Deployment Process

1. **Environment Variables**: Make sure to set these correctly in the Vercel project settings
   - `VITE_FORCE_STATIC_MODE=true` (enables static FormSpree fallback mode)
   - `VITE_FORMSPREE_FORM_ID` (your FormSpree form ID for the static waitlist)
   - `DATABASE_URL` (only needed if you want to use database integration)
   - `GOOGLE_SHEET_ID` (only needed for Google Sheets integration)
   - `GOOGLE_SERVICE_ACCOUNT_KEY` (only needed for Google Sheets integration)

2. **Build Command**: The build command in vercel.json is:
   ```
   VITE_FORCE_STATIC_MODE=true vite build -c vite.production.config.ts
   ```

3. **API Deployment**: 
   - The API uses Vercel Serverless Functions in the `/api` directory
   - Each file becomes its own endpoint (e.g., `/api/health.ts` → `/api/health`)
   - The frontend uses static mode by default in production

4. **Project Structure**:
   - Make sure the `/api` directory only contains the serverless function 
   - All other server code should be in the `/server` directory

## Troubleshooting

If you encounter deployment issues:

1. **Module Resolution Errors**: These usually occur when the API serverless function tries to import from project files outside its directory. The solution we implemented is to:
   - Create a completely self-contained `api/server.ts` file that doesn't import anything from the rest of the codebase
   - Force the frontend to use static mode in production

2. **API Errors**: If the API is not responding:
   - Check Vercel logs for errors
   - Ensure environment variables are correctly set
   - The site should still work in static mode with FormSpree

3. **Frontend Issues**:
   - Static mode should be enabled in production (the site uses FormSpree instead of the API)
   - Verify FormSpree ID is correctly set
   - Check browser console for any errors

## Development vs Production

- **Development**: The site uses the full API integration with database and Google Sheets
- **Production**: The site defaults to static mode with FormSpree for reliability

## Final Pre-Deployment Check

1. Ensure all code changes are committed and pushed to the repository
2. Verify that FormSpree is correctly configured
3. Test the build locally with `VITE_FORCE_STATIC_MODE=true npm run build`
4. Ensure all environment variables are set in Vercel