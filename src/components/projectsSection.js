import ProjectsCard from './projectsCard';

export default function ProjectSection() {
  const projectsData = [
    {
      title: "Creación y despliegue página web para Emprendimiento Ghaiasolution.com",
      tipe: "Pagina web",
      period: " www.ghaiasolutions.com",
      description: "Desarrollo y despliegue de la arquitectura y estructura de implementación para una página web de emprendimiento, construida en Next.js y alojada en AWS, utilizando S3, CloudFront y Route 53. Implementación de un sistema de notificación de mensajes a través de SES para almacenar la información de contacto de las personas interesadas"
    },
    {
      title: "Creación y Despliegue de Portafolio Personal",
      tipe: "Pagina web",
      period: "www.enriquemv.com",
      description: "Página web para la presentación de mi portafolio personal, construida en Next.js, alojada en S3 y desplegada en CloudFront y Route 53. Implementa tres tipos de ambientes: desarrollo, pruebas y producción, utilizando GitHub Actions y el AWS Serverless Application Model para el despliegue"
    },
    {
      title: "Despliegue de Modelos de Machine Learning Usando Fargate",
      tipe: "Despliegue modelos",
      period: "www.ataraxiapro.com ",
      description: "Despliegue de modelos de machine learning utilizando Docker, AWS ECS, un balanceador de carga y API Gateway. La infraestructura fue implementada con AWS CDK, y el modelo fue desplegado utilizando FastAPI junto con Docker. El frontend, donde se realizan las peticiones, se implementó en mi página de pruebas y blog personal. "
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* <h2 className="text-3xl font-bold mb-6">Educación</h2> */}
      {projectsData.map((project, index) => (
        <ProjectsCard
          key={index}
          title={project.title}
          tipe={project.tipe}
          period={project.period}
          description={project.description}
        />
      ))}
    </div>
  )
}