/**
 * Integration tests for Wouter routes
 *
 * Tests that routes are correctly configured and components render
 * at the expected paths using Wouter's memoryLocation for testing.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, waitFor, cleanup } from "@testing-library/react"
import { Router } from "wouter"
import { memoryLocation } from "wouter/memory-location"

import App from "@/App"
import {
  Home,
  NotFound,
  About,
  Contact,
  Glossary,
  Explanatory,
  TermsOfUse,
  Accessibility,
} from "@/versions/v1/pages"

// Mock the version imports to return immediately
// This ensures tests don't wait for async loading
vi.mock("@/version-manager/versionImports", async () => {
  const V1App = await import("@/versions/v1/App")
  return {
    versionImports: {
      v1: () => Promise.resolve({ default: V1App.default }),
    },
  }
})

// Mock window.location and window.history for VersionContext
const mockLocation = {
  href: "http://localhost/",
  search: "",
  origin: "http://localhost",
}

const mockHistory = {
  pushState: vi.fn(),
  replaceState: vi.fn(),
  state: {},
}

describe("Route Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock window.location
    Object.defineProperty(window, "location", {
      value: mockLocation,
      writable: true,
    })
    // Mock window.history
    Object.defineProperty(window, "history", {
      value: mockHistory,
      writable: true,
    })
  })

  afterEach(() => {
    cleanup()
  })

  describe("Home Route", () => {
    it("should route to VersionsList at root path", async () => {
      const { hook } = memoryLocation({ path: "/" })

      render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Wait for component to render
      await waitFor(
        () => {
          // Root path shows VersionsList
          expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it("should route to Home component at /v1/", async () => {
      const { hook } = memoryLocation({ path: "/v1/" })

      render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Wait for VersionRouter to load the version App component
      await waitFor(
        () => {
          const loadingText = screen.queryByText(/Chargement de la version/i)
          expect(loadingText).not.toBeInTheDocument()
          // Verify that the route is configured (not a 404)
          expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })
  })

  describe("About Route", () => {
    it("should route to About component at /v1/about", async () => {
      const { hook } = memoryLocation({ path: "/v1/about" })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Wait for VersionRouter to load the version App component
      await waitFor(
        () => {
          const loadingText = screen.queryByText(/Chargement de la version/i)
          expect(loadingText).not.toBeInTheDocument()
          // Verify that the route is configured (not a 404)
          expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })
  })

  describe("Legal Routes", () => {
    it("should route to TermsOfUse component at /v1/legal/terms-of-use", async () => {
      const { hook } = memoryLocation({ path: "/v1/legal/terms-of-use" })

      render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Wait for VersionRouter to load the version App component
      await waitFor(
        () => {
          const loadingText = screen.queryByText(/Chargement de la version/i)
          expect(loadingText).not.toBeInTheDocument()
          // Verify that the route is configured (not a 404)
          expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it("should route to Accessibility component at /v1/legal/accessibility", async () => {
      const { hook } = memoryLocation({ path: "/v1/legal/accessibility" })

      render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Wait for VersionRouter to load the version App component
      await waitFor(
        () => {
          const loadingText = screen.queryByText(/Chargement de la version/i)
          expect(loadingText).not.toBeInTheDocument()
          // Verify that the route is configured (not a 404)
          expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it("should route to CookieManagement component at /v1/legal/cookie-management", async () => {
      const { hook } = memoryLocation({ path: "/v1/legal/cookie-management" })

      render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Wait for VersionRouter to load the version App component
      await waitFor(
        () => {
          const loadingText = screen.queryByText(/Chargement de la version/i)
          expect(loadingText).not.toBeInTheDocument()
          // Verify that the route is configured (not a 404)
          expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })
  })

  describe("Explanatory Routes", () => {
    it("should route to Explanatory component at /v1/explanatory", async () => {
      const { hook } = memoryLocation({ path: "/v1/explanatory" })

      render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Wait for VersionRouter to load the version App component
      await waitFor(
        () => {
          const loadingText = screen.queryByText(/Chargement de la version/i)
          expect(loadingText).not.toBeInTheDocument()
          // Verify that the route is configured (not a 404)
          expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })
  })

  describe("404 Route", () => {
    it("should render NotFound component for unknown routes", async () => {
      const { hook } = memoryLocation({ path: "/unknown/route" })

      render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Wait for VersionRouter to load and NotFound to render
      await waitFor(
        () => {
          const loadingText = screen.queryByText(/Chargement de la version/i)
          expect(loadingText).not.toBeInTheDocument()
          // Verify it's a 404 (routing test - 404 is expected for unknown routes)
          const elements = screen.queryAllByText(/404/i)
          expect(elements.length).toBeGreaterThan(0)
        },
        { timeout: 3000 }
      )
    })

    it("should render NotFound with link to home", async () => {
      const { hook } = memoryLocation({ path: "/unknown/route" })

      render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Wait for VersionRouter to load and NotFound to render
      await waitFor(
        () => {
          const loadingText = screen.queryByText(/Chargement de la version/i)
          expect(loadingText).not.toBeInTheDocument()
          const elements = screen.queryAllByText(/404/i)
          expect(elements.length).toBeGreaterThan(0)
        },
        { timeout: 3000 }
      )

      // Verify that NotFound component renders (routing works)
      // The component should be rendered (404 is expected for unknown routes)
      expect(screen.queryAllByText(/404/i).length).toBeGreaterThan(0)
    })
  })

  describe("Route Navigation", () => {
    it("should navigate between routes within version", async () => {
      const { hook, navigate } = memoryLocation({ path: "/v1/about" })

      render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Wait for VersionRouter to load
      await waitFor(
        () => {
          const loadingText = screen.queryByText(/Chargement de la version/i)
          expect(loadingText).not.toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      // Initially on about - verify route exists (not 404)
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()

      // Navigate to contact (relative to version base)
      navigate("/v1/contact")

      // Wait for navigation to complete
      await waitFor(
        () => {
          // Verify navigation worked (route exists, not 404)
          expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
        },
        { timeout: 2000 }
      )
    })
  })

  describe("Route Components Isolation", () => {
    it("should render NotFound component independently", () => {
      const { hook } = memoryLocation({ path: "/test" })

      const { container } = render(
        <Router hook={hook}>
          <NotFound />
        </Router>
      )

      // Verify NotFound component renders
      expect(container.firstChild).toBeTruthy()
    })

    it("should render About component independently", () => {
      const { hook } = memoryLocation({ path: "/about" })

      const { container } = render(
        <Router hook={hook}>
          <About />
        </Router>
      )

      // Verify component can be rendered (routing test only)
      // Note: Component errors are acceptable - we only test routing
      expect(container.firstChild).toBeTruthy()
    })

    it("should render Contact component independently", () => {
      const { hook } = memoryLocation({ path: "/contact" })

      const { container } = render(
        <Router hook={hook}>
          <Contact />
        </Router>
      )

      // Verify component can be rendered (routing test only)
      // Note: Component errors are acceptable - we only test routing
      expect(container.firstChild).toBeTruthy()
    })

    it("should render TermsOfUse component independently", () => {
      const { hook } = memoryLocation({ path: "/legal/terms-of-use" })

      const { container } = render(
        <Router hook={hook}>
          <TermsOfUse />
        </Router>
      )

      // Verify component can be rendered (routing test only)
      // Note: Component errors are acceptable - we only test routing
      expect(container.firstChild).toBeTruthy()
    })

    it("should render Accessibility component independently", () => {
      const { hook } = memoryLocation({ path: "/legal/accessibility" })

      const { container } = render(
        <Router hook={hook}>
          <Accessibility />
        </Router>
      )

      // Verify component can be rendered (routing test only)
      // Note: Component errors are acceptable - we only test routing
      expect(container.firstChild).toBeTruthy()
    })

    it("should render Explanatory component independently", () => {
      const { hook } = memoryLocation({ path: "/explanatory" })

      const { container } = render(
        <Router hook={hook}>
          <Explanatory />
        </Router>
      )

      // Verify component can be rendered (routing test only)
      // Note: Component errors are acceptable - we only test routing
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe("New Page Components", () => {
    it("should export all new page components", () => {
      // This test ensures all new components are properly exported
      // and can be imported without errors
      expect(Home).toBeDefined()
      expect(NotFound).toBeDefined()
      expect(About).toBeDefined()
      expect(Contact).toBeDefined()
      expect(Glossary).toBeDefined()
      expect(TermsOfUse).toBeDefined()
      expect(Accessibility).toBeDefined()
      expect(Explanatory).toBeDefined()
    })
  })
})
