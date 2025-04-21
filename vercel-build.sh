#!/bin/bash

# Vercel build script for Tumia website

# Create the api directory if it doesn't exist
mkdir -p api

# Copy the Vercel API files to the api directory
cp -r vercel-api/* api/

# Replace main.tsx with the production version
cp client/src/main-production.tsx client/src/main.tsx

# Set the static mode environment variable
export VITE_FORCE_STATIC_MODE=true

# Add a log to indicate what we're building
echo "Building Tumia website with static mode enabled"

# Build the project using the production config
npx vite build -c vite.production.config.ts

# Log successful build completion
echo "Build completed successfully!"
ls -la dist/public