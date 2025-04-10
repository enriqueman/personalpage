"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.experience"), path: "/experience" },
    { name: t("nav.education"), path: "/education" },
    { name: t("nav.skills"), path: "/skills" },
    { name: t("nav.projects"), path: "/projects" },
  ]

  return (
    <header className="bg-background border-b border-border fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link
              href="/"
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-300"
            >
              Enrique Manzano
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          <nav className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
            <LanguageToggle />
            <ThemeToggle />
            <Button asChild>
              <Link href="/contact" className="whitespace-nowrap">
                {t("nav.contact")}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-background divide-y-2 divide-border">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <Link href="/" className="text-2xl font-bold text-foreground">
                    Enrique Manzano
                  </Link>
                </div>
                <div className="-mr-2 flex items-center">
                  <LanguageToggle />
                  <ThemeToggle />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Cerrar menú"
                    className="ml-2"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-secondary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="ml-3 text-base font-medium text-foreground">{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <Button asChild className="w-full">
                <Link href="/contact">{t("nav.contact")}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
