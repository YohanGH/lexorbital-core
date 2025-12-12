interface VersionTimelineProps {
  currentVersion: string
  versions: Array<{ id: string; label: string }>
}
/**
 * Version Timeline Component
 *
 * Displays a timeline of versions with the current version highlighted.
 *
 * @param currentVersion - The current version
 * @param versions - The versions to display
 * @returns The VersionTimeline component
 * 
 * @example
 * <VersionTimeline
        currentVersion="v1.0.0"
        versions={[
          { id: "v1.0.0", label: "v1.0.0" },
          { id: "v1.0.1", label: "v1.0.1" },
          { id: "v1.0.2", label: "v1.0.2" },
          { id: "v1.0.3", label: "v1.0.3" },
          { id: "v1.0.4", label: "v1.0.4" },
          { id: "v1.0.5", label: "v1.0.5" },
          { id: "v1.0.6", label: "v1.0.6" },
          { id: "v1.0.7", label: "v1.0.7" },
          { id: "v1.0.8", label: "v1.0.8" },
          { id: "v1.0.9", label: "v1.0.9" },
          { id: "v1.0.10", label: "v1.0.10" },
        ]}
      />
 */
export function VersionTimeline({
  currentVersion,
  versions,
}: VersionTimelineProps) {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      {versions.map((version, index) => (
        <div key={version.id} className="flex items-center">
          <div
            className={`border border-black px-4 py-2 ${
              currentVersion === version.id
                ? "bg-black text-white"
                : "bg-white text-black opacity-50"
            }`}
            aria-current={currentVersion === version.id ? "step" : undefined}
          >
            <span className="text-sm">{version.label}</span>
          </div>
          {index < versions.length - 1 && (
            <div
              className="mx-2 h-px w-8 bg-black opacity-25"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  )
}
