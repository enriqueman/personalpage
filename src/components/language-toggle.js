"use client"

import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

// Bandera Colombia (español) y Reino Unido (inglés) como SVG para consistencia visual
function FlagColombia({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect y="0" width="24" height="12" fill="#FCD116" />
      <rect y="12" width="24" height="6" fill="#003893" />
      <rect y="18" width="24" height="6" fill="#CE1126" />
    </svg>
  )
}

function FlagUnitedKingdom({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="24" height="24" fill="#012169" />
      <path d="M0 0l24 24M24 0L0 24" stroke="#fff" strokeWidth="4" />
      <path d="M0 0l24 24M24 0L0 24" stroke="#C8102E" strokeWidth="2.5" />
      <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="5" />
      <path d="M12 0v24M0 12h24" stroke="#C8102E" strokeWidth="3" />
    </svg>
  )
}

const languageFlags = {
  es: FlagColombia,
  en: FlagUnitedKingdom,
}

const languageLabels = {
  es: "Es",
  en: "En",
}

export function LanguageToggle() {
  const { language, languages, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 gap-1.5 px-2">
          {languageFlags[language] ? (
            <>
              <span className="flex h-[1.2rem] w-[1.65rem] shrink-0 items-center justify-center overflow-hidden rounded-sm border border-border">
                {language === "es" ? <FlagColombia className="h-[1.1rem] w-[1.5rem]" /> : <FlagUnitedKingdom className="h-[1.1rem] w-[1.5rem]" />}
              </span>
              <span className="text-sm font-medium">{languageLabels[language] ?? language}</span>
            </>
          ) : (
            <Globe className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Cambiar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code]) => {
          const FlagIcon = languageFlags[code]
          const label = languageLabels[code] ?? code
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => setLanguage(code)}
              className={language === code ? "bg-accent" : ""}
            >
              {FlagIcon ? (
                <span className="mr-2 flex h-4 w-6 shrink-0 items-center justify-center overflow-hidden rounded border border-border">
                  <FlagIcon className="h-3.5 w-5" />
                </span>
              ) : null}
              {label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
