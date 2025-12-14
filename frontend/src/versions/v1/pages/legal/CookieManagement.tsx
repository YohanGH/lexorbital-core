/**
 * Cookie Management page component
 *
 * Displays cookie management interface and preferences.
 */

import type { JSX } from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

interface CookieConsent {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}

interface CookieDetails {
  name: string
  purpose: string
  duration: string
}

/**
 * Cookie category keys in display order
 */
const COOKIE_CATEGORIES = [
  "necessary",
  "functional",
  "analytics",
  "marketing",
] as const

type CookieCategoryKey = (typeof COOKIE_CATEGORIES)[number]

/**
 * Cookie keys for each category
 */
const COOKIE_KEYS: Record<CookieCategoryKey, string[]> = {
  necessary: ["session", "language", "consent"],
  functional: ["theme", "sidebar"],
  analytics: ["ga", "gaSession"],
  marketing: [],
}

export function CookieManagement(): JSX.Element {
  const { t } = useTranslation("legal")
  const [cookieConsent, setCookieConsent] = useState<CookieConsent>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  })
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  // Load saved preferences on mount
  useEffect(() => {
    const saved = localStorage.getItem("lexorbital-cookie-consent")
    if (saved) {
      try {
        setCookieConsent(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse cookie consent:", e)
      }
    }
  }, [])

  const handleToggle = (category: keyof CookieConsent): void => {
    if (category === "necessary") return // Cannot disable necessary cookies
    setCookieConsent(prev => ({ ...prev, [category]: !prev[category] }))
  }

  const handleAcceptAll = (): void => {
    const newConsent = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    }
    setCookieConsent(newConsent)
    localStorage.setItem(
      "lexorbital-cookie-consent",
      JSON.stringify(newConsent)
    )
    setShowConfirmModal(true)
  }

  const handleRejectAll = (): void => {
    const newConsent = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    }
    setCookieConsent(newConsent)
    localStorage.setItem(
      "lexorbital-cookie-consent",
      JSON.stringify(newConsent)
    )
    setShowConfirmModal(true)
  }

  const handleSave = (): void => {
    localStorage.setItem(
      "lexorbital-cookie-consent",
      JSON.stringify(cookieConsent)
    )
    setShowConfirmModal(true)
  }

  const toggleCategory = (category: string): void => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  const getCookieCount = (category: keyof CookieConsent): number => {
    const counts = {
      necessary: 3,
      functional: 2,
      analytics: 2,
      marketing: 0,
    }
    return counts[category]
  }

  const getTotalActiveCookies = (): number => {
    let total = 3 // Necessary cookies always active
    if (cookieConsent.functional) total += 2
    if (cookieConsent.analytics) total += 2
    if (cookieConsent.marketing) total += 0
    return total
  }

  const getCookiesForCategory = (
    category: CookieCategoryKey
  ): CookieDetails[] => {
    const cookieKeys = COOKIE_KEYS[category]
    return cookieKeys.map(key => ({
      name: t(
        `cookieManagement.categories.${category}.cookies.${key}.name` as any
      ),
      purpose: t(
        `cookieManagement.categories.${category}.cookies.${key}.purpose` as any
      ),
      duration: t(
        `cookieManagement.categories.${category}.cookies.${key}.duration` as any
      ),
    }))
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            🍪
          </span>
          <h1>{t("cookieManagement.title")}</h1>
        </div>
        <p className="max-w-[800px] opacity-75">
          {t("cookieManagement.description")}
        </p>
      </div>

      {/* Active Cookies Counter */}
      <div className="mb-8 border border-black bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-1" style={{ fontWeight: "500" }}>
              {t("cookieManagement.activeCookies.title")}
            </p>
            <p className="text-sm opacity-50">
              {t("cookieManagement.activeCookies.subtitle")}
            </p>
          </div>
          <div className="text-4xl" style={{ fontWeight: "500" }}>
            {getTotalActiveCookies()}
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-8 border-b border-black pb-8">
        <h2 className="mb-4">{t("cookieManagement.whatIsCookie.title")}</h2>
        <div className="space-y-4 opacity-75">
          <p>{t("cookieManagement.whatIsCookie.paragraph1")}</p>
          <p>{t("cookieManagement.whatIsCookie.paragraph2")}</p>
        </div>
      </div>

      {/* Cookie Categories */}
      <div className="mb-12 space-y-4">
        <h2 className="mb-6">{t("cookieManagement.categories.title")}</h2>

        {COOKIE_CATEGORIES.map(category => {
          const cookies = getCookiesForCategory(category)
          return (
            <CookieCategory
              key={category}
              title={t(`cookieManagement.categories.${category}.title`)}
              subtitle={t(`cookieManagement.categories.${category}.subtitle`)}
              description={t(
                `cookieManagement.categories.${category}.description`
              )}
              enabled={cookieConsent[category]}
              onToggle={() => handleToggle(category)}
              locked={category === "necessary"}
              cookieCount={getCookieCount(category)}
              expanded={expandedCategory === category}
              onToggleExpand={() => toggleCategory(category)}
              cookies={cookies}
            />
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="border-t border-black pt-8">
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={handleAcceptAll}
            className="min-h-[48px] flex-1 border border-black bg-black px-6 py-3 text-white transition-opacity hover:opacity-75"
            aria-label={t("cookieManagement.actions.acceptAllAria")}
          >
            {t("cookieManagement.actions.acceptAll")}
          </button>
          <button
            onClick={handleRejectAll}
            className="min-h-[48px] flex-1 border border-black bg-white px-6 py-3 text-black transition-colors hover:bg-black hover:text-white"
            aria-label={t("cookieManagement.actions.rejectAllAria")}
          >
            {t("cookieManagement.actions.rejectAll")}
          </button>
          <button
            onClick={handleSave}
            className="min-h-[48px] flex-1 border border-black bg-white px-6 py-3 text-black transition-colors hover:bg-black hover:text-white"
            aria-label={t("cookieManagement.actions.saveAria")}
          >
            {t("cookieManagement.actions.save")}
          </button>
        </div>
        <p className="mt-4 text-center text-sm opacity-50">
          {t("cookieManagement.actions.note")}
        </p>
      </div>

      {/* Legal Information */}
      <div className="mt-16 border-t border-black pt-8">
        <h2 className="mb-6">{t("cookieManagement.legal.title")}</h2>
        <div className="space-y-6 opacity-75">
          <div>
            <p className="mb-2" style={{ fontWeight: "500" }}>
              {t("cookieManagement.legal.retention.title")}
            </p>
            <p className="text-sm">
              {t("cookieManagement.legal.retention.description")}
            </p>
          </div>
          <div>
            <p className="mb-2" style={{ fontWeight: "500" }}>
              {t("cookieManagement.legal.recipients.title")}
            </p>
            <p className="text-sm">
              {t("cookieManagement.legal.recipients.description")}
            </p>
          </div>
          <div>
            <p className="mb-2" style={{ fontWeight: "500" }}>
              {t("cookieManagement.legal.gdpr.title")}
            </p>
            <p className="text-sm">
              {t("cookieManagement.legal.gdpr.description")}
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          onClose={() => setShowConfirmModal(false)}
          activeCookies={getTotalActiveCookies()}
        />
      )}
    </div>
  )
}

interface CookieCategoryProps {
  title: string
  subtitle: string
  description: string
  enabled: boolean
  onToggle: () => void
  locked?: boolean
  cookieCount: number
  expanded: boolean
  onToggleExpand: () => void
  cookies: CookieDetails[]
}

function CookieCategory({
  title,
  subtitle,
  description,
  enabled,
  onToggle,
  locked = false,
  cookieCount,
  expanded,
  onToggleExpand,
  cookies,
}: CookieCategoryProps): JSX.Element {
  const { t } = useTranslation("legal")

  return (
    <div className="border border-black">
      <div className="p-6">
        <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <h3>{title}</h3>
              {subtitle && (
                <span className="text-sm opacity-50">{subtitle}</span>
              )}
            </div>
            <p className="text-sm opacity-75">{description}</p>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={onToggle}
            disabled={locked}
            className={`relative h-10 w-16 shrink-0 border-2 border-black transition-all ${enabled ? "bg-black" : "bg-white"} ${locked ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:opacity-75"} `}
            aria-label={`Toggle ${title}`}
            aria-checked={enabled}
            role="switch"
          >
            <span
              className={`absolute top-1 h-6 w-6 border border-black transition-transform duration-200 ${enabled ? "right-1 bg-white" : "left-1 bg-black"} `}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Cookie Count and Expand Button */}
        <div className="flex items-center justify-between border-t border-black pt-4">
          <p className="text-sm opacity-50">
            {cookieCount === 0
              ? t("cookieManagement.cookieDetails.none")
              : t("cookieManagement.cookieDetails.count", {
                  count: cookieCount,
                })}
          </p>
          {cookies.length > 0 && (
            <button
              onClick={onToggleExpand}
              className="border border-black px-3 py-1 text-sm transition-colors hover:bg-black hover:text-white"
              aria-expanded={expanded}
            >
              {expanded
                ? t("cookieManagement.cookieDetails.hideDetails")
                : t("cookieManagement.cookieDetails.showDetails")}
            </button>
          )}
        </div>
      </div>

      {/* Cookie Details (Expanded) */}
      {expanded && cookies.length > 0 && (
        <div className="border-t border-black bg-white p-6">
          <p className="mb-4 text-sm opacity-50" style={{ fontWeight: "500" }}>
            {t("cookieManagement.cookieDetails.used")}
          </p>
          <div className="space-y-4">
            {cookies.map((cookie, index) => (
              <div
                key={index}
                className="border-b border-black pb-4 text-sm opacity-75 last:border-b-0"
              >
                <p className="mb-1" style={{ fontWeight: "500" }}>
                  {cookie.name}
                </p>
                <p className="mb-1">{cookie.purpose}</p>
                <p className="text-xs opacity-50">
                  {t("cookieManagement.cookieDetails.duration")}{" "}
                  {cookie.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface ConfirmationModalProps {
  onClose: () => void
  activeCookies: number
}

function ConfirmationModal({
  onClose,
  activeCookies,
}: ConfirmationModalProps): JSX.Element {
  const { t } = useTranslation("legal")

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="w-full max-w-md border-2 border-black bg-white p-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center border border-black bg-black text-white">
            <span className="text-2xl">✓</span>
          </div>
          <h2 id="modal-title">{t("cookieManagement.modal.title")}</h2>
        </div>

        <p className="mb-6 opacity-75">
          {t("cookieManagement.modal.message", { count: activeCookies })}
        </p>

        <button
          onClick={onClose}
          className="min-h-[48px] w-full border border-black bg-black px-6 py-3 text-white transition-opacity hover:opacity-75"
          aria-label={t("cookieManagement.modal.closeAria")}
        >
          {t("cookieManagement.modal.close")}
        </button>
      </div>
    </div>
  )
}
