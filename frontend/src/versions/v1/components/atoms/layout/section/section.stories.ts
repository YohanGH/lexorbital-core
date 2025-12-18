import type { Meta, StoryObj } from "@storybook/react"

import { Section } from "./Section"

const meta: Meta<typeof Section> = {
  title: "Atoms/Layout/Section",
  component: Section,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    headingLevel: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6],
    },
    spacing: {
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
    id: "default-section",
    children: "Section content",
    spacing: "md",
  },
}

export const WithTitle: Story = {
  args: {
    id: "title-section",
    title: "Section Title",
    children: "Section content with a title",
    spacing: "md",
  },
}

export const WithTitleAndDescription: Story = {
  args: {
    id: "full-section",
    title: "Section Title",
    description: "This is a description of the section",
    children: "Section content with title and description",
    spacing: "lg",
  },
}

export const LargeSpacing: Story = {
  args: {
    id: "large-section",
    title: "Large Spacing Section",
    children: "This section has large vertical spacing",
    spacing: "xl",
  },
}
