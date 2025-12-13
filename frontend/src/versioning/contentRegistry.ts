/**
 * Content registry for versioned content
 *
 * Uses Vite's import.meta.glob to index content files at build time.
 * Content files are organized by version: content/v1.0/landing.json, etc.
 */

/**
 * Content page structure
 */
export interface ContentPage {
  title?: string
  body: string
  metadata?: Record<string, unknown>
}

/**
 * Cache for loaded pages (key: "versionId/slug", value: ContentPage)
 */
const pageCache = new Map<string, ContentPage>()

/**
 * Cache TTL: 5 minutes
 */
const CACHE_TTL = 5 * 60 * 1000

/**
 * Cache entry with timestamp
 */
interface CacheEntry {
  data: ContentPage
  timestamp: number
}

const cacheEntries = new Map<string, CacheEntry>()

/**
 * Clear expired cache entries
 */
function clearExpiredCache(): void {
  const now = Date.now()
  for (const [key, entry] of cacheEntries.entries()) {
    if (now - entry.timestamp > CACHE_TTL) {
      cacheEntries.delete(key)
      pageCache.delete(key)
    }
  }
}

/**
 * Check if a page exists for a given version and slug
 */
export async function hasPage(
  versionId: string,
  slug: string
): Promise<boolean> {
  try {
    const contentPath = `/content/v${versionId}/${slug || "landing"}.json`
    const response = await fetch(contentPath, { method: "HEAD" })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Load a page content for a given version and slug
 * Uses cache to avoid redundant fetches
 */
export async function loadPage(
  versionId: string,
  slug: string
): Promise<ContentPage | null> {
  const cacheKey = `${versionId}/${slug || "landing"}`

  // Clear expired entries
  clearExpiredCache()

  // Check cache
  const cached = cacheEntries.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }

  try {
    const contentPath = `/content/v${versionId}/${slug || "landing"}.json`
    const response = await fetch(contentPath)
    if (!response.ok) {
      return null
    }
    const data = (await response.json()) as ContentPage

    // Store in cache
    cacheEntries.set(cacheKey, {
      data,
      timestamp: Date.now(),
    })
    pageCache.set(cacheKey, data)

    return data
  } catch {
    return null
  }
}

/**
 * List all available pages for a version
 * This is a helper that could be extended to read from a manifest
 */
export async function listPagesForVersion(
  versionId: string
): Promise<string[]> {
  // For now, we rely on the routes manifest
  // In a more advanced setup, we could scan the content directory
  try {
    const response = await fetch("/site.routes.json")
    if (!response.ok) {
      return []
    }
    const manifest = (await response.json()) as {
      routes: Array<{ id: string; availableInVersions: string[] }>
    }
    return manifest.routes
      .filter(r => r.availableInVersions.includes(versionId))
      .map(r => r.id)
  } catch {
    return []
  }
}
