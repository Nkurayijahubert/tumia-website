import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Default API endpoint for Vercel
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      // Provide basic API information
      return res.status(200).json({
        name: 'Tumia API',
        version: '1.0.0',
        status: 'ok',
        timestamp: new Date().toISOString(),
        endpoints: [
          { path: '/api/health', method: 'GET', description: 'Health check endpoint' },
          { path: '/api/waitlist', method: 'POST', description: 'Join the waitlist' }
        ],
        message: 'Use one of the available endpoints listed above'
      });
    
    default:
      // Method not allowed
      return res.status(405).json({ 
        error: 'Method not allowed',
        message: `The ${req.method} method is not supported for this route.`
      });
  }
}