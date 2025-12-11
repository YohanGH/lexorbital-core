/**
 * Security page component
 *
 * Displays security policies, practices, and information.
 */

import type { JSX } from "react"
import { Link } from "wouter"

import { ROUTES } from "@/lib/router"

export function Security(): JSX.Element {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>🔒 Sécurité</h1>
        <nav style={{ marginTop: "1rem" }}>
          <Link href={ROUTES.HOME} style={{ marginRight: "1rem" }}>
            Accueil
          </Link>
        </nav>
      </header>

      <main>
        <section style={{ marginBottom: "2rem" }}>
          <h2>Politique de sécurité</h2>
          <p>
            Contenu à venir... Cette page présentera les mesures de sécurité,
            les bonnes pratiques et les politiques de sécurité de LexOrbital.
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
