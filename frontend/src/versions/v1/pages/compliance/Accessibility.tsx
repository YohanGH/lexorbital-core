/**
 * Accessibility page component
 *
 * Displays accessibility information and compliance status.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"

/**
 * Accessibility features keys in display order
 */
const FEATURE_KEYS = [
  "semantic",
  "contrast",
  "keyboard",
  "focus",
  "labels",
  "navigation",
] as const

/**
 * Known limitations keys in display order
 */
const LIMITATION_KEYS = ["screenReader", "altText", "responsive"] as const

export function Accessibility(): JSX.Element {
  const { t } = useTranslation("legal")

  return (
    <div className="mx-auto max-w-[900px] px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
      <h1 className="mb-12 md:mb-16">{t("accessibility.title")}</h1>

      <section className="mb-12">
        <h2 className="mb-6">{t("accessibility.commitment.title")}</h2>
        <p className="mb-4">{t("accessibility.commitment.paragraph1")}</p>
        <p>{t("accessibility.commitment.paragraph2")}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("accessibility.features.title")}</h2>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          {FEATURE_KEYS.map(featureKey => (
            <p key={featureKey}>
              {t(`accessibility.features.items.${featureKey}` as any)}
            </p>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("accessibility.limitations.title")}</h2>
        <p className="mb-4">{t("accessibility.limitations.description")}</p>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          {LIMITATION_KEYS.map(limitationKey => (
            <p key={limitationKey}>
              {t(`accessibility.limitations.items.${limitationKey}` as any)}
            </p>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("accessibility.feedback.title")}</h2>
        <p>{t("accessibility.feedback.description")}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("accessibility.improvements.title")}</h2>
        <p>{t("accessibility.improvements.description")}</p>
      </section>
    </div>
  )
}
