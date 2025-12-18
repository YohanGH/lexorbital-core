import type { ReactNode } from "react"
import { forwardRef } from "react"

import { mergeClasses } from "@/core/lib/utils"

export type ParagraphSize = "sm" | "md" | "lg"
export type ParagraphWeight = "normal" | "medium" | "semibold"

export interface ParagraphProps {
  children: ReactNode
  size?: ParagraphSize
  weight?: ParagraphWeight
  align?: "left" | "center" | "right" | "justify"
  color?: "default" | "muted" | "primary" | "secondary" | "inverted"
  leading?: "tight" | "normal" | "relaxed" | "loose"
  margin?: "none" | "sm" | "md" | "lg"
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full"
  className?: string
  id?: string
}

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
}

const weightStyles = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
}

const colorStyles = {
  default: "text-gray-800",
  muted: "text-gray-600",
  primary: "text-primary-700",
  secondary: "text-secondary-600",
  inverted: "text-gray-100",
}

const leadingStyles = {
  tight: "leading-tight",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
}

const marginStyles = {
  none: "mb-0",
  sm: "mb-3",
  md: "mb-4",
  lg: "mb-6",
}

const maxWidthStyles = {
  sm: "max-w-prose-sm",
  md: "max-w-prose",
  lg: "max-w-prose-lg",
  xl: "max-w-prose-xl",
  full: "max-w-full",
}

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  (
    {
      children,
      size = "md",
      weight = "normal",
      align = "left",
      color = "default",
      leading = "relaxed",
      margin = "md",
      maxWidth = "lg",
      className = "",
      id,
    },
    ref
  ) => {
    return (
      <p
        ref={ref}
        id={id}
        className={mergeClasses(
          "paragraph",
          sizeStyles[size],
          weightStyles[weight],
          `text-${align}`,
          colorStyles[color],
          leadingStyles[leading],
          marginStyles[margin],
          maxWidthStyles[maxWidth],
          className
        )}
      >
        {children}
      </p>
    )
  }
)

Paragraph.displayName = "Paragraph"
