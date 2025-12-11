/**
 * Router configuration and helpers for Wouter
 *
 * This module centralizes routing configuration, route definitions,
 * and provides type-safe navigation helpers.
 *
 * @module router
 */

// Type definitions for Wouter navigation
// These types are based on wouter's API but defined here for compatibility
export type NavigateOptions = {
  replace?: boolean
}

export type LocationHook = () => [
  string,
  (to: string, options?: NavigateOptions) => void,
]

/**
 * Application route paths
 * Centralized route definitions for type safety and maintainability
 */
export const ROUTES = {
  HOME: "/",
  MODULES: "/modules",
  LEGAL: {
    ROOT: "/legal",
    MENTIONS: "/legal/mentions-legales",
    RGPD: "/legal/rgpd",
    COOKIES: "/legal/cookies",
  },
  EXPLANATORY: {
    ROOT: "/explanatory",
    ARCHITECTURE: "/explanatory/architecture",
    COMPLIANCE: "/explanatory/compliance",
  },
} as const

/**
 * Type for route paths
 * Extracts all possible route paths from ROUTES object
 * Flattens nested route objects to string paths
 */
export type RoutePath =
  | typeof ROUTES.HOME
  | typeof ROUTES.MODULES
  | (typeof ROUTES.LEGAL)[keyof typeof ROUTES.LEGAL]
  | (typeof ROUTES.EXPLANATORY)[keyof typeof ROUTES.EXPLANATORY]
  | string

/**
 * Navigation options for type-safe navigation
 */
export interface NavigationOptions extends NavigateOptions {
  replace?: boolean
  state?: unknown
}

/**
 * Type-safe navigation helper
 * Provides a wrapper around Wouter's navigation with better type safety
 *
 * @param navigate - The navigate function from useLocation hook
 * @param path - The route path to navigate to
 * @param options - Optional navigation options
 *
 * @example
 * ```tsx
 * const [location, navigate] = useLocation()
 * navigateTo(navigate, ROUTES.HOME)
 * navigateTo(navigate, ROUTES.MODULES, { replace: true })
 * ```
 */
export function navigateTo(
  navigate: (to: string, options?: NavigateOptions) => void,
  path: RoutePath,
  options?: NavigationOptions
): void {
  // Convert RoutePath to string
  // RoutePath can be a string or a nested object value
  let pathString: string
  if (typeof path === "string") {
    pathString = path
  } else {
    // For nested objects, extract the first string value
    // This handles cases where ROUTES.LEGAL or ROUTES.EXPLANATORY are passed
    const values = Object.values(path)
    const firstStringValue = values.find(
      (v): v is string => typeof v === "string"
    )
    pathString = firstStringValue ?? String(path)
  }
  navigate(pathString, options)
}

/**
 * Check if a path matches a route pattern
 * Useful for conditional rendering based on current route
 *
 * @param currentPath - Current location path
 * @param pattern - Route pattern to match against
 * @returns True if the path matches the pattern
 *
 * @example
 * ```tsx
 * const isHome = matchesRoute(location, ROUTES.HOME)
 * ```
 */
export function matchesRoute(currentPath: string, pattern: string): boolean {
  // Simple exact match for now
  // For more complex patterns, use useRoute hook from Wouter
  if (currentPath === pattern) {
    return true
  }
  // Match sub-routes only if pattern is not empty
  if (pattern !== "" && currentPath.startsWith(pattern + "/")) {
    return true
  }
  return false
}

/**
 * Get route parameters from a path
 * Extracts dynamic segments from a route path
 *
 * @param path - The route path pattern (e.g., "/users/:id")
 * @param currentPath - The current location path (e.g., "/users/123")
 * @returns Object with parameter values or null if no match
 *
 * @example
 * ```tsx
 * const params = extractParams("/users/:id", "/users/123")
 * // Returns: { id: "123" }
 * ```
 */
export function extractParams(
  path: string,
  currentPath: string
): Record<string, string> | null {
  const patternSegments = path.split("/")
  const pathSegments = currentPath.split("/")

  if (patternSegments.length !== pathSegments.length) {
    return null
  }

  const params: Record<string, string> = {}

  for (let i = 0; i < patternSegments.length; i++) {
    const patternSegment = patternSegments[i]
    const pathSegment = pathSegments[i]

    if (patternSegment?.startsWith(":")) {
      const paramName = patternSegment.slice(1)
      params[paramName] = pathSegment ?? ""
    } else if (patternSegment !== pathSegment) {
      return null
    }
  }

  return params
}

/**
 * Router configuration type
 * Extends Wouter's Router configuration with application-specific options
 */
export interface RouterConfig {
  base?: string
  hook?: LocationHook
}

/**
 * Default router configuration
 * Can be customized per environment or deployment
 */
export const defaultRouterConfig: RouterConfig = {
  // Omit properties instead of setting to undefined for exactOptionalPropertyTypes compatibility
}
