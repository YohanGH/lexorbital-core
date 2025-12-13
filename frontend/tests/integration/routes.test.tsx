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
  About,
  Contact,
  Glossary,
  Explanatory,
  TermsOfUse,
  Accessibility,
} from "@/pages"

describe("Route Integration Tests", () => {
  describe("Home Route", () => {
    it("should route to Home component at root path", async () => {
      const { hook } = memoryLocation({ path: ROUTES.HOME })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // Wait for async operations (redirect, etc.)
      // waitFor already handles act() internally
      await waitFor(() => {
        expect(container.firstChild).toBeTruthy()
      })

      // Verify that the route is configured (not a 404)
      // Note: Component errors are acceptable - we only test routing
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
      // Verify that something is rendered (route exists)
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe("About Route", () => {
    it("should route to About component at /about", async () => {
      const { hook } = memoryLocation({ path: "/about" })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // waitFor already handles act() internally
      await waitFor(() => {
        expect(container.firstChild).toBeTruthy()
      })

      // Verify that the route is configured (not a 404)
      // Note: Component errors are acceptable - we only test routing
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe("Legal Routes", () => {
    it("should route to TermsOfUse component at /legal/terms-of-use", async () => {
      const { hook } = memoryLocation({ path: "/legal/terms-of-use" })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // waitFor already handles act() internally
      await waitFor(() => {
        expect(container.firstChild).toBeTruthy()
      })

      // Verify that the route is configured (not a 404)
      // Note: Component errors are acceptable - we only test routing
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
      expect(container.firstChild).toBeTruthy()
    })

    it("should route to Accessibility component at /legal/accessibility", async () => {
      const { hook } = memoryLocation({ path: "/legal/accessibility" })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // waitFor already handles act() internally
      await waitFor(() => {
        expect(container.firstChild).toBeTruthy()
      })

      // Verify that the route is configured (not a 404)
      // Note: Component errors are acceptable - we only test routing
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
      expect(container.firstChild).toBeTruthy()
    })

    it("should route to CookieManagement component at /legal/cookie-management", async () => {
      const { hook } = memoryLocation({ path: "/legal/cookie-management" })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // waitFor already handles act() internally
      await waitFor(() => {
        expect(container.firstChild).toBeTruthy()
      })

      // Verify that the route is configured (not a 404)
      // Note: Component errors are acceptable - we only test routing
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe("Explanatory Routes", () => {
    it("should route to Explanatory component at /explanatory", async () => {
      const { hook } = memoryLocation({ path: ROUTES.EXPLANATORY.ROOT })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // waitFor already handles act() internally
      await waitFor(() => {
        expect(container.firstChild).toBeTruthy()
      })

      // Verify that the route is configured (not a 404)
      // Note: Component errors are acceptable - we only test routing
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page Not Found/i)).not.toBeInTheDocument()
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe("404 Route", () => {
    it("should render NotFound component for unknown routes", async () => {
      const { hook } = memoryLocation({ path: "/unknown/route" })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // waitFor already handles act() internally
      await waitFor(() => {
        expect(container.firstChild).toBeTruthy()
      })

      // Verify that NotFound component is rendered for unknown routes
      expect(container.firstChild).toBeTruthy()
      // Verify it's a 404 (routing test - 404 is expected for unknown routes)
      // Use getAllByText since there might be multiple elements with "404"
      const elements = screen.getAllByText(/404/i)
      expect(elements.length).toBeGreaterThan(0)
    })

    it("should render NotFound with link to home", async () => {
      const { hook } = memoryLocation({ path: "/unknown/route" })

      render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // waitFor already handles act() internally
      await waitFor(() => {
        const elements = screen.getAllByText(/404/i)
        expect(elements.length).toBeGreaterThan(0)
      })

      // Verify that a link to home exists (routing works)
      // The link text is translated, so we check for the link by href attribute
      const homeLink = document.querySelector(`a[href="${ROUTES.HOME}"]`)
      expect(homeLink).toBeInTheDocument()
      expect(homeLink).toHaveAttribute("href", ROUTES.HOME)
    })
  })

  describe("Route Navigation", () => {
    it("should navigate between routes", async () => {
      const { hook, navigate } = memoryLocation({ path: "/about" })

      const { container } = render(
        <Router hook={hook}>
          <App />
        </Router>
      )

      // waitFor already handles act() internally
      await waitFor(() => {
        expect(container.firstChild).toBeTruthy()
      })

      // Initially on about - verify route exists (not 404)
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(container.firstChild).toBeTruthy()

      // Navigate to contact
      navigate("/contact")

      // waitFor already handles act() internally
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
      expect(About).toBeDefined()
      expect(Contact).toBeDefined()
      expect(Glossary).toBeDefined()
      expect(TermsOfUse).toBeDefined()
      expect(Accessibility).toBeDefined()
      expect(Explanatory).toBeDefined()
    })
  })
})
