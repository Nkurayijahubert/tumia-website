import express from 'express';
import { registerRoutes } from '../server/routes';
import { json } from 'express';

const app = express();
app.use(json());

// Register all routes
registerRoutes(app);

export default app;