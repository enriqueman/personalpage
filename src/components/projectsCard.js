"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ExternalLink, Images } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ProjectsCard({
  title,
  tipe,
  period,
  description,
  url,
  images,
  viewSiteLabel,
  viewImagesLabel,
  className = "",
  style,
}) {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const hasValidUrl = url && (url.startsWith("http://") || url.startsWith("https://"))
  const hasImages = images && images.length > 0
  const buttonHover = "btn-interactive"

  return (
    <Card
      className={`card-accent flex flex-col border-l-4 border-transparent border-border shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-0.5 ${className}`}
      style={style}
    >
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-lg font-semibold">{title}</CardTitle>
        <div className="mt-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{tipe}</span> · {period}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div
          className="text-sm leading-relaxed text-foreground/90 space-y-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="flex flex-wrap gap-2 mt-1">
          {hasValidUrl && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline ${buttonHover}`}
            >
              {viewSiteLabel}
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
            </a>
          )}
          {hasImages && (
            <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-1.5 rounded-lg border-border ${buttonHover}`}
                >
                  <Images className="h-4 w-4 shrink-0" aria-hidden />
                  {viewImagesLabel}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col border border-border bg-card shadow-xl rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-foreground pr-8 text-lg font-semibold section-accent">
                    {title}
                  </DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto overflow-x-hidden flex-1 -mx-1 px-1 space-y-6 mt-2">
                  {images.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      {item.sectionLabel && (
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary sticky top-0 bg-card/95 backdrop-blur py-1.5 z-10 border-b border-border/50">
                          {item.sectionLabel}
                        </p>
                      )}
                      <div className="rounded-lg border border-border bg-secondary/20 overflow-hidden shadow-sm ring-1 ring-border/50">
                        <img
                          src={item.src}
                          alt={item.sectionLabel || `Captura ${idx + 1}`}
                          className="w-full h-auto object-contain max-h-[70vh]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
