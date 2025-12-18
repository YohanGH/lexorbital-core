/**
 * Banner displayed when viewing an archived version
 *
 * Shows a warning that the user is viewing an old/archived version
 * and provides a link to go to the latest version.
 *
 * The banner is displayed when:
 * - The current version is not the latest version (from manifest)
 * - OR the current version has status "archived" in the manifest
 */

import type { JSX } from "react"
import { useEffect, useState } from "react"
import { useLocation } from "wouter"

import {
  getLatestVersion,
  getVersionById,
  resolveTargetPath,
} from "@/version-manager"
import { useVersion } from "@/version-manager/VersionContext"

export function OldVersionBanner(): JSX.Element | null {
  const [location, setLocation] = useLocation()
  const { currentVersion, manifest } = useVersion()
  const [showBanner, setShowBanner] = useState(false)
  const [currentVersionData, setCurrentVersionData] = useState<{
    id: string
    status?: string
  } | null>(null)

  useEffect(() => {
    const checkVersion = (): void => {
      try {
        const latestVersion = getLatestVersion()

        // Use currentVersion from context (set by VersionRouter based on path)
        const versionId = currentVersion || latestVersion
        const versionData = getVersionById(versionId)

        if (!versionData) {
          setShowBanner(false)
          setCurrentVersionData(null)
          return
        }

        setCurrentVersionData({
          id: versionData.id,
          ...(versionData.status && { status: versionData.status }),
        })

        // Show banner if:
        // 1. Current version is not the latest version
        // 2. OR current version has status "archived"
        const isNotLatest = versionId !== latestVersion
        const isArchived = versionData.status === "archived"

        setShowBanner(isNotLatest || isArchived)
      } catch (error) {
        console.error("Failed to check version:", error)
        setShowBanner(false)
      }
    }

    checkVersion()
  }, [currentVersion, manifest])

  if (!showBanner || !currentVersionData) {
    return null
  }

  const handleGoToLatest = (): void => {
    try {
      const latestVersion = getLatestVersion()
      // Get the current path without version prefix
      // Since we're in a Router with base="/v1", location is already relative
      const pathWithoutVersion = location === "/" ? "/" : location

      const resolved = resolveTargetPath({
        fromVersion: currentVersionData.id,
        toVersion: latestVersion,
        pathname: `/${currentVersionData.id}${pathWithoutVersion}`,
      })

      // Navigate to the resolved path (which includes the version prefix)
      setLocation(resolved.path.replace(`/${latestVersion}`, "") || "/")
    } catch (error) {
      console.error("Failed to navigate to latest:", error)
    }
  }

  const latestVersion = getLatestVersion()

  return (
    <div className="border-b border-yellow-200 bg-yellow-50 px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-yellow-800">
            ⚠️ Vous consultez une version{" "}
            {currentVersionData.status === "archived" ? "archivée" : "ancienne"}{" "}
            ({currentVersionData.id}). Version actuelle: {latestVersion}.
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
