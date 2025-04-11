"use client"

import EducationSection from "@/components/educationSection"
import { useLanguage } from "@/components/language-provider"

export default function EducationPage() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mt-20 mb-10 text-center">{t("education.title")}</h1>
      <EducationSection />
    </div>
  )
}
