export default function EducationCard({ degree, institution, period, description }) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-xl font-semibold mb-2">{degree}</h3>
        <p className="text-gray-600 mb-2">{institution}</p>
        <p className="text-sm text-gray-500 mb-4">{period}</p>
        {description && <p className="text-gray-700">{description}</p>}
      </div>
    )
  }