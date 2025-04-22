// Simple health check endpoint
export default function handler(req, res) {
  res.status(200).json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    vercel: process.env.VERCEL === '1' ? 'true' : 'false',
    message: "Tumia API is running"
  });
}