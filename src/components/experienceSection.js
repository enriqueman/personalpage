"use client"

import ExperienceCard from "./experienceCard"
import { useLanguage } from "@/components/language-provider"

const cardHover = "card-interactive hover:-translate-y-0.5"

export default function ExperienceSection({ type = "work" }) {
  const { t } = useLanguage()

  const workExperience = [
    {
      title: t("experience.job1.title"),
      company: t("experience.job1.company"),
      period: t("experience.job1.period"),
      intro: t("experience.job1.intro"),
      clients: [
        { title: t("experience.job1.client1.title"), description: t("experience.job1.client1.description") },
        { title: t("experience.job1.client2.title"), description: t("experience.job1.client2.description") },
        { title: t("experience.job1.client3.title"), description: t("experience.job1.client3.description") },
      ],
    },
  ]

  const academicExperience = [
    {
      title: t("experience.academic3.title"),
      company: t("experience.academic3.company"),
      period: t("experience.academic3.period"),
      description: t("experience.academic3.description"),
      url: t("experience.academic3.url"),
    },
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

  const list = type === "work" ? workExperience : academicExperience

  return (
    <div className="space-y-5">
      {list.map((exp, index) => (
        <ExperienceCard
          key={type === "work" ? `work-${index}` : `academic-${index}`}
          title={exp.title}
          company={exp.company}
          period={exp.period}
          description={exp.description}
          intro={exp.intro}
          clients={exp.clients}
          url={exp.url}
          viewSiteLabel={t("projects.viewSite")}
          className={`animate-stagger-item ${cardHover}`}
          style={{ transitionDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  )
}
