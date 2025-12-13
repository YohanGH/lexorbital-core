/**
 * Centralized page mapping utilities
 *
 * Provides unified mapping between page identifiers, slugs, and paths
 * to avoid duplication across Layout and versioning modules.
 */

/**
 * Maps page identifiers to their canonical route slugs
 */
export const PAGE_TO_SLUG: Record<string, string> = {
  home: "home",
  modules: "modules",
  about: "about",
  glossary: "glossary",
  contact: "contact",
  "trust-center": "trust-center",
  "terms-of-use": "legal/terms-of-use",
  accessibility: "legal/accessibility",
  "eco-conception": "legal/eco-conception",
  ethics: "legal/ethics",
  disclosure: "legal/disclosure",
  security: "legal/security",
  sitemap: "sitemap",
  references: "references",
  "technical-glossary": "technical-glossary",
  "cookie-management": "legal/cookie-management",
  "explanatory-index": "explanatory",
} as const

/**
 * Maps path slugs to page identifiers
 */
export const SLUG_TO_PAGE: Record<string, string> = {
  home: "home",
  about: "about",
  modules: "modules",
  glossary: "glossary",
  contact: "contact",
  "trust-center": "trust-center",
  "legal/terms-of-use": "terms-of-use",
  "legal/accessibility": "accessibility",
  "legal/eco-conception": "eco-conception",
  "legal/ethics": "ethics",
  "legal/disclosure": "disclosure",
  "legal/security": "security",
  "legal/cookie-management": "cookie-management",
  sitemap: "sitemap",
  references: "references",
  "technical-glossary": "technical-glossary",
  explanatory: "explanatory-index",
} as const

/**
 * Pages that are versioned (require /v/:versionId/ prefix)
 */
export const VERSIONED_PAGES: readonly string[] = [
  "home",
  "modules",
  "about",
] as const

/**
 * Check if a page identifier is versioned
 */
export function isVersionedPage(pageId: string): boolean {
  return VERSIONED_PAGES.includes(pageId as (typeof VERSIONED_PAGES)[number])
}

/**
 * Get slug for a page identifier
 */
export function getSlugForPage(pageId: string): string | undefined {
  return PAGE_TO_SLUG[pageId]
}

/**
 * Get page identifier from a slug
 */
export function getPageFromSlug(slug: string): string | undefined {
  return SLUG_TO_PAGE[slug]
}

/**
 * Extract page identifier from a pathname
 * Handles both versioned (/v/2.0/about) and non-versioned (/about) paths
 */
export function getPageFromPath(pathname: string): string {
  // Remove version prefix if present (/v/2.0/...)
  const pathWithoutVersion = pathname.replace(/^\/v\/[^/]+/, "")
  // Remove leading/trailing slashes
  const cleanPath = pathWithoutVersion.replace(/^\/+|\/+$/g, "") || ""

  // Try direct mapping first
  if (SLUG_TO_PAGE[cleanPath]) {
    return SLUG_TO_PAGE[cleanPath]
  }

  // For versioned routes, extract page ID from slug
  if (pathname.startsWith("/v/")) {
    // Remove version prefix: /v/2.0/about -> about
    const slug = cleanPath || "home"
    return getPageFromSlug(slug) || "home"
  }

  // Default to home
  return "home"
}
