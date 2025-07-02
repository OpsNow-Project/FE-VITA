import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const apiBaseUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8080';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: apiBaseUrl,
        changeOrigin: true,
      },
    },
  },
});
