/**
 * Helper module to resolve server paths correctly in Vercel environment
 * This is needed because Vercel's serverless functions have a different
 * file structure in production compared to development
 */

import path from 'path';

// Detect if we're running in Vercel production environment
const isVercel = process.env.VERCEL === '1';

/**
 * Resolves a server module path correctly whether in development or Vercel production
 * @param {string} relativePath - Path relative to server folder, e.g. 'routes' or 'db'
 * @returns {string} The correct path to import
 */
export function resolveServerPath(relativePath) {
  if (isVercel) {
    // In Vercel, everything is flattened into /var/task
    return `/var/task/server/${relativePath}`;
  } else {
    // In development, use relative path
    return path.join(process.cwd(), 'server', relativePath);
  }
}

/**
 * Dynamically imports a server module using the correct path resolution
 * @param {string} relativePath - Path relative to server folder, e.g. 'routes' or 'db'
 * @returns {Promise<any>} Promise that resolves to the imported module
 */
export async function importServerModule(relativePath) {
  try {
    const modulePath = resolveServerPath(relativePath);
    return await import(modulePath);
  } catch (error) {
    console.error(`Failed to import server module '${relativePath}':`, error);
    throw error;
  }
}