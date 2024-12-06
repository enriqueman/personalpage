// app/components/EducationSection.js
import EducationCard from './educationCard'

export default function EducationSection() {
  const educationData = [
    {
      degree: "Estudiante Maestría inteligencia artificial aplicada",
      institution: "Universidad Icesi",
      period: "Julio 2024 – Diciembre 2025",
      description: "Profundización en técnicas avanzadas de IA y su aplicación práctica en diversos campos."
    },
    {
      degree: "Ingeniería Electrónica y telecomunicaciones",
      institution: "Universidad del Cauca",
      period: "Abril 2024",
      description: "Formación integral en electrónica y sistemas de telecomunicaciones."
    },
    {
      degree: "AWS CLOUD Practitioner",
      institution: "Amazon Web Services AWS",
      period: "Noviembre 2023",
      description: "Certificación en fundamentos de servicios en la nube de AWS."
    },
    {
      degree: "Misión TIC 2022",
      institution: "Universidad Tecnológica de Pereira",
      period: "Abril 2022",
      description: "Programa intensivo de formación en desarrollo de software y habilidades digitales."
    },
    {
      degree: "Data Science",
      institution: "CoderHause",
      period: "Mayo 2022",
      description: "Curso especializado en ciencia de datos y análisis estadístico."
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* <h2 className="text-3xl font-bold mb-6">Educación</h2> */}
      {educationData.map((edu, index) => (
        <EducationCard
          key={index}
          degree={edu.degree}
          institution={edu.institution}
          period={edu.period}
          description={edu.description}
        />
      ))}
    </div>
  )
}