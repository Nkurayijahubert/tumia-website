import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Health check endpoint for Vercel
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production'
  });
}