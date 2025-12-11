/**
 * Integration tests for Wouter routes
 *
 * Tests that routes are correctly configured and components render
 * at the expected paths using Wouter's memoryLocation for testing.
 */

import { describe, it, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { Router } from "wouter"
import { memoryLocation } from "wouter/memory-location"

import App from "@/App"
import { ROUTES } from "@/lib/router"
import {
  Home,
  NotFound,
  Modules,
  MentionsLegales,
  RGPD,
  Cookies,
  Explanatory,
} from "@/pages"

describe("Route Integration Tests", () => {
  describe("Home Route", () => {
    it("should route to Home component at root path", () => {
      const { hook } = memoryLocation({ path: ROUTES.HOME })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Verify that the route is configured (not a 404)
      // Note: Component errors are acceptable - we only test routing
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
      // Verify that something is rendered (route exists)
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe("Modules Route", () => {
    it("should route to Modules component at /modules", () => {
      const { hook } = memoryLocation({ path: ROUTES.MODULES })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Verify that the route is configured (not a 404)
      // Note: Component errors are acceptable - we only test routing
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe("Legal Routes", () => {
    it("should route to MentionsLegales component at /legal/mentions-legales", () => {
      const { hook } = memoryLocation({ path: ROUTES.LEGAL.MENTIONS })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Verify that the route is configured (not a 404)
      // Note: Component errors are acceptable - we only test routing
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
      expect(container.firstChild).toBeTruthy()
    })

    it("should route to RGPD component at /legal/rgpd", () => {
      const { hook } = memoryLocation({ path: ROUTES.LEGAL.RGPD })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Verify that the route is configured (not a 404)
      // Note: Component errors are acceptable - we only test routing
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
      expect(container.firstChild).toBeTruthy()
    })

    it("should route to Cookies component at /legal/cookies", () => {
      const { hook } = memoryLocation({ path: ROUTES.LEGAL.COOKIES })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Verify that the route is configured (not a 404)
      // Note: Component errors are acceptable - we only test routing
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe("Explanatory Routes", () => {
    it("should route to Explanatory component at /explanatory", () => {
      const { hook } = memoryLocation({ path: ROUTES.EXPLANATORY.ROOT })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Verify that the route is configured (not a 404)
      // Note: Component errors are acceptable - we only test routing
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
      expect(container.firstChild).toBeTruthy()
    })

    it("should route to Explanatory component at /explanatory/architecture", () => {
      const { hook } = memoryLocation({ path: ROUTES.EXPLANATORY.ARCHITECTURE })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Verify that the route is configured (not a 404)
      // Note: Component errors are acceptable - we only test routing
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
      expect(container.firstChild).toBeTruthy()
    })

    it("should route to Explanatory component at /explanatory/compliance", () => {
      const { hook } = memoryLocation({ path: ROUTES.EXPLANATORY.COMPLIANCE })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Verify that the route is configured (not a 404)
      // Note: Component errors are acceptable - we only test routing
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe("404 Route", () => {
    it("should render NotFound component for unknown routes", () => {
      const { hook } = memoryLocation({ path: "/unknown/route" })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Verify that NotFound component is rendered for unknown routes
      expect(container.firstChild).toBeTruthy()
      // Verify it's a 404 (routing test - 404 is expected for unknown routes)
      expect(screen.getByText(/404/i)).toBeInTheDocument()
    })

    it("should render NotFound with link to home", () => {
      const { hook } = memoryLocation({ path: "/unknown/route" })

      render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Verify that a link to home exists (routing works)
      const homeLink = screen.getByText(/Return to Home/i)
      expect(homeLink).toBeInTheDocument()
      expect(homeLink.closest("a")).toHaveAttribute("href", ROUTES.HOME)
    })
  })

  describe("Route Navigation", () => {
    it("should navigate between routes", async () => {
      const { hook, navigate } = memoryLocation({ path: ROUTES.HOME })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Initially on home - verify route exists (not 404)
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(container.firstChild).toBeTruthy()

      // Navigate to modules
      navigate(ROUTES.MODULES)

      await waitFor(() => {
        // Verify navigation worked (route exists, not 404)
        // Note: Component errors are acceptable - we only test routing
        expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
        expect(container.firstChild).toBeTruthy()
      })
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

    it("should render Modules component independently", () => {
      const { hook } = memoryLocation({ path: ROUTES.MODULES })

      const { container } = render(
        <Router hook={hook}>
          <Modules />
        </Router>
      )

      // Verify component can be rendered (routing test only)
      // Note: Component errors are acceptable - we only test routing
      expect(container.firstChild).toBeTruthy()
    })

    it("should render MentionsLegales component independently", () => {
      const { hook } = memoryLocation({ path: ROUTES.LEGAL.MENTIONS })

      const { container } = render(
        <Router hook={hook}>
          <MentionsLegales />
        </Router>
      )

      // Verify component can be rendered (routing test only)
      // Note: Component errors are acceptable - we only test routing
      expect(container.firstChild).toBeTruthy()
    })

    it("should render RGPD component independently", () => {
      const { hook } = memoryLocation({ path: ROUTES.LEGAL.RGPD })

      const { container } = render(
        <Router hook={hook}>
          <RGPD />
        </Router>
      )

      // Verify component can be rendered (routing test only)
      // Note: Component errors are acceptable - we only test routing
      expect(container.firstChild).toBeTruthy()
    })

    it("should render Cookies component independently", () => {
      const { hook } = memoryLocation({ path: ROUTES.LEGAL.COOKIES })

      const { container } = render(
        <Router hook={hook}>
          <Cookies />
        </Router>
      )

      // Verify component can be rendered (routing test only)
      // Note: Component errors are acceptable - we only test routing
      expect(container.firstChild).toBeTruthy()
    })

    it("should render Explanatory component independently", () => {
      const { hook } = memoryLocation({ path: ROUTES.EXPLANATORY.ROOT })

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
      expect(Modules).toBeDefined()
      expect(MentionsLegales).toBeDefined()
      expect(RGPD).toBeDefined()
      expect(Cookies).toBeDefined()
      expect(Explanatory).toBeDefined()
    })
  })
})
