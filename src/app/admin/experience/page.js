import ExperienceForm from '../../../components/admin/ExperienceForm';
// import { getExperiences } from '@/app/api/experience/route';

export default async function ExperienceAdmin() {
  // const experiences = await getExperiences();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Gestionar Experiencia Laboral</h1>
      <ExperienceForm />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Experiencias Existentes</h2>
        {/* {experiences.map((exp) => (
          <div key={exp.id} className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="font-bold">{exp.title}</h3>
            <p>{exp.company}</p>
            <p>{exp.period}</p>
            <div className="mt-2">
              <button className="mr-2 text-blue-500 hover:underline">Editar</button>
              <button className="text-red-500 hover:underline">Eliminar</button>
            </div>
          </div>
        ))} */}
        holi
      </div>
    </>
  );
}