"use client"

import ExperienceCard from "./experienceCard"
import { useLanguage } from "@/components/language-provider"

export default function ExperienceSection() {
  const { t } = useLanguage()

  const workExperience = [
    {
      title: t("experience.job1.title"),
      company: t("experience.job1.company"),
      period: t("experience.job1.period"),
      description: t("experience.job1.description"),
    },
  ]

  const academicExperience = [
    {
      title: t("experience.academic1.title"),
      company: t("experience.academic1.company"),
      period: t("experience.academic1.period"),
      description: t("experience.academic1.description"),
    },
    {
      title: t("experience.academic2.title"),
      company: t("experience.academic2.company"),
      period: t("experience.academic2.period"),
      description: t("experience.academic2.description"),
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mt-20 mb-6">{t("experience.title")}</h1>

      {workExperience.map((exp, index) => (
        <ExperienceCard
          key={`work-${index}`}
          title={exp.title}
          company={exp.company}
          period={exp.period}
          description={exp.description}
        />
      ))}

      <h1 className="text-3xl font-bold text-center mt-10 mb-6">{t("experience.academic.title")}</h1>

      {academicExperience.map((exp, index) => (
        <ExperienceCard
          key={`academic-${index}`}
          title={exp.title}
          company={exp.company}
          period={exp.period}
          description={exp.description}
        />
      ))}
    </div>
  )
}
