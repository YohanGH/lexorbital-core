/**
 * Main layout component
 *
 * Provides the shell (header, footer, banner) that wraps all pages.
 */

import type { JSX, ReactNode } from "react"

import { Header } from "./Header"
import { Footer } from "./Footer"
import { OldVersionBanner } from "./versioning"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <Header currentPage="home" onNavigate={() => {}} />
      <OldVersionBanner />
      <main className="flex-1">{children}</main>
      <Footer onNavigate={() => {}} />
    </div>
  )
}
