import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import aiProxy from "./plugins/ai-proxy";

// Custom SPA fallback middleware plugin
function spaFallback() {
  return {
    name: 'spa-fallback',
    configureServer(server: any) {
      return () => {
        // Middleware that runs after internal middlewares
        server.middlewares.use((req: any, res: any, next: any) => {
          const url = req.url.split('?')[0]; // Remove query string

          // Skip if it's:
          // - An API request
          // - A vite internal request
          // - A file with a known extension (js, css, json, html, svg, png, jpg, etc)
          const isAsset = /\.(js|mjs|json|css|html|svg|png|jpg|jpeg|gif|webp|woff|woff2|eot|ttf|otf|ico|map)(\?.*)?$/.test(url);
          const isApi = url.startsWith('/api');
          const isViteInternal = url.startsWith('/@');

          if (isAsset || isApi || isViteInternal) {
            next();
            return;
          }

          // For all other requests (SPA routes), serve index.html
          // and let React Router handle the routing
          req.url = '/index.html';
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
