/**
 * This file adds an enhanced health endpoint to help debug deployment issues
 * Add this to your server/routes.ts file to use it
 */

import { Express, Request, Response } from 'express';
import { Pool } from '@neondatabase/serverless';
import { google } from 'googleapis';

/**
 * Registers an enhanced /api/health-debug endpoint that provides detailed information
 * about the application's configuration and connection status
 */
export function registerHealthDebugRoute(app: Express, pool: Pool) {
  app.get('/api/health-debug', async (req: Request, res: Response) => {
    const result: Record<string, any> = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || 'unknown',
    };

    // Check database
    result.database = { configured: !!process.env.DATABASE_URL };
    
    if (result.database.configured) {
      try {
        await pool.query('SELECT 1');
        result.database.connection = 'success';
        
        // Check if tables exist by getting counts
        try {
          const tableResult = await pool.query(`
            SELECT EXISTS (
              SELECT FROM information_schema.tables 
              WHERE table_schema = 'public' 
              AND table_name = 'waitlist_entries'
            ) as exists
          `);
          
          result.database.waitlist_table_exists = tableResult.rows[0]?.exists || false;
          
          if (result.database.waitlist_table_exists) {
            const countResult = await pool.query('SELECT COUNT(*) FROM waitlist_entries');
            result.database.waitlist_entries_count = parseInt(countResult.rows[0]?.count || '0');
          }
        } catch (tableError) {
          result.database.table_check_error = tableError.message;
        }
      } catch (dbError) {
        result.database.connection = 'failed';
        result.database.error = dbError.message;
      }
    }
    
    // Check Google Sheets
    result.google_sheets = {
      sheet_id_configured: !!process.env.GOOGLE_SHEET_ID,
      service_account_configured: !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
    };
    
    if (result.google_sheets.sheet_id_configured && 
        result.google_sheets.service_account_configured) {
      try {
        let serviceAccountKey;
        try {
          serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY as string);
        } catch (directParseError) {
          try {
            const decoded = Buffer.from(
              process.env.GOOGLE_SERVICE_ACCOUNT_KEY as string, 
              'base64'
            ).toString('utf-8');
            serviceAccountKey = JSON.parse(decoded);
          } catch (base64Error) {
            result.google_sheets.key_parse_error = 'Could not parse key in any format';
          }
        }
        
        if (serviceAccountKey) {
          result.google_sheets.client_email = serviceAccountKey.client_email;
          result.google_sheets.private_key_check = !!serviceAccountKey.private_key;
          
          try {
            const auth = new google.auth.JWT({
              email: serviceAccountKey.client_email,
              key: serviceAccountKey.private_key,
              scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
            
            await auth.authorize();
            result.google_sheets.auth = 'success';
            
            const sheets = google.sheets({ version: 'v4', auth });
            try {
              const response = await sheets.spreadsheets.get({
                spreadsheetId: process.env.GOOGLE_SHEET_ID,
              });
              
              result.google_sheets.sheet_name = response.data.properties?.title;
              result.google_sheets.sheet_access = 'success';
              
              // Check if Sheet1 exists
              if (response.data.sheets) {
                for (const sheet of response.data.sheets) {
                  if (sheet.properties?.title === 'Sheet1') {
                    result.google_sheets.sheet1_exists = true;
                    break;
                  }
                }
              }
            } catch (sheetError) {
              result.google_sheets.sheet_access = 'failed';
              result.google_sheets.sheet_error = sheetError.message;
            }
          } catch (authError) {
            result.google_sheets.auth = 'failed';
            result.google_sheets.auth_error = authError.message;
          }
        }
      } catch (error) {
        result.google_sheets.setup_error = error.message;
      }
    }
    
    // Static mode configuration
    result.static_mode = {
      force_static: process.env.VITE_FORCE_STATIC_MODE === 'true',
      formspree_id: process.env.VITE_FORMSPREE_FORM_ID || 'xknpdqwz (default)',
    };
    
    res.json(result);
  });
}