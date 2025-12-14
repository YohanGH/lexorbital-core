/**
 * Disclosure page component
 *
 * Displays transparency and disclosure information.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"

/**
 * Company information keys in display order
 */
const COMPANY_KEYS = [
  "legalEntity",
  "registrationNumber",
  "vatNumber",
  "headquarters",
  "publicationDirector",
] as const

/**
 * Security reporting step 2 item keys
 */
const REPORTING_STEP2_KEYS = [
  "description",
  "steps",
  "proof",
  "contact",
] as const

/**
 * Security reporting step 3 item keys
 */
const REPORTING_STEP3_KEYS = [
  "acknowledgment",
  "assessment",
  "updates",
] as const

/**
 * Safe harbor item keys
 */
const SAFE_HARBOR_KEYS = ["goodFaith", "privacy", "exploit", "time"] as const

/**
 * Limitations item keys
 */
const LIMITATIONS_KEYS = [
  "availability",
  "accuracy",
  "thirdParty",
  "professional",
] as const

export function Disclosure(): JSX.Element {
  const { t } = useTranslation("legal")

  return (
    <div className="mx-auto max-w-[900px] px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
      <h1 className="mb-12 md:mb-16">{t("disclosure.title")}</h1>

      <section className="mb-12">
        <h2 className="mb-6">{t("disclosure.company.title")}</h2>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          {COMPANY_KEYS.map(key => (
            <p key={key}>
              <span className="opacity-100">
                {t(`disclosure.company.items.${key}.label` as any)}
              </span>
              <span className="opacity-75">
                {" "}
                {t(`disclosure.company.items.${key}.value` as any)}
              </span>
            </p>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("disclosure.hosting.title")}</h2>
        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          <div>
            <h4 className="mb-2">
              {t("disclosure.hosting.primaryHosting.title")}
            </h4>
            <p
              className="opacity-75"
              dangerouslySetInnerHTML={{
                __html: t("disclosure.hosting.primaryHosting.description"),
              }}
            />
          </div>
          <div>
            <h4 className="mb-2">{t("disclosure.hosting.cdn.title")}</h4>
            <p
              className="opacity-75"
              dangerouslySetInnerHTML={{
                __html: t("disclosure.hosting.cdn.description"),
              }}
            />
          </div>
          <div>
            <h4 className="mb-2">{t("disclosure.hosting.backup.title")}</h4>
            <p
              className="opacity-75"
              dangerouslySetInnerHTML={{
                __html: t("disclosure.hosting.backup.description"),
              }}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("disclosure.intellectualProperty.title")}</h2>
        <div className="space-y-6">
          <div>
            <h4 className="mb-2">
              {t("disclosure.intellectualProperty.platform.title")}
            </h4>
            <p className="mb-4 opacity-75">
              {t("disclosure.intellectualProperty.platform.paragraph1")}
            </p>
            <p className="opacity-75">
              {t("disclosure.intellectualProperty.platform.paragraph2")}
            </p>
          </div>

          <div>
            <h4 className="mb-2">
              {t("disclosure.intellectualProperty.openSource.title")}
            </h4>
            <p className="mb-4 opacity-75">
              {t("disclosure.intellectualProperty.openSource.description")}
            </p>
            <div className="border border-black p-6">
              <p
                className="text-sm opacity-75"
                dangerouslySetInnerHTML={{
                  __html: t(
                    "disclosure.intellectualProperty.openSource.licenses"
                  ),
                }}
              />
            </div>
          </div>

          <div>
            <h4 className="mb-2">
              {t("disclosure.intellectualProperty.trademarks.title")}
            </h4>
            <p className="opacity-75">
              {t("disclosure.intellectualProperty.trademarks.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("disclosure.security.title")}</h2>
        <p className="mb-6">{t("disclosure.security.description")}</p>

        <div className="mb-6 border border-black p-8">
          <h3 className="mb-4">{t("disclosure.security.reporting.title")}</h3>
          <div className="space-y-4 opacity-75">
            <p>
              <span className="opacity-100">
                {t("disclosure.security.reporting.step1.label")}
              </span>
              <br />
              {t("disclosure.security.reporting.step1.email")}{" "}
              <a
                href={`mailto:${t("disclosure.security.reporting.step1.emailValue")}`}
                className="border-b border-black transition-colors hover:bg-black hover:text-white"
                aria-label={t("disclosure.security.reporting.step1.emailLabel")}
              >
                {t("disclosure.security.reporting.step1.emailValue")}
              </a>
              <br />
              {t("disclosure.security.reporting.step1.pgp")}
            </p>
            <p>
              <span className="opacity-100">
                {t("disclosure.security.reporting.step2.label")}
              </span>
              <br />
              {REPORTING_STEP2_KEYS.map(itemKey => (
                <span key={itemKey}>
                  {t(
                    `disclosure.security.reporting.step2.items.${itemKey}` as any
                  )}
                  <br />
                </span>
              ))}
            </p>
            <p>
              <span className="opacity-100">
                {t("disclosure.security.reporting.step3.label")}
              </span>
              <br />
              {REPORTING_STEP3_KEYS.map(itemKey => (
                <span key={itemKey}>
                  {t(
                    `disclosure.security.reporting.step3.items.${itemKey}` as any
                  )}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="space-y-4 border-l-2 border-black pl-6 md:pl-8">
          <div>
            <h4 className="mb-2">
              {t("disclosure.security.safeHarbor.title")}
            </h4>
            <p className="mb-4 opacity-75">
              {t("disclosure.security.safeHarbor.description")}
            </p>
            <p className="ml-4 opacity-75">
              {SAFE_HARBOR_KEYS.map(itemKey => (
                <span key={itemKey}>
                  {t(`disclosure.security.safeHarbor.items.${itemKey}` as any)}
                  <br />
                </span>
              ))}
            </p>
          </div>

          <div>
            <h4 className="mb-2">
              {t("disclosure.security.recognition.title")}
            </h4>
            <p className="opacity-75">
              {t("disclosure.security.recognition.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("disclosure.limitations.title")}</h2>
        <div className="space-y-4 border border-black p-6">
          {LIMITATIONS_KEYS.map(itemKey => (
            <p key={itemKey}>
              <span className="opacity-100">
                {t(`disclosure.limitations.items.${itemKey}.label` as any)}
              </span>
              <span className="opacity-75">
                {" "}
                {t(
                  `disclosure.limitations.items.${itemKey}.description` as any
                )}
              </span>
            </p>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("disclosure.dispute.title")}</h2>
        <div className="space-y-6">
          <div>
            <h4 className="mb-2">
              {t("disclosure.dispute.governingLaw.title")}
            </h4>
            <p className="opacity-75">
              {t("disclosure.dispute.governingLaw.description")}
            </p>
          </div>

          <div>
            <h4 className="mb-2">{t("disclosure.dispute.mediation.title")}</h4>
            <p className="opacity-75">
              {t("disclosure.dispute.mediation.description")}
            </p>
          </div>

          <div>
            <h4 className="mb-2">
              {t("disclosure.dispute.jurisdiction.title")}
            </h4>
            <p className="opacity-75">
              {t("disclosure.dispute.jurisdiction.description")}
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-black pt-12">
        <h2 className="mb-6">{t("disclosure.contact.title")}</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href={`mailto:${t("disclosure.contact.legal.email")}`}
            className="inline-block border border-black px-6 py-3 transition-colors hover:bg-black hover:text-white"
            aria-label={t("disclosure.contact.legal.emailLabel")}
          >
            {t("disclosure.contact.legal.label")}
          </a>
          <a
            href={`mailto:${t("disclosure.contact.security.email")}`}
            className="inline-block border border-black px-6 py-3 transition-colors hover:bg-black hover:text-white"
            aria-label={t("disclosure.contact.security.emailLabel")}
          >
            {t("disclosure.contact.security.label")}
          </a>
          <a
            href={`mailto:${t("disclosure.contact.privacy.email")}`}
            className="inline-block border border-black px-6 py-3 transition-colors hover:bg-black hover:text-white"
            aria-label={t("disclosure.contact.privacy.emailLabel")}
          >
            {t("disclosure.contact.privacy.label")}
          </a>
        </div>
      </div>
    </div>
  )
}
