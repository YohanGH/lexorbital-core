/**
 * Type definitions for version manager
 *
 * Types for version management, migrated from versioning/types.ts
 * to use the unified manifest system.
 */

import manifest from "../versions/manifest.json"

/**
 * Version entry from the unified manifest
 */
export interface VersionEntry {
  id: string
  date: string
  description: string
  dependencies: Record<string, string>
  entryPoint: string
  compatibility: {
    dataFormat: string
    api: string
  }
  status?: string
}

/**
 * Version manifest structure
 */
export interface VersionManifest {
  versions: VersionEntry[]
  current: string
}

/**
 * Result of resolving a target path when switching versions
 */
export interface ResolvedTargetPath {
  path: string
  fallbackReason?: "version_not_found" | "page_not_available"
}

/**
 * Legacy type for compatibility with old components
 * Maps to VersionEntry but with different field names
 */
export interface SiteVersionEntry {
  id: string
  label: string
  status: "latest" | "archived"
  releaseDate: string
  description: string
  gitTag?: string
}

/**
 * Convert VersionEntry to SiteVersionEntry for backward compatibility
 */
export function toSiteVersionEntry(version: VersionEntry): SiteVersionEntry {
  const isLatest = version.id === manifest.current
  return {
    id: version.id.replace(/^v/, ""), // Remove 'v' prefix for compatibility
    label: version.id,
    status: isLatest
      ? "latest"
      : (version.status as "latest" | "archived") || "archived",
    releaseDate: version.date,
    description: version.description,
  }
}
