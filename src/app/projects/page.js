"use client"

import ProjectSection from "@/components/projectsSection"
import { useLanguage } from "@/components/language-provider"

export default function ProjectsPage() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mt-20 mb-10 text-center">{t("projects.title")}</h1>
      <ProjectSection />
    </div>
  )
}
