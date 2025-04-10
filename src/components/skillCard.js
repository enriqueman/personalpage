import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export default function SkillCard({ category, skills }) {
  return (
    <Card className="shadow-md rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold mb-2">{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
