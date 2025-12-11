/**
 * Vitest configuration for LexOrbital Core (root)
 *
 * Configures Vitest to run tests from both root and frontend.
 * Includes React support and path aliases for frontend tests.
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
      // Frontend path alias
      "@": path.resolve(__dirname, "./frontend/src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./frontend/tests/setup.ts"],
    include: [
      "tests/**/*.{test,spec}.{ts,tsx}",
      "frontend/tests/**/*.{test,spec}.{ts,tsx}",
    ],
    exclude: ["node_modules", "dist", "**/*.config.*"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/",
        "frontend/tests/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/dist/**",
      ],
    },
  },
})

