/**
 * 404 Not Found page component
 *
 * Displayed when a route doesn't match any defined route pattern.
 * Provides navigation back to the home page.
 */

import type { JSX } from "react"
import { Link } from "wouter"

import { ROUTES } from "@/lib/router"

export function NotFound(): JSX.Element {
  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: "0" }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        The page you are looking for does not exist.
      </p>
      <Link
        href={ROUTES.HOME}
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          background: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        Return to Home
      </Link>
    </div>
  )
}
