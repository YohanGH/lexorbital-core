import { useTranslation } from "react-i18next"

interface NotFound404Props {
  onNavigate: (page: string) => void
}

export function NotFound404({ onNavigate }: NotFound404Props) {
  const { t } = useTranslation("errors")

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col items-center justify-center px-4 py-24 md:px-8 md:py-32 lg:px-16 lg:py-48">
      <h1 className="mb-8 text-center">{t("notFound404.title")}</h1>
      <p className="mb-16 max-w-[600px] px-4 text-center opacity-75">
        {t("notFound404.description")}
      </p>
      <button
        onClick={() => onNavigate("home")}
        className="border border-black px-8 py-4 transition-colors hover:bg-black hover:text-white"
      >
        {t("notFound404.backToHome")}
      </button>
    </div>
  )
}
