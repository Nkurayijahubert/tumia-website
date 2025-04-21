import 'dotenv/config';
import express from 'express';
import { json } from 'express';

const app = express();
app.use(json());

// Simple health check route that doesn't depend on any imports
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Use dynamic import to ensure path resolution works properly in Vercel
import('../server/routes')
  .then(({ registerRoutes }) => {
    // Register all routes after module is loaded
    registerRoutes(app).then(() => {
      console.log('Routes registered successfully');
    });
  })
  .catch(error => {
    console.error('Failed to load routes module:', error);
    // Add a route to show the error when /api endpoints are accessed
    app.use('/api', (req, res) => {
      res.status(500).json({ 
        error: 'Failed to load API routes', 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    });
  });

export default app;