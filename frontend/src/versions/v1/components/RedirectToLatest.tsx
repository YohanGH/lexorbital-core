/**
 * Redirect component that redirects "/" to the latest version
 */

import type { JSX } from "react"
import { useEffect, useState } from "react"
import { useLocation } from "wouter"

import { getLatestVersion } from "@/version-manager"

export function RedirectToLatest(): JSX.Element {
  const [, setLocation] = useLocation()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const redirect = (): void => {
      try {
        const latest = getLatestVersion() // Already has 'v' prefix (e.g., "v1")
        setError(null)
        setLocation(`/${latest}/home`)
      } catch (err) {
        console.error("Failed to get latest version:", err)

        // No retries needed for synchronous function
        setError(
          err instanceof Error
            ? err.message
            : "Impossible de charger la version la plus récente"
        )
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    redirect()
  }, [setLocation])

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
          <p>Redirection...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h1 className="mb-2 text-xl font-bold text-red-800">
            Erreur de chargement
          </h1>
          <p className="mb-4 text-red-600">{error}</p>
          <button
            onClick={() => {
              setLoading(true)
              setError(null)
              try {
                const latest = getLatestVersion() // Already has 'v' prefix (e.g., "v1")
                setLocation(`/${latest}/home`)
              } catch {
                setError("Erreur lors du rechargement")
              } finally {
                setLoading(false)
              }
            }}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return <></>
}
