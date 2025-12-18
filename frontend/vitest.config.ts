/**
 * Vitest configuration for FrontRing
 *
 * Configures Vitest to work with React, TypeScript, and path aliases.
 * Uses jsdom environment for DOM testing.
 *
 */

import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/versions/v1/tests/setup.ts"],
    include: [
      "src/**/*.{test,spec}.{ts,tsx}",
      "src/versions/v1/tests/**/*.{test,spec}.{ts,tsx}",
    ],
    exclude: ["node_modules", "dist", "**/*.config.*"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/dist/**",
      ],
    },
  },
})
