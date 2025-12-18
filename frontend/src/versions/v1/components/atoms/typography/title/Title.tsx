import type { ReactNode } from "react"
import { forwardRef, createElement } from "react"

import { mergeClasses } from "@/core/lib/utils"

export type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6
export type TitleAlign = "left" | "center" | "right" | "justify"

export interface TitleProps {
  /** Le niveau de titre (h1-h6) */
  level: TitleLevel
  /** Le contenu du titre */
  children: ReactNode
  /** Alignement du texte */
  align?: TitleAlign
  /** ID pour l'accessibilité (pour navigation par titres) */
  id?: string
  /** Classes CSS supplémentaires */
  className?: string
  /** Taille visuelle (peut différer du niveau sémantique) */
  visualLevel?: TitleLevel
  /** Couleur personnalisée */
  color?: "default" | "primary" | "secondary" | "muted" | "inverted"
  /** Marges */
  margin?: "none" | "sm" | "md" | "lg" | "xl"
}

const visualStyles: Record<TitleLevel, string> = {
  1: "text-3xl md:text-4xl font-bold",
  2: "text-2xl md:text-3xl font-bold",
  3: "text-xl md:text-2xl font-semibold",
  4: "text-lg md:text-xl font-semibold",
  5: "text-base md:text-lg font-medium",
  6: "text-sm md:text-base font-medium",
}

const marginStyles = {
  none: "mb-0",
  sm: "mb-2",
  md: "mb-4",
  lg: "mb-6",
  xl: "mb-12 md:mb-16",
}

const colorStyles = {
  default: "text-gray-900",
  primary: "text-primary-700",
  secondary: "text-secondary-600",
  muted: "text-gray-600",
  inverted: "text-white",
}

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
}

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (
    {
      level,
      children,
      align = "left",
      id,
      className = "",
      visualLevel,
      color = "default",
      margin = "none",
    },
    ref
  ) => {
    type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    const Tag = `h${level}` as HeadingTag
    const visual = visualLevel || level

    // Génération automatique d'ID pour l'accessibilité si non fourni
    const titleId =
      id ||
      (typeof children === "string"
        ? `title-${children.toLowerCase().replace(/\s+/g, "-")}`
        : undefined)

    return createElement(
      Tag,
      {
        ref,
        id: titleId,
        className: mergeClasses(
          "title",
          visualStyles[visual],
          marginStyles[margin],
          colorStyles[color],
          alignStyles[align],
          className
        ),
        tabIndex: -1, // Permet le focus pour la navigation par titres
        "aria-label":
          typeof children === "string" ? undefined : `Titre niveau ${level}`,
      },
      children
    )
  }
)

Title.displayName = "Title"
