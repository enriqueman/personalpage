"use client"

import EducationCard from "./educationCard"
import { useLanguage } from "@/components/language-provider"

export default function EducationSection() {
  const { t } = useLanguage()

  const educationData = [
    {
      degree: t("education.degree1"),
      institution: t("education.institution1"),
      period: t("education.period1"),
      description: t("education.description1"),
    },
    {
      degree: t("education.degree2"),
      institution: t("education.institution2"),
      period: t("education.period2"),
      description: t("education.description2"),
    },
    {
      degree: t("education.degree3"),
      institution: t("education.institution3"),
      period: t("education.period3"),
      description: t("education.description3"),
    },
    {
      degree: t("education.degree4"),
      institution: t("education.institution4"),
      period: t("education.period4"),
      description: t("education.description4"),
    },
    {
      degree: t("education.degree5"),
      institution: t("education.institution5"),
      period: t("education.period5"),
      description: t("education.description5"),
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {educationData.map((edu, index) => (
        <EducationCard
          key={index}
          degree={edu.degree}
          institution={edu.institution}
          period={edu.period}
          description={edu.description}
        />
      ))}
    </div>
  )
}
