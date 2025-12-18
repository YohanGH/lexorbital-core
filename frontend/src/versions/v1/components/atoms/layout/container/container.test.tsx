import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { Container } from "./Container"

describe("Container", () => {
  it("renders correctly with children", () => {
    render(<Container>Test content</Container>)
    expect(screen.getByText("Test content")).toBeInTheDocument()
  })

  it("applies size prop", () => {
    const { container } = render(<Container size="sm">Content</Container>)
    const div = container.querySelector(".container")
    expect(div).toHaveClass("max-w-3xl")
  })

  it("applies custom className", () => {
    const { container } = render(
      <Container className="custom-class">Content</Container>
    )
    const div = container.querySelector(".container")
    expect(div).toHaveClass("custom-class")
  })
})
