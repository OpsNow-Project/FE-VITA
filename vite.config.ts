import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  // mode: 'development' | 'production'
  const env = loadEnv(mode, process.cwd(), "");
  const apiBaseUrl = env.VITE_API_BASE_URL || "http://react.local:31007";

  return {
    plugins: [react(), svgr()],
    server: {
      proxy: {
        "/api": {
          // target: apiBaseUrl,
          target: apiBaseUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
