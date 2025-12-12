/**
 * Utility functions
 *
 * Common utilities used across the application.
 * Privacy-first: no external dependencies that could leak data.
 */

/**
 * Simple className merger - Zero Dependencies Version
 *
 * Handles conditional classes and basic Tailwind conflict resolution.
 * This is a zero-dependency alternative to cn() for components that
 * don't want external dependencies (clsx, tailwind-merge).
 *
 * @example
 * mergeClasses("px-2 py-1", "px-4") // → "py-1 px-4" (basic conflict resolution)
 * mergeClasses("bg-red-500", condition && "bg-blue-500") // → conditional class
 * mergeClasses("text-sm", undefined, null, false, "font-bold") // → "text-sm font-bold"
 *
 * @param classes - Array of class strings, undefined, null, or false values
 * @returns Merged className string
 */
export function mergeClasses(
  ...classes: (string | undefined | null | false)[]
): string {
  const validClasses = classes.filter(
    (cls): cls is string => typeof cls === "string" && cls.trim().length > 0
  )

  if (validClasses.length === 0) return ""

  // Basic Tailwind conflict resolution:
  // Remove duplicate classes, keep the last one
  const classMap = new Map<string, string>()

  for (const cls of validClasses) {
    // Split by spaces to handle multiple classes
    const individualClasses = cls.split(/\s+/).filter(Boolean)

    for (const individualClass of individualClasses) {
      // Extract base class name (before any modifiers like hover:, focus:, etc.)
      // This is a simplified approach - full tailwind-merge would be more sophisticated
      const baseMatch = individualClass.match(
        /^(?:[a-z-]+:)*([a-z-]+(?:-\d+)?)/
      )
      if (baseMatch && baseMatch[1]) {
        const baseClass = baseMatch[1]
        // For common Tailwind patterns, we can do basic deduplication
        // Full implementation would require parsing all Tailwind utilities
        classMap.set(baseClass, individualClass)
      } else {
        // For non-standard classes, just add them
        classMap.set(individualClass, individualClass)
      }
    }
  }

  return Array.from(classMap.values()).join(" ")
}
