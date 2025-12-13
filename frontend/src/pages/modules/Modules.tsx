/**
 * Modules page component
 *
 * Displays the modules overview and management interface.
 * This page will be expanded to show the orbital architecture visualization.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"

import { ModuleCard } from "@/components/ModuleCard"

/**
 * Module keys in display order
 */
const MODULE_KEYS = ["a", "b", "c", "d", "e", "f"] as const

export function Modules(): JSX.Element {
  const { t } = useTranslation("home")

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16 lg:px-16 lg:py-24">
      <div className="mb-12 md:mb-16">
        <h1 className="mb-6">{t("modules.title")}</h1>
        <p className="max-w-[800px] opacity-75">{t("modules.description")}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        {MODULE_KEYS.map(moduleKey => (
          <ModuleCard
            key={moduleKey}
            name={t(`modules.items.${moduleKey}.name` as any)}
            role={t(`modules.items.${moduleKey}.role` as any)}
            details={t(`modules.items.${moduleKey}.details` as any)}
          />
        ))}
      </div>
    </div>
  )
}
