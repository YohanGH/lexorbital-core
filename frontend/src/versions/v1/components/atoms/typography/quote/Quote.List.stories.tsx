import type { Meta, StoryObj } from "@storybook/react"

import { Quote } from "./Quote"

const meta: Meta<typeof Quote> = {
  title: "Atoms/Typography/Quote/List",
  component: Quote,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["inline", "pull", "highlight"],
    },
    color: {
      control: "select",
      options: ["default", "primary", "secondary"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Inline: Story = {
  args: {
    children: "This is an inline quote.",
    variant: "inline",
  },
}

export const Pull: Story = {
  args: {
    children: "This is a pull quote that stands out from the text.",
    variant: "pull",
  },
}

export const Highlight: Story = {
  args: {
    children: "This is a highlighted quote with background color.",
    variant: "highlight",
  },
}

export const Primary: Story = {
  args: {
    children: "This is a quote with primary color.",
    color: "primary",
  },
}
