/**
 * Explanatory pages root component
 *
 * Base component for explanatory/"faces cachées" pages.
 */

import type { JSX } from "react"
import { useRoute } from "wouter"
import { Link } from "wouter"

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
  const [isArchitecture] = useRoute("/explanatory/architecture")
  const [isCompliance] = useRoute("/explanatory/compliance")

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>📚 Explanatory</h1>
        <nav style={{ marginTop: "1rem" }}>
          <Link href="/" style={{ marginRight: "1rem" }}>
            Home
          </Link>
          <Link href="/modules" style={{ marginRight: "1rem" }}>
            Modules
          </Link>
          <Link href="/legal/mentions-legales">Legal</Link>
        </nav>
      </header>

      <nav style={{ marginBottom: "2rem", borderBottom: "1px solid #ddd" }}>
        <Link
          href="/explanatory/architecture"
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
          href="/explanatory/compliance"
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
