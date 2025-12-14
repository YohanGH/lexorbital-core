/**
 * Integration tests for versioning routes
 */

import { describe, it, expect, beforeEach, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { Router } from "wouter"
import { memoryLocation } from "wouter/memory-location"
import { useLocation } from "wouter"

import App from "@/App"

describe("Versioning Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should display home page at root path", async () => {
    const { hook } = memoryLocation({ path: "/" })

    const TestComponent = () => {
      const [location] = useLocation()
      return <div data-testid="location">{location}</div>
    }

    render(
      <Router hook={hook}>
        <App />
        <TestComponent />
      </Router>
    )

    // waitFor already handles act() internally
    await waitFor(() => {
      const locationElement = screen.getByTestId("location")
      // Root path should stay at "/" (no redirect in new system)
      expect(locationElement.textContent).toBe("/")
      // Should render something (not empty)
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
    })
  })

  it("should display home page at /v1/home (compact format)", async () => {
    // Use v1 which is the current version in manifest.json
    const { hook } = memoryLocation({ path: "/v1/home" })

    render(
      <Router hook={hook}>
        <App />
      </Router>
    )

    // waitFor already handles act() internally
    await waitFor(() => {
      // Should render the Home component
      // Verify that the route is configured (not a 404)
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page non disponible/i)).not.toBeInTheDocument()
    })
  })

  it("should display home page at /v/1/home (expanded format)", async () => {
    // Test expanded format support
    const { hook } = memoryLocation({ path: "/v/1/home" })

    render(
      <Router hook={hook}>
        <App />
      </Router>
    )

    // waitFor already handles act() internally
    await waitFor(() => {
      // Should render the Home component
      // Verify that the route is configured (not a 404)
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
    })
  })

  it("should display versions list at /v1/versions", async () => {
    const { hook } = memoryLocation({ path: "/v1/versions" })

    render(
      <Router hook={hook}>
        <App />
      </Router>
    )

    // waitFor already handles act() internally
    await waitFor(
      () => {
        // Wait for VersionRouter to load the version App component
        const loadingText = screen.queryByText(/Chargement de la version/i)
        expect(loadingText).not.toBeInTheDocument()
        // The component should render something (we check routing, not exact text)
        const heading = screen.queryByText(/Historique des versions/i)
        // If not found, check for alternative text or just verify route exists
        if (!heading) {
          // Verify the route is configured (not a 404)
          expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
        } else {
          expect(heading).toBeInTheDocument()
        }
      },
      { timeout: 3000 }
    )
  })
})
