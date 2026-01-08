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
    middlewares: [
      (req, res, next) => {
        // For SPA routing: serve index.html for all non-file requests
        if (!req.url.includes(".") && !req.url.startsWith("/api") && !req.url.startsWith("/@")) {
          req.url = "/index.html";
        }
        next();
      },
    ],
  },
  plugins: [react(), aiProxy()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
