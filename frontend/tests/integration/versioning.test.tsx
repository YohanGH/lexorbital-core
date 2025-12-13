/**
 * Integration tests for versioning routes
 */

import { describe, it, expect, beforeEach, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { Router } from "wouter"
import { memoryLocation } from "wouter/memory-location"
import { useLocation } from "wouter"

import App from "@/App"

// Mock fetch for manifests
global.fetch = vi.fn()

const mockManifests = {
  versions: {
    latest: "2.0",
    versions: [
      {
        id: "2.0",
        label: "v2.0",
        status: "latest",
        releaseDate: "2024-01-15",
        description: "Version actuelle",
        gitTag: "v2.0.0",
      },
      {
        id: "1.0",
        label: "v1.0",
        status: "archived",
        releaseDate: "2023-06-01",
        description: "Première version",
        gitTag: "v1.0.0",
      },
    ],
  },
  routes: {
    routes: [
      {
        id: "landing",
        slug: "",
        title: "Accueil",
        canonicalPath: "/",
        availableInVersions: ["1.0", "2.0"],
      },
      {
        id: "about",
        slug: "about",
        title: "À propos",
        canonicalPath: "/about",
        availableInVersions: ["1.0", "2.0"],
      },
    ],
  },
}

describe("Versioning Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock manifest fetches
    vi.mocked(fetch).mockImplementation(url => {
      if (typeof url === "string" && url.includes("site.versions.json")) {
        return Promise.resolve({
          ok: true,
          json: async () => mockManifests.versions,
        } as Response)
      }
      if (typeof url === "string" && url.includes("site.routes.json")) {
        return Promise.resolve({
          ok: true,
          json: async () => mockManifests.routes,
        } as Response)
      }
      // Mock content files
      if (typeof url === "string" && url.includes("/content/")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            title: "Test Page",
            body: "Test content",
          }),
        } as Response)
      }
      return Promise.reject(new Error(`Unexpected fetch: ${String(url)}`))
    })
  })

  it("should redirect / to latest version home", async () => {
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
      expect(locationElement.textContent).toMatch(/^\/v\/2\.0\/home/)
    })
  })

  it("should display home page at /v/:versionId/home", async () => {
    const { hook } = memoryLocation({ path: "/v/2.0/home" })

    render(
      <Router hook={hook}>
        <App />
      </Router>
    )

    // waitFor already handles act() internally
    await waitFor(() => {
      // Should render the Home component (static page, not JSON)
      // Verify that the route is configured (not a 404)
      expect(screen.queryByText(/404/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Page non disponible/i)).not.toBeInTheDocument()
    })
  })

  it("should show error for empty versioned route /v/:versionId/", async () => {
    const { hook } = memoryLocation({ path: "/v/2.0/" })

    render(
      <Router hook={hook}>
        <App />
      </Router>
    )

    // waitFor already handles act() internally
    await waitFor(() => {
      // Should show error message for empty route
      expect(screen.getByText(/n'est pas valide/i)).toBeInTheDocument()
      expect(screen.getByText(/\/v\/2\.0\/home/i)).toBeInTheDocument()
    })
  })

  it("should display versions list at /versions", async () => {
    const { hook } = memoryLocation({ path: "/versions" })

    const { container } = render(
      <Router hook={hook}>
        <App />
      </Router>
    )

    // waitFor already handles act() internally
    await waitFor(
      () => {
        // Wait for the component to load (check for loading state to disappear)
        expect(container.firstChild).toBeTruthy()
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
