"use client"

import ProjectsCard from "./projectsCard"
import { useLanguage } from "@/components/language-provider"

const cardHover = "card-interactive hover:-translate-y-0.5"

export default function ProjectSection() {
  const { t } = useLanguage()

  const project4ImagesBase = "/proyects/Strategic Talent and Skills Management System"
  const baseEnc = encodeURI(project4ImagesBase)
  const project4Images = [
    { sectionLabel: t("projects.gallery.dashboard"), src: `${baseEnc}/dashboard01.png` },
    { sectionLabel: t("projects.gallery.upload"), src: `${baseEnc}/upload01.png` },
    { src: `${baseEnc}/upload02.png` },
    { sectionLabel: t("projects.gallery.results"), src: `${baseEnc}/Results.png` },
    { src: `${baseEnc}/results02.png` },
    { src: `${baseEnc}/results03.png` },
    { src: `${baseEnc}/results04.png` },
  ]

  const projectsData = [
    {
      title: t("projects.project4.title"),
      tipe: t("projects.project4.type"),
      period: t("projects.project4.period"),
      description: t("projects.project4.description"),
      url: t("projects.project4.url"),
      images: project4Images,
    },
    {
      title: t("projects.project2.title"),
      tipe: t("projects.project2.type"),
      period: t("projects.project2.period"),
      description: t("projects.project2.description"),
      url: t("projects.project2.url"),
    },
    {
      title: t("projects.project3.title"),
      tipe: t("projects.project3.type"),
      period: t("projects.project3.period"),
      description: t("projects.project3.description"),
      url: t("projects.project3.url"),
    },
    {
      title: t("projects.project1.title"),
      tipe: t("projects.project1.type"),
      period: t("projects.project1.period"),
      description: t("projects.project1.description"),
    },
    {
      title: t("projects.project5.title"),
      tipe: t("projects.project5.type"),
      period: t("projects.project5.period"),
      description: t("projects.project5.description"),
    },
    {
      title: t("projects.project6.title"),
      tipe: t("projects.project6.type"),
      period: t("projects.project6.period"),
      description: t("projects.project6.description"),
    },
  ]

  return (
    <div className="space-y-5">
      {projectsData.map((project, index) => (
        <ProjectsCard
          key={index}
          title={project.title}
          tipe={project.tipe}
          period={project.period}
          description={project.description}
          url={project.url}
          images={project.images}
          viewSiteLabel={t("projects.viewSite")}
          viewImagesLabel={t("projects.viewImages")}
          className={`animate-stagger-item ${cardHover}`}
          style={{ transitionDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  )
}
