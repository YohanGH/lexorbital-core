/**
 * Footer component
 */
import { useTranslation } from "react-i18next"

interface FooterProps {
  onNavigate: (page: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useTranslation("common")

  const legalLinks = [
    { label: t("footer.links.termsOfUse"), page: "terms-of-use" },
    { label: t("footer.links.accessibility"), page: "accessibility" },
    { label: t("footer.links.ecoConception"), page: "eco-conception" },
    { label: t("footer.links.ethics"), page: "ethics" },
    {
      label: t("footer.links.llmTxt"),
      page: "llm-txt",
      isExternal: true,
      href: "/llm.txt",
    },
    { label: t("footer.links.disclosure"), page: "disclosure" },
    { label: t("footer.links.security"), page: "security" },
    { label: t("footer.links.sitemap"), page: "sitemap" },
    { label: t("footer.links.references"), page: "references" },
  ]

  const utilityLinks = [
    {
      label: t("footer.utilities.technicalGlossary"),
      page: "technical-glossary",
    },
    {
      label: t("footer.utilities.cookieManagement"),
      page: "cookie-management",
    },
    { label: t("footer.utilities.trustCenter"), page: "trust-center" },
  ]

  return (
    <footer className="mt-auto w-full border-t border-black bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12 lg:px-16">
        {/* Developer Documentation Link */}
        <div className="mb-6 flex justify-center border-b border-black pb-6">
          <button
            onClick={() => onNavigate("explanatory-index")}
            className="inline-flex items-center gap-2 border border-black px-4 py-2 text-sm opacity-75 transition-colors hover:bg-black hover:text-white hover:opacity-100"
            aria-label={t("footer.devDocs.ariaLabel")}
          >
            <span className="opacity-75">{t("footer.devDocs.title")}</span>
            <span>{t("footer.devDocs.cta")}</span>
            <span aria-hidden="true" className="opacity-50">
              →
            </span>
          </button>
        </div>

        {/* Legal Links */}
        <nav
          className="mb-8 flex flex-wrap justify-center gap-4 md:gap-8"
          aria-label="Legal navigation"
        >
          {legalLinks.map(link => {
            // llm.txt is served directly by the server, use external link
            if (link.isExternal && link.href) {
              return (
                <a
                  key={link.page}
                  href={link.href}
                  className="text-sm opacity-50 transition-opacity hover:opacity-100 md:text-base"
                >
                  {link.label}
                </a>
              )
            }
            return (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className="text-sm opacity-50 transition-opacity hover:opacity-100 md:text-base"
              >
                {link.label}
              </button>
            )
          })}
        </nav>

        {/* Utility Links */}
        <nav
          className="mb-8 flex flex-wrap justify-center gap-4 md:gap-8"
          aria-label="Utility navigation"
        >
          {utilityLinks.map(link => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className="text-sm opacity-50 transition-opacity hover:opacity-100 md:text-base"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* External Links */}
        <div className="mb-8 flex flex-wrap justify-center gap-4 border-b border-black pb-8 md:gap-8">
          <a
            href="https://github.com/YohanGH/lexorbital-core"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm opacity-50 transition-opacity hover:opacity-100 md:text-base"
          >
            {t("footer.external.github")}
          </a>
          <a
            href="https://linkedin.com/yohan-regnier-5a2505254/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm opacity-50 transition-opacity hover:opacity-100 md:text-base"
          >
            {t("footer.external.linkedin")}
          </a>
        </div>

        {/* Copyright & License */}
        <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-8">
          <p className="text-sm opacity-50">{t("footer.meta.copyright")}</p>
          <p className="text-sm opacity-50">{t("footer.meta.license")}</p>
        </div>
      </div>
    </footer>
  )
}
