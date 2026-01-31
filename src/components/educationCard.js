import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export default function EducationCard({ degree, institution, period, description, note, className = "", style }) {
  return (
    <Card
      className={`card-accent flex flex-col border-l-4 border-transparent border-border shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-0.5 ${className}`}
      style={style}
    >
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-lg font-semibold">{degree}</CardTitle>
        <div className="mt-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{institution}</span> · {period}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="text-sm leading-relaxed text-foreground/90 space-y-2" dangerouslySetInnerHTML={{ __html: description }} />
        {note && (
          <p className="text-xs text-muted-foreground mt-1" aria-label={note}>
            {note}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
