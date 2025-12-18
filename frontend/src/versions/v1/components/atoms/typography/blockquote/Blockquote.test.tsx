import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { Blockquote } from "./Blockquote"

describe("Blockquote", () => {
  it("renders correctly with children", () => {
    render(<Blockquote>Test blockquote content</Blockquote>)
    expect(screen.getByText("Test blockquote content")).toBeInTheDocument()
  })

  it("renders with cite", () => {
    render(<Blockquote cite="Author Name">Quote content</Blockquote>)
    expect(screen.getByText("Author Name")).toBeInTheDocument()
  })

  it("applies side prop", () => {
    const { container } = render(<Blockquote side="right">Content</Blockquote>)
    const blockquote = container.querySelector("blockquote")
    expect(blockquote).toHaveClass("border-r-4")
  })
})
