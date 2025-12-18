import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import { Footer } from "./Footer"

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe("Footer", () => {
  it("renders correctly", () => {
    const mockNavigate = vi.fn()
    render(<Footer onNavigate={mockNavigate} />)
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
  })

  it("renders legal navigation", () => {
    const mockNavigate = vi.fn()
    render(<Footer onNavigate={mockNavigate} />)
    expect(screen.getByLabelText("Legal navigation")).toBeInTheDocument()
  })

  it("renders utility navigation", () => {
    const mockNavigate = vi.fn()
    render(<Footer onNavigate={mockNavigate} />)
    expect(screen.getByLabelText("Utility navigation")).toBeInTheDocument()
  })
})
