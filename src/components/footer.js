"use client"

import Link from "next/link"
import { Mail, Linkedin, Github } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { DownloadCVButton } from "@/components/download-cv-button"

export default function Footer() {
  const { t } = useLanguage()

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.experience"), path: "/experience" },
    { name: t("nav.education"), path: "/education" },
    { name: t("nav.skills"), path: "/skills" },
    { name: t("nav.projects"), path: "/projects" },
  ]

  const contactLinks = [
    {
      href: "mailto:ceman217@gmail.com",
      label: "ceman217@gmail.com",
      icon: Mail,
      external: false,
    },
    {
      href: "https://co.linkedin.com/in/enriquemanzano217",
      label: "LinkedIn",
      icon: Linkedin,
      external: true,
    },
    {
      href: "https://github.com/EnriqueManzano217",
      label: "GitHub",
      icon: Github,
      external: true,
    },
  ]

  return (
    <footer className="relative border-t border-border stats-strip mt-auto">
      {/* Línea de acento superior (mismo lenguaje que section-accent) */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden />

      <div className="container mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:gap-10">
          {/* Navegación y contacto */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label="Enlaces del pie de página" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 sm:justify-start">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
              >
                {t("nav.contact")}
              </Link>
              <DownloadCVButton variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" showLabel={true} />
            </nav>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {contactLinks.map(({ href, label, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4 shrink-0 text-primary/80" aria-hidden />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Cesar Enrique Manzano Velasco — {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
