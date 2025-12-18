import type { Meta, StoryObj } from "@storybook/react"

import { Header } from "./Header"

const meta: Meta<typeof Header> = {
  title: "Organisms/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onNavigate: (page: string) => {
      console.log("Navigate to:", page)
    },
  },
}
