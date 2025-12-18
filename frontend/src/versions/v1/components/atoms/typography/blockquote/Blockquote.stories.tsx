import type { Meta, StoryObj } from "@storybook/react"

import { Blockquote } from "./Blockquote"

const meta: Meta<typeof Blockquote> = {
  title: "Atoms/Typography/Blockquote",
  component: Blockquote,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["left", "right"],
    },
    accentColor: {
      control: "select",
      options: ["primary", "secondary", "gray", "success", "warning"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "This is a default blockquote with some content.",
  },
}

export const WithCite: Story = {
  args: {
    children: "The only way to do great work is to love what you do.",
    cite: "Steve Jobs",
  },
}

export const RightSide: Story = {
  args: {
    children: "Blockquote with border on the right side",
    side: "right",
  },
}

export const PrimaryAccent: Story = {
  args: {
    children: "Blockquote with primary accent color",
    accentColor: "primary",
  },
}
