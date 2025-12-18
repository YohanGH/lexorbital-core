import type { Preview } from "@storybook/react"
import "@/core/styles/index.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default preview
