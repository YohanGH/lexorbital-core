import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { Paragraph } from "./Paragraph"

describe("Paragraph", () => {
  it("renders correctly with children", () => {
    render(<Paragraph>Test paragraph content</Paragraph>)
    expect(screen.getByText("Test paragraph content")).toBeInTheDocument()
  })

  it("applies size prop", () => {
    const { container } = render(
      <Paragraph size="sm">Small paragraph</Paragraph>
    )
    const paragraph = container.querySelector("p")
    expect(paragraph).toHaveClass("text-sm")
  })

  it("applies custom className", () => {
    const { container } = render(
      <Paragraph className="custom-class">Content</Paragraph>
    )
    const paragraph = container.querySelector("p")
    expect(paragraph).toHaveClass("custom-class")
  })
})
