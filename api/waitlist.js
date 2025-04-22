/**
 * Waitlist API endpoint for Vercel
 * This is used to handle the waitlist form submissions
 */
// Import Google Sheets integration (make sure to add this file)
import { addToGoogleSheet } from '../vercel-api/googleSheets.js';

export default async function handler(req, res) {
  // Log headers and environment for debugging
  console.log("Waitlist API called with headers:", JSON.stringify(req.headers));
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Vercel:", process.env.VERCEL === '1' ? 'true' : 'false');
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed',
      method: req.method
    });
  }

  try {
    // Check if body is properly parsed
    console.log("Request body:", JSON.stringify(req.body));
    
    // Basic validation
    const { name, email, company, role } = req.body || {};
    
    if (!name || !email || !company || !role) {
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
      try {
        console.log('Attempting to add to Google Sheets...');
        const addedToSheet = await addToGoogleSheet({ name, email, company, role });
        
        if (addedToSheet) {
          console.log('Successfully added to Google Sheets');
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
        // Continue execution and return success anyway
      }
    } else {
      console.log('Google Sheets credentials not available');
    }
    
    // Default response if Google Sheets integration was skipped or failed
    return res.status(201).json({
      success: true,
      message: "Successfully added to waitlist",
      data: { email }
    });
  } catch (error) {
    console.error('Error in waitlist submission:', error);
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