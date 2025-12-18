import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { Card } from "./Card"

describe("Card", () => {
  it("renders correctly with children", () => {
    render(<Card>Test card content</Card>)
    expect(screen.getByText("Test card content")).toBeInTheDocument()
  })

  it("applies variant prop", () => {
    const { container } = render(<Card variant="outline">Content</Card>)
    const card = container.querySelector(".rounded-lg")
    expect(card).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    const card = container.querySelector(".rounded-lg")
    expect(card).toHaveClass("custom-class")
  })
})
