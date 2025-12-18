import { forwardRef } from "react"

import { mergeClasses } from "@/core/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variante de la carte */
  variant?: "default" | "outline" | "filled" | "elevated"
  /** Padding */
  padding?: "none" | "sm" | "md" | "lg"
  /** Carte cliquable */
  clickable?: boolean
  /** État de chargement */
  loading?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = "default",
      padding = "md",
      clickable = false,
      loading = false,
      className = "",
      onClick,
      role,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: "bg-white border border-gray-200",
      outline: "border-2 border-gray-300 bg-transparent",
      filled: "bg-gray-50 border-none",
      elevated: "bg-white shadow-md border-none",
    }

    const paddingClasses = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (loading) {
        e.preventDefault()
        return
      }
      onClick?.(e)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (clickable && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault()
        // Déclencher un clic natif pour l'accessibilité
        if (e.currentTarget instanceof HTMLElement && onClick) {
          e.currentTarget.click()
        }
      }
      props.onKeyDown?.(e)
    }

    return (
      <div
        ref={ref}
        className={mergeClasses(
          "relative rounded-lg transition-all duration-200",
          variantClasses[variant],
          paddingClasses[padding],
          clickable &&
            "focus:ring-primary/50 cursor-pointer hover:shadow-lg focus:ring-2 focus:outline-none",
          loading && "pointer-events-none opacity-70",
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={role || (clickable ? "button" : "region")}
        tabIndex={clickable ? 0 : undefined}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/80">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
          </div>
        )}
        <div className={mergeClasses(loading && "opacity-30")}>{children}</div>
      </div>
    )
  }
)

Card.displayName = "Card"

// Sous-composants pour la structure
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  withBorder?: boolean
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = "", withBorder = false, ...props }, ref) => (
    <div
      ref={ref}
      className={mergeClasses(
        "pb-4",
        withBorder && "border-b border-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

CardHeader.displayName = "CardHeader"

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = "", noPadding = false, ...props }, ref) => (
    <div
      ref={ref}
      className={mergeClasses(!noPadding && "py-4", className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardContent.displayName = "CardContent"

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  withBorder?: boolean
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = "", withBorder = false, ...props }, ref) => (
    <div
      ref={ref}
      className={mergeClasses(
        "pt-4",
        withBorder && "border-t border-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

CardFooter.displayName = "CardFooter"

// Export avec sous-composants
export { Card, CardHeader, CardContent, CardFooter }
export type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps }
