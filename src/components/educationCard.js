import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"


export default function EducationCard({ degree, institution, period, description }) {
  return (
    <Card className="shadow-md rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold mb-2">{degree}</CardTitle>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold">{institution}</span> | {period}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2" dangerouslySetInnerHTML={{ __html: description }} />
      </CardContent>
    </Card>
  )
}


     // <div className="bg-white shadow-md rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg">
      //   <h3 className="text-xl font-semibold mb-2">{degree}</h3>
      //   <p className="text-gray-600 mb-2">{institution}</p>
      //   <p className="text-sm text-gray-500 mb-4">{period}</p>
      //   {description && <p className="text-gray-700">{description}</p>}
      // </div>