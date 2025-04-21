import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Default API endpoint for Vercel
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
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
}