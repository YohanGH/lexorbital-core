import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { Quote } from "./Quote"

describe("Quote", () => {
  it("renders correctly with children", () => {
    render(<Quote>Test quote content</Quote>)
    expect(screen.getByText("Test quote content")).toBeInTheDocument()
  })

  it("applies variant prop", () => {
    const { container } = render(
      <Quote variant="highlight">Highlighted quote</Quote>
    )
    const quote = container.querySelector("q")
    expect(quote).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <Quote className="custom-class">Content</Quote>
    )
    const quote = container.querySelector("q")
    expect(quote).toHaveClass("custom-class")
  })
})
