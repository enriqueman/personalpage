"use client"

import ProjectSection from "@/components/projectsSection"
import { useLanguage } from "@/components/language-provider"
import { useInView } from "@/hooks/useInView"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProjectsPage() {
  const { t } = useLanguage()
  const [heroRef] = useInView({ rootMargin: "0px", threshold: 0.2 })
  const [contentRef] = useInView()

  const buttonHover = "btn-interactive"

  return (
    <div className="min-h-screen">
      {/* Hero: mismo patrón que home, experience, education y skills */}
      <section
        ref={heroRef}
        className="hero-bg animate-in-view relative mx-auto max-w-content px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-14 lg:px-8 lg:pt-24 lg:pb-16"
      >
        <div className="relative flex flex-col items-start">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {t("projects.hero.greeting")}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem]">
            {t("projects.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("projects.hero.subtitle")}
          </p>
          <div className="mt-6">
            <Button variant="outline" asChild size="lg" className={`rounded-lg ${buttonHover}`}>
              <Link href="/" className="inline-flex items-center gap-2">
                {t("projects.hero.backHome")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Proyectos: sección con fondo principal */}
      <section
        ref={contentRef}
        className="animate-in-view animate-stagger-children border-t border-border bg-background py-12 sm:py-14 lg:py-16"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <h2 className="section-accent text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("projects.section.title")}
          </h2>
          <p className="mt-1.5 text-muted-foreground">{t("projects.section.description")}</p>
          <div className="mt-6">
            <ProjectSection />
          </div>
        </div>
      </section>
    </div>
  )
}
