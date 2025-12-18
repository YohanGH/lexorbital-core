/**
 * Version Switcher Component
 *
 * Provides a dropdown interface to switch between different site versions.
 * Displays current version and available versions.
 */

import type { JSX } from "react"
import { useState } from "react"

import { useVersion } from "@/version-manager/VersionContext"

export function VersionSwitcher(): JSX.Element {
  const { manifest, switchVersion, currentVersion } = useVersion()
  const [isOpen, setIsOpen] = useState(false)

  const handleVersionSelect = (versionId: string): void => {
    if (versionId !== currentVersion) {
      switchVersion(versionId)
    }
    setIsOpen(false)
  }

  const renderVersionItem = (version: {
    id: string
    date: string
    description: string
    status?: string
  }): JSX.Element => {
    const isCurrent = version.id === currentVersion

    return (
      <div
        key={version.id}
        className={`version-item flex cursor-pointer items-center justify-between border-b border-gray-200 p-4 transition-colors hover:bg-gray-50 ${
          isCurrent ? "bg-blue-50" : ""
        }`}
        onClick={() => handleVersionSelect(version.id)}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleVersionSelect(version.id)
          }
        }}
      >
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="font-semibold">{version.id}</span>
            {isCurrent && (
              <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                Actuel
              </span>
            )}
            {version.status === "archived" && (
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                Archivée
              </span>
            )}
          </div>
          <span className="text-sm text-gray-600">{version.date}</span>
          <p className="mt-1 text-sm text-gray-500">{version.description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="version-switcher relative">
      <button
        className="version-toggle flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Version actuelle: ${currentVersion}`}
      >
        Version: {currentVersion} ▼
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 z-20 mt-2 w-96 rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="version-list max-h-96 overflow-y-auto">
              <div className="border-b border-gray-200 p-4">
                <h3 className="font-semibold">Versions disponibles</h3>
              </div>
              {manifest.versions.map(renderVersionItem)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
