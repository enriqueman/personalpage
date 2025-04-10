import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export default function ExperienceCard({ title, company, period, description }) {
  return (
    <Card className="shadow-md rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold">{company}</span> | {period}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2" dangerouslySetInnerHTML={{ __html: description }} />
      </CardContent>
    </Card>
  )
}
