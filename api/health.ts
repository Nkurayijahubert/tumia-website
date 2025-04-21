import { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Simple health check endpoint for Vercel
 * This doesn't rely on any imports from the main app
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    vercel: process.env.VERCEL === '1' ? 'true' : 'false'
  });
}