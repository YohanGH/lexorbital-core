/**
 * Error Boundary component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 *
 * Note: This is a class component as React Error Boundaries
 * must be class components (or use react-error-boundary library).
 */

import { Component, type ReactNode, type ErrorInfo } from "react"
import { withTranslation, type WithTranslation } from "react-i18next"

import { ROUTES } from "@/lib/router"

export interface ErrorBoundaryPublicProps {
  children: ReactNode
  fallback?: ReactNode
  onNavigate?: (page: string) => void
}

interface ErrorBoundaryProps
  extends ErrorBoundaryPublicProps,
    WithTranslation<"errors"> {}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundaryBase extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to error reporting service
    // In production, this should be sent to a logging service
    // Never log sensitive data (passwords, tokens, personal data)
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) {
        return this.props.fallback
      }

      const { t, onNavigate } = this.props
      const errorMessage =
        this.state.error?.message ?? t("errorBoundary.defaultMessage")

      return (
        <div className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col items-center justify-center px-4 py-24 md:px-8 md:py-32 lg:px-16 lg:py-48">
          <h1 className="mb-8 text-center text-red-600">
            {t("errorBoundary.title")}
          </h1>
          <p className="mb-16 max-w-[600px] px-4 text-center opacity-75">
            {errorMessage}
          </p>
          {onNavigate ? (
            <button
              onClick={() => onNavigate("home")}
              className="border border-black px-8 py-4 transition-colors hover:bg-black hover:text-white"
            >
              {t("errorBoundary.backToHome")}
            </button>
          ) : (
            <a
              href={ROUTES.HOME}
              className="border border-black px-8 py-4 transition-colors hover:bg-black hover:text-white"
            >
              {t("errorBoundary.backToHome")}
            </a>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export const ErrorBoundary = withTranslation<"errors">("errors")(
  ErrorBoundaryBase
) as React.ComponentType<ErrorBoundaryPublicProps>
