/**
 * Modules page component
 *
 * Displays the modules overview and management interface.
 * This page will be expanded to show the orbital architecture visualization.
 */

import type { JSX } from "react"
import { Link } from "wouter"

import { ROUTES } from "@/lib/router"

export function Modules(): JSX.Element {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>📦 Modules</h1>
        <nav style={{ marginTop: "1rem" }}>
          <Link href={ROUTES.HOME} style={{ marginRight: "1rem" }}>
            Home
          </Link>
          <Link href={ROUTES.LEGAL.MENTIONS} style={{ marginRight: "1rem" }}>
            Legal
          </Link>
          <Link href={ROUTES.EXPLANATORY.ROOT}>Explanatory</Link>
        </nav>
      </header>

      <section>
        <p>Modules overview coming soon...</p>
        <p>
          This page will display the orbital architecture visualization and
          module management interface.
        </p>
      </section>
    </div>
  )
}
