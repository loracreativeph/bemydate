import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // For local dev only — proxy API calls to Netlify CLI
    proxy: {
      '/api': 'http://localhost:8888',
    },
  },
});
