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
    
    // Log a few characters of the key to help with debugging (without revealing the whole key)
    const keyPreview = process.env.GOOGLE_SERVICE_ACCOUNT_KEY.substring(0, 20) + '...';
    console.error(`Key preview: ${keyPreview}`);
    console.error(`Key length: ${process.env.GOOGLE_SERVICE_ACCOUNT_KEY.length} characters`);
    
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
  // If Google Sheets integration is not configured, log and return
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    console.warn('Google Sheets credentials not configured. Entry not saved.');
    return false;
  }

  try {
    // Initialize Google Sheets if needed
    await initGoogleSheets();

    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Format the current date
    const currentDate = new Date().toISOString();
    
    // Prepare the row data
    const values = [
      [entry.name, entry.email, entry.company, entry.role, currentDate]
    ];
    
    // Append the data to the specified sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:E', // Use the default 'Sheet1' instead of 'Waitlist'
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
    
    console.log(`Added ${entry.email} to Google Sheet successfully`);
    return true;
  } catch (error) {
    console.error('Error adding to Google Sheet:', error);
    return false;
  }
};

// Set up the Google Sheet with headers if it doesn't exist
export const setupGoogleSheet = async (): Promise<boolean> => {
  // If Google Sheets integration is not configured, log and return
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    console.warn('Google Sheets credentials not configured. Sheet setup skipped.');
    return false;
  }

  try {
    // Initialize Google Sheets if needed
    await initGoogleSheets();

    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    
    // First, check if the headers already exist
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A1:E1',
    });
    
    const rows = response.data.values;
    
    // If no headers exist, add them
    if (!rows || rows.length === 0) {
      const headers = [['Name', 'Email', 'Company', 'Role', 'Signup Date']];
      
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A1:E1',
        valueInputOption: 'RAW',
        requestBody: {
          values: headers,
        },
      });
      
      // Format the header row to be bold
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        requestBody: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: 0, // Assuming this is the first sheet
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: 5,
                },
                cell: {
                  userEnteredFormat: {
                    textFormat: {
                      bold: true,
                    },
                    backgroundColor: {
                      red: 0.9,
                      green: 0.9,
                      blue: 0.9,
                    },
                  },
                },
                fields: 'userEnteredFormat(textFormat,backgroundColor)',
              },
            },
          ],
        },
      });
      
      console.log('Google Sheet headers initialized successfully');
    }
    
    return true;
  } catch (error) {
    console.error('Error setting up Google Sheet:', error);
    return false;
  }
};