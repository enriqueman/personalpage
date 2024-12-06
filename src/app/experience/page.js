import ExperienceCard from "../../components/experienceCard";

export default function Experience() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mt-20 mb-6">
        Experiencia Laboral
      </h1>
      <ExperienceCard
        title="Desarrollador equipo Ayte"
        company="Ayte"
        period="Septiembre 2023 - Actualidad"
        description="Desarrollador de proyectos web usando tecnologías web como NodeJS y React; miembro del equipo de innovación para el desarrollo de agentes con inteligencia Artificial generativa, implementado en canales como Google chat, Microsoft teams y Slack, haciendo uso de tecnologías como RAG y serverless"
      />

      <h1 className="text-3xl font-bold text-center mt-10 mb-6">
        Experiencia Académica
      </h1>

      <ExperienceCard
        title="Sistema de notificación para noticias falsas en el contexto político colombiano"
        company="Universidad del Cauca"
        period="Enero 2023 - Agosto 2023."
        description="Proyecto de trabajo de grado que consistió en la creación de un sistema de identificación y notificación de noticias falsas, utilizando diversas APIs para el reconocimiento y divulgación de contenido verificado en la red. La interfaz fue desarrollada en Angular para sitios web y kotlin para una app.
<br/> •	El proyecto tuvo diferentes etapas, incluyendo la recolección de noticias de diversas fuentes como Twitter (ahora X) y Colombia Check, utilizando la API de Twitter y técnicas de web scraping. Se realizó el proceso de fine-tuning a un modelo de FastAPI para comprobar la veracidad de las noticias.
<br/> •	Se implementó una aplicación para visualizar las noticias verificadas utilizando Kotlin, donde se empleó Firebase como base de datos.  
"
      />

      <ExperienceCard
        title="Sistema veterinario para Mascotas"
        company="Misión TIC 2022"
        period="Abril 2022 - Diciembre 2022"
        description="Proyecto de validación del Curso Misión TIC, que consiste en la creación de un sistema de gestión de mascotas para una veterinaria, para gestionar citas, clientes y mascotas. El sistema fue desarrollado en Node.js y Angular."
      />

    
      {/* Puedes agregar más ExperienceCard aquí para otras experiencias */}
    </div>
  );
}
