"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

/**
 * Botón que descarga el CV en PDF según el idioma actual (ES/EN).
 * jspdf se carga solo al hacer clic para evitar que el servidor intente cargar html2canvas.
 */
export function DownloadCVButton({ variant = "outline", size = "default", className = "", showLabel = true }) {
  const { t, language } = useLanguage()

  const handleDownload = async () => {
    const { downloadCvPdf } = await import("@/libs/generate-cv-pdf")
    downloadCvPdf(language)
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={handleDownload}
      aria-label={t("cv.download")}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden />
      {showLabel ? <span className="ml-2">{t("cv.download")}</span> : null}
    </Button>
  )
}
