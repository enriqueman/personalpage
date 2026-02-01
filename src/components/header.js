"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { DownloadCVButton } from "@/components/download-cv-button"
import { useLanguage } from "@/components/language-provider"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.experience"), path: "/experience" },
    { name: t("nav.education"), path: "/education" },
    { name: t("nav.skills"), path: "/skills" },
    { name: t("nav.projects"), path: "/projects" },
  ]

  const isActive = (path) => (path === "/" ? pathname === "/" : pathname.startsWith(path))

  // Cerrar menú al cambiar ruta o con Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }
    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <header className="relative sticky top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Línea de acento inferior (mismo lenguaje que footer y section-accent) */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden />

      <div className="container relative mx-auto flex h-full max-w-content items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="link-underline text-lg font-bold text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
        >
          Enrique Manzano
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`link-underline text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md ${isActive(item.path) ? "nav-link-active text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center justify-end gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <DownloadCVButton variant="outline" size="default" className="rounded-lg btn-interactive" showLabel={true} />
          <Button asChild size="default" className="rounded-lg btn-interactive">
            <Link href="/#contact" className="whitespace-nowrap">
              {t("nav.contact")}
            </Link>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-lg btn-interactive"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Panel móvil: mismo tono secondary y acento que el resto de la página */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-40 md:hidden stats-strip border-t border-border"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <div className="relative flex flex-col h-full overflow-auto px-4 py-6 hero-bg">
            <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${isActive(item.path) ? "bg-primary/10 text-primary border-l-4 border-l-primary" : "text-foreground hover:bg-secondary/80 border-l-4 border-l-transparent"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-border flex flex-col gap-3">
              <DownloadCVButton variant="outline" className="w-full rounded-lg btn-interactive" size="lg" showLabel={true} />
              <Button asChild className="w-full rounded-lg btn-interactive" size="lg">
                <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>
                  {t("nav.contact")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
