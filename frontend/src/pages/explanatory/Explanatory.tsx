/**
 * Explanatory pages root component
 *
 * Base component for explanatory/"faces cachées" pages.
 */

import type { JSX } from "react"
import { useRoute } from "wouter"
import { Link } from "wouter"

import { ROUTES } from "@/lib/router"

function ExplanatoryArchitecture(): JSX.Element {
  return (
    <div>
      <h2>Architecture</h2>
      <p>Architecture documentation coming soon...</p>
    </div>
  )
}

function ExplanatoryCompliance(): JSX.Element {
  return (
    <div>
      <h2>Compliance</h2>
      <p>Compliance documentation coming soon...</p>
    </div>
  )
}

export function Explanatory(): JSX.Element {
  const [isArchitecture] = useRoute(ROUTES.EXPLANATORY.ARCHITECTURE)
  const [isCompliance] = useRoute(ROUTES.EXPLANATORY.COMPLIANCE)

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>📚 Explanatory</h1>
        <nav style={{ marginTop: "1rem" }}>
          <Link href={ROUTES.HOME} style={{ marginRight: "1rem" }}>
            Home
          </Link>
          <Link href={ROUTES.MODULES} style={{ marginRight: "1rem" }}>
            Modules
          </Link>
          <Link href={ROUTES.LEGAL.MENTIONS}>Legal</Link>
        </nav>
      </header>

      <nav style={{ marginBottom: "2rem", borderBottom: "1px solid #ddd" }}>
        <Link
          href={ROUTES.EXPLANATORY.ARCHITECTURE}
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            marginRight: "0.5rem",
            textDecoration: "none",
            color: "#007bff",
          }}
        >
          Architecture
        </Link>
        <Link
          href={ROUTES.EXPLANATORY.COMPLIANCE}
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            textDecoration: "none",
            color: "#007bff",
          }}
        >
          Compliance
        </Link>
      </nav>

      {isArchitecture && <ExplanatoryArchitecture />}
      {isCompliance && <ExplanatoryCompliance />}
      {!isArchitecture && !isCompliance && (
        <div>
          <p>Select an explanatory page from the navigation above.</p>
        </div>
      )}
    </div>
  )
}
