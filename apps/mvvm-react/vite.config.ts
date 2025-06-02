import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vitest configuration
  test: {
    globals: true, // Makes describe, it, expect, etc. available globally
    environment: 'jsdom', // Use JSDOM for testing React components
    setupFiles: './src/setupTests.ts', // Path to setup file
    // Optional: You might want to include coverage configuration later
    // coverage: {
    //   reporter: ['text', 'json', 'html'],
    // }
  },
});
