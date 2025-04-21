import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure Neon for serverless
neonConfig.webSocketConstructor = ws;

// Check if DATABASE_URL is available
let pool: Pool;
let db: ReturnType<typeof drizzle>;

try {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Database functionality will be disabled.");
    // Create a mock pool and DB instance that will throw controlled errors
    pool = {} as Pool;
    db = {} as ReturnType<typeof drizzle>;
  } else {
    // Initialize the real database connection
    pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      // Add some additional connection settings for better reliability
      max: 10, // maximum number of clients
      idleTimeoutMillis: 30000, // how long a client is kept idle before being closed
      connectionTimeoutMillis: 5000, // how long to wait for connection
    });
    db = drizzle({ client: pool, schema });
    
    // Test the connection
    pool.query('SELECT 1').then(() => {
      console.log('Database connection successful');
    }).catch(err => {
      console.error('Database connection test failed:', err.message);
    });
  }
} catch (error) {
  console.error('Error initializing database:', error);
  // Create a mock pool and DB instance
  pool = {} as Pool;
  db = {} as ReturnType<typeof drizzle>;
}

export { pool, db };
