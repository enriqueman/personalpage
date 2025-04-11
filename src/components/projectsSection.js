"use client"

import ProjectsCard from "./projectsCard"
import { useLanguage } from "@/components/language-provider"

export default function ProjectSection() {
  const { t } = useLanguage()

  const projectsData = [
    {
      title: t("projects.project2.title"),
      tipe: t("projects.project2.type"),
      period: t("projects.project2.period"),
      description: t("projects.project2.description"),
    },
    {
      title: t("projects.project3.title"),
      tipe: t("projects.project3.type"),
      period: t("projects.project3.period"),
      description: t("projects.project3.description"),
    },
    {
      title: t("projects.project1.title"),
      tipe: t("projects.project1.type"),
      period: t("projects.project1.period"),
      description: t("projects.project1.description"),
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {projectsData.map((project, index) => (
        <ProjectsCard
          key={index}
          title={project.title}
          tipe={project.tipe}
          period={project.period}
          description={project.description}
        />
      ))}
    </div>
  )
}
