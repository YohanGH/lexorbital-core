import type { Meta, StoryObj } from "@storybook/react"

import { Link } from "./Link"

const meta: Meta<typeof Link> = {
  title: "Atoms/UI/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "underline", "button"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    external: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: "/",
    children: "Default link",
  },
}

export const Primary: Story = {
  args: {
    href: "/",
    children: "Primary link",
    variant: "primary",
  },
}

export const Underline: Story = {
  args: {
    href: "/",
    children: "Underline link",
    variant: "underline",
  },
}

export const External: Story = {
  args: {
    href: "https://example.com",
    children: "External link",
    external: true,
    showExternalIcon: true,
  },
}

export const Disabled: Story = {
  args: {
    href: "/",
    children: "Disabled link",
    disabled: true,
  },
}
