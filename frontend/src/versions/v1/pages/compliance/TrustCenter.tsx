/**
 * Trust Center page component
 *
 * Displays trust and transparency information, certifications, and compliance status.
 */

import { useState, type JSX } from "react"
import { useTranslation } from "react-i18next"

/**
 * Section IDs in display order
 */
const SECTION_IDS = [
  "overview",
  "compliance",
  "documents",
  "reports",
  "self-assessments",
  "data-security",
  "app-security",
  "legal",
  "infrastructure",
  "endpoint-security",
  "network-security",
  "policies",
  "security-grade",
  "knowledge-base",
  "updates",
] as const

/**
 * Section icons mapping
 */
const SECTION_ICONS: Record<string, string> = {
  overview: "📊",
  compliance: "📋",
  documents: "📄",
  reports: "📈",
  "self-assessments": "📝",
  "data-security": "🔐",
  "app-security": "🛡️",
  legal: "⚖️",
  infrastructure: "🏗️",
  "endpoint-security": "💻",
  "network-security": "🌐",
  policies: "📑",
  "security-grade": "⭐",
  "knowledge-base": "🧠",
  updates: "🔔",
}

/**
 * Update keys for recent updates section
 */
const UPDATE_KEYS = [
  "soc2Renewed",
  "securityPolicyPublished",
  "pentestCompleted",
  "iso27001Passed",
  "encryptionUpdated",
] as const

/**
 * Update dates (hardcoded as they are data, not UI text)
 */
const UPDATE_DATES = [
  "2024-12-01",
  "2024-11-15",
  "2024-11-01",
  "2024-10-20",
  "2024-10-01",
] as const

/**
 * Standards data (hardcoded as they are data, not UI text)
 */
const STANDARDS = [
  {
    name: "ISO/IEC 27001:2022",
    status: "certified" as const,
    validUntil: "2025-12-31",
    coverage: "100%",
  },
  {
    name: "SOC 2 Type 2",
    status: "certified" as const,
    validUntil: "2025-06-30",
    coverage: "100%",
  },
  {
    name: "GDPR",
    status: "certified" as const,
    validUntil: "ongoing",
    coverage: "100%",
  },
  {
    name: "HIPAA",
    status: "inProgress" as const,
    validUntil: "2025-03-31",
    coverage: "75%",
  },
  {
    name: "PCI DSS",
    status: "planned" as const,
    validUntil: "tbd",
    coverage: "0%",
  },
] as const

/**
 * Document keys in display order
 */
const DOCUMENT_KEYS = [
  "dataFlowDiagram",
  "networkArchitecture",
  "penetrationTestReport",
  "soc2Report",
  "iso27001Certificate",
  "sigLiteAssessment",
  "informationSecurityPolicy",
  "dataClassificationPolicy",
] as const

/**
 * Document types
 */
const DOCUMENT_TYPES = [
  "report",
  "report",
  "report",
  "compliance",
  "compliance",
  "selfAssessment",
  "policy",
  "policy",
] as const

/**
 * Document sizes (hardcoded as they are data)
 */
const DOCUMENT_SIZES = [
  "2.4 MB",
  "3.1 MB",
  "5.7 MB",
  "12.3 MB",
  "1.2 MB",
  "4.5 MB",
  "856 KB",
  "642 KB",
] as const

/**
 * Document dates (hardcoded as they are data)
 */
const DOCUMENT_DATES = [
  "2024-11-15",
  "2024-11-10",
  "2024-11-01",
  "2024-10-15",
  "2024-10-01",
  "2024-09-20",
  "2024-11-15",
  "2024-10-30",
] as const

/**
 * Filter keys
 */
const FILTER_KEYS = [
  "allDocuments",
  "reports",
  "compliance",
  "policies",
] as const

/**
 * Recommendation keys
 */
const RECOMMENDATION_KEYS = [
  "mfa",
  "training",
  "scanning",
  "incidentResponse",
] as const

export function TrustCenter(): JSX.Element {
  const { t } = useTranslation("trustCenter")
  const [activeSection, setActiveSection] = useState<string>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSectionChange = (sectionId: string): void => {
    setActiveSection(sectionId)
    setSidebarOpen(false)
  }

  const renderContent = (): JSX.Element => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />
      case "compliance":
        return <ComplianceSection />
      case "documents":
        return <DocumentsSection />
      case "security-grade":
        return <SecurityGradeSection />
      default:
        return <PlaceholderSection sectionId={activeSection} />
    }
  }

  return (
    <div className="relative flex min-h-screen">
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 flex h-12 w-12 items-center justify-center border border-black bg-white transition-colors hover:bg-black hover:text-white lg:hidden"
        aria-label={sidebarOpen ? t("ui.closeMenu") : t("ui.openMenu")}
        aria-expanded={sidebarOpen}
      >
        {sidebarOpen ? (
          <span className="text-2xl" aria-hidden="true">
            ×
          </span>
        ) : (
          <span className="text-2xl" aria-hidden="true">
            ☰
          </span>
        )}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-30 bg-black lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 z-40 h-screen w-64 overflow-y-auto border-r border-black bg-white transition-transform duration-300 ease-in-out lg:sticky ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} `}
      >
        <div className="p-6">
          <h2 className="mb-6">{t("title")}</h2>
          <nav className="space-y-1">
            {SECTION_IDS.map(sectionId => (
              <button
                key={sectionId}
                onClick={() => handleSectionChange(sectionId)}
                className={`min-h-[44px] w-full border border-black px-4 py-3 text-left transition-colors ${
                  activeSection === sectionId
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`}
                aria-current={activeSection === sectionId ? "page" : undefined}
              >
                <span className="mr-2" aria-hidden="true">
                  {SECTION_ICONS[sectionId]}
                </span>
                {t(`sections.${sectionId}` as any)}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 pt-20 md:p-8 lg:p-12 lg:pt-8">
        {renderContent()}
      </main>
    </div>
  )
}

function OverviewSection(): JSX.Element {
  const { t } = useTranslation("trustCenter")

  return (
    <div>
      <h1 className="mb-12">{t("overview.title")}</h1>

      {/* Status Cards */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          label={t("overview.soc2Status")}
          status="certified"
          value="Type 2"
        />
        <StatusCard
          label={t("overview.iso27001Status")}
          status="certified"
          value="ISO 27001:2022"
        />
        <StatusCard
          label={t("overview.lastPentest")}
          status="recent"
          value="Dec 2024"
        />
        <StatusCard
          label={t("overview.securityScore")}
          status="high"
          value="92/100"
        />
      </div>

      {/* Recent Updates */}
      <section className="mb-12">
        <h2 className="mb-6">{t("overview.recentUpdates")}</h2>
        <div className="border border-black p-8">
          <div className="space-y-6">
            {UPDATE_KEYS.map((updateKey, index) => (
              <div
                key={updateKey}
                className="flex gap-6 border-b border-black pb-6 last:border-b-0"
              >
                <span className="min-w-24 opacity-50">
                  {UPDATE_DATES[index]}
                </span>
                <span>{t(`overview.updates.${updateKey}` as any)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section>
        <h2 className="mb-6">{t("overview.quickAccess")}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <QuickAccessCard title={t("sections.compliance")} />
          <QuickAccessCard title={t("sections.documents")} />
          <QuickAccessCard title={t("sections.securityGrade")} />
        </div>
      </section>
    </div>
  )
}

function ComplianceSection(): JSX.Element {
  const { t } = useTranslation("trustCenter")

  return (
    <div>
      <h1 className="mb-12">{t("compliance.title")}</h1>

      <div className="overflow-x-auto border border-black">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black">
              <th className="border-r border-black p-4 text-left">
                {t("compliance.standard")}
              </th>
              <th className="border-r border-black p-4 text-left">
                {t("compliance.status")}
              </th>
              <th className="border-r border-black p-4 text-left">
                {t("compliance.validUntil")}
              </th>
              <th className="border-r border-black p-4 text-left">
                {t("compliance.coverage")}
              </th>
              <th className="p-4 text-left">{t("compliance.certificate")}</th>
            </tr>
          </thead>
          <tbody>
            {STANDARDS.map((standard, index) => (
              <tr key={index} className="border-b border-black last:border-b-0">
                <td className="border-r border-black p-4">{standard.name}</td>
                <td className="border-r border-black p-4">
                  <StatusBadge status={standard.status} />
                </td>
                <td className="border-r border-black p-4">
                  {standard.validUntil === "ongoing"
                    ? t("compliance.ongoing")
                    : standard.validUntil === "tbd"
                      ? t("compliance.tbd")
                      : standard.validUntil}
                </td>
                <td className="border-r border-black p-4">
                  {standard.coverage}
                </td>
                <td className="p-4">
                  {standard.status === "certified" && (
                    <button className="border border-black px-4 py-2 text-sm transition-colors hover:bg-black hover:text-white">
                      {t("ui.download")}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function DocumentsSection(): JSX.Element {
  const { t } = useTranslation("trustCenter")

  return (
    <div>
      <h1 className="mb-12">{t("documents.title")}</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        {FILTER_KEYS.map(filterKey => (
          <button
            key={filterKey}
            className={`border border-black px-4 py-2 transition-colors ${
              filterKey === "allDocuments"
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`}
          >
            {t(`ui.${filterKey}` as any)}
          </button>
        ))}
      </div>

      {/* Documents List */}
      <div className="border border-black">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black">
              <th className="border-r border-black p-4 text-left">
                {t("documents.name")}
              </th>
              <th className="border-r border-black p-4 text-left">
                {t("ui.type")}
              </th>
              <th className="border-r border-black p-4 text-left">
                {t("documents.size")}
              </th>
              <th className="border-r border-black p-4 text-left">
                {t("documents.lastUpdated")}
              </th>
              <th className="p-4 text-left">{t("ui.action")}</th>
            </tr>
          </thead>
          <tbody>
            {DOCUMENT_KEYS.map((docKey, index) => (
              <tr
                key={docKey}
                className="border-b border-black last:border-b-0"
              >
                <td className="border-r border-black p-4">
                  {t(`documents.items.${docKey}` as any)}
                </td>
                <td className="border-r border-black p-4 opacity-75">
                  {t(`documents.types.${DOCUMENT_TYPES[index]}` as any)}
                </td>
                <td className="border-r border-black p-4 opacity-50">
                  {DOCUMENT_SIZES[index]}
                </td>
                <td className="border-r border-black p-4 opacity-50">
                  {DOCUMENT_DATES[index]}
                </td>
                <td className="p-4">
                  <button className="border border-black px-4 py-2 text-sm transition-colors hover:bg-black hover:text-white">
                    {t("documents.download")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SecurityGradeSection(): JSX.Element {
  const { t } = useTranslation("trustCenter")

  return (
    <div>
      <h1 className="mb-12">{t("securityGrade.title")}</h1>

      {/* Global Score */}
      <div className="mb-12 border border-black p-12 text-center">
        <p className="mb-4 opacity-50">{t("securityGrade.globalScore")}</p>
        <div className="mb-4 text-6xl">92/100</div>
        <div className="inline-block border border-black bg-black px-6 py-2 text-white">
          {t("securityGrade.gradeA")}
        </div>
      </div>

      {/* Breakdown */}
      <div className="mb-12">
        <h2 className="mb-6">{t("securityGrade.breakdown")}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ScoreCard category={t("securityGrade.infrastructure")} score={95} />
          <ScoreCard category={t("securityGrade.application")} score={90} />
          <ScoreCard category={t("securityGrade.data")} score={94} />
          <ScoreCard category={t("securityGrade.organization")} score={88} />
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="mb-6">{t("securityGrade.recommendations")}</h2>
        <div className="space-y-4 border border-black p-8">
          {RECOMMENDATION_KEYS.map(key => (
            <p key={key}>
              {t(`securityGrade.recommendationsItems.${key}` as any)}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

function PlaceholderSection({ sectionId }: { sectionId: string }): JSX.Element {
  const { t } = useTranslation("trustCenter")

  return (
    <div className="flex min-h-[400px] items-center justify-center border border-black p-16">
      <div className="text-center">
        <h2 className="mb-4 opacity-50">
          {t("ui.section")}: {sectionId}
        </h2>
        <p className="opacity-25">{t("ui.contentPlaceholder")}</p>
      </div>
    </div>
  )
}

function StatusCard({
  label,
  status,
  value,
}: {
  label: string
  status: string
  value: string
}): JSX.Element {
  const statusColors: Record<string, string> = {
    certified: "bg-black text-white",
    recent: "bg-black text-white",
    high: "bg-black text-white",
  }

  return (
    <div className="border border-black p-6">
      <p className="mb-2 text-sm opacity-50">{label}</p>
      <p className="mb-4">{value}</p>
      <div
        className={`inline-block px-3 py-1 text-sm ${
          statusColors[status] || "border border-black"
        }`}
      >
        ✓
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }): JSX.Element {
  const { t } = useTranslation("trustCenter")

  const statusMap: Record<string, { label: string; style: string }> = {
    certified: {
      label: t("compliance.certified"),
      style: "bg-black text-white",
    },
    inProgress: {
      label: t("compliance.inProgress"),
      style: "border border-black",
    },
    planned: {
      label: t("compliance.planned"),
      style: "border border-black opacity-50",
    },
  }

  const config = statusMap[status] || statusMap["planned"]

  if (!config) {
    return <span className="inline-block px-3 py-1 text-sm">—</span>
  }

  return (
    <span className={`inline-block px-3 py-1 text-sm ${config.style}`}>
      {config.label}
    </span>
  )
}

function QuickAccessCard({ title }: { title: string }): JSX.Element {
  return (
    <div className="cursor-pointer border border-black p-6 transition-colors hover:bg-black hover:text-white">
      <p>{title}</p>
    </div>
  )
}

function ScoreCard({
  category,
  score,
}: {
  category: string
  score: number
}): JSX.Element {
  return (
    <div className="border border-black p-6">
      <div className="mb-4 flex items-center justify-between">
        <p>{category}</p>
        <p className="text-2xl">{score}%</p>
      </div>
      <div className="h-2 w-full border border-black">
        <div className="h-full bg-black" style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}
