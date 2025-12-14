/**
 * Version Manager Context
 *
 * Provides version management functionality through React Context.
 * Handles version switching and compatibility checking.
 * Component loading is handled directly in VersionRouter.
 */

import type { JSX, ReactNode } from "react"
import { createContext, useContext, useState, useCallback } from "react"

import manifest from "../versions/manifest.json"
import type { VersionManifest } from "./types"
import { getVersionById } from "./versionUtils"


interface VersionContextValue {
  currentVersion: string | null
  switchVersion: (versionId: string) => void
  manifest: VersionManifest
  checkCompatibility: (fromVersion: string, toVersion: string) => boolean
}

const VersionContext = createContext<VersionContextValue | undefined>(undefined)

interface VersionProviderProps {
  children: ReactNode
}

export function VersionProvider({
  children,
}: VersionProviderProps): JSX.Element {
  // Initialize version from path, or null if no version selected
  // VersionRouter will handle path-based version detection
  const [currentVersion, setCurrentVersion] = useState<string | null>(null)

  const checkCompatibility = useCallback(
    (fromVersion: string, toVersion: string): boolean => {
      const from = getVersionById(fromVersion)
      const to = getVersionById(toVersion)

      if (!from || !to) {
        return false
      }

      return from.compatibility.dataFormat === to.compatibility.dataFormat
    },
    []
  )

  const switchVersion = useCallback(
    (versionId: string): void => {
      const versionData = getVersionById(versionId)

      if (!versionData) {
        console.warn(`Version ${versionId} not found`)
        return
      }

      // Check compatibility (only if we have a current version)
      if (currentVersion && !checkCompatibility(currentVersion, versionId)) {
        console.warn(
          `Compatibilité limitée entre ${currentVersion} et ${versionId}`
        )
      }

      setCurrentVersion(versionId)

      // Navigate to version path for sharing
      // VersionRouter will handle the actual navigation
      const path = `/${versionId}`
      window.history.pushState({ version: versionId }, "", path)
    },
    [currentVersion, checkCompatibility]
  )

  const value: VersionContextValue = {
    currentVersion,
    switchVersion,
    manifest: manifest as VersionManifest,
    checkCompatibility,
  }

  return (
    <VersionContext.Provider value={value}>{children}</VersionContext.Provider>
  )
}

export function useVersion(): VersionContextValue {
  const context = useContext(VersionContext)
  if (context === undefined) {
    throw new Error("useVersion must be used within a VersionProvider")
  }
  return context
}
