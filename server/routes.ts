import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { addToGoogleSheet, setupGoogleSheet } from "./googleSheets";
import { registerHealthDebugRoute } from "./api-health-debug";
import { pool } from "./db";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.post("/api/waitlist", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertWaitlistEntrySchema.parse(req.body);
      
      try {
        // Add to waitlist
        const entry = await storage.addToWaitlist(validatedData);
        
        // Add to Google Sheets
        try {
          // Try to set up the sheet with headers if it doesn't exist
          await setupGoogleSheet();
          
          // Add the entry to the Google Sheet
          const added = await addToGoogleSheet(validatedData);
          if (added) {
            console.log("Waitlist entry added to Google Sheet successfully");
          } else {
            console.warn("Waitlist entry not added to Google Sheet - check configuration");
            
            // Fallback - log the entry to the console for easier retrieval
            console.log("\n==== NEW WAITLIST ENTRY ====");
            console.log(`Name: ${validatedData.name}`);
            console.log(`Email: ${validatedData.email}`);
            console.log(`Company: ${validatedData.company}`);
            console.log(`Role: ${validatedData.role}`);
            console.log(`Date: ${new Date().toISOString()}`);
            console.log("============================\n");
          }
        } catch (sheetError) {
          // Log the error but don't fail the request if Google Sheets operation fails
          console.error("Failed to add waitlist entry to Google Sheet:", sheetError);
          
          // Fallback - log the entry to the console for easier retrieval
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
      } catch (error: any) {
        // Handle duplicate email
        if (error.message === "Email already registered") {
          // Even though this is a duplicate, still try to add to Google Sheets for testing
          try {
            // Add to Google Sheets anyway (just for testing)
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
    } catch (error: any) {
      // Handle validation errors
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
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve waitlist entries",
        error: error.message
      });
    }
  });
  
  // Export waitlist entries as CSV (for easy manual export to Google Sheets)
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
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to export waitlist entries",
        error: error.message
      });
    }
  });

  // Health check endpoint (useful for Vercel)
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });
  
  // Register the enhanced health debug endpoint
  registerHealthDebugRoute(app, pool);

  const httpServer = createServer(app);
  return httpServer;
}
