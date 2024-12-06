// app/skills/page.js
import SkillsSection from '../../components/skillsSection'

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mt-20 mb-10 text-center">Mis Habilidades</h1>
      <SkillsSection />
    </div>
  )
}