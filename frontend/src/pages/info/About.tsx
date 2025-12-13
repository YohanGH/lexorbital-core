/**
 * About page component
 *
 * Displays information about LexOrbital, its mission, vision, and team.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"

/**
 * List of goal keys in the order they should be displayed
 */
const GOAL_KEYS = [
  "structuralClarity",
  "modularTransparency",
  "versionAwareness",
  "documentationIntegration",
] as const

/**
 * List of planned enhancement item keys
 */
const PLANNED_ENHANCEMENT_KEYS = [
  "dynamicVisualization",
  "comparisonTools",
  "dependencyMapping",
  "documentationSystem",
] as const

/**
 * List of visual evolution item keys
 */
const VISUAL_EVOLUTION_KEYS = [
  "colorSystem",
  "iconography",
  "visualLanguage",
  "typography",
] as const

export function About(): JSX.Element {
  const { t } = useTranslation("info")

  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 md:px-8 md:py-16 lg:px-16 lg:py-24">
      <h1 className="mb-12 md:mb-16">{t("about.title")}</h1>

      <section className="mb-12 md:mb-16">
        <h2 className="mb-6">{t("about.whatIs.title")}</h2>
        <p className="mb-4">{t("about.whatIs.paragraph1")}</p>
        <p className="mb-4">{t("about.whatIs.paragraph2")}</p>
        <p>{t("about.whatIs.paragraph3")}</p>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="mb-6">{t("about.goals.title")}</h2>
        <div className="space-y-6 border-l-2 border-black pl-6 md:pl-8">
          {GOAL_KEYS.map(goalKey => (
            <div key={goalKey}>
              <h4 className="mb-2">{t(`about.goals.${goalKey}.title`)}</h4>
              <p className="opacity-75">
                {t(`about.goals.${goalKey}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="mb-6">{t("about.futureVersions.title")}</h2>
        <div className="border border-black p-8 opacity-50 md:p-12">
          <h3 className="mb-4">{t("about.futureVersions.subtitle")}</h3>
          <p className="mb-6">{t("about.futureVersions.description")}</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div>
              <h4 className="mb-2">
                {t("about.futureVersions.plannedEnhancements.title")}
              </h4>
              <ul className="space-y-2 opacity-75">
                {PLANNED_ENHANCEMENT_KEYS.map(itemKey => (
                  <li key={itemKey}>
                    {t(
                      `about.futureVersions.plannedEnhancements.items.${itemKey}`
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2">
                {t("about.futureVersions.visualEvolution.title")}
              </h4>
              <ul className="space-y-2 opacity-75">
                {VISUAL_EVOLUTION_KEYS.map(itemKey => (
                  <li key={itemKey}>
                    {t(`about.futureVersions.visualEvolution.items.${itemKey}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
