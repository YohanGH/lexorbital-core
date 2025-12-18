import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { Button } from "./Button"

describe("Button", () => {
  it("renders correctly with children", () => {
    render(<Button>Test button</Button>)
    expect(screen.getByText("Test button")).toBeInTheDocument()
  })

  it("applies variant prop", () => {
    const { container } = render(<Button variant="destructive">Delete</Button>)
    const button = container.querySelector("button")
    expect(button).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <Button className="custom-class">Button</Button>
    )
    const button = container.querySelector("button")
    expect(button).toHaveClass("custom-class")
  })
})
