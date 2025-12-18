import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { List } from "./List"

describe("List", () => {
  it("renders unordered list correctly", () => {
    render(
      <List>
        <List.Item>Item 1</List.Item>
        <List.Item>Item 2</List.Item>
      </List>
    )

    expect(screen.getByText("Item 1")).toBeInTheDocument()
    expect(screen.getByText("Item 2")).toBeInTheDocument()
  })

  it("renders ordered list correctly", () => {
    render(
      <List type="ordered">
        <List.Item>First</List.Item>
        <List.Item>Second</List.Item>
      </List>
    )

    const list = screen.getByRole("list")
    expect(list.tagName).toBe("OL")
    expect(list).toBeInTheDocument()
  })

  it("renders description list correctly", () => {
    render(
      <List type="description">
        <List.Item value="Name" description="John Doe">
          Name
        </List.Item>
      </List>
    )

    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("John Doe")).toBeInTheDocument()
  })

  it("handles interactive items", async () => {
    const handleClick = vi.fn()

    render(
      <List>
        <List.Item interactive onClick={handleClick}>
          Click me
        </List.Item>
      </List>
    )

    const item = screen.getByText("Click me")
    await userEvent.click(item)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("supports ARIA labels", () => {
    render(
      <List ariaLabel="Liste de navigation">
        <List.Item>Home</List.Item>
        <List.Item>About</List.Item>
      </List>
    )

    const list = screen.getByRole("list")
    expect(list).toHaveAttribute("aria-label", "Liste de navigation")
  })
})
