/**
 * Integration tests for Wouter routes
 *
 * Simplified tests - basic smoke tests to ensure components can be imported and rendered
 * More comprehensive tests will be added later
 */

import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Router } from "wouter"
import { memoryLocation } from "wouter/memory-location"

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

describe("Route Integration Tests - Simplified", () => {
  describe("Component Imports", () => {
    it("should export all page components", () => {
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

  describe("Component Rendering", () => {
    it("should render NotFound component", () => {
      const { hook } = memoryLocation({ path: "/test" })
      const { container } = render(
        <Router hook={hook}>
          <NotFound />
        </Router>
      )
      expect(container).toBeTruthy()
    })

    it("should render Home component", () => {
      const { hook } = memoryLocation({ path: "/" })
      const { container } = render(
        <Router hook={hook}>
          <Home />
        </Router>
      )
      expect(container).toBeTruthy()
    })

    it("should render About component", () => {
      const { hook } = memoryLocation({ path: "/about" })
      const { container } = render(
        <Router hook={hook}>
          <About />
        </Router>
      )
      expect(container).toBeTruthy()
    })

    it("should render Contact component", () => {
      const { hook } = memoryLocation({ path: "/contact" })
      const { container } = render(
        <Router hook={hook}>
          <Contact />
        </Router>
      )
      expect(container).toBeTruthy()
    })

    it("should render TermsOfUse component", () => {
      const { hook } = memoryLocation({ path: "/legal/terms-of-use" })
      const { container } = render(
        <Router hook={hook}>
          <TermsOfUse />
        </Router>
      )
      expect(container).toBeTruthy()
    })

    it("should render Accessibility component", () => {
      const { hook } = memoryLocation({ path: "/legal/accessibility" })
      const { container } = render(
        <Router hook={hook}>
          <Accessibility />
        </Router>
      )
      expect(container).toBeTruthy()
    })

    it("should render Explanatory component", () => {
      const { hook } = memoryLocation({ path: "/explanatory" })
      const { container } = render(
        <Router hook={hook}>
          <Explanatory />
        </Router>
      )
      expect(container).toBeTruthy()
    })
  })
})
