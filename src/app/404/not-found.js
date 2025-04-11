"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="container flex flex-col items-center justify-center max-w-4xl mx-auto min-h-[70vh] text-center">
      <h1 className="text-6xl font-bold mb-6">{t("404.title")}</h1>
      <p className="text-xl text-muted-foreground mb-8">{t("404.description")}</p>
      <Button asChild>
        <Link href="/" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          {t("404.button")}
        </Link>
      </Button>
    </div>
  )
}
