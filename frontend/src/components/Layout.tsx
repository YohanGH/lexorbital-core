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

import { getLatestVersion } from "@/versioning/versioning"
import {
  getPageFromPath,
  getSlugForPage,
  isVersionedPage,
} from "@/lib/pageMapping"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps): JSX.Element {
  const [location, setLocation] = useLocation()
  const [latestVersion, setLatestVersion] = useState<string | null>(null)

  // Scroll restoration on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

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
    const slug = getSlugForPage(page)
    if (slug === undefined) {
      console.warn(`Unknown page identifier: ${page}`)
      return
    }

    if (isVersionedPage(page)) {
      // Use versioned route
      const targetVersion = latestVersion ?? "2.0"
      const targetPath = `/v/${targetVersion}/${slug}`
      setLocation(targetPath)
    } else {
      // Use direct route (non-versioned pages)
      const targetPath = slug === "" ? "/" : `/${slug}`
      setLocation(targetPath)
    }
  }

  const currentPage = getPageFromPath(location)

  return (
    <div className="flex min-h-screen flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <OldVersionBanner />
      <main className="flex-1">{children}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  )
}
