import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import { Header } from "./Header"

// Mock wouter
vi.mock("wouter", () => ({
  useRoute: () => [false],
}))

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

// Mock LanguageSelector
vi.mock("@/versions/v1/components/molecules/LanguageSelector", () => ({
  LanguageSelector: () => <div data-testid="language-selector">Language</div>,
}))

describe("Header", () => {
  it("renders correctly", () => {
    const mockNavigate = vi.fn()
    render(<Header onNavigate={mockNavigate} />)
    expect(screen.getByRole("banner")).toBeInTheDocument()
  })

  it("calls onNavigate when logo is clicked", () => {
    const mockNavigate = vi.fn()
    render(<Header onNavigate={mockNavigate} />)
    const logo = screen.getByLabelText("header.logoAlt")
    logo.click()
    expect(mockNavigate).toHaveBeenCalledWith("/")
  })

  it("renders navigation items", () => {
    const mockNavigate = vi.fn()
    render(<Header onNavigate={mockNavigate} />)
    expect(screen.getByLabelText("Main navigation")).toBeInTheDocument()
  })
})
