import type { Meta, StoryObj } from "@storybook/react"

import { Container } from "./Container"

const meta: Meta<typeof Container> = {
  title: "Atoms/Layout/Container",
  component: Container,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
    },
    background: {
      control: "select",
      options: ["default", "light", "dark", "primary", "secondary"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Container content",
    size: "lg",
    padding: "md",
  },
}

export const Small: Story = {
  args: {
    children: "Small container",
    size: "sm",
  },
}

export const Large: Story = {
  args: {
    children: "Large container",
    size: "xl",
  },
}

export const WithBackground: Story = {
  args: {
    children: "Container with light background",
    background: "light",
  },
}
