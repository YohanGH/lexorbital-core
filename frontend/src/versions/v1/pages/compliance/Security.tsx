/**
 * Security page component
 *
 * Displays security policies, practices, and information.
 */

import type { JSX } from "react"
import { useTranslation } from "react-i18next"

/**
 * What to include item keys
 */
const WHAT_TO_INCLUDE_KEYS = [
  "description",
  "steps",
  "impact",
  "proof",
  "contact",
  "timeline",
] as const

/**
 * In scope item keys
 */
const IN_SCOPE_KEYS = ["domain", "api", "mobile", "trustCenter"] as const

/**
 * Out of scope item keys
 */
const OUT_OF_SCOPE_KEYS = [
  "socialEngineering",
  "physical",
  "dos",
  "thirdParty",
  "spam",
] as const

/**
 * Rules of engagement item keys
 */
const RULES_KEYS = [
  "data",
  "accounts",
  "exploit",
  "privacy",
  "disclosure",
  "goodFaith",
] as const

/**
 * Bug bounty severity levels
 */
const BUG_BOUNTY_SEVERITIES = ["critical", "high", "medium", "low"] as const

/**
 * Account security item keys
 */
const ACCOUNT_SECURITY_KEYS = [
  "2fa",
  "password",
  "sessions",
  "credentials",
] as const

/**
 * Data protection item keys
 */
const DATA_PROTECTION_KEYS = ["classify", "rbac", "audit", "logging"] as const

/**
 * Suspicious activity item keys
 */
const SUSPICIOUS_ACTIVITY_KEYS = [
  "report",
  "verify",
  "phishing",
  "contact",
] as const

export function Security(): JSX.Element {
  const { t } = useTranslation("legal")

  return (
    <div className="mx-auto max-w-[900px] px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
      <h1 className="mb-12 md:mb-16">{t("security.title")}</h1>

      <section className="mb-12">
        <h2 className="mb-6">{t("security.overview.title")}</h2>
        <p className="mb-4">{t("security.overview.paragraph1")}</p>
        <p className="opacity-75">{t("security.overview.paragraph2")}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("security.vulnerabilityDisclosure.title")}</h2>
        <div className="mb-6 border border-black p-8">
          <h3 className="mb-6">
            {t("security.vulnerabilityDisclosure.howToReport.title")}
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="mb-3">
                {t(
                  "security.vulnerabilityDisclosure.howToReport.secureCommunication.title"
                )}
              </h4>
              <p className="mb-3 opacity-75">
                {t(
                  "security.vulnerabilityDisclosure.howToReport.secureCommunication.description"
                )}
              </p>
              <a
                href={`mailto:${t("security.vulnerabilityDisclosure.howToReport.secureCommunication.email")}`}
                className="inline-block border border-black px-6 py-3 transition-colors hover:bg-black hover:text-white"
                aria-label={t(
                  "security.vulnerabilityDisclosure.howToReport.secureCommunication.emailLabel"
                )}
              >
                {t(
                  "security.vulnerabilityDisclosure.howToReport.secureCommunication.email"
                )}
              </a>
              <p className="mt-3 opacity-75">
                {t(
                  "security.vulnerabilityDisclosure.howToReport.secureCommunication.pgpNote"
                )}
              </p>
            </div>

            <div>
              <h4 className="mb-3">
                {t(
                  "security.vulnerabilityDisclosure.howToReport.whatToInclude.title"
                )}
              </h4>
              <div className="space-y-2 border-l-2 border-black pl-6 opacity-75">
                {WHAT_TO_INCLUDE_KEYS.map(itemKey => (
                  <p key={itemKey}>
                    {t(
                      `security.vulnerabilityDisclosure.howToReport.whatToInclude.items.${itemKey}` as any
                    )}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3">
                {t(
                  "security.vulnerabilityDisclosure.howToReport.responseTimeline.title"
                )}
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="border border-black p-4">
                  <p className="mb-2">
                    {t(
                      "security.vulnerabilityDisclosure.howToReport.responseTimeline.initialResponse.label"
                    )}
                  </p>
                  <p className="text-2xl">
                    {t(
                      "security.vulnerabilityDisclosure.howToReport.responseTimeline.initialResponse.value"
                    )}
                  </p>
                </div>
                <div className="border border-black p-4">
                  <p className="mb-2">
                    {t(
                      "security.vulnerabilityDisclosure.howToReport.responseTimeline.assessment.label"
                    )}
                  </p>
                  <p className="text-2xl">
                    {t(
                      "security.vulnerabilityDisclosure.howToReport.responseTimeline.assessment.value"
                    )}
                  </p>
                </div>
                <div className="border border-black p-4">
                  <p className="mb-2">
                    {t(
                      "security.vulnerabilityDisclosure.howToReport.responseTimeline.remediationCritical.label"
                    )}
                  </p>
                  <p className="text-2xl">
                    {t(
                      "security.vulnerabilityDisclosure.howToReport.responseTimeline.remediationCritical.value"
                    )}
                  </p>
                </div>
                <div className="border border-black p-4">
                  <p className="mb-2">
                    {t(
                      "security.vulnerabilityDisclosure.howToReport.responseTimeline.remediationMedium.label"
                    )}
                  </p>
                  <p className="text-2xl">
                    {t(
                      "security.vulnerabilityDisclosure.howToReport.responseTimeline.remediationMedium.value"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("security.scope.title")}</h2>

        <div className="mb-8">
          <h3 className="mb-4">{t("security.scope.inScope.title")}</h3>
          <div className="space-y-2 border-l-2 border-black pl-6 md:pl-8">
            {IN_SCOPE_KEYS.map(itemKey => (
              <p key={itemKey}>
                {t(`security.scope.inScope.items.${itemKey}` as any)}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4">{t("security.scope.outOfScope.title")}</h3>
          <div className="space-y-2 border-l-2 border-black pl-6 opacity-75 md:pl-8">
            {OUT_OF_SCOPE_KEYS.map(itemKey => (
              <p key={itemKey}>
                {t(`security.scope.outOfScope.items.${itemKey}` as any)}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4">{t("security.scope.rules.title")}</h3>
          <div className="space-y-3 border border-black p-6">
            {RULES_KEYS.map(itemKey => (
              <p key={itemKey}>
                {t(`security.scope.rules.items.${itemKey}` as any)}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("security.bugBounty.title")}</h2>
        <p className="mb-6">{t("security.bugBounty.description")}</p>

        <div className="mb-6 overflow-x-auto border border-black">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black">
                <th className="border-r border-black p-4 text-left">
                  {t("security.bugBounty.table.headers.severity")}
                </th>
                <th className="border-r border-black p-4 text-left">
                  {t("security.bugBounty.table.headers.cvss")}
                </th>
                <th className="border-r border-black p-4 text-left">
                  {t("security.bugBounty.table.headers.examples")}
                </th>
                <th className="p-4 text-left">
                  {t("security.bugBounty.table.headers.reward")}
                </th>
              </tr>
            </thead>
            <tbody>
              {BUG_BOUNTY_SEVERITIES.map(severity => (
                <tr
                  key={severity}
                  className={severity !== "low" ? "border-b border-black" : ""}
                >
                  <td className="border-r border-black p-4">
                    {t(
                      `security.bugBounty.table.rows.${severity}.severity` as any
                    )}
                  </td>
                  <td className="border-r border-black p-4">
                    {t(`security.bugBounty.table.rows.${severity}.cvss` as any)}
                  </td>
                  <td className="border-r border-black p-4">
                    {t(
                      `security.bugBounty.table.rows.${severity}.examples` as any
                    )}
                  </td>
                  <td className="p-4">
                    {t(
                      `security.bugBounty.table.rows.${severity}.reward` as any
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm opacity-75">{t("security.bugBounty.note")}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("security.hallOfFame.title")}</h2>
        <p className="mb-6 opacity-75">
          {t("security.hallOfFame.description")}
        </p>

        <div className="border border-black p-8">
          <div className="space-y-6">
            <div className="border-b border-black pb-6">
              <p className="mb-1">
                {t("security.hallOfFame.researchers.alice.name")}
              </p>
              <p className="text-sm opacity-75">
                {t("security.hallOfFame.researchers.alice.description")}
              </p>
            </div>
            <div className="border-b border-black pb-6">
              <p className="mb-1">
                {t("security.hallOfFame.researchers.bob.name")}
              </p>
              <p className="text-sm opacity-75">
                {t("security.hallOfFame.researchers.bob.description")}
              </p>
            </div>
            <div className="border-b border-black pb-6">
              <p className="mb-1">
                {t("security.hallOfFame.researchers.carol.name")}
              </p>
              <p className="text-sm opacity-75">
                {t("security.hallOfFame.researchers.carol.description")}
              </p>
            </div>
            <div>
              <p className="italic opacity-50">
                {t("security.hallOfFame.more")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("security.pgp.title")}</h2>
        <p className="mb-4 opacity-75">{t("security.pgp.description")}</p>

        <div className="mb-4 border border-black p-6">
          <pre className="overflow-x-auto text-xs whitespace-pre-wrap opacity-75">
            {t("security.pgp.key")}
          </pre>
        </div>

        <div className="flex gap-4">
          <button className="border border-black px-6 py-3 transition-colors hover:bg-black hover:text-white">
            {t("security.pgp.download")}
          </button>
          <button className="border border-black px-6 py-3 transition-colors hover:bg-black hover:text-white">
            {t("security.pgp.verify")}
          </button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6">{t("security.bestPractices.title")}</h2>
        <div className="space-y-6">
          <div>
            <h4 className="mb-3">
              {t("security.bestPractices.accountSecurity.title")}
            </h4>
            <div className="space-y-2 border-l-2 border-black pl-6 opacity-75">
              {ACCOUNT_SECURITY_KEYS.map(itemKey => (
                <p key={itemKey}>
                  {t(
                    `security.bestPractices.accountSecurity.items.${itemKey}` as any
                  )}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3">
              {t("security.bestPractices.dataProtection.title")}
            </h4>
            <div className="space-y-2 border-l-2 border-black pl-6 opacity-75">
              {DATA_PROTECTION_KEYS.map(itemKey => (
                <p key={itemKey}>
                  {t(
                    `security.bestPractices.dataProtection.items.${itemKey}` as any
                  )}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3">
              {t("security.bestPractices.suspiciousActivity.title")}
            </h4>
            <div className="space-y-2 border-l-2 border-black pl-6 opacity-75">
              {SUSPICIOUS_ACTIVITY_KEYS.map(itemKey => (
                <p key={itemKey}>
                  {t(
                    `security.bestPractices.suspiciousActivity.items.${itemKey}` as any
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-black pt-12">
        <h2 className="mb-6">{t("security.resources.title")}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <a
            href={`mailto:${t("security.vulnerabilityDisclosure.howToReport.secureCommunication.email")}`}
            className="inline-block border border-black px-6 py-3 text-center transition-colors hover:bg-black hover:text-white"
            aria-label={t(
              "security.vulnerabilityDisclosure.howToReport.secureCommunication.emailLabel"
            )}
          >
            {t("security.resources.reportVulnerability")}
          </a>
          <button className="border border-black px-6 py-3 transition-colors hover:bg-black hover:text-white">
            {t("security.resources.viewTrustCenter")}
          </button>
          <button className="border border-black px-6 py-3 transition-colors hover:bg-black hover:text-white">
            {t("security.resources.advisories")}
          </button>
          <button className="border border-black px-6 py-3 transition-colors hover:bg-black hover:text-white">
            {t("security.resources.certifications")}
          </button>
        </div>
      </div>
    </div>
  )
}
