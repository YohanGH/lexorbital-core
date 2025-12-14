/**
 * Test setup file
 *
 * Configures the testing environment with necessary mocks and globals.
 * This file is executed before each test file.
 */

import { expect, afterEach, vi } from "vitest"
import { cleanup } from "@testing-library/react"
import * as matchers from "@testing-library/jest-dom/matchers"

// Initialize i18next for tests to avoid warnings
import "@/core/i18n"

// Extend Vitest's expect with jest-dom matchers
// This adds matchers like toBeInTheDocument(), toHaveAttribute(), etc.
expect.extend(matchers)

// Mock fetch globally for tests
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => ({
      status: "ok",
      service: "test",
    }),
  } as Response)
)

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// Mock window.matchMedia (used by some UI libraries)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// Mock IntersectionObserver (used by some UI libraries)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver

// Mock window.scrollTo (used by scroll restoration)
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
})
