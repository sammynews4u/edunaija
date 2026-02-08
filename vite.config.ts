
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // This allows process.env.API_KEY to work in the browser
    EnvironmentPlugin(['API_KEY']),
  ],
});
