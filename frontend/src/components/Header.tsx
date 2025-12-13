import { useTranslation } from "react-i18next"

import { LanguageSelector } from "@/components/LanguageSelector"

interface HeaderProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { t } = useTranslation("common")

  const navItems = [
    { label: t("header.home"), page: "home" },
    { label: t("header.modules"), page: "modules" },
    { label: t("header.about"), page: "about" },
    { label: t("header.contact"), page: "contact" },
    { label: t("header.trustCenter"), page: "trust-center" },
  ]

  return (
    <header className="w-full border-b border-black bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-4 md:px-8 md:py-6 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
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
                    currentPage === item.page ? "opacity-100" : "opacity-50"
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
