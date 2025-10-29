import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

const apiUrl = process.env.VITE_API_URL;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/versions': apiUrl,
    },
  }
});