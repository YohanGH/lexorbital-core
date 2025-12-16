/**
 * Version Imports Registry
 *
 * Explicit static imports for all version App components.
 * This allows Vite to properly analyze and bundle the imports.
 *
 * When adding a new version:
 * 1. Import the App component: import V100App from "../versions/v1.0.0/App"
 * 2. Add it to the versionImports map
 */

import type { ComponentType } from "react"

import V100App from "@/versions/v1/VersionRouterV1"

/**
 * Mapping of version IDs to their App components
 */
export const versionImports: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  "v1": async () => ({ default: V100App }),
  // Add new versions here:
  // "v2": async () => ({ default: V200App }),
}
