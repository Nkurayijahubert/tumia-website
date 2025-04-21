/**
 * This is a special version of server/routes.ts that's optimized for Vercel
 * It provides the same API but ensures path resolution works correctly
 */

import 'dotenv/config';
import { createServer, Server } from "http";
import { Express, Request, Response } from "express";
import { importServerModule } from './resolveServerPath';

// Simple version of the storage interface for typing
class BasicStorage {
  async getWaitlistEntries() {
    return [];
  }
  
  async addToWaitlist(entry) {
    return { id: 1, ...entry, createdAt: new Date() };
  }
  
  async getWaitlistEntryByEmail(email) {
    return undefined;
  }
}

// Simple placeholder for Google Sheets functions
async function setupGoogleSheet() {
  return true;
}

async function addToGoogleSheet(entry) {
  return true;
}

// Default implementation of registerRoutes that will be overridden if the real module loads
export async function registerRoutes(app) {
  console.log("Registering routes using Vercel-optimized implementation");
  
  // Try to load the actual storage implementation
  let storage;
  try {
    const { storage: actualStorage } = await importServerModule('storage');
    storage = actualStorage;
    console.log("Successfully loaded storage module");
  } catch (error) {
    console.error("Failed to load storage module, using basic implementation:", error);
    storage = new BasicStorage();
  }
  
  // Try to load Google Sheets implementation
  try {
    const googleSheetsModule = await importServerModule('googleSheets');
    setupGoogleSheet = googleSheetsModule.setupGoogleSheet;
    addToGoogleSheet = googleSheetsModule.addToGoogleSheet;
    console.log("Successfully loaded Google Sheets module");
  } catch (error) {
    console.error("Failed to load Google Sheets module:", error);
  }
  
  // Try to load schema
  let insertWaitlistEntrySchema;
  try {
    const schemaModule = await import('../shared/schema');
    insertWaitlistEntrySchema = schemaModule.insertWaitlistEntrySchema;
    console.log("Successfully loaded schema module");
  } catch (error) {
    console.error("Failed to load schema module:", error);
    // Simple validation function if Zod schema isn't available
    insertWaitlistEntrySchema = {
      parse: (data) => {
        if (!data.name) throw new Error("Name is required");
        if (!data.email) throw new Error("Email is required");
        if (!data.company) throw new Error("Company is required");
        if (!data.role) throw new Error("Role is required");
        return data;
      }
    };
  }
  
  // Register API routes
  app.post("/api/waitlist", async (req, res) => {
    try {
      const validatedData = insertWaitlistEntrySchema.parse(req.body);
      
      try {
        const entry = await storage.addToWaitlist(validatedData);
        
        try {
          await setupGoogleSheet();
          const added = await addToGoogleSheet(validatedData);
          if (added) {
            console.log("Waitlist entry added to Google Sheet successfully");
          } else {
            console.warn("Waitlist entry not added to Google Sheet");
            console.log("\n==== NEW WAITLIST ENTRY ====");
            console.log(`Name: ${validatedData.name}`);
            console.log(`Email: ${validatedData.email}`);
            console.log(`Company: ${validatedData.company}`);
            console.log(`Role: ${validatedData.role}`);
            console.log(`Date: ${new Date().toISOString()}`);
            console.log("============================\n");
          }
        } catch (sheetError) {
          console.error("Failed to add waitlist entry to Google Sheet:", sheetError);
          console.log("\n==== NEW WAITLIST ENTRY ====");
          console.log(`Name: ${validatedData.name}`);
          console.log(`Email: ${validatedData.email}`);
          console.log(`Company: ${validatedData.company}`);
          console.log(`Role: ${validatedData.role}`);
          console.log(`Date: ${new Date().toISOString()}`);
          console.log("============================\n");
        }
        
        res.status(201).json({ 
          success: true, 
          message: "Successfully added to waitlist",
          data: { id: entry.id }
        });
      } catch (error) {
        if (error.message === "Email already registered") {
          try {
            await setupGoogleSheet();
            const added = await addToGoogleSheet(validatedData);
            if (added) {
              console.log("Duplicate email, but still added to Google Sheet for testing");
            }
          } catch (sheetError) {
            console.error("Error adding duplicate to Google Sheet:", sheetError);
          }
          
          return res.status(409).json({ 
            success: false, 
            message: "This email is already registered on our waitlist"
          });
        }
        throw error;
      }
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: "Invalid data provided",
        errors: error.errors || error.message
      });
    }
  });
  
  // Get all waitlist entries (for admin purposes)
  app.get("/api/waitlist", async (req, res) => {
    try {
      const entries = await storage.getWaitlistEntries();
      res.json({ 
        success: true, 
        data: entries
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve waitlist entries",
        error: error.message
      });
    }
  });
  
  // Export waitlist entries as CSV
  app.get("/api/waitlist/export", async (req, res) => {
    try {
      const entries = await storage.getWaitlistEntries();
      
      // Create CSV header
      let csv = "Name,Email,Company,Role,Signup Date\n";
      
      // Add each entry as a row
      entries.forEach(entry => {
        // Format date
        const date = new Date(entry.createdAt).toISOString();
        
        // Escape any commas in the fields
        const name = entry.name ? (entry.name.includes(',') ? `"${entry.name}"` : entry.name) : '';
        const email = entry.email ? (entry.email.includes(',') ? `"${entry.email}"` : entry.email) : '';
        const company = entry.company ? (entry.company.includes(',') ? `"${entry.company}"` : entry.company) : '';
        const role = entry.role ? (entry.role.includes(',') ? `"${entry.role}"` : entry.role) : '';
        
        csv += `${name},${email},${company},${role},${date}\n`;
      });
      
      // Set headers for CSV download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=tumia-waitlist.csv');
      
      res.send(csv);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to export waitlist entries",
        error: error.message
      });
    }
  });
  
  // Enhanced health debug endpoint
  app.get("/api/health-debug", async (req, res) => {
    const result = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      vercel: process.env.VERCEL === '1' ? true : false,
      database: {
        configured: !!process.env.DATABASE_URL,
        connection: 'unknown'
      },
      google_sheets: {
        sheet_id_configured: !!process.env.GOOGLE_SHEET_ID,
        service_account_configured: !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY
      },
      static_mode: {
        force_static: process.env.VITE_FORCE_STATIC_MODE === 'true',
        formspree_id_configured: !!process.env.VITE_FORMSPREE_FORM_ID
      }
    };
    
    // Try to test DB connection
    if (result.database.configured) {
      try {
        // Check if we can get entries from storage
        await storage.getWaitlistEntries();
        result.database.connection = 'success';
      } catch (error) {
        result.database.connection = 'failed';
        result.database.error = error.message;
      }
    }
    
    res.json(result);
  });
  
  const httpServer = createServer(app);
  return httpServer;
}