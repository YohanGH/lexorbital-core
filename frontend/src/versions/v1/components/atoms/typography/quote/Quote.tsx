import type { ReactNode } from "react"
import { forwardRef } from "react"

import { mergeClasses } from "@/core/lib/utils"

export interface QuoteProps {
  children: ReactNode
  /** Style de citation */
  variant?: "inline" | "pull" | "highlight"
  /** Couleur */
  color?: "default" | "primary" | "secondary"
  /** Taille */
  size?: "sm" | "md" | "lg"
  className?: string
}

const variantStyles = {
  inline: "italic text-gray-700 border-l-0 pl-0",
  pull: "float-right w-1/3 ml-6 mb-6 text-lg italic border-l-4 pl-4 border-primary-300",
  highlight: "bg-primary-50 border-primary-200 border-l-4 pl-4 py-3 italic",
}

const colorStyles = {
  default: "text-gray-800",
  primary: "text-primary-700",
  secondary: "text-secondary-700",
}

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
}

export const Quote = forwardRef<HTMLQuoteElement, QuoteProps>(
  (
    {
      children,
      variant = "inline",
      color = "default",
      size = "md",
      className = "",
    },
    ref
  ) => {
    return (
      <q
        ref={ref}
        className={mergeClasses(
          "quote",
          variantStyles[variant],
          colorStyles[color],
          sizeStyles[size],
          className
        )}
      >
        {children}
      </q>
    )
  }
)

Quote.displayName = "Quote"
