import type { StorybookConfig } from "@storybook/react-vite"
import { mergeConfig } from "vite"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "./introduction.mdx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    // Merge avec la config Vite existante pour partager les alias et plugins
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
        },
      },
    })
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => {
        if (prop.parent) {
          return !prop.parent.fileName.includes("node_modules")
        }
        return true
      },
    },
  },
}

export default config
