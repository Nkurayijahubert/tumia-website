/**
 * This is a production-specific entry point that uses the simplified App
 * to ensure the site works even if the API is unavailable
 */
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.simplified";
import "./index.css";

console.log("Tumia website starting in production mode...");

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Tumia website rendered successfully");
  } else {
    console.error("Root element not found");
  }
});