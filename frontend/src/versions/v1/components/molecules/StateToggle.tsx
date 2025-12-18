/**
 * StateToggle component
 *
 * Toggle button for expanding/collapsing content.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"

interface StateToggleProps {
  isExpanded: boolean
  onToggle: () => void
}

export function StateToggle({
  isExpanded,
  onToggle,
}: StateToggleProps): JSX.Element {
  const { t } = useTranslation("common")

  return (
    <button
      onClick={onToggle}
      className="flex h-11 w-11 items-center justify-center border border-black bg-white transition-colors hover:bg-black hover:text-white"
      aria-label={isExpanded ? t("ui.collapse") : t("ui.expand")}
    >
      {isExpanded ? "–" : "+"}
    </button>
  )
}
