/**
 * Glossary page component
 *
 * Displays a glossary of technical terms used in the LexOrbital platform.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"

/**
 * List of term keys in the order they should be displayed
 */
const TERM_KEYS = [
  "architecture",
  "module",
  "version",
  "interfaceLayer",
  "dataStructure",
  "logicEngine",
  "stateManagement",
  "dependency",
  "schema",
  "structuralNeutrality",
  "modularTransparency",
  "framework",
] as const

export function Glossary(): JSX.Element {
  const { t } = useTranslation("info")

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-8 md:py-16 lg:px-16 lg:py-24">
      <h1 className="mb-12 md:mb-16">{t("glossary.title")}</h1>

      <dl className="space-y-6 md:space-y-8">
        {TERM_KEYS.map(termKey => (
          <div
            key={termKey}
            className="grid grid-cols-1 gap-4 border-b border-black pb-6 last:border-b-0 md:grid-cols-12 md:gap-8 md:pb-8"
          >
            <dt className="md:col-span-3">
              <h4>{t(`glossary.terms.${termKey}.term`)}</h4>
            </dt>
            <dd className="md:col-span-9">
              <p className="opacity-75">
                {t(`glossary.terms.${termKey}.definition`)}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
