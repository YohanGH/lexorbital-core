/**
 * Home page component
 *
 * Main landing page displaying service status and modules overview.
 * This page fetches data from the backend API and displays it in a dashboard format.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "wouter"

import { VersionButton } from "@/components/VersionButton"

export function Home(): JSX.Element {
  const { t } = useTranslation("home")
  const [, setLocation] = useLocation()

  const handleNavigate = (page: string): void => {
    setLocation(`/${page}`)
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16 lg:px-16 lg:py-24">
      {/* Title Section */}
      <div className="mb-16 md:mb-24 lg:mb-32">
        <h1 className="mb-6">{t("home.title")}</h1>
        <p className="max-w-[800px] opacity-75">{t("home.description")}</p>
      </div>

      {/* Version Selector */}
      <div className="mb-16 md:mb-20 lg:mb-24">
        <VersionButton />
      </div>

      {/* Architecture Diagram Placeholder */}
      <div className="mb-16 border border-black p-8 md:mb-24 md:p-12 lg:mb-32 lg:p-16">
        <p className="opacity-50">
          {t("home.architectureDiagram.placeholder")}
        </p>
      </div>

      {/* Placeholder Sections */}
      <div className="mb-16 grid grid-cols-1 gap-6 md:mb-24 md:grid-cols-12 md:gap-8 lg:mb-32">
        {/* Modules Overview Placeholder */}
        <div className="min-h-[400px] border border-black p-8 md:col-span-12 md:p-12 lg:col-span-8 lg:p-16">
          <h2 className="mb-6 md:mb-8">{t("home.modulesOverview.title")}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="border border-black p-6 opacity-25 md:p-8"
              >
                <div className="mb-4 h-20 w-full bg-black opacity-10 md:h-24" />
                <p>{t("home.modulesOverview.placeholder", { number: i })}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About Architecture */}
        <div className="flex min-h-[300px] flex-col justify-between border border-black p-8 md:col-span-12 md:min-h-[400px] md:p-12 lg:col-span-4 lg:p-16">
          <div>
            <h3 className="mb-4">{t("home.aboutArchitecture.title")}</h3>
            <p className="mb-8 opacity-50">
              {t("home.aboutArchitecture.description")}
            </p>
          </div>
          <button
            onClick={() => handleNavigate("about")}
            className="w-full border border-black px-6 py-3 transition-colors hover:bg-black hover:text-white md:w-auto"
          >
            {t("home.aboutArchitecture.learnMore")}
          </button>
        </div>
      </div>
    </div>
  )
}
