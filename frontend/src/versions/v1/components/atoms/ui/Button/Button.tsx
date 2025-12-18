/**
 * Button Component - Accessible & Zero Dependencies
 */

import { cloneElement, forwardRef, isValidElement, useState } from "react"

import { mergeClasses } from "@/core/lib/utils"

const BUTTON_VARIANTS = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
  success: "bg-success text-white hover:bg-success/90",
  warning: "bg-warning text-white hover:bg-warning/90",
  muted: "bg-muted text-muted-foreground hover:bg-muted/80",
} as const

const BUTTON_SIZES = {
  xs: "h-7 px-2 text-xs gap-1",
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 py-2 gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
  xl: "h-14 px-8 text-lg gap-3",
  icon: "size-10",
  "icon-sm": "size-8",
  "icon-lg": "size-12",
} as const

export type ButtonVariant = keyof typeof BUTTON_VARIANTS
export type ButtonSize = keyof typeof BUTTON_SIZES

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  /** Affiche un indicateur de chargement */
  loading?: boolean
  /** Affiche un état de succès */
  success?: boolean
  /** Icône avant le texte */
  iconLeft?: React.ReactNode
  /** Icône après le texte */
  iconRight?: React.ReactNode
  /** Pour les boutons sans texte visible */
  "aria-label"?: string
  /** Mode plein largeur */
  fullWidth?: boolean
}

const BUTTON_BASE_STYLES = `
  inline-flex items-center justify-center gap-2
  whitespace-nowrap rounded-md text-sm font-medium
  transition-all duration-200
  disabled:pointer-events-none disabled:opacity-50
  disabled:cursor-not-allowed
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-offset-2 focus-visible:ring-primary/50
  active:scale-[0.98]
  aria-busy:opacity-70
  [&_svg]:pointer-events-none
  [&_svg]:shrink-0
`

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      loading = false,
      success = false,
      iconLeft,
      iconRight,
      children,
      disabled,
      "aria-label": ariaLabel,
      fullWidth = false,
      type = "button",
      onClick,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false)

    // Styles dynamiques
    const variantStyles = BUTTON_VARIANTS[variant] || ""
    const sizeStyles = BUTTON_SIZES[size] || ""

    const isIconOnly =
      size?.includes("icon") || (!children && (iconLeft || iconRight))

    const buttonClasses = mergeClasses(
      BUTTON_BASE_STYLES,
      variantStyles,
      sizeStyles,
      isIconOnly ? "justify-center" : undefined,
      fullWidth ? "w-full" : undefined,
      loading ? "cursor-wait" : undefined,
      success ? "bg-success/90 cursor-default" : undefined,
      className
    )

    // Gestion des événements pour l'accessibilité
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || success || disabled) {
        e.preventDefault()
        return
      }
      onClick?.(e)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        setIsPressed(true)
      }
      props.onKeyDown?.(e)
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        setIsPressed(false)
      }
      props.onKeyUp?.(e)
    }

    // Éléments visuels
    const loadingSpinner = loading && (
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </span>
    )

    const successIcon = success && (
      <span className="absolute inset-0 flex items-center justify-center">
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
    )

    // Contenu du bouton
    const buttonContent = (
      <>
        {loadingSpinner}
        {successIcon}
        {iconLeft && !loading && !success && (
          <span
            className={mergeClasses(children ? "mr-1" : undefined)}
            aria-hidden="true"
          >
            {iconLeft}
          </span>
        )}
        <span
          className={mergeClasses(loading || success ? "invisible" : undefined)}
        >
          {children}
        </span>
        {iconRight && !loading && !success && (
          <span
            className={mergeClasses(children ? "ml-1" : undefined)}
            aria-hidden="true"
          >
            {iconRight}
          </span>
        )}
      </>
    )

    // Props d'accessibilité
    const accessibilityProps = {
      "aria-label":
        ariaLabel ||
        (isIconOnly && typeof children === "string" ? children : undefined),
      "aria-busy": loading,
      "aria-disabled": disabled || loading,
      "aria-pressed": isPressed,
      "aria-live": loading ? ("polite" as const) : undefined,
      role: props.role || "button",
      tabIndex: disabled ? -1 : props.tabIndex || 0,
    }

    if (asChild && isValidElement(children)) {
      const childProps = children.props as React.HTMLAttributes<HTMLElement>
      return cloneElement(children, {
        ...props,
        ...accessibilityProps,
        className: mergeClasses(buttonClasses, childProps.className),
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        onKeyUp: handleKeyUp,
        ref,
        disabled: disabled || loading,
        type: (childProps as any).type || type,
      } as React.HTMLAttributes<HTMLElement>)
    }

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        {...accessibilityProps}
        {...props}
      >
        {buttonContent}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
export type { ButtonProps }
