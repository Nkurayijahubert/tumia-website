// Simplified waitlist API endpoint
module.exports = (req, res) => {
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
    
    // Always return success in this simplified version
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
      error: error.message
    });
  }
};