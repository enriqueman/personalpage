"use client"

import SkillsSection from "@/components/skillsSection"
import { useLanguage } from "@/components/language-provider"
import { useInView } from "@/hooks/useInView"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const ABOUT_KEYS = ["skills.about.cloud", "skills.about.cicd", "skills.about.frontend", "skills.about.hosting", "skills.about.agents", "skills.about.rag"]

export default function SkillsPage() {
  const { t } = useLanguage()
  const [heroRef] = useInView({ rootMargin: "0px", threshold: 0.2 })
  const [aboutRef] = useInView()
  const [contentRef] = useInView()

  const buttonHover = "btn-interactive"

  return (
    <div className="min-h-screen">
      {/* Hero: mismo patrón que home, experience y education */}
      <section
        ref={heroRef}
        className="hero-bg animate-in-view relative mx-auto max-w-content px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-14 lg:px-8 lg:pt-24 lg:pb-16"
      >
        <div className="relative flex flex-col items-start">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {t("skills.hero.greeting")}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem]">
            {t("skills.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("skills.hero.subtitle")}
          </p>
          <div className="mt-6">
            <Button variant="outline" asChild size="lg" className={`rounded-lg ${buttonHover}`}>
              <Link href="/" className="inline-flex items-center gap-2">
                {t("skills.hero.backHome")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sobre mis habilidades: párrafos estructurados (cloud, CI/CD, frontend, hosting, agentes, RAG) */}
      <section
        ref={aboutRef}
        className="animate-in-view border-t border-border bg-secondary/30 py-12 sm:py-14 lg:py-16"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <h2 className="section-accent text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("skills.about.title")}
          </h2>
          <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
            {ABOUT_KEYS.map((key) => (
              <p key={key}>{t(key)}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnologías por categoría: sección con fondo principal */}
      <section
        ref={contentRef}
        className="animate-in-view animate-stagger-children border-t border-border bg-background py-12 sm:py-14 lg:py-16"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <h2 className="section-accent text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("skills.section.title")}
          </h2>
          <p className="mt-1.5 text-muted-foreground">{t("skills.section.description")}</p>
          <div className="mt-6">
            <SkillsSection />
          </div>
        </div>
      </section>
    </div>
  )
}
