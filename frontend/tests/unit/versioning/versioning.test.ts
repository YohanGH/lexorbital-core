/**
 * Unit tests for versioning utilities
 */

import { describe, it, expect, beforeEach, vi } from "vitest"

import {
  getLatestVersion,
  getVersionById,
  isArchived,
  listVersions,
  resolveCanonicalPageIdFromPath,
  resolveTargetPath,
  extractVersionFromPath,
  isVersionedPath,
  resetManifestsCache,
} from "@/versioning/versioning"
import type {
  SiteVersionsManifest,
  SiteRoutesManifest,
} from "@/versioning/types"

// Mock fetch
global.fetch = vi.fn()

describe("versioning utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    resetManifestsCache()
  })

  describe("resolveCanonicalPageIdFromPath", () => {
    it("should return null for empty root path (home must be explicit)", () => {
      expect(resolveCanonicalPageIdFromPath("/")).toBeNull()
      expect(resolveCanonicalPageIdFromPath("")).toBeNull()
    })

    it("should extract page ID from versioned path", () => {
      expect(resolveCanonicalPageIdFromPath("/v/1.0/about")).toBe("about")
      expect(resolveCanonicalPageIdFromPath("/v/2.0/modules")).toBe("modules")
      expect(resolveCanonicalPageIdFromPath("/v/1.0/home")).toBe("home")
      // Empty slug in versioned path is invalid
      expect(resolveCanonicalPageIdFromPath("/v/1.0/")).toBeNull()
    })

    it("should extract page ID from non-versioned path", () => {
      expect(resolveCanonicalPageIdFromPath("/about")).toBe("about")
      expect(resolveCanonicalPageIdFromPath("/modules")).toBe("modules")
      expect(resolveCanonicalPageIdFromPath("/home")).toBe("home")
    })
  })

  describe("extractVersionFromPath", () => {
    it("should extract version from versioned path", () => {
      expect(extractVersionFromPath("/v/1.0/about")).toBe("1.0")
      expect(extractVersionFromPath("/v/2.0/")).toBe("2.0")
    })

    it("should return null for non-versioned path", () => {
      expect(extractVersionFromPath("/about")).toBeNull()
      expect(extractVersionFromPath("/")).toBeNull()
    })
  })

  describe("isVersionedPath", () => {
    it("should return true for versioned paths", () => {
      expect(isVersionedPath("/v/1.0/about")).toBe(true)
      expect(isVersionedPath("/v/2.0/")).toBe(true)
    })

    it("should return false for non-versioned paths", () => {
      expect(isVersionedPath("/about")).toBe(false)
      expect(isVersionedPath("/")).toBe(false)
    })
  })

  describe("getLatestVersion", () => {
    it("should return latest version from manifest", async () => {
      const manifest: SiteVersionsManifest = {
        latest: "2.0",
        versions: [
          {
            id: "2.0",
            label: "v2.0",
            status: "latest",
            releaseDate: "2024-01-15",
            description: "Latest version",
          },
        ],
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => manifest,
      } as Response)

      const latest = await getLatestVersion()
      expect(latest).toBe("2.0")
    })
  })

  describe("getVersionById", () => {
    it("should return version entry by ID", async () => {
      const manifest: SiteVersionsManifest = {
        latest: "2.0",
        versions: [
          {
            id: "1.0",
            label: "v1.0",
            status: "archived",
            releaseDate: "2023-06-01",
            description: "Old version",
          },
          {
            id: "2.0",
            label: "v2.0",
            status: "latest",
            releaseDate: "2024-01-15",
            description: "Latest version",
          },
        ],
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => manifest,
      } as Response)

      const version = await getVersionById("1.0")
      expect(version).not.toBeNull()
      expect(version?.id).toBe("1.0")
      expect(version?.status).toBe("archived")
    })

    it("should return null for non-existent version", async () => {
      const manifest: SiteVersionsManifest = {
        latest: "2.0",
        versions: [
          {
            id: "2.0",
            label: "v2.0",
            status: "latest",
            releaseDate: "2024-01-15",
            description: "Latest version",
          },
        ],
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => manifest,
      } as Response)

      const version = await getVersionById("3.0")
      expect(version).toBeNull()
    })
  })

  describe("isArchived", () => {
    it("should return true for archived version", async () => {
      const manifest: SiteVersionsManifest = {
        latest: "2.0",
        versions: [
          {
            id: "1.0",
            label: "v1.0",
            status: "archived",
            releaseDate: "2023-06-01",
            description: "Old version",
          },
        ],
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => manifest,
      } as Response)

      const archived = await isArchived("1.0")
      expect(archived).toBe(true)
    })

    it("should return false for latest version", async () => {
      const manifest: SiteVersionsManifest = {
        latest: "2.0",
        versions: [
          {
            id: "2.0",
            label: "v2.0",
            status: "latest",
            releaseDate: "2024-01-15",
            description: "Latest version",
          },
        ],
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => manifest,
      } as Response)

      const archived = await isArchived("2.0")
      expect(archived).toBe(false)
    })
  })

  describe("listVersions", () => {
    it("should return all versions", async () => {
      const manifest: SiteVersionsManifest = {
        latest: "2.0",
        versions: [
          {
            id: "1.0",
            label: "v1.0",
            status: "archived",
            releaseDate: "2023-06-01",
            description: "Old version",
          },
          {
            id: "2.0",
            label: "v2.0",
            status: "latest",
            releaseDate: "2024-01-15",
            description: "Latest version",
          },
        ],
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => manifest,
      } as Response)

      const versions = await listVersions()
      expect(versions).toHaveLength(2)
      expect(versions[0]?.id).toBe("1.0")
      expect(versions[1]?.id).toBe("2.0")
    })
  })

  describe("resolveTargetPath", () => {
    it("should preserve slug if available in target version", async () => {
      const versionsManifest: SiteVersionsManifest = {
        latest: "2.0",
        versions: [
          {
            id: "1.0",
            label: "v1.0",
            status: "archived",
            releaseDate: "2023-06-01",
            description: "Old version",
          },
          {
            id: "2.0",
            label: "v2.0",
            status: "latest",
            releaseDate: "2024-01-15",
            description: "Latest version",
          },
        ],
      }

      const routesManifest: SiteRoutesManifest = {
        routes: [
          {
            id: "about",
            slug: "about",
            title: "À propos",
            canonicalPath: "/about",
            availableInVersions: ["1.0", "2.0"],
          },
        ],
      }

      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => versionsManifest,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => routesManifest,
        } as Response)

      const resolved = await resolveTargetPath({
        fromVersion: "2.0",
        toVersion: "1.0",
        pathname: "/v/2.0/about",
      })

      expect(resolved.path).toBe("/v/1.0/about")
      expect(resolved.fallbackReason).toBeUndefined()
    })

    it("should fallback to home if page not available in target version", async () => {
      const versionsManifest: SiteVersionsManifest = {
        latest: "2.0",
        versions: [
          {
            id: "1.0",
            label: "v1.0",
            status: "archived",
            releaseDate: "2023-06-01",
            description: "Old version",
          },
          {
            id: "2.0",
            label: "v2.0",
            status: "latest",
            releaseDate: "2024-01-15",
            description: "Latest version",
          },
        ],
      }

      const routesManifest: SiteRoutesManifest = {
        routes: [
          {
            id: "legal",
            slug: "legal/mentions-legales",
            title: "Mentions légales",
            canonicalPath: "/legal/mentions-legales",
            availableInVersions: ["2.0"], // Not in 1.0
          },
        ],
      }

      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => versionsManifest,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => routesManifest,
        } as Response)

      const resolved = await resolveTargetPath({
        fromVersion: "2.0",
        toVersion: "1.0",
        pathname: "/v/2.0/legal/mentions-legales",
      })

      expect(resolved.path).toBe("/v/1.0/home")
      expect(resolved.fallbackReason).toBe("page_not_available")
    })

    it("should fallback to latest home if target version not found", async () => {
      const versionsManifest: SiteVersionsManifest = {
        latest: "2.0",
        versions: [
          {
            id: "2.0",
            label: "v2.0",
            status: "latest",
            releaseDate: "2024-01-15",
            description: "Latest version",
          },
        ],
      }

      const routesManifest: SiteRoutesManifest = {
        routes: [],
      }

      // resolveTargetPath now loads manifests in parallel, so we need to mock both
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => versionsManifest,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => routesManifest,
        } as Response)
        // getLatestVersion is called when version not found
        .mockResolvedValueOnce({
          ok: true,
          json: async () => versionsManifest,
        } as Response)

      const resolved = await resolveTargetPath({
        fromVersion: "2.0",
        toVersion: "3.0", // Non-existent
        pathname: "/v/2.0/about",
      })

      expect(resolved.path).toBe("/v/2.0/home")
      expect(resolved.fallbackReason).toBe("version_not_found")
    })
  })
})
