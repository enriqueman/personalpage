import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ExternalLink } from "lucide-react"

export default function ExperienceCard({
  title,
  company,
  period,
  description,
  intro,
  clients,
  url,
  viewSiteLabel,
  className = "",
  style,
}) {
  const hasValidUrl = url && (url.startsWith("http://") || url.startsWith("https://"))
  const hasClients = clients && clients.length > 0

  return (
    <Card
      className={`card-accent flex flex-col border-l-4 border-transparent border-border shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-0.5 ${className}`}
      style={style}
    >
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-lg font-semibold">{title}</CardTitle>
        <div className="mt-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{company}</span> · {period}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {hasClients ? (
          <>
            <p className="text-sm leading-relaxed text-foreground/90">{intro}</p>
            <div className="space-y-4 border-l-2 border-border pl-4">
              {clients.map((client, index) => (
                <div key={index} className="space-y-1">
                  <h4 className="text-sm font-semibold text-foreground">{client.title}</h4>
                  <p className="text-sm leading-relaxed text-foreground/90">{client.description}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div
            className="text-sm leading-relaxed text-foreground/90 space-y-2"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        {hasValidUrl && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-1"
          >
            {viewSiteLabel}
            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
          </a>
        )}
      </CardContent>
    </Card>
  )
}
