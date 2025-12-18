import { forwardRef } from "react"

import { mergeClasses } from "@/core/lib/utils"

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Variante visuelle */
  variant?: "default" | "primary" | "secondary" | "underline" | "button"
  /** Taille */
  size?: "sm" | "md" | "lg"
  /** Ouvre un nouvel onglet */
  external?: boolean
  /** Afficher une icône externe */
  showExternalIcon?: boolean
  /** Lien désactivé */
  disabled?: boolean
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      children,
      variant = "default",
      size = "md",
      external = false,
      showExternalIcon = false,
      disabled = false,
      className = "",
      onClick,
      ...props
    },
    ref
  ) => {
    const isExternal = external || href?.startsWith("http")

    const variantClasses = {
      default: "text-primary hover:text-primary/80",
      primary: "text-primary-600 font-medium hover:text-primary-800",
      secondary: "text-gray-600 hover:text-gray-900",
      underline:
        "text-primary underline underline-offset-4 hover:text-primary/80",
      button:
        "inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90",
    }

    const sizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      onClick?.(e)
    }

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        className={mergeClasses(
          "inline-flex items-center gap-1 transition-colors duration-200",
          variantClasses[variant],
          sizeClasses[size],
          disabled
            ? "pointer-events-none cursor-not-allowed opacity-50"
            : "cursor-pointer",
          className
        )}
        onClick={handleClick}
        target={isExternal ? "_blank" : props.target}
        rel={isExternal ? "noopener noreferrer" : props.rel}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        {...props}
      >
        {children}
        {isExternal && showExternalIcon && (
          <svg
            className="ml-1 h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </a>
    )
  }
)

Link.displayName = "Link"

export { Link }
export type { LinkProps }
