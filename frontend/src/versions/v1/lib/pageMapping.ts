/**
 * Unified Page and Route Mapping
 *
 * Centralized mapping between page identifiers, slugs, paths, and React components.
 * This file combines page mapping (for navigation) and route mapping (for routing)
 * to avoid duplication and maintain a single source of truth.
 */

import type { ComponentType } from "react"

import {
  Home,
  About,
  Contact,
  Glossary,
  Sitemap,
  References,
  TermsOfUse,
  Accessibility,
  EcoConception,
  Ethics,
  Disclosure,
  Security,
  CookieManagement,
  TrustCenter,
  Explanatory,
  VersionsList,
  Modules,
} from "@/versions/v1/pages"

// ============================================================================
// PAGE IDENTIFIER ↔ SLUG MAPPINGS
// ============================================================================

/**
 * Maps page identifiers to their canonical route slugs
 */
export const PAGE_TO_SLUG: Record<string, string> = {
  home: "/",
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
  home: "/",
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

// ============================================================================
// SLUG ↔ COMPONENT MAPPINGS
// ============================================================================

/**
 * Maps route slugs to their React components
 */
export const ROUTE_TO_COMPONENT: Record<string, ComponentType> = {
  home: Home,
  modules: Modules,
  about: About,
  contact: Contact,
  glossary: Glossary,
  sitemap: Sitemap,
  references: References,
  explanatory: Explanatory,
  "legal/terms-of-use": TermsOfUse,
  "legal/accessibility": Accessibility,
  "legal/eco-conception": EcoConception,
  "legal/ethics": Ethics,
  "legal/disclosure": Disclosure,
  "legal/security": Security,
  "legal/cookie-management": CookieManagement,
  "trust-center": TrustCenter,
  versions: VersionsList,
} as const

/**
 * Special routes that need custom handling (redirects, etc.)
 */
export const SPECIAL_ROUTES: Record<string, { type: "redirect"; to: string }> =
  {
    "llm-txt": { type: "redirect", to: "/llm.txt" },
  } as const

// ============================================================================
// UTILITY FUNCTIONS - PAGE MAPPING
// ============================================================================

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
  // Remove version prefix if present (/v/2.0/... or /v1/...)
  const pathWithoutVersion = pathname
    .replace(/^\/v\/[^/]+/, "")
    .replace(/^\/v\d{1,3}(?:_\d{1,3})?\//, "")
  // Remove leading/trailing slashes
  const cleanPath = pathWithoutVersion.replace(/^\/+|\/+$/g, "") || ""

  // Try direct mapping first
  if (SLUG_TO_PAGE[cleanPath]) {
    return SLUG_TO_PAGE[cleanPath]
  }

  // For versioned routes, extract page ID from slug
  if (
    pathname.startsWith("/v/") ||
    pathname.match(/^\/v\d{1,3}(?:_\d{1,3})?\//)
  ) {
    // Remove version prefix: /v/2.0/about -> about or /v1/about -> about
    const slug = cleanPath || "home"
    return getPageFromSlug(slug) || "home"
  }

  // Default to home
  return "home"
}

// ============================================================================
// UTILITY FUNCTIONS - ROUTE MAPPING
// ============================================================================

/**
 * Get component for a route slug
 * Returns null for redirect routes (handled separately in VersionRouterV1)
 */
export function getComponentForRoute(slug: string): ComponentType | null {
  // Check special routes first - these are redirects, return null
  if (SPECIAL_ROUTES[slug]) {
    return null
  }

  // Check regular routes
  return ROUTE_TO_COMPONENT[slug] || null
}

/**
 * Check if a route is a redirect
 */
export function isRedirectRoute(slug: string): boolean {
  return SPECIAL_ROUTES[slug]?.type === "redirect"
}

/**
 * Get redirect target for a route slug
 */
export function getRedirectTarget(slug: string): string | null {
  return SPECIAL_ROUTES[slug]?.type === "redirect"
    ? SPECIAL_ROUTES[slug].to
    : null
}

/**
 * Get all route slugs that have components or special handling
 */
export function getAllRouteSlugs(): string[] {
  return [...Object.keys(ROUTE_TO_COMPONENT), ...Object.keys(SPECIAL_ROUTES)]
}
