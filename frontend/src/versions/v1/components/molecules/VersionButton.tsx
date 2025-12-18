/**
 * Version Button Component
 *
 * Displays version buttons dynamically loaded from the versions manifest.
 * Automatically adapts when new versions are added to site.versions.json.
 * No hardcoded version numbers - fully dynamic and maintainable.
 */

import { useEffect, useState } from "react"
import { useLocation } from "wouter"

import {
  listVersions,
  getLatestVersion,
  resolveTargetPath,
  extractVersionFromPath,
  toSiteVersionEntry,
  type SiteVersionEntry,
} from "@/version-manager"
import { mergeClasses } from "@/core/lib/utils"

interface VersionButtonProps {
  /**
   * Optional: Custom class name for the container
   */
  className?: string
}

export function VersionButton({ className }: VersionButtonProps) {
  const [location, setLocation] = useLocation()
  const [versions, setVersions] = useState<SiteVersionEntry[]>([])
  const [currentVersion, setCurrentVersion] = useState<string | null>(null)
  const [latestVersion, setLatestVersion] = useState<string>("")
  const [loading, setLoading] = useState(true)

  // Load versions from manifest on mount and when location changes
  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        const versionsList = listVersions()
        const latest = getLatestVersion()

        // Convert to SiteVersionEntry format for compatibility
        const siteVersions: SiteVersionEntry[] =
          versionsList.map(toSiteVersionEntry)

        // Sort versions: latest first, then by release date (newest first)
        const sortedVersions = [...siteVersions].sort((a, b) => {
          if (a.status === "latest") return -1
          if (b.status === "latest") return 1
          return (
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime()
          )
        })

        setVersions(sortedVersions)
        setLatestVersion(latest.replace(/^v/, "")) // Remove 'v' prefix for compatibility

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

  const handleVersionChange = async (versionId: string): Promise<void> => {
    if (versionId === currentVersion) {
      return
    }

    try {
      const currentVersionId = currentVersion ?? latestVersion
      const resolved = await resolveTargetPath({
        fromVersion: currentVersionId,
        toVersion: versionId,
        pathname: location,
      })

      setLocation(resolved.path)

      // Show a gentle message if fallback occurred
      if (resolved.fallbackReason === "page_not_available") {
        console.info(
          `Cette page n'existait pas encore dans la version ${versionId}. Redirection vers la page d'accueil.`
        )
      }
    } catch (error) {
      console.error("Failed to switch version:", error)
    }
  }

  if (loading) {
    return (
      <div
        className={mergeClasses(
          "flex w-full border border-black md:w-auto",
          className
        )}
      >
        <div className="flex-1 px-6 py-3 text-center md:flex-none md:px-8 md:py-4">
          Chargement...
        </div>
      </div>
    )
  }

  if (versions.length === 0) {
    return null
  }

  return (
    <div
      className={mergeClasses(
        "flex w-full border border-black md:w-auto",
        className
      )}
    >
      {versions.map((version, index) => {
        const isActive = currentVersion === version.id
        const isLast = index === versions.length - 1

        // Determine if version should be disabled
        // You can customize this logic based on your needs
        const isDisabled = version.status === "archived" && !isActive

        return (
          <button
            key={version.id}
            onClick={() => {
              if (!isDisabled) {
                void handleVersionChange(version.id)
              }
            }}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            className={mergeClasses(
              "flex-1 px-6 py-3 transition-colors md:flex-none md:px-8 md:py-4",
              !isLast && "border-r border-black",
              isActive
                ? "bg-black text-white"
                : isDisabled
                  ? "cursor-not-allowed bg-white text-black opacity-25"
                  : "bg-white text-black hover:bg-gray-100"
            )}
            aria-label={`Version ${version.label}${version.status === "latest" ? " (actuelle)" : ""}`}
          >
            {version.label}
          </button>
        )
      })}
    </div>
  )
}
