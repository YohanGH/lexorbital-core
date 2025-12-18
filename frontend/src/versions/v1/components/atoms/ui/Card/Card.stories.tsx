import type { Meta, StoryObj } from "@storybook/react"

import { Card, CardHeader, CardContent, CardFooter } from "./Card"

const meta: Meta<typeof Card> = {
  title: "Atoms/UI/Card",
  component: Card,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "filled", "elevated"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    clickable: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Card content",
    variant: "default",
    padding: "md",
  },
}

export const Outline: Story = {
  args: {
    children: "Outline card",
    variant: "outline",
  },
}

export const Elevated: Story = {
  args: {
    children: "Elevated card with shadow",
    variant: "elevated",
  },
}

export const Clickable: Story = {
  args: {
    children: "Clickable card",
    clickable: true,
    onClick: () => alert("Card clicked!"),
  },
}

export const WithSubcomponents: Story = {
  render: () => (
    <Card>
      <CardHeader withBorder>Card Header</CardHeader>
      <CardContent>Card content goes here</CardContent>
      <CardFooter withBorder>Card Footer</CardFooter>
    </Card>
  ),
}
