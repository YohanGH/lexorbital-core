/**
 * Pages barrel export
 *
 * Centralized exports for all page components.
 * This follows the LexOrbital tree structure convention.
 */

export { Home } from "./home"
export { NotFound, ErrorBoundary } from "./errors"
export { Modules } from "./modules"
export {
  MentionsLegales,
  RGPD,
  Cookies,
  TermsOfUse,
  CookieManagement,
} from "./legal"
export { Explanatory } from "./explanatory"
export { About, Contact, Glossary, Sitemap } from "./info"
export {
  Accessibility,
  Disclosure,
  EcoConception,
  Ethics,
  Security,
  TrustCenter,
} from "./compliance"
export { References } from "./reference"
export { VersionsList, VersionedPageRoute } from "./versioning"
