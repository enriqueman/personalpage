import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

// skills: array of { label: string, level?: string }
export default function SkillCard({ category, skills, className = "", style }) {
  return (
    <Card
      className={`card-accent flex flex-col border-l-4 border-transparent border-border shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-0.5 ${className}`}
      style={style}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1.5 text-sm text-foreground/90">
          {skills.map((skill, index) => (
            <li key={index} className="flex items-baseline gap-2">
              <span className="text-muted-foreground select-none">•</span>
              <span>
                {typeof skill === "string" ? (
                  skill
                ) : (
                  <>
                    {skill.label}
                    {skill.level && (
                      <span className="ml-1.5 text-xs text-muted-foreground">({skill.level})</span>
                    )}
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
