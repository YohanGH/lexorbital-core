import { useTranslation } from "react-i18next"

const LANG_FALLBACK = "en"

export function LanguageSelector() {
  const { t, i18n } = useTranslation("common")

  const currentLanguage =
    i18n.language?.split("-")[0]?.toLowerCase() || LANG_FALLBACK
  const nextLanguage = currentLanguage === "fr" ? "en" : "fr"

  const toggleLanguage = () => {
    void i18n.changeLanguage(nextLanguage)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="border border-black px-4 py-2 text-sm transition-colors hover:bg-black hover:text-white"
      aria-label={t("language.selectorAria")}
    >
      {currentLanguage === "fr"
        ? t("language.buttonLabel.frFirst")
        : t("language.buttonLabel.enFirst")}
    </button>
  )
}
