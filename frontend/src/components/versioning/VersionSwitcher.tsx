/**
 * Version switcher component
 *
 * Displays a dropdown/select to switch between site versions.
 * Attempts to preserve the current page when switching versions.
 */

import type { JSX } from "react"
import { useEffect, useState } from "react"
import { useLocation } from "wouter"

import type { SiteVersionEntry } from "@/versioning/types"
import {
  listVersions,
  getLatestVersion,
  resolveTargetPath,
  extractVersionFromPath,
} from "@/versioning/versioning"

export function VersionSwitcher(): JSX.Element {
  const [location, setLocation] = useLocation()
  const [versions, setVersions] = useState<SiteVersionEntry[]>([])
  const [currentVersion, setCurrentVersion] = useState<string | null>(null)
  const [latestVersion, setLatestVersion] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        const [versionsList, latest] = await Promise.all([
          listVersions(),
          getLatestVersion(),
        ])
        setVersions(versionsList)
        setLatestVersion(latest)

        // Extract current version from path
        const versionFromPath = extractVersionFromPath(location)
        setCurrentVersion(versionFromPath ?? latest)
      } catch (error) {
        console.error("Failed to load versions:", error)
      } finally {
        setLoading(false)
      }
    }

    void loadData()
  }, [location])

  const handleVersionChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    const targetVersion = event.target.value
    if (targetVersion === currentVersion) {
      return
    }

    try {
      const currentVersionId = currentVersion ?? (await getLatestVersion())
      const resolved = await resolveTargetPath({
        fromVersion: currentVersionId,
        toVersion: targetVersion,
        pathname: location,
      })

      setLocation(resolved.path)

      // Show a gentle message if fallback occurred
      if (resolved.fallbackReason === "page_not_available") {
        // Could use a toast library here, for now just console
        console.info(
          `Cette page n'existait pas encore dans la version ${targetVersion}. Redirection vers la page d'accueil.`
        )
      }
    } catch (error) {
      console.error("Failed to switch version:", error)
    }
  }

  if (loading) {
    return <div className="text-sm text-gray-500">Chargement...</div>
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="version-switcher" className="text-sm font-medium">
        Version:
      </label>
      <select
        id="version-switcher"
        value={currentVersion ?? latestVersion}
        onChange={handleVersionChange}
        className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {versions.map(version => (
          <option key={version.id} value={version.id}>
            {version.label}
            {version.status === "latest" ? " (actuelle)" : ""}
            {version.status === "archived" ? " (archivée)" : ""}
          </option>
        ))}
      </select>
    </div>
  )
}
