/**
 * This verification script helps debug deployment issues with Tumia
 * Run it with: npx tsx server/deploy-verify.ts
 */

import 'dotenv/config';
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { google } from 'googleapis';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { waitlistEntries } from '../shared/schema';
import { sql } from 'drizzle-orm';

// WebSocket setup for Neon
neonConfig.webSocketConstructor = ws;

// Only for Vercel deployment troubleshooting
async function verifyEnvironment() {
  console.log('\n=== ENVIRONMENT VERIFICATION ===');
  console.log('Checking required environment variables...');
  
  // DATABASE VERIFICATION
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is missing');
  } else {
    console.log('✅ DATABASE_URL is configured');
    try {
      // Create a temporary pool just for testing
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 1, // Only need one connection for testing
        idleTimeoutMillis: 10000,
        connectionTimeoutMillis: 5000
      });
      
      // Attempt to connect
      console.log('Testing database connection...');
      await pool.query('SELECT 1');
      console.log('✅ Database connection successful');
      
      // Check if our tables exist
      const db = drizzle({ client: pool, schema: { waitlistEntries } });
      try {
        // Try to count records in waitlist_entries table
        const result = await db.select({ count: sql`count(*)` }).from(waitlistEntries);
        console.log(`✅ waitlist_entries table exists with ${result[0]?.count || 0} entries`);
      } catch (error) {
        console.error('❌ Error checking waitlist_entries table:', error.message);
        console.log('Creating waitlist_entries table...');
        
        try {
          // Try to create the table
          await pool.query(`
            CREATE TABLE IF NOT EXISTS waitlist_entries (
              id SERIAL PRIMARY KEY,
              name TEXT NOT NULL,
              email TEXT NOT NULL UNIQUE,
              company TEXT NOT NULL,
              role TEXT NOT NULL,
              "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
          `);
          console.log('✅ waitlist_entries table created successfully');
        } catch (createError) {
          console.error('❌ Failed to create waitlist_entries table:', createError.message);
        }
      }
      
      await pool.end();
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
    }
  }
  
  // GOOGLE SHEETS VERIFICATION
  if (!process.env.GOOGLE_SHEET_ID) {
    console.error('❌ GOOGLE_SHEET_ID is missing');
  } else {
    console.log('✅ GOOGLE_SHEET_ID is configured:', process.env.GOOGLE_SHEET_ID);
  }
  
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    console.error('❌ GOOGLE_SERVICE_ACCOUNT_KEY is missing');
  } else {
    console.log('✅ GOOGLE_SERVICE_ACCOUNT_KEY is configured (length: ' + 
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY.length + ' characters)');
    
    try {
      // Try to parse and verify the service account key
      let serviceAccountKey;
      try {
        // First try direct JSON parsing
        serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
      } catch (directParseError) {
        try {
          // Try base64 decoding then JSON parsing
          const decoded = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY, 'base64').toString('utf-8');
          serviceAccountKey = JSON.parse(decoded);
        } catch (base64Error) {
          console.error('❌ Could not parse GOOGLE_SERVICE_ACCOUNT_KEY in any format');
          throw new Error('Invalid service account key format');
        }
      }
      
      if (!serviceAccountKey.client_email || !serviceAccountKey.private_key) {
        console.error('❌ Service account key is missing required fields (client_email or private_key)');
      } else {
        console.log('✅ Service account parsed successfully: ' + serviceAccountKey.client_email);
        
        try {
          // Create JWT client with the service account
          const auth = new google.auth.JWT({
            email: serviceAccountKey.client_email,
            key: serviceAccountKey.private_key,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
          });
          
          // Verify authentication
          await auth.authorize();
          console.log('✅ Google Sheets authentication successful');
          
          // Try to access the sheet
          const sheets = google.sheets({ version: 'v4', auth });
          
          try {
            const response = await sheets.spreadsheets.get({
              spreadsheetId: process.env.GOOGLE_SHEET_ID,
            });
            
            console.log('✅ Successfully connected to Google Sheet: ' + 
              (response.data.properties?.title || 'Untitled'));
            
            // Check if Sheet1 exists
            let sheet1Exists = false;
            if (response.data.sheets) {
              for (const sheet of response.data.sheets) {
                if (sheet.properties?.title === 'Sheet1') {
                  sheet1Exists = true;
                  console.log('✅ Sheet1 exists in the spreadsheet');
                  break;
                }
              }
            }
            
            if (!sheet1Exists) {
              console.warn('⚠️ Sheet1 not found in the spreadsheet. The app expects a sheet named "Sheet1"');
            }
            
            // Try to check headers
            try {
              const headerResponse = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.GOOGLE_SHEET_ID,
                range: 'Sheet1!A1:E1',
              });
              
              const headers = headerResponse.data.values?.[0] || [];
              if (headers.length === 5 && 
                  headers[0] === 'Name' && 
                  headers[1] === 'Email' && 
                  headers[2] === 'Company' && 
                  headers[3] === 'Role' && 
                  headers[4] === 'Signup Date') {
                console.log('✅ Sheet1 headers are correctly configured');
              } else {
                console.warn('⚠️ Sheet1 headers may not be correctly configured.');
                console.log('Expected: Name, Email, Company, Role, Signup Date');
                console.log('Found:', headers.join(', ') || 'No headers');
                
                // Try to update headers if they don't exist
                if (headers.length === 0) {
                  try {
                    await sheets.spreadsheets.values.update({
                      spreadsheetId: process.env.GOOGLE_SHEET_ID,
                      range: 'Sheet1!A1:E1',
                      valueInputOption: 'RAW',
                      requestBody: {
                        values: [['Name', 'Email', 'Company', 'Role', 'Signup Date']],
                      },
                    });
                    console.log('✅ Added headers to Sheet1');
                  } catch (updateError) {
                    console.error('❌ Failed to update Sheet1 headers:', updateError.message);
                  }
                }
              }
            } catch (headerError) {
              console.error('❌ Error checking Sheet1 headers:', headerError.message);
            }
          } catch (sheetError) {
            console.error('❌ Error accessing Google Sheet:', sheetError.message);
          }
        } catch (authError) {
          console.error('❌ Google Sheets authentication failed:', authError.message);
        }
      }
    } catch (error) {
      console.error('❌ Error verifying Google service account key:', error.message);
    }
  }
  
  // STATIC MODE VERIFICATION
  if (process.env.VITE_FORCE_STATIC_MODE) {
    console.log('⚠️ VITE_FORCE_STATIC_MODE is set to: ' + process.env.VITE_FORCE_STATIC_MODE);
    console.log('This will force the application to use the static version with FormSpree');
  }
  
  if (process.env.VITE_FORMSPREE_FORM_ID) {
    console.log('✅ VITE_FORMSPREE_FORM_ID is configured for static fallback mode');
  } else {
    console.warn('⚠️ VITE_FORMSPREE_FORM_ID is not set. Static fallback mode will use the default ID "xknpdqwz" which may not work');
  }
  
  console.log('\n=== VERIFICATION COMPLETE ===');
  console.log('If any issues were found, fix them in your Vercel environment variables and redeploy.');
}

// Run the verification
verifyEnvironment().catch(error => {
  console.error('Verification failed with error:', error);
  process.exit(1);
});