"use client"

import SkillCard from "./skillCard"
import { useLanguage } from "@/components/language-provider"

export default function SkillsSection() {
  const { t } = useLanguage()

  const skillCategories = [
    {
      category: t("skills.category1"),
      skills: ["React", "NodeJS", "JavaScript", "HTML", "CSS"],
    },
    {
      category: t("skills.category2"),
      skills: ["AWS", "SQL", "MongoDB"],
    },
    {
      category: t("skills.category3"),
      skills: ["Python", "Langchain", "Machine Learning"],
    },
    {
      category: t("skills.category4"),
      skills: ["ETL", "Git", "Docker"],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* <h2 className="text-3xl font-bold mb-6">{t("skills.title")}</h2> */}
      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category, index) => (
          <SkillCard key={index} category={category.category} skills={category.skills} />
        ))}
      </div>
    </div>
  )
}
