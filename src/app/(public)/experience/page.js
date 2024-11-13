import ExperienceCard from '../../../components/experienceCard'

export default function Experience() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Experiencia Laboral</h1>
      <ExperienceCard
        title="Desarrollador equipo Ayte"
        company="Ayte"
        period="Septiembre 2023 - Actualidad"
        description="Desarrollador de proyectos web usando tecnologías web como NodeJS y React; miembro del equipo de innovación para el desarrollo de agentes con inteligencia Artificial generativa, implementado en canales como Google chat, Microsoft teams y Slack, haciendo uso de tecnologías como RAG y serverless"
      />
      {/* Puedes agregar más ExperienceCard aquí para otras experiencias */}
    </div>
  )
}