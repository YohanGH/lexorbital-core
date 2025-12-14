/**
 * Contact page component
 *
 * Displays contact information and a contact form.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"

export function Contact(): JSX.Element {
  const { t } = useTranslation("info")

  return (
    <div className="mx-auto max-w-[800px] px-4 py-12 md:px-8 md:py-16 lg:px-16 lg:py-24">
      <h1 className="mb-12 md:mb-16">{t("contact.title")}</h1>
      <div className="space-y-6 md:space-y-8">
        <p>{t("contact.description")}</p>
        <a
          href={`mailto:${t("contact.email")}`}
          className="inline-block border border-black px-6 py-3 transition-colors hover:bg-black hover:text-white"
          aria-label={t("contact.emailLabel")}
        >
          {t("contact.email")}
        </a>
      </div>
    </div>
  )
}
