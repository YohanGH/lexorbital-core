import type { Meta, StoryObj } from "@storybook/react"

import { Paragraph } from "./Paragraph"

const meta: Meta<typeof Paragraph> = {
  title: "Atoms/Typography/Paragraph",
  component: Paragraph,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
    color: {
      control: "select",
      options: ["default", "muted", "primary", "secondary"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "This is a default paragraph with some text content.",
  },
}

export const Large: Story = {
  args: {
    children: "This is a large paragraph.",
    size: "lg",
  },
}

export const Muted: Story = {
  args: {
    children: "This is a muted paragraph with secondary text color.",
    color: "muted",
  },
}

export const Centered: Story = {
  args: {
    children: "This is a centered paragraph.",
    align: "center",
  },
}

