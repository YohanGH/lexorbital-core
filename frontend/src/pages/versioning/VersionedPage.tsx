/**
 * Versioned page route component
 *
 * Handles versioned routes (/v/:versionId/*) and renders either:
 * - Static React components for known pages (home, modules, about, etc.)
 * - Dynamic JSON content for versioned content pages
 */

import type { JSX } from "react"
import { useEffect, useState } from "react"
import { useParams } from "wouter"

import { loadPage, type ContentPage } from "@/versioning/contentRegistry"
import { About, Contact, Glossary, Sitemap } from "@/pages/info"
import { References } from "@/pages/reference"
import { Explanatory } from "@/pages/explanatory"
import { Home } from "@/pages/home/Home"
import { Modules } from "@/pages/modules/Modules"

/**
 * Pages that should always use React components, not JSON content
 * These pages are statically rendered and don't have versioned content
 */
const STATIC_PAGES: Record<string, () => JSX.Element> = {
  home: () => <Home />,
  modules: () => <Modules />,
  about: () => <About />,
  contact: () => <Contact />,
  glossary: () => <Glossary />,
  sitemap: () => <Sitemap />,
  references: () => <References />,
  explanatory: () => <Explanatory />,
}

/**
 * Versioned page wrapper that extracts version and slug from route params
 * Handles both versioned content pages (JSON) and static React component pages
 */
export function VersionedPageRoute(): JSX.Element {
  const params = useParams<{ versionId: string; "*": string }>()

  // Extract versionId from params
  const versionId = params?.versionId

  if (!versionId) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p>Version non spécifiée</p>
      </div>
    )
  }

  // Extract slug from the wildcard param or from location
  // The "*" param contains the rest of the path after /v/:versionId/
  const restPath = params?.["*"] || ""

  // Remove leading/trailing slashes
  const slug = restPath.replace(/^\/+|\/+$/g, "")

  // If slug is empty, show 404 (home must be explicitly /v/:versionId/home)
  if (slug === "") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h1 className="mb-2 text-2xl font-bold text-red-800">
            Page non disponible
          </h1>
          <p className="text-red-600">
            La route /v/{versionId}/ n'est pas valide. Utilisez /v/{versionId}
            /home pour accéder à la page d'accueil.
          </p>
        </div>
      </div>
    )
  }

  // Check if this is a static page (React component) instead of versioned content
  const StaticPageComponent = STATIC_PAGES[slug]
  if (StaticPageComponent) {
    return <StaticPageComponent />
  }

  // Otherwise, try to load versioned content (JSON)
  return <VersionedContentPage versionId={versionId} slug={slug} />
}

/**
 * Component that loads and displays versioned JSON content
 */
function VersionedContentPage({
  versionId,
  slug,
}: {
  versionId: string
  slug: string
}): JSX.Element {
  const [content, setContent] = useState<ContentPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadContent = async (): Promise<void> => {
      try {
        setLoading(true)
        setError(null)
        const pageContent = await loadPage(versionId, slug)
        if (pageContent === null) {
          setError("Page non trouvée dans cette version")
        } else {
          setContent(pageContent)
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erreur lors du chargement"
        )
      } finally {
        setLoading(false)
      }
    }

    void loadContent()
  }, [versionId, slug])

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  if (error !== null || content === null) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h1 className="mb-2 text-2xl font-bold text-red-800">
            Page non disponible
          </h1>
          <p className="text-red-600">
            {error ??
              "Cette page n'est pas disponible dans la version " + versionId}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {content.title && (
        <h1 className="mb-6 text-3xl font-bold">{content.title}</h1>
      )}
      <div className="prose max-w-none">
        <p className="whitespace-pre-wrap">{content.body}</p>
      </div>
    </div>
  )
}
