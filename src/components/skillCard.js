export default function SkillCard({ category, skills }) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-xl font-semibold mb-4">{category}</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    )
  }