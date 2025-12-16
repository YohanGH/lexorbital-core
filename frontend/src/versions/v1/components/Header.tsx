import { useRoute } from "wouter"
import { useTranslation } from "react-i18next"

import { LanguageSelector } from "@/versions/v1/components/LanguageSelector"

interface HeaderProps {
  onNavigate: (page: string) => void
}

export function Header({ onNavigate }: HeaderProps) {
  const { t } = useTranslation("common")

  // Use useRoute to detect active routes (like in lexorbital-lab-wouter)
  const [isHomeActive] = useRoute("/")
  const [isModulesActive] = useRoute("/modules")
  const [isAboutActive] = useRoute("/about")
  const [isContactActive] = useRoute("/contact")
  const [isTrustCenterActive] = useRoute("/trust-center")

  const navItems = [
    {
      label: t("header.home"),
      page: "/",
      isActive: isHomeActive,
    },
    {
      label: t("header.modules"),
      page: "modules",
      isActive: isModulesActive,
    },
    {
      label: t("header.about"),
      page: "about",
      isActive: isAboutActive,
    },
    {
      label: t("header.contact"),
      page: "contact",
      isActive: isContactActive,
    },
    {
      label: t("header.trustCenter"),
      page: "trust-center",
      isActive: isTrustCenterActive,
    },
  ]

  return (
    <header className="w-full border-b border-black bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-4 md:px-8 md:py-6 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
          {/* Logo */}
          <button
            onClick={() => onNavigate("/")}
            className="group relative h-10 w-10 bg-black md:h-12 md:w-12"
            aria-label={t("header.logoAlt")}
          >
            <span className="sr-only">LexOrbital</span>
          </button>

          {/* Navigation & Language Selector */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <nav
              className="flex flex-wrap justify-center gap-6 md:justify-end md:gap-8 lg:gap-12"
              aria-label="Main navigation"
            >
              {navItems.map(item => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`${
                    item.isActive ? "opacity-100" : "opacity-50"
                  } text-sm transition-opacity hover:opacity-100 md:text-base`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  )
}
