/**
 * Default API endpoint for Vercel
 */
export default function handler(req, res) {
  res.status(200).json({ 
    message: "Welcome to Tumia API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: ["/api/health", "/api/waitlist"],
    documentation: "Contact the Tumia team for API documentation"
  });
}