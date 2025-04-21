import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Get repository name from package.json or environment variable
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'tumia-landing-page';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: `/${repoName}/`, // Required for GitHub Pages
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@assets': path.resolve(__dirname, './attached_assets'),
      '@lib': path.resolve(__dirname, './client/src/lib'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});