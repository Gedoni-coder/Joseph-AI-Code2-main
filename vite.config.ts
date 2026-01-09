import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import aiProxy from "./plugins/ai-proxy";

// Custom SPA fallback middleware plugin
function spaFallback() {
  let config: any;
  return {
    name: 'spa-fallback',
    configResolved(resolvedConfig: any) {
      config = resolvedConfig;
    },
    configureServer(server: any) {
      return () => {
        // Middleware that runs after internal middlewares
        server.middlewares.use((req: any, res: any, next: any) => {
          // Skip if it's a file with extension, API route, or vite internal
          if (
            req.url.includes('.') ||
            req.url.startsWith('/api') ||
            req.url.startsWith('/@') ||
            req.url === '/favicon.ico'
          ) {
            next();
            return;
          }

          // For SPA routes without file extensions, rewrite to index.html
          // so react-router can handle client-side routing
          if (!req.url.includes('.')) {
            req.url = '/index.html';
          }
          next();
        });
      };
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  appType: "spa",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), aiProxy(), spaFallback()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
