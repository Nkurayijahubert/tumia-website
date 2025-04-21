import { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Debug endpoint for Vercel deployment
 * This doesn't rely on any imports from the main app
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
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
    runtime: {
      nodeVersion: process.version,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage()
    },
    timestamp: new Date().toISOString()
  });
}