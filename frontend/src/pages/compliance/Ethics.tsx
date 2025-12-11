/**
 * Ethics page component
 *
 * Displays ethical principles and commitments of LexOrbital.
 */

import type { JSX } from "react"
import { Link } from "wouter"

import { ROUTES } from "@/lib/router"

export function Ethics(): JSX.Element {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>⚖️ Éthique</h1>
        <nav style={{ marginTop: "1rem" }}>
          <Link href={ROUTES.HOME} style={{ marginRight: "1rem" }}>
            Accueil
          </Link>
        </nav>
      </header>

      <main>
        <section style={{ marginBottom: "2rem" }}>
          <h2>Principes éthiques</h2>
          <p>
            Contenu à venir... Cette page présentera les principes éthiques et
            les engagements de LexOrbital en matière d'éthique.
          </p>
        </section>

        <section
          style={{
            padding: "1.5rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            border: "2px dashed #ccc",
          }}
        >
          <p style={{ color: "#666", fontStyle: "italic" }}>
            ⚠️ Page en cours de développement - Rendu visuel temporaire
          </p>
        </section>
      </main>
    </div>
  )
}
