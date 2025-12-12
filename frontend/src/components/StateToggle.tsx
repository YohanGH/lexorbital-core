interface StateToggleProps {
  isExpanded: boolean
  onToggle: () => void
}

export function StateToggle({ isExpanded, onToggle }: StateToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex h-11 w-11 items-center justify-center border border-black bg-white transition-colors hover:bg-black hover:text-white"
      aria-label={isExpanded ? "Collapse" : "Expand"}
    >
      {isExpanded ? "–" : "+"}
    </button>
  )
}
