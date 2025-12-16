/**
 * Main layout component
 *
 * Provides the shell (header, footer, banner) that wraps all pages.
 */

import type { JSX, ReactNode } from "react"
import { useEffect } from "react"
import { useLocation } from "wouter"

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

import { getSlugForPage } from "@/versions/v1/lib/pageMapping"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps): JSX.Element {
  const [location, setLocation] = useLocation()

  // Scroll restoration on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const handleNavigate = (page: string): void => {
    const slug = getSlugForPage(page)
    if (slug === undefined) {
      console.warn(`Unknown page identifier: ${page}`)
      return
    }

    // Since we're inside a Router with base="/v1", location is already relative
    // Wouter handles base path concatenation, so we just need the relative path
    const targetPath = slug === "" || slug === "home" ? "/" : `/${slug}`
    setLocation(targetPath)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header onNavigate={handleNavigate} />
      <main className="flex-1">{children}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  )
}
