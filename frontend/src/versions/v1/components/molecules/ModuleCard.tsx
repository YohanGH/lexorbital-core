/**
 * ModuleCard component
 *
 * Displays a single module card with expandable details.
 */

import { useState, type JSX } from "react"

import { StateToggle } from "./StateToggle"

interface ModuleCardProps {
  name: string
  role: string
  details: string
}

export function ModuleCard({
  name,
  role,
  details,
}: ModuleCardProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border border-black p-6 md:p-8">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="mb-2">{name}</h3>
          <p className="opacity-50">{role}</p>
        </div>
        <StateToggle
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />
      </div>

      {isExpanded && (
        <div className="mt-6 border-t border-black pt-6">
          <p>{details}</p>
        </div>
      )}
    </div>
  )
}
