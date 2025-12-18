#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const componentType = process.argv[2]
const componentName = process.argv[3]

if (!componentType || !componentName) {
  console.error("Usage: pnpm run generate:atom <type> <name>")
  console.error("Example: pnpm run generate:atom typography Button")
  process.exit(1)
}

const templates = {
  tsx: `import type { ReactNode } from "react"
import { forwardRef } from "react"
import { cn } from "@/utils/cn"

export interface ${componentName}Props {
  children: ReactNode
  className?: string
}

export const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ children, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("${componentName.toLowerCase()}", className)}
      >
        {children}
      </div>
    )
  }
)

${componentName}.displayName = "${componentName}"
`,
  test: `import { render, screen } from '@testing-library/react'
import { ${componentName} } from './${componentName}'

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName}>Test</${componentName}>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
`,
  stories: `import type { Meta, StoryObj } from '@storybook/react'
import { ${componentName} } from './${componentName}'

const meta: Meta<typeof ${componentName}> = {
  title: 'Atoms/${componentType}/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ${componentName}>

export const Default: Story = {
  args: {
    children: '${componentName} content',
  },
}
`,
  index: `export { ${componentName} } from './${componentName}'
export type { ${componentName}Props } from './${componentName}'
`,
}

const componentDir = path.join(
  __dirname,
  "..",
  "src",
  "components",
  "atoms",
  componentType,
  componentName
)

// Create directory
fs.mkdirSync(componentDir, { recursive: true })

// Create files
Object.entries(templates).forEach(([ext, content]) => {
  const fileName =
    ext === "tsx"
      ? `${componentName}.tsx`
      : ext === "index"
        ? "index.ts"
        : `${componentName}.${ext}.tsx`

  fs.writeFileSync(path.join(componentDir, fileName), content)
  console.log(`Created: ${componentDir}/${fileName}`)
})

console.log(`\n✅ Component ${componentName} created successfully!`)
console.log(`\nNext steps:`)
console.log(`1. Import in: src/components/atoms/${componentType}/index.ts`)
console.log(`2. Add to: src/components/atoms/index.ts`)
