/**
 * Banner displayed when viewing an archived version
 *
 * Shows a warning that the user is viewing an old version
 * and provides a link to go to the latest version.
 */

import type { JSX } from "react"
import { useEffect, useState } from "react"
import { useLocation } from "wouter"

import {
  getLatestVersion,
  extractVersionFromPath,
  resolveTargetPath,
} from "@/versioning/versioning"

export function OldVersionBanner(): JSX.Element | null {
  const [location, setLocation] = useLocation()
  const [latestVersion, setLatestVersion] = useState<string>("")
  const [currentVersion, setCurrentVersion] = useState<string | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const checkVersion = async (): Promise<void> => {
      try {
        const latest = await getLatestVersion()
        setLatestVersion(latest)
        const versionFromPath = extractVersionFromPath(location)
        setCurrentVersion(versionFromPath)
        setShowBanner(versionFromPath !== null && versionFromPath !== latest)
      } catch (error) {
        console.error("Failed to check version:", error)
      }
    }

    void checkVersion()
  }, [location])

  if (!showBanner || currentVersion === null) {
    return null
  }

  const handleGoToLatest = async (): Promise<void> => {
    try {
      const resolved = await resolveTargetPath({
        fromVersion: currentVersion,
        toVersion: latestVersion,
        pathname: location,
      })
      setLocation(resolved.path)
    } catch (error) {
      console.error("Failed to navigate to latest:", error)
    }
  }

  return (
    <div className="border-b border-yellow-200 bg-yellow-50 px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-yellow-800">
            ⚠️ Vous consultez une version archivée (v{currentVersion}). Version
            actuelle: v{latestVersion}.
          </span>
        </div>
        <button
          onClick={handleGoToLatest}
          className="rounded-md border border-yellow-300 bg-yellow-100 px-4 py-1 text-sm font-medium text-yellow-800 hover:bg-yellow-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        >
          Aller à la version actuelle
        </button>
      </div>
    </div>
  )
}
