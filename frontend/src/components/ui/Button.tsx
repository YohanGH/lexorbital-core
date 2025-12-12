/**
 * Button Component - Zero External Dependencies
 *
 * Privacy-first button component with NO external dependencies.
 * Pure React implementation with manual variant/size management
 * and className merging.
 *
 * This version demonstrates that the same functionality can be achieved
 * without @radix-ui/react-slot, class-variance-authority, clsx, or tailwind-merge.
 *
 * Comparison:
 * - Button.tsx: Uses @radix-ui/react-slot, cva, clsx, tailwind-merge
 * - Button.tsx: Pure React, zero external dependencies
 *
 * Uses mergeClasses() from @/lib/utils for className merging (zero-deps version).
 */

import { cloneElement, forwardRef, isValidElement } from "react"

import { mergeClasses } from "@/lib/utils"

/**
 * Button variant styles (replaces class-variance-authority)
 */
const BUTTON_BASE_STYLES =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"

const BUTTON_VARIANTS = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive:
    "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
  outline:
    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
  link: "text-primary underline-offset-4 hover:underline",
} as const

const BUTTON_SIZES = {
  default: "h-9 px-4 py-2 has-[>svg]:px-3",
  sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
  lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
  icon: "size-9",
  "icon-sm": "size-8",
  "icon-lg": "size-10",
} as const

type ButtonVariant = keyof typeof BUTTON_VARIANTS
type ButtonSize = keyof typeof BUTTON_SIZES

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button.
   */
  variant?: ButtonVariant
  /**
   * Size variant of the button.
   */
  size?: ButtonSize
  /**
   * If true, renders the button as a child component.
   * Useful for composing buttons with other components (e.g., Link from wouter).
   * This replaces @radix-ui/react-slot functionality.
   */
  asChild?: boolean
}

/**
 * Button Component - Zero Dependencies
 *
 * This implementation provides the same API as Button.tsx but without
 * any external dependencies:
 * - No @radix-ui/react-slot (uses React.cloneElement instead)
 * - No class-variance-authority (manual variant/size mapping)
 * - No clsx (uses mergeClasses from @/lib/utils)
 * - No tailwind-merge (uses mergeClasses from @/lib/utils)
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    // Build className from variants and sizes
    const variantStyles = BUTTON_VARIANTS[variant] || ""
    const sizeStyles = BUTTON_SIZES[size] || ""
    const mergedClassName = mergeClasses(
      BUTTON_BASE_STYLES,
      variantStyles,
      sizeStyles,
      className
    )

    // If asChild is true, clone the child element and merge props
    // This replaces @radix-ui/react-slot functionality
    if (asChild) {
      if (!isValidElement(children)) {
        throw new Error(
          "Button: asChild prop requires a single valid React element as children"
        )
      }

      const childProps = children.props as React.HTMLAttributes<HTMLElement>
      return cloneElement(children, {
        ...props,
        ...childProps,
        className: mergeClasses(mergedClassName, childProps.className),
        ref: ref,
      } as React.HTMLAttributes<HTMLElement>)
    }

    // Default: render as button element
    return (
      <button className={mergedClassName} ref={ref} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
export type { ButtonProps, ButtonVariant, ButtonSize }
