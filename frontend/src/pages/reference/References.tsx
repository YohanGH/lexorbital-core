/**
 * References page component
 *
 * Displays references, sources, and bibliography.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"

/**
 * Category keys in display order
 */
const CATEGORY_KEYS = [
  "designPrinciples",
  "technicalArchitecture",
  "sustainability",
  "typography",
] as const

/**
 * Item keys for each category
 */
const ITEM_KEYS: Record<(typeof CATEGORY_KEYS)[number], readonly string[]> = {
  designPrinciples: ["brutalist", "wcag"],
  technicalArchitecture: ["modular", "html5"],
  sustainability: ["ecoConception", "greenWeb"],
  typography: ["roboto"],
} as const

/**
 * Attribution principle keys
 */
const ATTRIBUTION_PRINCIPLES = [
  "intellectualHonesty",
  "openStandards",
  "evolvingDocumentation",
] as const

export function References(): JSX.Element {
  const { t } = useTranslation("reference")

  return (
    <div className="mx-auto max-w-[900px] px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
      <h1 className="mb-12 md:mb-16">{t("title")}</h1>

      <p className="mb-12 opacity-75 md:mb-16">{t("description")}</p>

      <div className="space-y-12 md:space-y-16">
        {CATEGORY_KEYS.map(categoryKey => {
          const itemKeys = ITEM_KEYS[categoryKey]
          return (
            <section key={categoryKey}>
              <h2 className="mb-6 md:mb-8">
                {t(`categories.${categoryKey}.title`)}
              </h2>
              <div className="space-y-6">
                {itemKeys.map(itemKey => (
                  <div
                    key={itemKey}
                    className="border-l-2 border-black pb-6 pl-6 last:pb-0 md:pl-8"
                  >
                    <h4 className="mb-2">
                      {t(
                        `categories.${categoryKey}.items.${itemKey}.title` as any
                      )}
                    </h4>
                    <p className="mb-2 opacity-75">
                      {t(
                        `categories.${categoryKey}.items.${itemKey}.description` as any
                      )}
                    </p>
                    <p className="opacity-50">
                      {t(
                        `categories.${categoryKey}.items.${itemKey}.type` as any
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <section className="mt-16 border-t border-black pt-12 md:mt-24 md:pt-16">
        <h2 className="mb-6 md:mb-8">{t("attribution.title")}</h2>
        <p className="mb-6 opacity-75">{t("attribution.description")}</p>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          {ATTRIBUTION_PRINCIPLES.map(principleKey => (
            <p key={principleKey}>
              <span className="opacity-100">
                {t(`attribution.principles.${principleKey}.title`)}
              </span>
              <span className="opacity-75">
                {" "}
                {t(`attribution.principles.${principleKey}.description`)}
              </span>
            </p>
          ))}
        </div>
      </section>

      <section className="mt-12 md:mt-16">
        <h2 className="mb-6 md:mb-8">{t("contributing.title")}</h2>
        <p className="opacity-75">{t("contributing.description")}</p>
      </section>
    </div>
  )
}
