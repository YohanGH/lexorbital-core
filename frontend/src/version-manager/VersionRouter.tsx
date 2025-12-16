/**
 * Version Router
 *
 * Dynamically loads and renders the appropriate version App component
 * based on the current version selection.
 * Based on REFLEXION_VERSION.md specification.
 */

import type { ComponentType, JSX } from "react"
import { useState, useEffect } from "react"
import { Router, useLocation } from "wouter"
import { useTranslation } from "react-i18next"

import { useVersion } from "@/version-manager/VersionContext"
import { versionImports } from "@/version-manager/versionImports"
import { extractVersionFromPath, getVersionById } from "@/version-manager/versionUtils"
import { VersionsList } from "@/versions/v1/pages/versioning/VersionsList"

type LoadingState = "loading" | "error" | "loaded"

export function VersionRouter(): JSX.Element {
  const { t } = useTranslation("common")
  const { currentVersion, switchVersion } = useVersion()
  const [VersionApp, setVersionApp] = useState<ComponentType | null>(null)
  const [loadingState, setLoadingState] = useState<LoadingState>("loading")
  const [location, setLocation] = useLocation()

  // Extract version from path using utility function
  const versionFromPath = extractVersionFromPath(location)

  // Determine version to load (priority: path > currentVersion)
  const versionToLoad: string | null = versionFromPath || currentVersion || null

  // If version is detected from path and differs from context, update context
  useEffect(() => {
    if (versionFromPath && versionFromPath !== currentVersion) {
      switchVersion(versionFromPath)
    }
  }, [versionFromPath, currentVersion, switchVersion])

  // Load version component dynamically based on manifest
  useEffect(() => {
    if (!versionToLoad) {
      setVersionApp(null)
      setLoadingState("loading")
      return
    }

    const loadVersion = async (): Promise<void> => {
      setLoadingState("loading")
      const versionId: string = versionToLoad as string

      try {
        // Validate version exists in manifest
        const version = getVersionById(versionId)
        if (!version) {
          console.error(`Version ${versionId} not found in manifest`)
          setLoadingState("error")
          setVersionApp(null)
          return
        }

        // Load component directly from versionImports
        const versionLoader = versionImports[versionId]
        if (!versionLoader) {
          console.error(
            `Version ${versionId} not found in versionImports registry. Please add it to version-manager/versionImports.ts`
          )
          setLoadingState("error")
          setVersionApp(null)
          return
        }

        const module = await versionLoader()
        const AppComponent = module.default || null

        if (AppComponent === null) {
          setLoadingState("error")
          setVersionApp(null)
        } else {
          setLoadingState("loaded")
          setVersionApp(() => AppComponent)
        }
      } catch (error) {
        console.error(`Erreur de chargement de la version ${versionId}:`, error)
        setLoadingState("error")
        setVersionApp(null)
      }
    }
    void loadVersion()
  }, [versionToLoad])

  // If no version is detected, show VersionHistoryPage
  if (!versionToLoad) {
    return <VersionsList />
  }

  // If version failed to load, show error page
  if (loadingState === "error") {
    const handleBackToVersions = (): void => {
      // Navigate to root and replace history to prevent going back to error page
      setLocation("/", { replace: true })
    }

    return (
      <div className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col items-center justify-center px-4 py-24 md:px-8 md:py-32 lg:px-16 lg:py-48">
        <h1 className="mb-8 text-center text-red-600">
          {t("versioning.error.title")}
        </h1>
        <p className="mb-16 max-w-[600px] px-4 text-center opacity-75">
          {t("versioning.error.description", { version: versionToLoad })}
        </p>
        <button
          onClick={handleBackToVersions}
          className="border border-black px-8 py-4 transition-colors hover:bg-black hover:text-white"
        >
          {t("versioning.error.backToVersions")}
        </button>
      </div>
    )
  }

  // Render the loaded version app with Router base path
  // Base path should NOT have trailing slash to avoid double slashes in URLs
  if (loadingState === "loaded" && VersionApp) {
    return (
      <Router base={`/${versionToLoad}`}>
        <VersionApp />
      </Router>
    )
  }

  // Loading state
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col items-center justify-center px-4 py-24">
      <p>{t("versioning.loading", { version: versionToLoad })}</p>
    </div>
  )
}
