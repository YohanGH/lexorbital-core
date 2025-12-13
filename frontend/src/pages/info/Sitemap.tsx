/**
 * Sitemap page component
 *
 * Displays the site structure and navigation map.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"

interface SitemapProps {
  onNavigate: (page: string) => void
}

/**
 * Main pages keys in display order
 */
const MAIN_PAGE_KEYS = [
  "home",
  "modules",
  "about",
  "glossary",
  "contact",
  "trustCenter",
] as const

/**
 * Legal pages keys in display order
 */
const LEGAL_PAGE_KEYS = [
  "termsOfUse",
  "accessibility",
  "ecoConception",
  "ethics",
  "lexiqueCookies",
  "llmTxt",
  "disclosure",
  "security",
  "sitemap",
  "references",
] as const

/**
 * Error pages keys in display order
 */
const ERROR_PAGE_KEYS = ["404", "403", "50x"] as const

/**
 * Module keys in display order
 */
const MODULE_KEYS = ["a", "b", "c", "d", "e", "f"] as const

/**
 * Trust Center section keys in display order
 */
const TRUST_CENTER_SECTION_KEYS = [
  "overview",
  "compliance",
  "documents",
  "reports",
  "selfAssessments",
  "dataSecurity",
  "appSecurity",
  "legal",
  "infrastructure",
  "endpointSecurity",
  "networkSecurity",
  "policies",
  "securityGrade",
  "knowledgeBase",
  "updates",
] as const

export function Sitemap({ onNavigate }: SitemapProps): JSX.Element {
  const { t } = useTranslation(["info", "common"])

  const siteStructure = [
    {
      categoryKey: "mainPages" as const,
      pageKeys: MAIN_PAGE_KEYS,
      pageNamespace: "main" as const,
    },
    {
      categoryKey: "legalCompliance" as const,
      pageKeys: LEGAL_PAGE_KEYS,
      pageNamespace: "legal" as const,
    },
    {
      categoryKey: "errorPages" as const,
      pageKeys: ERROR_PAGE_KEYS,
      pageNamespace: "errors" as const,
    },
  ]

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
      <h1 className="mb-12 md:mb-16">{t("info:sitemap.title")}</h1>

      <p className="mb-12 opacity-75 md:mb-16">
        {t("info:sitemap.description")}
      </p>

      <div className="space-y-12 md:space-y-16">
        {siteStructure.map((section, index) => (
          <section key={index}>
            <h2 className="mb-6 md:mb-8">
              {t(`info:sitemap.categories.${section.categoryKey}`)}
            </h2>
            <div className="space-y-4">
              {section.pageKeys.map(pageKey => {
                const pageId =
                  section.pageNamespace === "main"
                    ? pageKey === "trustCenter"
                      ? "trust-center"
                      : pageKey
                    : section.pageNamespace === "legal"
                      ? pageKey === "termsOfUse"
                        ? "terms-of-use"
                        : pageKey === "ecoConception"
                          ? "eco-conception"
                          : pageKey === "llmTxt"
                            ? "llm-txt"
                            : pageKey === "lexiqueCookies"
                              ? "lexique-cookies"
                              : pageKey
                      : pageKey

                return (
                  <div
                    key={pageKey}
                    className="grid grid-cols-1 gap-4 border-b border-black pb-4 last:border-b-0 md:grid-cols-12 md:gap-8"
                  >
                    <div className="md:col-span-3">
                      <button
                        onClick={() => onNavigate(pageId)}
                        className="text-left transition-opacity hover:opacity-50"
                      >
                        {t(
                          `info:sitemap.pages.${section.pageNamespace}.${pageKey}.label` as any
                        )}
                      </button>
                    </div>
                    <div className="md:col-span-9">
                      <p className="opacity-50">
                        {t(
                          `info:sitemap.pages.${section.pageNamespace}.${pageKey}.description` as any
                        )}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 border-t border-black pt-12 md:mt-24 md:pt-16">
        <h2 className="mb-6 md:mb-8">{t("info:sitemap.architecture.title")}</h2>
        <div className="border border-black p-6 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-12">
            {/* Home & Core Pages */}
            <div>
              <h3 className="mb-4 text-sm tracking-wider uppercase">
                {t("info:sitemap.architecture.sections.homeCore")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => onNavigate("home")}
                    className="transition-opacity hover:opacity-50"
                  >
                    {t("common:header.home")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("about")}
                    className="transition-opacity hover:opacity-50"
                  >
                    {t("common:header.about")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("glossary")}
                    className="transition-opacity hover:opacity-50"
                  >
                    {t("common:header.glossary")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("contact")}
                    className="transition-opacity hover:opacity-50"
                  >
                    {t("common:header.contact")}
                  </button>
                </li>
              </ul>
            </div>

            {/* Modules */}
            <div>
              <h3 className="mb-4 text-sm tracking-wider uppercase">
                {t("info:sitemap.architecture.sections.modules")}
              </h3>
              <ul className="space-y-2">
                {MODULE_KEYS.map(moduleKey => (
                  <li key={moduleKey}>
                    <button
                      onClick={() => onNavigate("modules")}
                      className="transition-opacity hover:opacity-50"
                    >
                      {t(
                        `info:sitemap.architecture.modules.${moduleKey}` as any
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Center */}
            <div>
              <h3 className="mb-4 text-sm tracking-wider uppercase">
                {t("info:sitemap.architecture.sections.trustCenter")}
              </h3>
              <ul className="space-y-2">
                {TRUST_CENTER_SECTION_KEYS.map(sectionKey => (
                  <li key={sectionKey}>
                    <button
                      onClick={() => onNavigate("trust-center")}
                      className="transition-opacity hover:opacity-50"
                    >
                      {t(
                        `info:sitemap.architecture.trustCenterSections.${sectionKey}` as any
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Compliance */}
            <div>
              <h3 className="mb-4 text-sm tracking-wider uppercase">
                {t("info:sitemap.architecture.sections.legalCompliance")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => onNavigate("terms-of-use")}
                    className="transition-opacity hover:opacity-50"
                  >
                    {t("common:footer.links.termsOfUse")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("accessibility")}
                    className="transition-opacity hover:opacity-50"
                  >
                    {t("common:footer.links.accessibility")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("eco-conception")}
                    className="transition-opacity hover:opacity-50"
                  >
                    {t("common:footer.links.ecoConception")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("ethics")}
                    className="transition-opacity hover:opacity-50"
                  >
                    {t("common:footer.links.ethics")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("cookie-management")}
                    className="transition-opacity hover:opacity-50"
                  >
                    {t("common:footer.utilities.cookieManagement")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("llm-txt")}
                    className="transition-opacity hover:opacity-50"
                  >
                    {t("common:footer.links.llmTxt")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("disclosure")}
                    className="transition-opacity hover:opacity-50"
                  >
                    {t("common:footer.links.disclosure")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("security")}
                    className="transition-opacity hover:opacity-50"
                  >
                    {t("common:footer.links.security")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("sitemap")}
                    className="transition-opacity hover:opacity-50"
                  >
                    {t("common:footer.links.sitemap")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("references")}
                    className="transition-opacity hover:opacity-50"
                  >
                    {t("common:footer.links.references")}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
