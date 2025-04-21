#!/bin/bash

# Vercel build script for Tumia website

# Copy the Vercel API files to the api directory
cp -r vercel-api/* api/

# Replace main.tsx with the production version
cp client/src/main-production.tsx client/src/main.tsx

# Set the static mode environment variable
export VITE_FORCE_STATIC_MODE=true

# Build the project using the production config
npx vite build -c vite.production.config.ts

# Log build completion
echo "Build completed successfully!"