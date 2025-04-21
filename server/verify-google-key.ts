import 'dotenv/config';
import { google } from 'googleapis';

/**
 * This is a utility script to verify if the Google service account key is correctly formatted
 * Run it with: npx tsx server/verify-google-key.ts
 */

console.log('Verifying Google Service Account Key...');

if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
  console.error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set');
  process.exit(1);
}

if (!process.env.GOOGLE_SHEET_ID) {
  console.error('GOOGLE_SHEET_ID environment variable is not set');
  process.exit(1);
}

try {
  // Try multiple methods of parsing the service account key
  let serviceAccountKey: any;
  
  try {
    // Method 1: Direct JSON parsing
    console.log('Trying direct JSON parsing...');
    serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    console.log('✅ Successfully parsed service account key as JSON');
  } catch (error1) {
    console.log('❌ Direct JSON parsing failed:', error1.message);
    
    try {
      // Method 2: Base64 decode then parse
      console.log('Trying base64 decoding...');
      const decoded = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY, 'base64').toString('utf-8');
      serviceAccountKey = JSON.parse(decoded);
      console.log('✅ Successfully parsed service account key from base64');
    } catch (error2) {
      console.log('❌ Base64 decoding failed:', error2.message);
      console.error('Could not parse the service account key in any format');
      console.log('Key preview:', process.env.GOOGLE_SERVICE_ACCOUNT_KEY.substring(0, 30) + '...');
      process.exit(1);
    }
  }
  
  // Verify the service account key has required fields
  if (!serviceAccountKey.client_email) {
    console.error('❌ Service account key is missing client_email field');
    process.exit(1);
  }
  
  if (!serviceAccountKey.private_key) {
    console.error('❌ Service account key is missing private_key field');
    process.exit(1);
  }
  
  console.log('Service account email:', serviceAccountKey.client_email);
  console.log('✅ Service account key has correct format');
  
  // Try to authenticate with the key
  console.log('Testing authentication...');
  
  const auth = new google.auth.JWT({
    email: serviceAccountKey.client_email,
    key: serviceAccountKey.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  
  auth.authorize((err, tokens) => {
    if (err) {
      console.error('❌ Authentication failed:', err.message);
      process.exit(1);
    }
    
    console.log('✅ Authentication successful!');
    console.log('Token received:', tokens ? 'Yes' : 'No');
    
    // Try to access the sheet
    const sheets = google.sheets({ version: 'v4', auth });
    
    console.log('Testing access to Google Sheet...');
    console.log('Sheet ID:', process.env.GOOGLE_SHEET_ID);
    
    sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID
    }, (err, response) => {
      if (err) {
        console.error('❌ Failed to access sheet:', err.message);
        console.log('Make sure the service account has access to the sheet:');
        console.log(`- Share the Google Sheet with: ${serviceAccountKey.client_email}`);
        process.exit(1);
      }
      
      console.log('✅ Successfully accessed Google Sheet!');
      console.log('Sheet title:', response?.data.properties?.title);
      console.log('All checks passed. Your Google Sheets integration should work correctly.');
    });
  });
} catch (error) {
  console.error('❌ Verification failed:', error.message);
  process.exit(1);
}