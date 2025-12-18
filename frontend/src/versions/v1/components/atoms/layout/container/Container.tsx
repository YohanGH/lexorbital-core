import type { ReactNode } from "react"
import { forwardRef } from "react"

import { mergeClasses } from "@/core/lib/utils"

export interface ContainerProps {
  children: ReactNode
  /** Taille du container */
  size?: "sm" | "md" | "lg" | "xl" | "full"
  /** Padding */
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  /** Centrage */
  centered?: boolean
  /** Arrière-plan */
  background?: "default" | "light" | "dark" | "primary" | "secondary"
  /** ID pour la navigation */
  id?: string
  className?: string
}

const sizeStyles = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-[900px]",
  xl: "max-w-7xl",
  full: "max-w-full",
}

const paddingStyles = {
  none: "p-0",
  sm: "px-6 py-8 sm:px-6",
  md: "px-6 py-12 md:px-8 md:py-16",
  lg: "px-6 py-12 md:px-8 md:py-16 lg:px-16 lg:py-24",
  xl: "px-12 py-20 lg:px-16",
}

const backgroundStyles = {
  default: "bg-white",
  light: "bg-gray-50",
  dark: "bg-gray-900 text-white",
  primary: "bg-primary-50",
  secondary: "bg-secondary-50",
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      size = "lg",
      padding = "md",
      centered = true,
      background = "default",
      id,
      className = "",
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        id={id}
        className={mergeClasses(
          "container",
          sizeStyles[size],
          paddingStyles[padding],
          backgroundStyles[background],
          centered && "mx-auto",
          className
        )}
        role={id ? "region" : undefined}
        aria-labelledby={id ? `${id}-heading` : undefined}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = "Container"
