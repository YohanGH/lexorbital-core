/**
 * Eco-conception page component
 *
 * Displays eco-design principles and environmental commitments.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"

/**
 * Strategy item keys in display order
 */
const STRATEGY_KEYS = [
  "visualComplexity",
  "codeStructure",
  "typography",
  "staticContent",
] as const

/**
 * Performance metrics keys in display order
 */
const METRICS_KEYS = [
  "pageWeight",
  "httpRequests",
  "tracking",
  "caching",
  "markup",
] as const

/**
 * Future goals keys in display order
 */
const FUTURE_GOALS_KEYS = [
  "monitoring",
  "carbonFootprint",
  "optimization",
  "hosting",
] as const

export function EcoConception(): JSX.Element {
  const { t } = useTranslation("legal")

  return (
    <div className="mx-auto max-w-[900px] px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
      <h1 className="mb-12 md:mb-16">{t("ecoConception.title")}</h1>

      <section className="mb-12">
        <h2 className="mb-6">{t("ecoConception.sustainability.title")}</h2>
        <p className="mb-4">{t("ecoConception.sustainability.paragraph1")}</p>
        <p>{t("ecoConception.sustainability.paragraph2")}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("ecoConception.strategies.title")}</h2>
        <div className="space-y-6">
          {STRATEGY_KEYS.map(strategyKey => (
            <div key={strategyKey}>
              <h4 className="mb-2">
                {t(
                  `ecoConception.strategies.items.${strategyKey}.title` as any
                )}
              </h4>
              <p className="opacity-75">
                {t(
                  `ecoConception.strategies.items.${strategyKey}.description` as any
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("ecoConception.metrics.title")}</h2>
        <div className="space-y-4 border border-black p-6 md:p-8">
          {METRICS_KEYS.map(metricKey => (
            <p key={metricKey}>
              {t(`ecoConception.metrics.items.${metricKey}` as any)}
            </p>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("ecoConception.futureGoals.title")}</h2>
        <p className="mb-4">{t("ecoConception.futureGoals.description")}</p>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          {FUTURE_GOALS_KEYS.map(goalKey => (
            <p key={goalKey}>
              {t(`ecoConception.futureGoals.items.${goalKey}` as any)}
            </p>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("ecoConception.userContribution.title")}</h2>
        <p>{t("ecoConception.userContribution.description")}</p>
      </section>
    </div>
  )
}
