/**
 * Legal pages root component
 *
 * Base component for legal pages with navigation.
 */

import type { JSX } from "react"
import { useRoute } from "wouter"
import { Link } from "wouter"

import { ROUTES } from "@/lib/router"

function LegalMentions(): JSX.Element {
  return (
    <div>
      <h2>Mentions Légales</h2>
      <p>Legal notices content coming soon...</p>
    </div>
  )
}

function LegalRGPD(): JSX.Element {
  return (
    <div>
      <h2>Politique de Confidentialité (RGPD)</h2>
      <p>RGPD privacy policy content coming soon...</p>
    </div>
  )
}

function LegalCookies(): JSX.Element {
  return (
    <div>
      <h2>Politique des Cookies</h2>
      <p>Cookies policy content coming soon...</p>
    </div>
  )
}

export function Legal(): JSX.Element {
  const [isMentions] = useRoute(ROUTES.LEGAL.MENTIONS)
  const [isRGPD] = useRoute(ROUTES.LEGAL.RGPD)
  const [isCookies] = useRoute(ROUTES.LEGAL.COOKIES)

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>⚖️ Legal</h1>
        <nav style={{ marginTop: "1rem" }}>
          <Link href={ROUTES.HOME} style={{ marginRight: "1rem" }}>
            Home
          </Link>
          <Link href={ROUTES.MODULES} style={{ marginRight: "1rem" }}>
            Modules
          </Link>
          <Link href={ROUTES.EXPLANATORY.ROOT}>Explanatory</Link>
        </nav>
      </header>

      <nav style={{ marginBottom: "2rem", borderBottom: "1px solid #ddd" }}>
        <Link
          href={ROUTES.LEGAL.MENTIONS}
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            marginRight: "0.5rem",
            textDecoration: "none",
            color: "#007bff",
          }}
        >
          Mentions Légales
        </Link>
        <Link
          href={ROUTES.LEGAL.RGPD}
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            marginRight: "0.5rem",
            textDecoration: "none",
            color: "#007bff",
          }}
        >
          RGPD
        </Link>
        <Link
          href={ROUTES.LEGAL.COOKIES}
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            textDecoration: "none",
            color: "#007bff",
          }}
        >
          Cookies
        </Link>
      </nav>

      {isMentions && <LegalMentions />}
      {isRGPD && <LegalRGPD />}
      {isCookies && <LegalCookies />}
      {!isMentions && !isRGPD && !isCookies && (
        <div>
          <p>Select a legal page from the navigation above.</p>
        </div>
      )}
    </div>
  )
}
