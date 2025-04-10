"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function Home() {
  const { t } = useLanguage()

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
    frontend: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    backend: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    cloud: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    language: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    ai: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    data: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    database: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Hero Section */}
      <Card className="mb-8 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3  p-6 flex items-center justify-center">
              <Avatar className="h-48 w-48 border-4 border-background">
                <AvatarImage src="/enriqueManzano.png" alt={t("home.title")} />
                <AvatarFallback>CEM</AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full md:w-2/3 p-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("home.title")}</h1>
              <p className="text-xl text-muted-foreground mb-4">{t("home.profession")}</p>
              <p className="text-muted-foreground">{t("home.bio")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("home.contact")}</CardTitle>
            <CardDescription>{t("home.contact.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>3017335302</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
              <Link href="mailto:ceman217@gmail.com" className="text-primary hover:underline">
                ceman217@gmail.com
              </Link>
            </div>
            <div className="flex items-center">
              <Linkedin className="h-5 w-5 mr-2 text-muted-foreground" />
              <Link
                href="https://www.linkedin.com/in/EnriqueManzano217"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                EnriqueManzano217
              </Link>
            </div>
            <div className="flex items-center">
              <Github className="h-5 w-5 mr-2 text-muted-foreground" />
              <Link
                href="https://github.com/EnriqueManzano217"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                EnriqueManzano217
              </Link>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Popayán, Colombia</span>
            </div>
          </CardContent>
        </Card>

        {/* Skills Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("home.skills")}</CardTitle>
            <CardDescription>{t("home.skills.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill.name} variant="outline" className={skillColors[skill.category]}>
                  {skill.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
