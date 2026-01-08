import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import aiProxy from "./plugins/ai-proxy";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  appType: "spa",
  server: {
    host: "::",
    port: 8080,
    middlewareMode: false,
    middleware: (app) => {
      // SPA fallback: serve index.html for all non-file requests
      app.use((req, res, next) => {
        // Skip if it's a file request (has file extension) or API request
        if (req.url.includes(".") || req.url.startsWith("/api") || req.url.startsWith("/@")) {
          return next();
        }
        // Rewrite all other requests to index.html
        req.url = "/index.html";
        next();
      });
    },
  },
  plugins: [react(), aiProxy()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
