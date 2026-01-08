import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import aiProxy from "./plugins/ai-proxy";

// SPA fallback middleware - serves index.html for client-side routing
function spaFallback() {
  return {
    name: 'spa-fallback',
    configResolved(config: any) {
      // Ensure it runs after vite's own middlewares
    },
    apply: 'serve',
    async resolveId(id: string) {
      // This handles the fallback for SPA routes
      return null;
    },
    transform(code: string, id: string) {
      return null;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  appType: "spa",
  server: {
    host: "::",
    port: 8080,
    middlewares: [
      (req, res, next) => {
        // Skip middleware for files with extensions and API routes
        if (req.url.includes('.') || req.url.startsWith('/api') || req.url.startsWith('/@')) {
          next();
          return;
        }
        // For all other routes, treat as SPA and let client-side router handle it
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
