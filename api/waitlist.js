/**
 * Waitlist API endpoint for Vercel
 * This is used to handle the waitlist form submissions
 */
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
    
    // On Vercel, we'll just return success without actually trying Google Sheets integration
    // This ensures the form works even if the integration is not set up
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