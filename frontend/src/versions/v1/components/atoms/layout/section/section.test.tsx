import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { Section } from "./Section"

describe("Section", () => {
  it("renders correctly with children", () => {
    render(<Section id="test-section">Test content</Section>)
    expect(screen.getByText("Test content")).toBeInTheDocument()
  })

  it("renders with title", () => {
    render(
      <Section id="test-section" title="Test Title">
        Content
      </Section>
    )
    expect(screen.getByText("Test Title")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <Section id="test-section" className="custom-class">
        Content
      </Section>
    )
    const section = container.querySelector("section")
    expect(section).toHaveClass("custom-class")
  })
})
