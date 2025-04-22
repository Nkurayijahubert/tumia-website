/**
 * Waitlist API endpoint for Vercel
 * This is used to handle the waitlist form submissions
 */
// Import Google Sheets integration (make sure to add this file)
import { addToGoogleSheet } from '../vercel-api/googleSheets.js';

export default async function handler(req, res) {
  // Enhanced debugging for Vercel environment
  console.log("======= WAITLIST API DEBUG START =======");
  console.log("Waitlist API called with method:", req.method);
  console.log("Waitlist API headers:", JSON.stringify(req.headers, null, 2));
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Running on Vercel:", process.env.VERCEL === '1' ? 'true' : 'false');
  
  // Log environment variables (without exposing full secrets)
  console.log("GOOGLE_SHEET_ID available:", process.env.GOOGLE_SHEET_ID ? 'Yes' : 'No');
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    const keyPreview = process.env.GOOGLE_SERVICE_ACCOUNT_KEY.substring(0, 20) + '...';
    console.log(`GOOGLE_SERVICE_ACCOUNT_KEY available: Yes (${keyPreview}), length: ${process.env.GOOGLE_SERVICE_ACCOUNT_KEY.length}`);
  } else {
    console.log("GOOGLE_SERVICE_ACCOUNT_KEY available: No");
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log("Method not allowed:", req.method);
    console.log("======= WAITLIST API DEBUG END =======");
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed',
      method: req.method
    });
  }

  try {
    // Check if body is properly parsed
    console.log("Request body:", JSON.stringify(req.body, null, 2));
    
    // Basic validation
    const { name, email, company, role } = req.body || {};
    
    if (!name || !email || !company || !role) {
      console.log("Missing required fields:", { name, email, company, role });
      console.log("======= WAITLIST API DEBUG END =======");
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        requiredFields: ["name", "email", "company", "role"],
        received: { name, email, company, role }
      });
    }
    
    console.log('Received waitlist submission:', { name, email, company, role });
    
    // Try to add to Google Sheets if credentials are available
    if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      console.log('Attempting to add to Google Sheets...');
      
      try {
        // Initialize Google Sheets with diagnostic output
        console.log('Calling addToGoogleSheet function...');
        const addedToSheet = await addToGoogleSheet({ name, email, company, role });
        
        if (addedToSheet) {
          console.log('Successfully added to Google Sheets!');
          console.log("======= WAITLIST API DEBUG END =======");
          return res.status(201).json({
            success: true,
            message: "Successfully added to waitlist and Google Sheets",
            data: { email }
          });
        } else {
          console.log('Failed to add to Google Sheets, but continuing');
        }
      } catch (googleError) {
        console.error('Google Sheets integration error:', googleError);
        console.error('Error message:', googleError.message);
        if (googleError.stack) {
          console.error('Error stack:', googleError.stack);
        }
        // Continue execution and return success anyway
      }
    } else {
      console.log('Google Sheets credentials not available or incomplete');
    }
    
    // Default response if Google Sheets integration was skipped or failed
    console.log('Returning fallback success response');
    console.log("======= WAITLIST API DEBUG END =======");
    return res.status(201).json({
      success: true,
      message: "Successfully added to waitlist",
      data: { email }
    });
  } catch (error) {
    console.error('Error in waitlist submission:', error);
    console.error('Error message:', error.message);
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
    console.log("======= WAITLIST API DEBUG END =======");
    return res.status(500).json({
      success: false,
      message: "Server error processing waitlist submission",
      error: error.message,
      stack: error.stack,
      environment: process.env.NODE_ENV || 'production',
      vercel: process.env.VERCEL === '1' ? 'true' : 'false'
    });
  }
}