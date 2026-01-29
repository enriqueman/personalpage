"use client"

import ExperienceSection from "@/components/experienceSection"
import { useLanguage } from "@/components/language-provider"

export default function ExperiencePage() {
  const { t } = useLanguage()
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mt-20 mb-6">{t("experience.title")}</h1>
      <ExperienceSection />
    </div>
  )
}