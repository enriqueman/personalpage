"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  ChevronRight,
  CheckCircle2,
  Briefcase,
  FolderGit2,
  Cpu,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { useInView } from "@/hooks/useInView"
import { DownloadCVButton } from "@/components/download-cv-button"

export default function Home() {
  const { t } = useLanguage()

  const [heroRef] = useInView({ rootMargin: "0px", threshold: 0.2 })
  const [statsRef] = useInView()
  const [aboutRef] = useInView()
  const [valueRef] = useInView()
  const [projectsRef] = useInView()
  const [contactRef] = useInView()
  const [progressContainerRef, progressVisible] = useInView({ rootMargin: "0px 0px -60px 0px", threshold: 0.2 })

  useEffect(() => {
    if (!progressVisible) return
    const el = progressContainerRef.current
    if (!el) return
    el.querySelectorAll(".skill-progress-bar").forEach((bar) => bar.classList.add("progress-visible"))
  }, [progressVisible, progressContainerRef])

  const skills = [
    { name: "React", category: "frontend" },
    { name: "NodeJS", category: "backend" },
    { name: "AWS", category: "cloud" },
    { name: "Python", category: "language" },
    { name: "Langchain", category: "ai" },
    { name: "ETL", category: "data" },
    { name: "SQL", category: "database" },
    { name: "MongoDB", category: "database" },
  ]

  const skillColors = {
    frontend: "bg-primary/10 text-primary border-primary/20",
    backend: "bg-secondary text-secondary-foreground border-border",
    cloud: "bg-primary/10 text-primary border-primary/20",
    language: "bg-secondary text-secondary-foreground border-border",
    ai: "bg-primary/10 text-primary border-primary/20",
    data: "bg-primary/10 text-primary border-primary/20",
    database: "bg-secondary text-secondary-foreground border-border",
  }

  const getSkillColor = (skillName) => {
    const s = skills.find((x) => x.name === skillName)
    return skillColors[s?.category] || "bg-muted text-muted-foreground border-border"
  }

  const stats = [
    { value: "2+", labelKey: "home.stats.years", icon: Briefcase },
    { value: "20+", labelKey: "home.stats.projects", icon: FolderGit2 },
    { value: "15+", labelKey: "home.stats.technologies", icon: Cpu },
  ]

  const coreTechs = [
    { name: "React", percent: 92 },
    { name: "Node.js", percent: 88 },
    { name: "AWS", percent: 85 },
    { name: "Python", percent: 82 },
    { name: "Next.js", percent: 90 },
    { name: "LangChain / IA", percent: 80 },
  ]

  const featuredProjects = [
    { titleKey: "projects.project1.title", typeKey: "projects.project1.type", descriptionKey: "projects.project1.description" },
    { titleKey: "projects.project2.title", typeKey: "projects.project2.type", descriptionKey: "projects.project2.description" },
    { titleKey: "projects.project3.title", typeKey: "projects.project3.type", descriptionKey: "projects.project3.description" },
  ]

  const skillCategories = [
    { categoryKey: "skills.category1", skills: ["React", "NodeJS", "JavaScript", "HTML", "CSS"] },
    { categoryKey: "skills.category2", skills: ["AWS", "SQL", "MongoDB"] },
    { categoryKey: "skills.category3", skills: ["Python", "Langchain", "Machine Learning"] },
    { categoryKey: "skills.category4", skills: ["ETL", "Git", "Docker"] },
  ]

  const cardHover = "card-interactive hover:-translate-y-0.5"
  const buttonHover = "btn-interactive"

  return (
    <div className="min-h-screen">
      {/* Hero con fondo dinámico y saludo */}
      <section
        ref={heroRef}
        className="hero-bg animate-in-view relative mx-auto max-w-content px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-14 lg:px-8 lg:pt-24 lg:pb-16"
      >
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-12 lg:items-center">
          <div className="order-2 lg:order-1">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {t("home.hero.greeting")}
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem]">
              {t("home.hero.name")}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
              {t("home.hero.title")}
            </p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("home.hero.bio")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className={`rounded-lg ${buttonHover}`}>
                <Link href="/projects" className="inline-flex items-center gap-2">
                  {t("home.hero.cta.projects")}
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className={`rounded-lg ${buttonHover}`}>
                <Link href="#contact" className="inline-flex items-center gap-2">
                  {t("home.hero.cta.contact")}
                </Link>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("home.hero.availability")}
            </p>
          </div>
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-xl transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              <Avatar className="relative h-36 w-36 border-4 border-border shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:h-44 sm:w-44 lg:h-52 lg:w-52">
                <AvatarImage src="/enriqueManzano.png" alt={t("home.hero.name")} />
                <AvatarFallback className="text-lg">CEM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </section>

      {/* Stats: strip con contraste profesional */}
      <section
        ref={statsRef}
        className="stats-strip animate-in-view animate-stagger-children py-12 sm:py-14"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            {stats.map(({ value, labelKey, icon: Icon }, i) => (
              <div
                key={labelKey}
                className="group animate-stagger-item card-interactive flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 shadow-sm hover:-translate-y-0.5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="rounded-full bg-primary/10 p-3 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
                </div>
                <span className="text-3xl font-bold text-foreground sm:text-4xl">{value}</span>
                <span className="text-center text-sm font-medium text-muted-foreground">{t(labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre mí: sección clara con acento en título */}
      <section
        ref={aboutRef}
        className="animate-in-view border-t border-border bg-background py-12 sm:py-14 lg:py-16"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <h2 className="section-accent text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("home.about.title")}
          </h2>
          <div className="mt-5 max-w-3xl space-y-3 text-base leading-relaxed text-foreground/90 sm:text-lg">
            <p>{t("home.about.p1")}</p>
            <p>{t("home.about.p2")}</p>
            <p>{t("home.about.p3")}</p>
          </div>
        </div>
      </section>

      {/* Cómo puedo aportar + Habilidades: fondo alternativo y cards con acento */}
      <section
        ref={valueRef}
        className="animate-in-view animate-stagger-children border-t border-border bg-secondary/30 py-12 sm:py-14 lg:py-16"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <h2 className="section-accent text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("home.value.title")}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i, idx) => (
              <li
                key={i}
                className={`card-accent animate-stagger-item flex gap-3 rounded-lg border-l-4 border-transparent border-border bg-card p-4 shadow-sm ${cardHover}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span className="text-sm text-foreground/90 sm:text-base">{t(`home.value.bullet${i}`)}</span>
              </li>
            ))}
          </ul>

          <h2 className="section-accent mt-12 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("home.skills")}
          </h2>
          <p className="mt-1.5 text-muted-foreground">{t("home.skills.description")}</p>

          {/* Barras de progreso - tecnologías principales */}
          <div ref={progressContainerRef} className="mt-4 space-y-3">
            {coreTechs.map((tech) => (
              <div key={tech.name}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{tech.name}</span>
                  <span className="text-muted-foreground">{tech.percent}%</span>
                </div>
                <div className="skill-progress-bar mt-1.5 h-2 w-full">
                  <div
                    className="skill-progress-fill"
                    style={{ "--progress-width": `${tech.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {skillCategories.map((cat, i) => (
              <Card
                key={cat.categoryKey}
                className={`animate-stagger-item border border-border shadow-sm ${cardHover}`}
                style={{ transitionDelay: `${(i + 3) * 80}ms` }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{t(cat.categoryKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skillName) => (
                      <Badge
                        key={skillName}
                        variant="outline"
                        className={`transition-transform duration-200 hover:scale-105 ${getSkillColor(skillName)}`}
                      >
                        {skillName}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-5">
            <Button variant="outline" asChild className={`rounded-lg ${buttonHover}`}>
              <Link href="/skills">{t("home.skills.verTodas")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Proyectos destacados: cards con borde de acento al hover */}
      <section
        ref={projectsRef}
        className="animate-in-view animate-stagger-children border-t border-border bg-background py-12 sm:py-14 lg:py-16"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <h2 className="section-accent text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("home.projects.sectionTitle")}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((proj, i) => (
              <Card
                key={proj.titleKey}
                className={`card-accent animate-stagger-item flex flex-col border-l-4 border-transparent border-border shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-0.5`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-2 text-lg">{t(proj.titleKey)}</CardTitle>
                  <Badge variant="secondary" className="mt-2 w-fit text-xs">
                    {t(proj.typeKey)}
                  </Badge>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {t(proj.descriptionKey)}
                  </p>
                </CardContent>
                <CardContent className="pt-0">
                  <Button variant="outline" size="sm" asChild className={`group/link gap-1 rounded-lg ${buttonHover}`}>
                    <Link href="/projects" className="inline-flex items-center">
                      {t("home.projects.cta")}
                      <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Button asChild className={`rounded-lg ${buttonHover}`}>
              <Link href="/projects">{t("home.projects.verTodos")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contacto: invitación + datos con etiquetas (correo y GitHub clicables) */}
      <section
        ref={contactRef}
        id="contact"
        className="contact-cta-bg animate-in-view border-t border-border py-14 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <h2 className="section-accent text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("home.contact")}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {t("home.contact.invitation")}
          </p>
          <div className="mt-4">
            <DownloadCVButton variant="default" size="lg" className="rounded-lg btn-interactive" showLabel={true} />
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label={t("home.contact.description")}>
            <li className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-sm">
              <Mail className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
              <div className="min-w-0">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("home.contact.emailLabel")}</span>
                <a href="mailto:ceman217@gmail.com" className="block text-sm font-medium text-primary hover:underline truncate">ceman217@gmail.com</a>
              </div>
            </li>
            <li className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-sm">
              <Phone className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
              <div className="min-w-0">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("home.contact.phoneLabel")}</span>
                <a href="https://wa.me/573017335302" target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-primary hover:underline" aria-label="Abrir chat de WhatsApp">+57 301 733 5302</a>
              </div>
            </li>
            <li className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-sm">
              <Github className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
              <div className="min-w-0">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("home.contact.githubLabel")}</span>
                <a href="https://github.com/EnriqueManzano217" target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-primary hover:underline">EnriqueManzano217</a>
              </div>
            </li>
            <li className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-sm">
              <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
              <div className="min-w-0">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("home.contact.locationLabel")}</span>
                <span className="block text-sm font-medium text-foreground">Popayán, Colombia</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}