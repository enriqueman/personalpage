"use client"

import SkillCard from "./skillCard"
import { useLanguage } from "@/components/language-provider"

// Estructura por categoría: título + ítems con labelKey y nivel opcional ("high" | "mid")
const SKILL_CATEGORIES_CONFIG = [
  {
    categoryKey: "skills.categoryBackend",
    items: [
      { labelKey: "skills.backend.item1", level: "high" },
      { labelKey: "skills.backend.item2", level: "high" },
      { labelKey: "skills.backend.item3", level: "high" },
      { labelKey: "skills.backend.item4", level: "mid" },
      { labelKey: "skills.backend.item5", level: "mid" },
    ],
  },
  {
    categoryKey: "skills.categoryFrontend",
    items: [
      { labelKey: "skills.frontend.item1", level: "high" },
      { labelKey: "skills.frontend.item2", level: "high" },
      { labelKey: "skills.frontend.item3", level: "high" },
      { labelKey: "skills.frontend.item4", level: "mid" },
    ],
  },
  {
    categoryKey: "skills.categoryCloud",
    items: [
      { labelKey: "skills.cloud.item1", level: "high" },
      { labelKey: "skills.cloud.item2", level: "high" },
      { labelKey: "skills.cloud.item3", level: "mid" },
      { labelKey: "skills.cloud.item4", level: "mid" },
      { labelKey: "skills.cloud.item5", level: "mid" },
      { labelKey: "skills.cloud.item6", level: "mid" },
    ],
  },
  {
    categoryKey: "skills.categoryData",
    items: [
      { labelKey: "skills.data.item1", level: "mid" },
      { labelKey: "skills.data.item2", level: "mid" },
      { labelKey: "skills.data.item3", level: "mid" },
      { labelKey: "skills.data.item4", level: "high" },
      { labelKey: "skills.data.item5", level: "high" },
    ],
  },
]

const cardHover = "card-interactive hover:-translate-y-0.5"

export default function SkillsSection() {
  const { t } = useLanguage()

  const skillCategories = SKILL_CATEGORIES_CONFIG.map(({ categoryKey, items }) => ({
    category: t(categoryKey),
    skills: items.map(({ labelKey, level }) => ({
      label: t(labelKey),
      level: level ? t(`skills.level.${level}`) : null,
    })),
  }))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {skillCategories.map((cat, index) => (
        <SkillCard
          key={index}
          category={cat.category}
          skills={cat.skills}
          className={`animate-stagger-item ${cardHover}`}
          style={{ transitionDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  )
}
