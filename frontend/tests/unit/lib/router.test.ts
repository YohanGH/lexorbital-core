/**
 * Unit tests for router library
 *
 * Tests the router helpers: navigateTo, matchesRoute, extractParams
 * and route constants.
 */

import { describe, it, expect, vi } from "vitest"

import {
  ROUTES,
  navigateTo,
  matchesRoute,
  extractParams,
  type NavigateOptions,
} from "@/lib/router"

describe("ROUTES", () => {
  it("should define all route constants correctly", () => {
    expect(ROUTES.HOME).toBe("/")
    expect(ROUTES.MODULES).toBe("/modules")
    expect(ROUTES.LEGAL.ROOT).toBe("/legal")
    expect(ROUTES.LEGAL.MENTIONS).toBe("/legal/mentions-legales")
    expect(ROUTES.LEGAL.RGPD).toBe("/legal/rgpd")
    expect(ROUTES.LEGAL.COOKIES).toBe("/legal/cookies")
    expect(ROUTES.EXPLANATORY.ROOT).toBe("/explanatory")
    expect(ROUTES.EXPLANATORY.ARCHITECTURE).toBe("/explanatory/architecture")
    expect(ROUTES.EXPLANATORY.COMPLIANCE).toBe("/explanatory/compliance")
  })

  it("should have consistent route structure", () => {
    // Legal routes should all start with /legal
    expect(ROUTES.LEGAL.MENTIONS.startsWith("/legal")).toBe(true)
    expect(ROUTES.LEGAL.RGPD.startsWith("/legal")).toBe(true)
    expect(ROUTES.LEGAL.COOKIES.startsWith("/legal")).toBe(true)

    // Explanatory routes should all start with /explanatory
    expect(ROUTES.EXPLANATORY.ARCHITECTURE.startsWith("/explanatory")).toBe(
      true
    )
    expect(ROUTES.EXPLANATORY.COMPLIANCE.startsWith("/explanatory")).toBe(true)
  })
})

describe("navigateTo", () => {
  it("should call navigate with string path", () => {
    const navigate = vi.fn()
    navigateTo(navigate, ROUTES.HOME)

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith("/", undefined)
  })

  it("should call navigate with nested route path", () => {
    const navigate = vi.fn()
    navigateTo(navigate, ROUTES.LEGAL.MENTIONS)

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith("/legal/mentions-legales", undefined)
  })

  it("should pass navigation options", () => {
    const navigate = vi.fn()
    const options: NavigateOptions = { replace: true }

    navigateTo(navigate, ROUTES.MODULES, options)

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith("/modules", options)
  })

  it("should handle custom string paths", () => {
    const navigate = vi.fn()
    navigateTo(navigate, "/custom/path")

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith("/custom/path", undefined)
  })
})

describe("matchesRoute", () => {
  it("should match exact paths", () => {
    expect(matchesRoute("/", "/")).toBe(true)
    expect(matchesRoute("/modules", "/modules")).toBe(true)
    expect(matchesRoute("/legal/rgpd", "/legal/rgpd")).toBe(true)
  })

  it("should match paths with sub-routes", () => {
    expect(matchesRoute("/legal/rgpd/details", "/legal/rgpd")).toBe(true)
    expect(matchesRoute("/modules/123", "/modules")).toBe(true)
    expect(
      matchesRoute("/explanatory/architecture/intro", "/explanatory")
    ).toBe(true)
  })

  it("should not match different paths", () => {
    expect(matchesRoute("/modules", "/legal")).toBe(false)
    expect(matchesRoute("/home", "/")).toBe(false)
    expect(matchesRoute("/legal", "/legal/rgpd")).toBe(false)
  })

  it("should handle empty strings", () => {
    expect(matchesRoute("", "")).toBe(true)
    expect(matchesRoute("/", "")).toBe(false)
    expect(matchesRoute("", "/")).toBe(false)
  })
})

describe("extractParams", () => {
  it("should extract single parameter", () => {
    const params = extractParams("/users/:id", "/users/123")
    expect(params).toEqual({ id: "123" })
  })

  it("should extract multiple parameters", () => {
    const params = extractParams(
      "/users/:userId/posts/:postId",
      "/users/123/posts/456"
    )
    expect(params).toEqual({ userId: "123", postId: "456" })
  })

  it("should return null for non-matching paths", () => {
    const params = extractParams("/users/:id", "/posts/123")
    expect(params).toBeNull()
  })

  it("should return null for different segment counts", () => {
    const params = extractParams("/users/:id", "/users/123/details")
    expect(params).toBeNull()
  })

  it("should handle empty parameter values", () => {
    const params = extractParams("/users/:id", "/users/")
    expect(params).toEqual({ id: "" })
  })

  it("should match exact segments", () => {
    const params = extractParams("/legal/:page", "/legal/rgpd")
    expect(params).toEqual({ page: "rgpd" })
  })

  it("should return null if literal segments don't match", () => {
    const params = extractParams("/legal/:page", "/modules/rgpd")
    expect(params).toBeNull()
  })
})
