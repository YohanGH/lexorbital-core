import type { Meta, StoryObj } from "@storybook/react"

import { Title } from "./Title"

const meta: Meta<typeof Title> = {
  title: "Atoms/Typography/Title",
  component: Title,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6],
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: {
    level: 1,
    children: "Heading Level 1",
  },
}

export const H2: Story = {
  args: {
    level: 2,
    children: "Heading Level 2",
  },
}

export const H3: Story = {
  args: {
    level: 3,
    children: "Heading Level 3",
  },
}

export const Centered: Story = {
  args: {
    level: 2,
    children: "Centered Title",
    align: "center",
  },
}
