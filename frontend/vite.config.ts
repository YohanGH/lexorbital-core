import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0", // Allow external connections (Docker)
    proxy: {
      "/api": {
        target: process.env["VITE_API_BACKEND_URL"] || "http://localhost:4000",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
      },
      // Proxy direct pour les routes backend (dev only)
      // Note: Ne pas proxy les routes versionnées (/v1/*, /v2/*, etc.) - elles sont gérées par Wouter
      "api/v1/health": {
        target: process.env["VITE_API_BACKEND_URL"] || "http://localhost:4000",
        changeOrigin: true,
      },
      // Proxy pour les routes backend /modules
      "api/v1/modules": {
        target: process.env["VITE_API_BACKEND_URL"] || "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
})
