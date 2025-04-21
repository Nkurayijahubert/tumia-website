/**
 * This is a simplified standalone API that doesn't rely on any imports
 * from outside the api directory to ensure compatibility with Vercel.
 */
import 'dotenv/config';
import express from 'express';
import { json } from 'express';
import { createServer } from 'http';

const app = express();
app.use(json());

// Simple health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    vercel: process.env.VERCEL === '1' ? 'true' : 'false'
  });
});

// Debug route with environment information
app.get('/api/debug', (req, res) => {
  res.status(200).json({
    env: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      DATABASE_URL_SET: !!process.env.DATABASE_URL,
      GOOGLE_SHEET_ID_SET: !!process.env.GOOGLE_SHEET_ID,
      GOOGLE_SERVICE_ACCOUNT_KEY_SET: !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
      VITE_FORCE_STATIC_MODE: process.env.VITE_FORCE_STATIC_MODE,
      VITE_FORMSPREE_FORM_ID_SET: !!process.env.VITE_FORMSPREE_FORM_ID
    },
    cwd: process.cwd(),
    nodeVersion: process.version,
    uptime: process.uptime()
  });
});

// Simplified waitlist route - to ensure at least basic functionality works
app.post('/api/waitlist', async (req, res) => {
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
    
    // Always return success for now - the app will use static mode anyway
    // This is just to ensure the API endpoint functions
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
});

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error('API Error:', err);
  res.status(500).json({
    error: 'Server error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// For local development, simulating how Vercel would host
if (process.env.NODE_ENV === 'development' && !process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  const server = createServer(app);
  server.listen(port, () => {
    console.log(`API server running on port ${port}`);
  });
}

export default app;