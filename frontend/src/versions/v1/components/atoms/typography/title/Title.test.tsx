import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { Title } from "./Title"

describe("Title", () => {
  it("renders correctly with required props", () => {
    render(<Title level={1}>Test Title</Title>)
    expect(screen.getByText("Test Title")).toBeInTheDocument()
  })

  it("renders correct heading level", () => {
    const { container } = render(<Title level={2}>H2 Title</Title>)
    const heading = container.querySelector("h2")
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent("H2 Title")
  })

  it("applies custom className", () => {
    const { container } = render(
      <Title level={1} className="custom-class">
        Title
      </Title>
    )
    const heading = container.querySelector("h1")
    expect(heading).toHaveClass("custom-class")
  })
})
