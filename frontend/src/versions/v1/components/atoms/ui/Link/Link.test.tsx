import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { Link } from "./Link"

describe("Link", () => {
  it("renders correctly with children", () => {
    render(<Link href="/test">Test link</Link>)
    expect(screen.getByText("Test link")).toBeInTheDocument()
  })

  it("applies variant prop", () => {
    const { container } = render(
      <Link href="/test" variant="primary">
        Primary link
      </Link>
    )
    const link = container.querySelector("a")
    expect(link).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <Link href="/test" className="custom-class">
        Link
      </Link>
    )
    const link = container.querySelector("a")
    expect(link).toHaveClass("custom-class")
  })
})
