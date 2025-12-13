/**
 * Ethics page component
 *
 * Displays ethical principles and commitments of LexOrbital.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"

/**
 * Enforcement items keys in display order
 */
const ENFORCEMENT_KEYS = [
  "audits",
  "feedback",
  "documentation",
  "refinement",
] as const

export function Ethics(): JSX.Element {
  const { t } = useTranslation("legal")

  return (
    <div className="mx-auto max-w-[900px] px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
      <h1 className="mb-12 md:mb-16">{t("ethics.title")}</h1>

      <section className="mb-12">
        <h2 className="mb-6">{t("ethics.corePrinciples.title")}</h2>
        <p className="mb-4">{t("ethics.corePrinciples.description")}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("ethics.transparency.title")}</h2>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          <div>
            <h4 className="mb-2">
              {t("ethics.transparency.architectural.title")}
            </h4>
            <p className="opacity-75">
              {t("ethics.transparency.architectural.description")}
            </p>
          </div>
          <div>
            <h4 className="mb-2">{t("ethics.transparency.honest.title")}</h4>
            <p className="opacity-75">
              {t("ethics.transparency.honest.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("ethics.privacy.title")}</h2>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          <div>
            <h4 className="mb-2">{t("ethics.privacy.minimal.title")}</h4>
            <p className="opacity-75">
              {t("ethics.privacy.minimal.description")}
            </p>
          </div>
          <div>
            <h4 className="mb-2">{t("ethics.privacy.byDesign.title")}</h4>
            <p className="opacity-75">
              {t("ethics.privacy.byDesign.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("ethics.accessibility.title")}</h2>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          <div>
            <h4 className="mb-2">
              {t("ethics.accessibility.universal.title")}
            </h4>
            <p className="opacity-75">
              {t("ethics.accessibility.universal.description")}
            </p>
          </div>
          <div>
            <h4 className="mb-2">{t("ethics.accessibility.language.title")}</h4>
            <p className="opacity-75">
              {t("ethics.accessibility.language.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("ethics.environmental.title")}</h2>
        <p className="opacity-75">{t("ethics.environmental.description")}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("ethics.integrity.title")}</h2>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          <div>
            <h4 className="mb-2">{t("ethics.integrity.attribution.title")}</h4>
            <p className="opacity-75">
              {t("ethics.integrity.attribution.description")}
            </p>
          </div>
          <div>
            <h4 className="mb-2">
              {t("ethics.integrity.documentation.title")}
            </h4>
            <p className="opacity-75">
              {t("ethics.integrity.documentation.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("ethics.userAgency.title")}</h2>
        <p className="opacity-75">{t("ethics.userAgency.description")}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("ethics.enforcement.title")}</h2>
        <p className="mb-4">{t("ethics.enforcement.description")}</p>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          {ENFORCEMENT_KEYS.map(itemKey => (
            <p key={itemKey}>
              {t(`ethics.enforcement.items.${itemKey}` as any)}
            </p>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("ethics.evolution.title")}</h2>
        <p>{t("ethics.evolution.description")}</p>
      </section>
    </div>
  )
}
