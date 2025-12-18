import type { ReactNode } from "react"
import { forwardRef, createElement } from "react"

import { mergeClasses } from "@/core/lib/utils"

export interface SectionProps {
  children: ReactNode
  /** ID obligatoire pour navigation et accessibilité */
  id: string
  /** Niveau de titre de la section */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
  /** Titre de la section (optionnel - si fourni, ajouté automatiquement) */
  title?: string
  /** Description de la section (pour aria-describedby) */
  description?: string
  /** Espacement vertical */
  spacing?: "none" | "sm" | "md" | "lg" | "xl"
  /** Arrière-plan */
  background?: "default" | "light" | "dark" | "primary" | "secondary"
  /** Rôle ARIA personnalisé */
  role?: string
  /** Désactiver le wrapper interne (pour correspondre au design original) */
  noWrapper?: boolean
  className?: string
}

const spacingStyles = {
  none: "py-0",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-32",
}

const backgroundStyles = {
  default: "bg-transparent",
  light: "bg-gray-50",
  dark: "bg-gray-900 text-white",
  primary: "bg-primary-50",
  secondary: "bg-secondary-50",
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      children,
      id,
      headingLevel = 2,
      title,
      description,
      spacing = "md",
      background = "default",
      role = "region",
      noWrapper = false,
      className = "",
    },
    ref
  ) => {
    type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    const HeadingTag = `h${headingLevel}` as HeadingTag

    const content = (
      <>
        {title && (
          <header className="mb-8 md:mb-12">
            {createElement(
              HeadingTag,
              {
                id: `${id}-heading`,
                className: "text-3xl font-bold tracking-tight sm:text-4xl",
                tabIndex: -1,
              },
              title
            )}
            {description && (
              <p
                id={`${id}-description`}
                className="mt-4 text-lg text-gray-600"
              >
                {description}
              </p>
            )}
          </header>
        )}
        <div className={mergeClasses(!title && "mt-0")}>{children}</div>
      </>
    )

    return (
      <section
        ref={ref}
        id={id}
        className={mergeClasses(
          "section",
          spacingStyles[spacing],
          backgroundStyles[background],
          className
        )}
        role={role}
        aria-labelledby={title ? `${id}-heading` : undefined}
        aria-describedby={description ? `${id}-description` : undefined}
      >
        {noWrapper ? (
          content
        ) : (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {content}
          </div>
        )}
      </section>
    )
  }
)

Section.displayName = "Section"
