/**
 * Version Manager exports
 */

export { VersionProvider, useVersion } from "./VersionContext"
export { VersionRouter } from "./VersionRouter"

// Version utilities (migrated from versioning/)
export {
  getLatestVersion,
  listVersions,
  getVersionById,
  extractVersionFromPath,
  resolveTargetPath,
} from "./versionUtils"

// Types (migrated from versioning/)
export type {
  VersionEntry,
  VersionManifest,
  ResolvedTargetPath,
  SiteVersionEntry,
} from "./types"
export { toSiteVersionEntry } from "./types"
