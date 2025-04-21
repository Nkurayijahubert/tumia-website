/**
 * This is a production-specific entry point that uses the simplified App
 * to ensure the site works even if the API is unavailable
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.simplified";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);