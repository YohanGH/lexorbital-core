/**
 * Version History Page
 *
 * Displays a timeline of all site versions with their details,
 * changes, and technology stack.
 */

import type { JSX } from "react"
import { useLocation } from "wouter"

import { useVersion } from "@/version-manager/VersionContext"

export function VersionHistoryPage(): JSX.Element {
  const { manifest, switchVersion } = useVersion()
  const [, setLocation] = useLocation()

  const handleExploreVersion = (versionId: string): void => {
    // Switch to the selected version
    switchVersion(versionId)
    // Navigate to version path
    setLocation(`/${versionId}`)
  }

  // Safety check
  if (!manifest || !manifest.versions) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p>Chargement des versions...</p>
      </div>
    )
  }

  return (
    <div className="version-history-page mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Évolution du site laboratoire</h1>
      <p className="mb-8 text-gray-600">
        Explorez l'historique des versions et les réflexions derrière chaque
        changement
      </p>

      <div className="space-y-8">
        {manifest.versions && manifest.versions.length > 0 ? (
          manifest.versions.map(version => {
          const isCurrent = version.id === manifest.current

          return (
            <div
              key={version.id}
              className={`version-timeline-item rounded-lg border-2 p-6 ${
                isCurrent
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h2 className="text-2xl font-semibold">
                      Version {version.id}
                    </h2>
                    {isCurrent && (
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
                  <p className="text-sm text-gray-500">
                    <strong>Date:</strong> {version.date}
                  </p>
                </div>
              </div>

              <div className="version-details space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Technologies:</h4>
                  <div className="tech-stack flex flex-wrap gap-2">
                    {Object.entries(version.dependencies || {}).map(
                      ([dep, versionNumber]) => (
                        <span
                          key={dep}
                          className="rounded bg-gray-100 px-3 py-1 text-sm"
                        >
                          {dep}: {versionNumber}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Compatibilité:</h4>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="rounded bg-gray-100 px-3 py-1">
                      Format de données: {version.compatibility.dataFormat}
                    </span>
                    <span className="rounded bg-gray-100 px-3 py-1">
                      API: {version.compatibility.api}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleExploreVersion(version.id)}
                  className="explore-btn rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  Explorer cette version
                </button>
              </div>
            </div>
          )
        })
        ) : (
          <div className="text-center text-gray-500">
            <p>Aucune version disponible</p>
          </div>
        )}
      </div>
    </div>
  )
}
