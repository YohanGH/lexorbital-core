/**
 * Main layout component
 *
 * Provides the shell (header, footer, banner) that wraps all pages.
 */

import type { JSX, ReactNode } from "react"
import { useEffect, useState } from "react"
import { useLocation } from "wouter"

import { Header } from "./Header"
import { Footer } from "./Footer"
import { OldVersionBanner } from "./versioning"

import {
  getLatestVersion,
  resolveCanonicalPageIdFromPath,
} from "@/versioning/versioning"

interface LayoutProps {
  children: ReactNode
}

/**
 * Maps page identifiers to their canonical route slugs
 * These will be resolved to versioned paths at runtime
 */
const PAGE_TO_SLUG: Record<string, string> = {
  home: "",
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
}

/**
 * Extracts the current page identifier from the location path
 */
function getCurrentPageFromLocation(location: string): string {
  // Remove version prefix if present (/v/2.0/...)
  const pathWithoutVersion = location.replace(/^\/v\/[^/]+/, "")
  // Remove leading/trailing slashes
  const cleanPath = pathWithoutVersion.replace(/^\/+|\/+$/g, "") || ""

  // Direct mapping from path to page identifier
  const pathToPage: Record<string, string> = {
    "": "home",
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
  }

  // Try exact match first
  if (pathToPage[cleanPath]) {
    return pathToPage[cleanPath]
  }

  // For versioned routes, try to extract page ID
  if (location.startsWith("/v/")) {
    const pageId = resolveCanonicalPageIdFromPath(location)
    const pageIdToIdentifier: Record<string, string> = {
      landing: "home",
      about: "about",
      modules: "modules",
    }
    return pageIdToIdentifier[pageId ?? ""] ?? "home"
  }

  return "home"
}

export function Layout({ children }: LayoutProps): JSX.Element {
  const [location, setLocation] = useLocation()
  const [latestVersion, setLatestVersion] = useState<string | null>(null)

  // Load latest version on mount
  useEffect(() => {
    const loadVersion = async (): Promise<void> => {
      try {
        const latest = await getLatestVersion()
        setLatestVersion(latest)
      } catch (error) {
        console.error("Failed to load latest version:", error)
        setLatestVersion("2.0") // Fallback
      }
    }
    void loadVersion()
  }, [])

  const handleNavigate = (page: string): void => {
    const slug = PAGE_TO_SLUG[page]
    if (slug === undefined) {
      console.warn(`Unknown page identifier: ${page}`)
      return
    }

    // Check if this is a versioned page (home, modules, about from versioning system)
    // or a direct route (contact, glossary, legal pages, etc.)
    const isVersionedPage = ["home", "modules", "about"].includes(page)

    if (isVersionedPage) {
      // Use versioned route
      const targetVersion = latestVersion ?? "2.0"
      const targetPath =
        slug === "" ? `/v/${targetVersion}/` : `/v/${targetVersion}/${slug}`
      setLocation(targetPath)
    } else {
      // Use direct route (non-versioned pages)
      const targetPath = slug === "" ? "/" : `/${slug}`
      setLocation(targetPath)
    }
  }

  const currentPage = getCurrentPageFromLocation(location)

  return (
    <div className="flex min-h-screen flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <OldVersionBanner />
      <main className="flex-1">{children}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  )
}
