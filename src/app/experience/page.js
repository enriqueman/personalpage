"use client"

import ExperienceSection from "@/components/experienceSection"
import { useLanguage } from "@/components/language-provider"
import { useInView } from "@/hooks/useInView"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ExperiencePage() {
  const { t } = useLanguage()
  const [heroRef] = useInView({ rootMargin: "0px", threshold: 0.2 })
  const [workRef] = useInView()
  const [academicRef] = useInView()

  const buttonHover = "btn-interactive"

  return (
    <div className="min-h-screen">
      {/* Hero: mismo patrón que home (fondo dinámico, título destacado) */}
      <section
        ref={heroRef}
        className="hero-bg animate-in-view relative mx-auto max-w-content px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-14 lg:px-8 lg:pt-24 lg:pb-16"
      >
        <div className="relative flex flex-col items-start">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {t("experience.hero.greeting")}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem]">
            {t("experience.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("experience.hero.subtitle")}
          </p>
          <div className="mt-6">
            <Button variant="outline" asChild size="lg" className={`rounded-lg ${buttonHover}`}>
              <Link href="/" className="inline-flex items-center gap-2">
                {t("experience.hero.backHome")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Experiencia laboral: sección con fondo principal */}
      <section
        ref={workRef}
        className="animate-in-view animate-stagger-children border-t border-border bg-background py-12 sm:py-14 lg:py-16"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <h2 className="section-accent text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("experience.work.title")}
          </h2>
          <p className="mt-1.5 text-muted-foreground">{t("experience.work.description")}</p>
          <div className="mt-6">
            <ExperienceSection type="work" />
          </div>
        </div>
      </section>

      {/* Experiencia académica: fondo alternativo (secondary) */}
      <section
        ref={academicRef}
        className="animate-in-view animate-stagger-children border-t border-border bg-secondary/30 py-12 sm:py-14 lg:py-16"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <h2 className="section-accent text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("experience.academic.title")}
          </h2>
          <p className="mt-1.5 text-muted-foreground">{t("experience.academic.description")}</p>
          <div className="mt-6">
            <ExperienceSection type="academic" />
          </div>
        </div>
      </section>
    </div>
  )
}
