/**
 * Versioning utilities for site version management
 *
 * Provides functions to work with site versions, resolve paths,
 * and determine version status without backend dependencies.
 */

import type {
  SiteVersionsManifest,
  SiteVersionEntry,
  SiteRoutesManifest,
  ResolvedTargetPath,
} from "./types"

let versionsManifest: SiteVersionsManifest | null = null
let routesManifest: SiteRoutesManifest | null = null

/**
 * Reset cached manifests (useful for testing)
 */
export function resetManifestsCache(): void {
  versionsManifest = null
  routesManifest = null
}

/**
 * Load versions manifest from public directory
 */
export async function loadVersionsManifest(): Promise<SiteVersionsManifest> {
  if (versionsManifest !== null) {
    return versionsManifest
  }

  try {
    const response = await fetch("/site.versions.json")
    if (!response.ok) {
      throw new Error(
        `Failed to load versions manifest: ${response.statusText}`
      )
    }
    versionsManifest = (await response.json()) as SiteVersionsManifest
    return versionsManifest
  } catch (error) {
    throw new Error(
      `Failed to load versions manifest: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

/**
 * Load routes manifest from public directory
 */
export async function loadRoutesManifest(): Promise<SiteRoutesManifest> {
  if (routesManifest !== null) {
    return routesManifest
  }

  try {
    const response = await fetch("/site.routes.json")
    if (!response.ok) {
      throw new Error(`Failed to load routes manifest: ${response.statusText}`)
    }
    routesManifest = (await response.json()) as SiteRoutesManifest
    return routesManifest
  } catch (error) {
    throw new Error(
      `Failed to load routes manifest: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

/**
 * Get the latest version ID
 */
export async function getLatestVersion(): Promise<string> {
  const manifest = await loadVersionsManifest()
  return manifest.latest
}

/**
 * Get version entry by ID
 */
export async function getVersionById(
  versionId: string
): Promise<SiteVersionEntry | null> {
  const manifest = await loadVersionsManifest()
  return manifest.versions.find(v => v.id === versionId) ?? null
}

/**
 * Check if a version is archived
 */
export async function isArchived(versionId: string): Promise<boolean> {
  const version = await getVersionById(versionId)
  return version?.status === "archived" || false
}

/**
 * List all versions
 */
export async function listVersions(): Promise<SiteVersionEntry[]> {
  const manifest = await loadVersionsManifest()
  return manifest.versions
}

/**
 * Resolve canonical page ID from a pathname
 * Extracts the page identifier from a path like "/v/1.0/about" or "/about"
 */
export function resolveCanonicalPageIdFromPath(
  pathname: string
): string | null {
  // Remove version prefix if present: /v/1.0/about -> /about
  const withoutVersion = pathname.replace(/^\/v\/[^/]+/, "")
  // Remove leading/trailing slashes and get the slug
  const slug = withoutVersion.replace(/^\/+|\/+$/g, "") || ""
  // For empty slug, return null (invalid route - home must be explicit)
  if (slug === "") {
    return null
  }
  // Map "home" slug to "home" page ID
  if (slug === "home") {
    return "home"
  }
  return slug
}

/**
 * Resolve target path when switching from one version to another
 * Attempts to preserve the current page, falls back to landing if unavailable
 */
export async function resolveTargetPath(params: {
  fromVersion: string
  toVersion: string
  pathname: string
}): Promise<ResolvedTargetPath> {
  const { toVersion, pathname } = params

  // Load manifests in parallel for better performance
  const [targetVersion, routesManifest] = await Promise.all([
    getVersionById(toVersion),
    loadRoutesManifest(),
  ])

  // Check if target version exists
  if (targetVersion === null) {
    const latest = await getLatestVersion()
    return {
      path: `/v/${latest}/home`,
      fallbackReason: "version_not_found",
    }
  }

  // Extract current page slug
  const pageId = resolveCanonicalPageIdFromPath(pathname)

  // If no page ID found (empty route), fallback to home
  if (pageId === null) {
    return {
      path: `/v/${toVersion}/home`,
      fallbackReason: "page_not_available",
    }
  }

  // Check route availability
  const route = routesManifest.routes.find(r => r.id === pageId)

  // If route exists and is available in target version, use it
  if (route && route.availableInVersions.includes(toVersion)) {
    // Map page ID to slug (home -> "home", not empty string)
    const routeSlug = route.id === "landing" ? "home" : route.slug || route.id
    const targetPath = routeSlug === "" ? "/home" : `/${routeSlug}`
    return {
      path: `/v/${toVersion}${targetPath}`,
    }
  }

  // Fallback to home page of target version
  return {
    path: `/v/${toVersion}/home`,
    fallbackReason: "page_not_available",
  }
}

/**
 * Extract version ID from a pathname
 * Returns null if no version is present in the path
 */
export function extractVersionFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/v\/([^/]+)/)
  return match?.[1] ?? null
}

/**
 * Check if a pathname is versioned (starts with /v/:versionId)
 */
export function isVersionedPath(pathname: string): boolean {
  return /^\/v\/[^/]+/.test(pathname)
}
