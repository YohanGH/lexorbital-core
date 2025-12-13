/**
 * Terms of Use page component
 *
 * Displays the terms of use and conditions.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"

/**
 * Section IDs for table of contents navigation
 */
const SECTION_IDS = [
  "object",
  "access",
  "ip",
  "liability",
  "modifications",
  "data",
  "termination",
] as const

/**
 * Item keys for each section that has a list
 */
const SECTION_ITEMS: Record<string, readonly string[]> = {
  access: ["credentials", "equipment", "laws", "security"],
  ip: ["reproduce", "proprietary", "api", "opensource"],
  liability: ["availability", "accuracy", "compatibility", "outcomes"],
  modifications: ["email", "banner", "trustCenter"],
  data: ["minimal", "transparent", "rights", "security"],
  termination: ["access", "deletion", "refund"],
} as const

export function TermsOfUse(): JSX.Element {
  const { t } = useTranslation("legal")

  return (
    <div className="mx-auto max-w-[900px] px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
      <h1 className="mb-12 md:mb-16">{t("termsOfUse.title")}</h1>

      {/* Version Info */}
      <div className="mb-12 border border-black p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-1 text-sm opacity-50">
              {t("termsOfUse.version.version")}
            </p>
            <p className="text-sm opacity-50">
              {t("termsOfUse.version.effectiveDate")}
            </p>
          </div>
          <div className="border border-black px-4 py-2 text-sm">
            {t("termsOfUse.version.current")}
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <nav className="mb-12 space-y-2 border-l-2 border-black pl-6 md:pl-8">
        <p className="mb-4 opacity-75">
          {t("termsOfUse.tableOfContents.title")}
        </p>
        {SECTION_IDS.map(sectionId => (
          <a
            key={sectionId}
            href={`#${sectionId}`}
            className="block transition-opacity hover:opacity-50"
          >
            {t(`termsOfUse.tableOfContents.${sectionId}` as any)}
          </a>
        ))}
      </nav>

      {/* Section 1: Object and Scope */}
      <section id="object" className="mb-12">
        <h2 className="mb-6">{t("termsOfUse.sections.object.title")}</h2>
        <p className="mb-4">{t("termsOfUse.sections.object.paragraph1")}</p>
        <p>{t("termsOfUse.sections.object.paragraph2")}</p>
      </section>

      {/* Section 2: Access and Use */}
      <section id="access" className="mb-12">
        <h2 className="mb-6">{t("termsOfUse.sections.access.title")}</h2>
        <p className="mb-4">{t("termsOfUse.sections.access.description")}</p>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          {SECTION_ITEMS["access"]?.map(itemKey => (
            <p key={itemKey}>
              {t(`termsOfUse.sections.access.items.${itemKey}` as any)}
            </p>
          ))}
        </div>
      </section>

      {/* Section 3: Intellectual Property */}
      <section id="ip" className="mb-12">
        <h2 className="mb-6">{t("termsOfUse.sections.ip.title")}</h2>
        <p className="mb-4">{t("termsOfUse.sections.ip.description")}</p>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          {SECTION_ITEMS["ip"]?.map(itemKey => (
            <p key={itemKey}>
              {t(`termsOfUse.sections.ip.items.${itemKey}` as any)}
            </p>
          ))}
        </div>
      </section>

      {/* Section 4: Limitations of Liability */}
      <section id="liability" className="mb-12">
        <h2 className="mb-6">{t("termsOfUse.sections.liability.title")}</h2>
        <p className="mb-4">{t("termsOfUse.sections.liability.description")}</p>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          {SECTION_ITEMS["liability"]?.map(itemKey => (
            <p key={itemKey}>
              {t(`termsOfUse.sections.liability.items.${itemKey}` as any)}
            </p>
          ))}
        </div>
        <p className="mt-4">
          {t("termsOfUse.sections.liability.acknowledgment")}
        </p>
      </section>

      {/* Section 5: Modifications */}
      <section id="modifications" className="mb-12">
        <h2 className="mb-6">{t("termsOfUse.sections.modifications.title")}</h2>
        <p className="mb-4">
          {t("termsOfUse.sections.modifications.description")}
        </p>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          {SECTION_ITEMS["modifications"]?.map(itemKey => (
            <p key={itemKey}>
              {t(`termsOfUse.sections.modifications.items.${itemKey}` as any)}
            </p>
          ))}
        </div>
        <p className="mt-4">
          {t("termsOfUse.sections.modifications.acceptance")}
        </p>
      </section>

      {/* Section 6: Data Protection */}
      <section id="data" className="mb-12">
        <h2 className="mb-6">{t("termsOfUse.sections.data.title")}</h2>
        <p className="mb-4">{t("termsOfUse.sections.data.description")}</p>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          {SECTION_ITEMS["data"]?.map(itemKey => (
            <p key={itemKey}>
              {t(`termsOfUse.sections.data.items.${itemKey}` as any)}
            </p>
          ))}
        </div>
        <p className="mt-4">
          {t("termsOfUse.sections.data.contact")}{" "}
          <a
            href={`mailto:${t("termsOfUse.sections.data.email")}`}
            className="border-b border-black transition-colors hover:bg-black hover:text-white"
            aria-label={t("termsOfUse.sections.data.emailLabel")}
          >
            {t("termsOfUse.sections.data.email")}
          </a>
        </p>
      </section>

      {/* Section 7: Termination */}
      <section id="termination" className="mb-12">
        <h2 className="mb-6">{t("termsOfUse.sections.termination.title")}</h2>
        <p className="mb-4">
          {t("termsOfUse.sections.termination.description")}
        </p>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          {SECTION_ITEMS["termination"]?.map(itemKey => (
            <p key={itemKey}>
              {t(`termsOfUse.sections.termination.items.${itemKey}` as any)}
            </p>
          ))}
        </div>
        <p className="mt-4">
          {t("termsOfUse.sections.termination.suspension")}
        </p>
      </section>

      {/* Contact */}
      <div className="border-t border-black pt-12">
        <h2 className="mb-6">{t("termsOfUse.contact.title")}</h2>
        <p className="mb-4">{t("termsOfUse.contact.description")}</p>
        <a
          href={`mailto:${t("termsOfUse.contact.email")}`}
          className="inline-block border border-black px-6 py-3 transition-colors hover:bg-black hover:text-white"
          aria-label={t("termsOfUse.contact.emailLabel")}
        >
          {t("termsOfUse.contact.email")}
        </a>
      </div>
    </div>
  )
}
