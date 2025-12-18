/**
 * Version Utilities
 *
 * Utility functions for working with versions.
 * Migrated from versioning/ to use the unified manifest system.
 */

import manifest from "../versions/manifest.json"
import type { VersionEntry } from "./types"

/**
 * Get the latest version ID from the manifest
 */
export function getLatestVersion(): string {
  return manifest.current
}

/**
 * List all versions from the manifest
 */
export function listVersions(): VersionEntry[] {
  return manifest.versions
}

/**
 * Get a version by its ID from the manifest
 * Returns undefined if not found
 */
export function getVersionById(versionId: string): VersionEntry | undefined {
  return manifest.versions.find(v => v.id === versionId)
}

/**
 * Extract version ID from a pathname
 * Returns null if no version is present in the path
 * Matches formats:
 * - /v1/, /v1/about (compact format)
 * - /v/1/, /v/1/about (expanded format)
 * - /v1_1/, /v/1_1/ (with sub-version)
 */
export function extractVersionFromPath(pathname: string): string | null {
  // Try compact format first: /v1/, /v1/home, /v1_1/
  // Match /v1 or /v1/ or /v1/anything
  let match = pathname.match(/^\/(v\d{1,3}(?:_\d{1,3})?)(?:\/|$)/)
  if (match) {
    return match[1] ?? null
  }

  // Try expanded format: /v/1/, /v/1/home, /v/1_1/
  match = pathname.match(/^\/v\/(\d{1,3}(?:_\d{1,3})?)(?:\/|$)/)
  if (match) {
    // Convert to compact format: "1" -> "v1"
    return `v${match[1]}`
  }

  return null
}

/**
 * Resolve target path when switching from one version to another
 * Uses path-based routing: /v1/, /v1/about, etc.
 */
export function resolveTargetPath(params: {
  fromVersion: string
  toVersion: string
  pathname: string
}): { path: string; fallbackReason?: string } {
  const { toVersion, pathname } = params

  // Check if pathname is just the version root (compact or expanded format)
  const compactVersionMatch = pathname.match(/^\/v\d{1,3}(?:_\d{1,3})?\/?$/)
  const expandedVersionMatch = pathname.match(/^\/v\/\d{1,3}(?:_\d{1,3})?\/?$/)

  // If path is just the version (e.g., /v1, /v1/, /v/1, /v/1/), go to home
  if (compactVersionMatch || expandedVersionMatch) {
    return {
      path: `/${toVersion}/`,
    }
  }

  // Extract the path after version prefix
  // Support both formats: /v1/about and /v/1/about
  let pathWithoutVersion = pathname
    .replace(/^\/v\d{1,3}(?:_\d{1,3})?\//, "/") // Compact format: /v1/...
    .replace(/^\/v\/\d{1,3}(?:_\d{1,3})?\//, "/") // Expanded format: /v/1/...

  // If pathWithoutVersion is empty or just "/", it means we're at the root
  if (pathWithoutVersion === "/" || pathWithoutVersion === "") {
    return {
      path: `/${toVersion}/`,
    }
  }

  // Use compact format for target path
  const targetPath = `/${toVersion}${pathWithoutVersion}`

  return {
    path: targetPath,
  }
}
