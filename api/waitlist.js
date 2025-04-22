import { addToGoogleSheet } from './_waitlist';

/**
 * Waitlist API endpoint for Vercel
 * This is used to handle the waitlist form submissions
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    // Basic validation
    const { name, email, company, role } = req.body;
    
    if (!name || !email || !company || !role) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        requiredFields: ["name", "email", "company", "role"]
      });
    }
    
    console.log('Received waitlist submission:', { name, email, company, role });
    
    // Try to add to Google Sheets
    const addedToSheet = await addToGoogleSheet({ name, email, company, role });
    
    if (addedToSheet) {
      console.log('Waitlist entry added to Google Sheet successfully');
      return res.status(201).json({
        success: true,
        message: "Successfully added to waitlist",
        data: { email }
      });
    } else {
      // Still return success if the Google Sheet integration fails, just log the error
      console.error('Failed to add to Google Sheet, but continuing');
      return res.status(201).json({
        success: true,
        message: "Added to waitlist, but Google Sheet integration failed",
        data: { email }
      });
    }
  } catch (error) {
    console.error('Error in waitlist submission:', error);
    return res.status(500).json({
      success: false,
      message: "Server error processing waitlist submission",
      error: error.message
    });
  }
}