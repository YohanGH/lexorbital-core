/**
 * Home page component
 *
 * Main landing page displaying service status and modules overview.
 * This page fetches data from the backend API and displays it in a dashboard format.
 */

import type { JSX } from "react"
import { useEffect, useState } from "react"
import { Link } from "wouter"

import { ROUTES } from "@/lib/router"

interface HealthStatus {
  status: string
  service: string
}

interface Module {
  name: string
  type: string
  status: string
}

// In development with Vite proxy, use /api which proxies to backend
// In production or standalone, use VITE_API_URL env var or fallback
const getApiUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  // Use proxy in dev mode, fallback to localhost in production
  return import.meta.env.DEV ? "/api" : "http://localhost:4000"
}

const API_URL = getApiUrl()

export function Home(): JSX.Element {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true)
        setError(null)

        // Fetch health status
        const healthRes = await fetch(`${API_URL}/health`)
        if (!healthRes.ok) {
          throw new Error("Failed to fetch health")
        }
        const healthData = (await healthRes.json()) as HealthStatus
        setHealth(healthData)

        // Fetch modules
        const modulesRes = await fetch(`${API_URL}/modules`)
        if (!modulesRes.ok) {
          throw new Error("Failed to fetch modules")
        }
        const modulesData = (await modulesRes.json()) as Module[]
        setModules(modulesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
    const interval = setInterval(() => {
      void fetchData()
    }, 5000) // Refresh every 5s

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>🚀 LexOrbital - Console Orbitale</h1>
        <p style={{ color: "#666" }}>
          Meta-Kernel + BackRing + FrontRing - POC V1
        </p>
        <nav style={{ marginTop: "1rem" }}>
          <Link href={ROUTES.MODULES} style={{ marginRight: "1rem" }}>
            Modules
          </Link>
          <Link href={ROUTES.LEGAL.ROOT} style={{ marginRight: "1rem" }}>
            Legal
          </Link>
          <Link href={ROUTES.EXPLANATORY.ROOT}>Explanatory</Link>
        </nav>
      </header>

      {loading && <p>Loading...</p>}

      {error !== null && (
        <div
          style={{
            padding: "1rem",
            background: "#fee",
            border: "1px solid #fcc",
            borderRadius: "4px",
            marginBottom: "1rem",
            color: "#c33",
          }}
        >
          ❌ Error: {error}
        </div>
      )}

      {!loading && error === null && (
        <>
          <section style={{ marginBottom: "2rem" }}>
            <h2>📡 Service Status</h2>
            {health !== null && (
              <div
                style={{
                  padding: "1rem",
                  background: "#eef",
                  border: "1px solid #ccf",
                  borderRadius: "4px",
                }}
              >
                <p>
                  <strong>Status:</strong> {health.status}
                </p>
                <p>
                  <strong>Service:</strong> {health.service}
                </p>
              </div>
            )}
          </section>

          <section>
            <h2>📦 Modules (Mocked)</h2>
            {modules.length === 0 ? (
              <p>No modules found.</p>
            ) : (
              <div style={{ display: "grid", gap: "1rem" }}>
                {modules.map((module, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "1rem",
                      background: "#f9f9f9",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  >
                    <p>
                      <strong>Name:</strong> {module.name}
                    </p>
                    <p>
                      <strong>Type:</strong> {module.type}
                    </p>
                    <p>
                      <strong>Status:</strong> {module.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}
