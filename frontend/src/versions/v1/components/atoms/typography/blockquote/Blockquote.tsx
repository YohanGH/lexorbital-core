import type { ReactNode } from "react"
import { forwardRef } from "react"

import { mergeClasses } from "@/core/lib/utils"

export interface BlockquoteProps {
  /** Citation principale */
  children: ReactNode
  /** Auteur ou source (optionnel) */
  cite?: string
  /** URL de la source (optionnel) */
  citeUrl?: string
  /** Position de la barre latérale */
  side?: "left" | "right"
  /** Couleur d'accentuation */
  accentColor?: "primary" | "secondary" | "gray" | "success" | "warning"
  /** Taille */
  size?: "sm" | "md" | "lg"
  /** Icône de citation (optionnel) */
  icon?: ReactNode
  /** Classes supplémentaires */
  className?: string
}

const sideStyles = {
  left: "border-l-4 pl-6",
  right: "border-r-4 pr-6",
}

const accentColors = {
  primary: "border-primary-500 text-primary-700",
  secondary: "border-secondary-500 text-secondary-700",
  gray: "border-gray-300 text-gray-700",
  success: "border-success-500 text-success-700",
  warning: "border-warning-500 text-warning-700",
}

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
}

export const Blockquote = forwardRef<HTMLQuoteElement, BlockquoteProps>(
  (
    {
      children,
      cite,
      citeUrl,
      side = "left",
      accentColor = "primary",
      size = "md",
      icon,
      className = "",
    },
    ref
  ) => {
    return (
      <figure className={mergeClasses("blockquote", className)}>
        <blockquote
          ref={ref}
          cite={citeUrl}
          className={mergeClasses(
            "relative",
            sideStyles[side],
            accentColors[accentColor],
            sizeStyles[size],
            "leading-relaxed",
            "py-2"
          )}
        >
          {icon && (
            <div className="mb-3 text-2xl" aria-hidden="true">
              {icon}
            </div>
          )}
          <div className="font-medium italic">{children}</div>
        </blockquote>
        {cite && (
          <figcaption className="mt-3 text-sm text-gray-600">
            {citeUrl ? (
              <cite>
                <a
                  href={citeUrl}
                  className="focus:ring-primary-500 rounded hover:text-gray-900 focus:ring-2 focus:outline-none"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {cite}
                </a>
              </cite>
            ) : (
              <cite>{cite}</cite>
            )}
          </figcaption>
        )}
      </figure>
    )
  }
)

Blockquote.displayName = "Blockquote"
