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
import { Link } from "wouter"

import { ROUTES } from "@/lib/router"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<
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

      return (
        <div
          style={{
            padding: "2rem",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#c33" }}>Something went wrong</h1>
          <p style={{ color: "#666", marginBottom: "2rem" }}>
            {this.state.error?.message ?? "An unexpected error occurred"}
          </p>
          <Link
            href={ROUTES.HOME}
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            Return to Home
          </Link>
        </div>
      )
    }

    return this.props.children
  }
}
