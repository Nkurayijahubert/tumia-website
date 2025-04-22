import { google } from 'googleapis';

// Define the structure of a waitlist entry
interface WaitlistEntry {
  name: string;
  email: string;
  company: string;
  role: string;
}

let googleSheetsInitialized = false;

// Create a JWT client to authenticate with Google Sheets
const getAuth = () => {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable not set');
  }

  try {
    let serviceAccountKey;
    
    // Multiple approaches to handle different formats the key might be in
    try {
      // 1. First try: Direct JSON parsing (if the env var contains JSON directly)
      serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    } catch (directParseError) {
      try {
        // 2. Second try: Handle potential JSON string escaping issues
        serviceAccountKey = JSON.parse(JSON.stringify(eval(`(${process.env.GOOGLE_SERVICE_ACCOUNT_KEY})`)));
      } catch (evalError) {
        try {
          // 3. Third try: Base64 decode then parse
          const decoded = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY, 'base64').toString('utf-8');
          serviceAccountKey = JSON.parse(decoded);
        } catch (base64Error) {
          // 4. Fourth try: Maybe it's a stringified JSON that's also base64 encoded
          try {
            const decoded = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY, 'base64').toString('utf-8');
            serviceAccountKey = JSON.parse(JSON.stringify(eval(`(${decoded})`)));
          } catch (finalError) {
            throw new Error('Could not parse service account key in any format');
          }
        }
      }
    }
    
    // Verify we have the required fields
    if (!serviceAccountKey.client_email || !serviceAccountKey.private_key) {
      throw new Error('Service account key is missing required fields (client_email or private_key)');
    }
    
    console.log('Successfully parsed service account key for: ' + serviceAccountKey.client_email);
    
    return new google.auth.JWT({
      email: serviceAccountKey.client_email,
      key: serviceAccountKey.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  } catch (error) {
    console.error('Error parsing Google service account key:', error);
    throw new Error('Invalid GOOGLE_SERVICE_ACCOUNT_KEY format: ' + error.message);
  }
};

// Initialize the Google Sheets API with authentication
const initGoogleSheets = async () => {
  if (googleSheetsInitialized) return;

  try {
    // Try to authenticate
    const auth = getAuth();
    await auth.authorize();
    googleSheetsInitialized = true;
    console.log('Google Sheets API initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Google Sheets API:', error);
    throw error;
  }
};

// Add a waitlist entry to Google Sheets
export const addToGoogleSheet = async (entry: WaitlistEntry): Promise<boolean> => {
  console.log("===== GOOGLE SHEETS INTEGRATION DEBUG =====");
  
  // Check environment variables with detailed logging
  if (!process.env.GOOGLE_SHEET_ID) {
    console.error('GOOGLE_SHEET_ID environment variable is missing');
    console.log("===== GOOGLE SHEETS INTEGRATION DEBUG END =====");
    return false;
  }
  
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    console.error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is missing');
    console.log("===== GOOGLE SHEETS INTEGRATION DEBUG END =====");
    return false;
  }
  
  console.log(`Using Google Sheet ID: ${process.env.GOOGLE_SHEET_ID}`);
  const keyPreview = process.env.GOOGLE_SERVICE_ACCOUNT_KEY.substring(0, 20) + '...';
  console.log(`Service Account Key preview: ${keyPreview}, length: ${process.env.GOOGLE_SERVICE_ACCOUNT_KEY.length}`);

  try {
    // Initialize Google Sheets with better error handling
    console.log("Initializing Google Sheets API...");
    try {
      await initGoogleSheets();
      console.log("Google Sheets API initialized successfully");
    } catch (initError) {
      console.error("Failed to initialize Google Sheets:", initError);
      console.error("Error message:", initError.message);
      console.log("===== GOOGLE SHEETS INTEGRATION DEBUG END =====");
      throw initError; // Re-throw to be caught by outer try/catch
    }

    // Get auth with better error handling
    console.log("Getting Google Auth JWT client...");
    let auth;
    try {
      auth = getAuth();
      console.log("Auth client created successfully");
    } catch (authError) {
      console.error("Failed to create auth client:", authError);
      console.error("Error message:", authError.message);
      console.log("===== GOOGLE SHEETS INTEGRATION DEBUG END =====");
      throw authError; // Re-throw to be caught by outer try/catch
    }
    
    // Create sheets client
    console.log("Creating Google Sheets client...");
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Format the current date
    const currentDate = new Date().toISOString();
    console.log("Preparing row data for:", entry.email);
    
    // Prepare the row data
    const values = [
      [entry.name, entry.email, entry.company, entry.role, currentDate]
    ];
    
    // Append the data to the specified sheet
    console.log("Appending data to Google Sheet...");
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:E', // Use the default 'Sheet1' instead of 'Waitlist'
        valueInputOption: 'RAW',
        requestBody: {
          values,
        },
      });
      
      console.log(`Added ${entry.email} to Google Sheet successfully`);
      console.log("===== GOOGLE SHEETS INTEGRATION DEBUG END =====");
      return true;
    } catch (appendError) {
      console.error("Error appending data to sheet:", appendError);
      console.error("Error message:", appendError.message);
      if (appendError.response) {
        console.error("Response error data:", appendError.response.data);
        console.error("Response error status:", appendError.response.status);
      }
      console.log("===== GOOGLE SHEETS INTEGRATION DEBUG END =====");
      throw appendError; // Re-throw to be caught by outer try/catch
    }
  } catch (error) {
    console.error('Overall error in Google Sheets integration:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    console.log("===== GOOGLE SHEETS INTEGRATION DEBUG END =====");
    return false;
  }
};