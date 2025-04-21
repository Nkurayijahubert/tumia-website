import { createRoot } from "react-dom/client";
import "./index.css";

// Check for static mode flag or if in production
const isStaticMode = 
  import.meta.env.VITE_FORCE_STATIC_MODE === "true" || 
  import.meta.env.PROD === true ||
  import.meta.env.MODE === "production";
console.log("Static mode:", isStaticMode ? "enabled" : "disabled");

// Dynamically import the appropriate app component
const AppPromise = isStaticMode 
  ? import("./App.simplified").then(m => m.default)
  : import("./App").then(m => m.default);

// Render when the component is loaded
AppPromise.then(App => {
  createRoot(document.getElementById("root")!).render(<App />);
});
