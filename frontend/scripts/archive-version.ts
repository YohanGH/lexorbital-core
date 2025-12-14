#!/usr/bin/env node
/**
 * Archive Version Script
 *
 * Archives the current codebase into a version directory.
 * Copies components, pages, styles, hooks, and utils to src/versions/{versionId}/
 *
 * Usage: pnpm run archive-version <versionId>
 * Example: pnpm run archive-version v1.0.0
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, "..")

interface ArchiveOptions {
  versionId: string
  sourceDir?: string
  targetDir?: string
}

function archiveVersion(options: ArchiveOptions): void {
  const { versionId, sourceDir = "src", targetDir = "src/versions" } = options

  const versionPath = join(projectRoot, targetDir, versionId)

  // Create version directory structure
  mkdirSync(versionPath, { recursive: true })

  // Directories to archive
  const dirsToArchive = [
    "components",
    "pages",
    "styles",
    "hooks",
    "utils",
    "lib",
  ]

  // Copy directories
  dirsToArchive.forEach(dir => {
    const source = join(projectRoot, sourceDir, dir)
    const target = join(versionPath, dir)

    if (existsSync(source)) {
      cpSync(source, target, { recursive: true })
      console.log(`✓ Copied ${dir}/`)
    }
  })

  // Read package.json for dependencies
  const packageJsonPath = join(projectRoot, "package.json")
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8")) as {
    dependencies: Record<string, string>
    devDependencies: Record<string, string>
  }

  // Create version.json manifest
  const versionManifest = {
    version: versionId,
    date: new Date().toISOString(),
    reactVersion: packageJson.dependencies["react"],
    dependencies: packageJson.dependencies,
    devDependencies: packageJson.devDependencies,
  }

  const versionJsonPath = join(versionPath, "version.json")
  writeFileSync(
    versionJsonPath,
    JSON.stringify(versionManifest, null, 2),
    "utf-8"
  )

  console.log(`\n✓ Version ${versionId} archived successfully`)
  console.log(`  Location: ${versionPath}`)
  console.log(`  Manifest: ${versionJsonPath}`)
}

// CLI handling
const args = process.argv.slice(2)
if (args.length === 0) {
  console.error("Usage: pnpm run archive-version <versionId>")
  console.error("Example: pnpm run archive-version v1.0.0")
  process.exit(1)
}

const versionId = args[0]
if (!versionId?.match(/^v\d+\.\d+\.\d+$/)) {
  console.error(
    "Error: versionId must match format vX.Y.Z (e.g., v1.0.0, v2.0.0)"
  )
  process.exit(1)
}

archiveVersion({ versionId })
