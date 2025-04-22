/**
 * Production entry point that matches the standard entry point
 * No longer using separate static mode
 */
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

console.log("Tumia website starting in production mode...");

// Render the application
createRoot(document.getElementById("root")!).render(<App />);
console.log("Tumia website rendered successfully");