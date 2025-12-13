/**
 * Versions list page
 *
 * Displays all available site versions with their metadata
 * and provides links to open each version.
 */

import type { JSX } from "react"
import { useEffect, useState } from "react"
import { Link } from "wouter"

import type { SiteVersionEntry } from "@/versioning/types"
import { listVersions } from "@/versioning/versioning"

export function VersionsList(): JSX.Element {
  const [versions, setVersions] = useState<SiteVersionEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        const versionsList = await listVersions()
        setVersions(versionsList)
      } catch (error) {
        console.error("Failed to load versions:", error)
      } finally {
        setLoading(false)
      }
    }

    void loadData()
  }, [])

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p>Chargement...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Historique des versions</h1>
      <p className="mb-8 text-gray-600">
        Consultez les différentes versions du site LexOrbital. Chaque version
        représente un snapshot figé du site à un instant donné.
      </p>

      <div className="space-y-4">
        {versions.map(version => (
          <div
            key={version.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <h2 className="text-xl font-semibold">{version.label}</h2>
                  {version.status === "latest" && (
                    <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Actuelle
                    </span>
                  )}
                  {version.status === "archived" && (
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                      Archivée
                    </span>
                  )}
                </div>
                <p className="mb-2 text-gray-600">{version.description}</p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>
                    <strong>Date de release:</strong> {version.releaseDate}
                  </p>
                  {version.gitTag && (
                    <p>
                      <strong>Tag Git:</strong> {version.gitTag}
                    </p>
                  )}
                </div>
              </div>
              <Link
                href={`/v/${version.id}/home`}
                className="ml-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                Ouvrir v{version.id}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
