import 'dotenv/config';
import express from 'express';
import { json } from 'express';
import { importServerModule } from './resolveServerPath';

const app = express();
app.use(json());

// Simple health check route that doesn't depend on any imports
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    vercel: process.env.VERCEL === '1' ? 'true' : 'false'
  });
});

// Create a basic debug route that doesn't depend on any other modules
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

// Error catching route
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// This function tries to load the routes module, first the Vercel-specific one,
// then falling back to the standard routes module
async function loadAndRegisterRoutes() {
  try {
    // First try to load our Vercel-optimized version
    if (process.env.VERCEL === '1') {
      console.log('Running in Vercel environment, loading optimized routes');
      try {
        const { registerRoutes } = await import('./server-routes');
        await registerRoutes(app);
        console.log('Successfully registered routes using Vercel-optimized version');
        return;
      } catch (vercelError) {
        console.error('Failed to load Vercel-optimized routes:', vercelError);
        // Continue to try the regular version
      }
    }
    
    // Then try using the regular server module import
    const { registerRoutes } = await importServerModule('routes');
    await registerRoutes(app);
    console.log('Routes registered successfully');
  } catch (error) {
    console.error('All attempts to load routes module failed:', error);
    
    // Add a fallback route to handle errors
    app.use('/api', (req, res, next) => {
      if (req.path === '/health' || req.path === '/debug') return next();
      
      res.status(500).json({ 
        error: 'API unavailable - server module failed to load', 
        details: error.message,
        // Only show stack trace in development
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        // Instructions for static mode fallback
        instructions: 'Add VITE_FORCE_STATIC_MODE=true to environment variables to use static mode'
      });
    });
  }
}

// Load and register the routes
loadAndRegisterRoutes();

export default app;