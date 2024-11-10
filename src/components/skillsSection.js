// app/components/SkillsSection.js
import SkillCard from './skillCard'

export default function SkillsSection() {
  const skillCategories = [
    {
      category: "Desarrollo Web",
      skills: ["React", "NodeJS", "JavaScript", "HTML", "CSS"]
    },
    {
      category: "Cloud y Bases de Datos",
      skills: ["AWS", "SQL", "MongoDB"]
    },
    {
      category: "Inteligencia Artificial",
      skills: ["Python", "Langchain", "Machine Learning"]
    },
    {
      category: "Otras Tecnologías",
      skills: ["ETL", "Git", "Docker"]
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Habilidades</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category, index) => (
          <SkillCard key={index} category={category.category} skills={category.skills} />
        ))}
      </div>
    </div>
  )
}