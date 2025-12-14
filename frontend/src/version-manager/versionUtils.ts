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
 * Matches format: /v1/, /v1_1/, /v1/about
 */
export function extractVersionFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/(v\d{1,3}(?:_\d{1,3})?)(?:\/|$)/)
  return match?.[1] ?? null
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

  // Extract the path after version prefix (e.g., /v1/about -> /about)
  const pathWithoutVersion = pathname.replace(/^\/v\d{1,3}(?:_\d{1,3})?\//, "/")
  // If path is just the version (e.g., /v1), go to home
  const targetPath = pathWithoutVersion === `/${toVersion}` || pathWithoutVersion === `/${toVersion}/` 
    ? `/${toVersion}/` 
    : `/${toVersion}${pathWithoutVersion}`

  return {
    path: targetPath,
  }
}

