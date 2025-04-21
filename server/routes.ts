import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { addToGoogleSheet, setupGoogleSheet } from "./googleSheets";

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
          }
        } catch (sheetError) {
          // Log the error but don't fail the request if Google Sheets operation fails
          console.error("Failed to add waitlist entry to Google Sheet:", sheetError);
        }
        
        res.status(201).json({ 
          success: true, 
          message: "Successfully added to waitlist",
          data: { id: entry.id }
        });
      } catch (error: any) {
        // Handle duplicate email
        if (error.message === "Email already registered") {
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

  // Health check endpoint (useful for Vercel)
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
