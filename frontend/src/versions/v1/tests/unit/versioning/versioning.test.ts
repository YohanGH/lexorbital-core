/**
 * Unit tests for versioning utilities
 *
 * Updated to use the new version-manager system
 */

import { describe, it, expect } from "vitest"

import {
  getLatestVersion,
  listVersions,
  resolveTargetPath,
  extractVersionFromPath,
} from "@/version-manager"

describe("versioning utilities", () => {
  describe("extractVersionFromPath", () => {
    it("should extract version from compact format path", () => {
      expect(extractVersionFromPath("/v1/about")).toBe("v1")
      expect(extractVersionFromPath("/v1/")).toBe("v1")
      expect(extractVersionFromPath("/v1_1/about")).toBe("v1_1")
      expect(extractVersionFromPath("/v1")).toBe("v1")
    })

    it("should extract version from expanded format path", () => {
      expect(extractVersionFromPath("/v/1/about")).toBe("v1")
      expect(extractVersionFromPath("/v/1/")).toBe("v1")
      expect(extractVersionFromPath("/v/1_1/about")).toBe("v1_1")
      expect(extractVersionFromPath("/v/1")).toBe("v1")
    })

    it("should return null for non-versioned path", () => {
      expect(extractVersionFromPath("/about")).toBeNull()
      expect(extractVersionFromPath("/")).toBeNull()
      expect(extractVersionFromPath("/contact")).toBeNull()
    })
  })

  describe("getLatestVersion", () => {
    it("should return latest version from manifest", () => {
      const latest = getLatestVersion()
      expect(latest).toBe("v1") // From manifest.json
    })
  })

  describe("listVersions", () => {
    it("should return all versions from manifest", () => {
      const versions = listVersions()
      expect(versions.length).toBeGreaterThan(0)
      expect(versions[0]?.id).toBe("v1")
    })
  })

  describe("resolveTargetPath", () => {
    it("should resolve path when switching versions (compact format)", () => {
      const resolved = resolveTargetPath({
        fromVersion: "v1",
        toVersion: "v2",
        pathname: "/v1/about",
      })
      expect(resolved.path).toBe("/v2/about")
    })

    it("should resolve path when switching versions (expanded format)", () => {
      const resolved = resolveTargetPath({
        fromVersion: "v1",
        toVersion: "v2",
        pathname: "/v/1/about",
      })
      expect(resolved.path).toBe("/v2/about")
    })

    it("should handle version root path (compact format)", () => {
      const resolved = resolveTargetPath({
        fromVersion: "v1",
        toVersion: "v2",
        pathname: "/v1",
      })
      expect(resolved.path).toBe("/v2/")
    })

    it("should handle version root path (expanded format)", () => {
      const resolved = resolveTargetPath({
        fromVersion: "v1",
        toVersion: "v2",
        pathname: "/v/1",
      })
      expect(resolved.path).toBe("/v2/")
    })
  })
})
