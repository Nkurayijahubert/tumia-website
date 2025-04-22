#!/bin/bash
set -e

# Vercel build script for Tumia website

echo "Starting Vercel build process for Tumia website..."

# Create the api directory if it doesn't exist
mkdir -p api

# Copy the Vercel API files to the api directory
echo "Copying API handlers..."
cp -r vercel-api/* api/

# Replace main.tsx with the production version that has better error handling
echo "Setting up production entry point..."
cp client/src/main-production.tsx client/src/main.tsx

# Don't force static mode, to allow API calls to work
# export VITE_FORCE_STATIC_MODE=true
export NODE_ENV=production

# Add a log to indicate what we're building
echo "Building Tumia website with static mode enabled"

# Build the project using the production config
echo "Running Vite build..."
npx vite build -c vite.production.config.ts

# Verify the output directory exists
if [ -d "dist/public" ]; then
  echo "Build successful, output directory exists"
  ls -la dist/public
else
  echo "Error: Build failed - output directory does not exist"
  exit 1
fi

# Verify index.html exists in the output directory
if [ -f "dist/public/index.html" ]; then
  echo "index.html exists in output directory"
else
  echo "Error: index.html is missing from the output directory"
  exit 1
fi

# Add a fallback script that shows error message if React fails to load
echo "Adding fallback error handling to index.html..."
sed -i 's/<\/body>/  <script>window.addEventListener("error", function(e) { if(document.getElementById("root").children.length === 0) { document.getElementById("root").innerHTML = "<div style=\"text-align:center;padding:2rem;font-family:sans-serif;\"><h1>Sorry, something went wrong<\/h1><p>The application failed to initialize. Please try refreshing the page.<\/p><\/div>"; } });<\/script>\n<\/body>/' dist/public/index.html

# Log successful build completion
echo "Build completed successfully!"