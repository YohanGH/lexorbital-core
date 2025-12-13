/**
 * Types for site versioning system
 *
 * Defines the structure of version manifests and route manifests
 * used for frontend-only versioning without backend.
 */

/**
 * Status of a site version
 */
export type VersionStatus = "latest" | "archived" | "active"

/**
 * Entry for a single site version
 */
export interface SiteVersionEntry {
  id: string
  label: string
  status: VersionStatus
  releaseDate: string
  description: string
  gitTag?: string
}

/**
 * Manifest containing all site versions
 */
export interface SiteVersionsManifest {
  latest: string
  versions: SiteVersionEntry[]
}

/**
 * Entry for a single route/page
 */
export interface SiteRouteEntry {
  id: string
  slug: string
  title: string
  canonicalPath: string
  availableInVersions: string[]
}

/**
 * Manifest containing all site routes
 */
export interface SiteRoutesManifest {
  routes: SiteRouteEntry[]
}

/**
 * Result of path resolution when switching versions
 */
export interface ResolvedTargetPath {
  path: string
  fallbackReason?: "page_not_available" | "version_not_found"
}
