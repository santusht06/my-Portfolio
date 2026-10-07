import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import compress from "vite-plugin-compression";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api-quotes": {
        target: "https://zenquotes.io/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-quotes/, ""),
      },
      "/api": {
        target: process.env.VITE_API_URL || "http://127.0.0.1:8787",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    compress({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    visualizer({
      open: false,
      filename: "bundle-analysis.html",
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom", "react-redux", "@reduxjs/toolkit"],
          "vendor-motion": ["framer-motion", "gsap"],
          "vendor-ui": ["lucide-react", "react-icons", "sonner", "clsx", "tailwind-merge"],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
});
