"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Definir los idiomas disponibles
const languages = {
  es: "Spanish",
  en: "English",
}

// Crear el contexto
const LanguageContext = createContext({
  language: "es",
  setLanguage: () => null,
  t: (key) => key,
})

// Traducciones
const translations = {
  es: {
    // Header
    "nav.home": "Inicio",
    "nav.experience": "Experiencia",
    "nav.education": "Educación",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
    "theme.system": "Sistema",

    // Home page
    "home.title": "Cesar Enrique Manzano Velasco",
    "home.profession": "Ingeniero en electrónica y telecomunicaciones",
    "home.bio":
      "Apasionado por el desarrollo de soluciones innovadoras y atractivas. He llevado a cabo diversos proyectos web y aplicaciones de inteligencia artificial, utilizando modelos de lenguaje de diferentes proveedores como Bedrock, OpenAI y Claude, así como herramientas como LangChain y LangSmith. Cuento con experiencia en arquitecturas en la nube, especialmente en entornos serverless y en el manejo de bases de datos SQL y NoSQL. Además, poseo habilidades en herramientas CI/CD, utilizando AWS SAM, CDK y Terraform para el despliegue de sitios web y modelos de machine learning.",
    "home.contact": "Contacto",
    "home.contact.description": "Información de contacto profesional",
    "home.phone": "Teléfono",
    "home.email": "Email",
    "home.location": "Ubicación",
    "home.skills": "Habilidades",
    "home.skills.description": "Tecnologías y herramientas",

    // Education
    "education.title": "Educación",
    "education.degree1": "Estudiante Maestría inteligencia artificial aplicada",
    "education.institution1": "Universidad Icesi",
    "education.period1": "Julio 2024 – Diciembre 2025",
    "education.description1": "Profundización en técnicas avanzadas de IA y su aplicación práctica en diversos campos.",

    "education.degree2": "Ingeniería Electrónica y telecomunicaciones",
    "education.institution2": "Universidad del Cauca",
    "education.period2": "Abril 2024",
    "education.description2": "Formación integral en electrónica y sistemas de telecomunicaciones.",

    "education.degree3": "AWS CLOUD Practitioner",
    "education.institution3": "Amazon Web Services AWS",
    "education.period3": "Noviembre 2023",
    "education.description3": "Certificación en fundamentos de servicios en la nube de AWS.",

    "education.degree4": "Misión TIC 2022",
    "education.institution4": "Universidad Tecnológica de Pereira",
    "education.period4": "Abril 2022",
    "education.description4": "Programa intensivo de formación en desarrollo de software y habilidades digitales.",

    "education.degree5": "Data Science",
    "education.institution5": "CoderHause",
    "education.period5": "Mayo 2022",
    "education.description5": "Curso especializado en ciencia de datos y análisis estadístico.",

    // Experience
    "experience.title": "Experiencia Laboral",
    "experience.academic.title": "Experiencia Académica",

    "experience.job1.title": "Desarrollador equipo Ayte",
    "experience.job1.company": "Ayte",
    "experience.job1.period": "Septiembre 2023 - Actualidad",
    "experience.job1.description":
      "Desarrollador de proyectos web usando tecnologías web como NodeJS y React; miembro del equipo de innovación para el desarrollo de agentes con inteligencia Artificial generativa, implementado en canales como Google chat, Microsoft teams y Slack, haciendo uso de tecnologías como RAG y serverless",

    "experience.academic1.title": "Sistema de notificación para noticias falsas en el contexto político colombiano",
    "experience.academic1.company": "Universidad del Cauca",
    "experience.academic1.period": "Enero 2023 - Agosto 2023.",
    "experience.academic1.description":
      "Proyecto de trabajo de grado que consistió en la creación de un sistema de identificación y notificación de noticias falsas, utilizando diversas APIs para el reconocimiento y divulgación de contenido verificado en la red. La interfaz fue desarrollada en Angular para sitios web y kotlin para una app.<br/> •	El proyecto tuvo diferentes etapas, incluyendo la recolección de noticias de diversas fuentes como Twitter (ahora X) y Colombia Check, utilizando la API de Twitter y técnicas de web scraping. Se realizó el proceso de fine-tuning a un modelo de FastAPI para comprobar la veracidad de las noticias.<br/> •	Se implementó una aplicación para visualizar las noticias verificadas utilizando Kotlin, donde se empleó Firebase como base de datos.",

    "experience.academic2.title": "Sistema veterinario para Mascotas",
    "experience.academic2.company": "Misión TIC 2022",
    "experience.academic2.period": "Abril 2022 - Diciembre 2022",
    "experience.academic2.description":
      "Proyecto de validación del Curso Misión TIC, que consiste en la creación de un sistema de gestión de mascotas para una veterinaria, para gestionar citas, clientes y mascotas. El sistema fue desarrollado en Node.js y Angular.",

    // Projects
    "projects.title": "Proyectos personales",

    "projects.project1.title": "Creación y despliegue página web para Emprendimiento Ghaiasolution.com",
    "projects.project1.type": "Pagina web",
    "projects.project1.period": "www.ghaiasolutions.com",
    "projects.project1.description":
      "Desarrollo y despliegue de la arquitectura y estructura de implementación para una página web de emprendimiento, construida en Next.js y alojada en AWS, utilizando S3, CloudFront y Route 53. Implementación de un sistema de notificación de mensajes a través de SES para almacenar la información de contacto de las personas interesadas",

    "projects.project2.title": "Creación y Despliegue de Portafolio Personal",
    "projects.project2.type": "Pagina web",
    "projects.project2.period": "www.enriquemv.com",
    "projects.project2.description":
      "Página web para la presentación de mi portafolio personal, construida en Next.js, alojada en S3 y desplegada en CloudFront y Route 53. Implementa tres tipos de ambientes: desarrollo, pruebas y producción, utilizando GitHub Actions y el AWS Serverless Application Model para el despliegue",

    "projects.project3.title": "Despliegue de Modelos de Machine Learning Usando Fargate",
    "projects.project3.type": "Despliegue modelos",
    "projects.project3.period": "www.ataraxiapro.com",
    "projects.project3.description":
      "Despliegue de modelos de machine learning utilizando Docker, AWS ECS, un balanceador de carga y API Gateway. La infraestructura fue implementada con AWS CDK, y el modelo fue desplegado utilizando FastAPI junto con Docker. El frontend, donde se realizan las peticiones, se implementó en mi página de pruebas y blog personal.",

    // Skills
    "skills.title": "Habilidades",
    "skills.category1": "Desarrollo Web",
    "skills.category2": "Cloud y Bases de Datos",
    "skills.category3": "Inteligencia Artificial",
    "skills.category4": "Otras Tecnologías",

    // Footer
    "footer.rights": "Todos los derechos reservados",

    //Theme
    "theme.title": "Cambiar tema",
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
    "theme.system": "Sistema"
  },
  en: {
    // Header
    "nav.home": "Home",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",

    // Home page
    "home.title": "Cesar Enrique Manzano Velasco",
    "home.profession": "Electronics and Telecommunications Engineer",
    "home.bio":
      "Passionate about developing innovative and attractive solutions. I have carried out various web projects and artificial intelligence applications, using language models from different providers such as Bedrock, OpenAI, and Claude, as well as tools like LangChain and LangSmith. I have experience in cloud architectures, especially in serverless environments and in managing SQL and NoSQL databases. Additionally, I possess skills in CI/CD tools, using AWS SAM, CDK, and Terraform for deploying websites and machine learning models.",
    "home.contact": "Contact",
    "home.contact.description": "Professional contact information",
    "home.phone": "Phone",
    "home.email": "Email",
    "home.location": "Location",
    "home.skills": "Skills",
    "home.skills.description": "Technologies and tools",

    // Education
    "education.title": "Education",
    "education.degree1": "Applied Artificial Intelligence Master's Student",
    "education.institution1": "Icesi University",
    "education.period1": "July 2024 – December 2025",
    "education.description1": "Deepening in advanced AI techniques and their practical application in various fields.",

    "education.degree2": "Electronics and Telecommunications Engineering",
    "education.institution2": "University of Cauca",
    "education.period2": "April 2024",
    "education.description2": "Comprehensive training in electronics and telecommunications systems.",

    "education.degree3": "AWS CLOUD Practitioner",
    "education.institution3": "Amazon Web Services AWS",
    "education.period3": "November 2023",
    "education.description3": "Certification in AWS cloud services fundamentals.",

    "education.degree4": "Mission TIC 2022",
    "education.institution4": "Technological University of Pereira",
    "education.period4": "April 2022",
    "education.description4": "Intensive training program in software development and digital skills.",

    "education.degree5": "Data Science",
    "education.institution5": "CoderHause",
    "education.period5": "May 2022",
    "education.description5": "Specialized course in data science and statistical analysis.",

    // Experience
    "experience.title": "Work Experience",
    "experience.academic.title": "Academic Experience",

    "experience.job1.title": "Developer at Ayte Team",
    "experience.job1.company": "Ayte",
    "experience.job1.period": "September 2023 - Present",
    "experience.job1.description":
      "Web project developer using technologies such as NodeJS and React; member of the innovation team for the development of agents with generative Artificial Intelligence, implemented in channels such as Google Chat, Microsoft Teams, and Slack, using technologies such as RAG and serverless",

    "experience.academic1.title": "Fake News Notification System in the Colombian Political Context",
    "experience.academic1.company": "University of Cauca",
    "experience.academic1.period": "January 2023 - August 2023",
    "experience.academic1.description":
      "Thesis project that consisted of creating a system for identifying and notifying fake news, using various APIs for the recognition and dissemination of verified content on the network. The interface was developed in Angular for websites and Kotlin for an app.<br/> • The project had different stages, including collecting news from various sources such as Twitter (now X) and Colombia Check, using the Twitter API and web scraping techniques. A fine-tuning process was performed on a FastAPI model to verify the veracity of the news.<br/> • An application was implemented to visualize the verified news using Kotlin, where Firebase was used as a database.",

    "experience.academic2.title": "Veterinary System for Pets",
    "experience.academic2.company": "Mission TIC 2022",
    "experience.academic2.period": "April 2022 - December 2022",
    "experience.academic2.description":
      "Validation project for the Mission TIC Course, which consists of creating a pet management system for a veterinary clinic, to manage appointments, clients, and pets. The system was developed in Node.js and Angular.",

    // Projects
    "projects.title": "Personal Projects",

    "projects.project1.title": "Creation and Deployment of Website for Ghaiasolution.com Entrepreneurship",
    "projects.project1.type": "Website",
    "projects.project1.period": "www.ghaiasolutions.com",
    "projects.project1.description":
      "Development and deployment of the architecture and implementation structure for an entrepreneurship website, built in Next.js and hosted on AWS, using S3, CloudFront, and Route 53. Implementation of a message notification system through SES to store contact information of interested people",

    "projects.project2.title": "Creation and Deployment of Personal Portfolio",
    "projects.project2.type": "Website",
    "projects.project2.period": "www.enriquemv.com",
    "projects.project2.description":
      "Website for the presentation of my personal portfolio, built in Next.js, hosted on S3, and deployed on CloudFront and Route 53. It implements three types of environments: development, testing, and production, using GitHub Actions and the AWS Serverless Application Model for deployment",

    "projects.project3.title": "Deployment of Machine Learning Models Using Fargate",
    "projects.project3.type": "Model Deployment",
    "projects.project3.period": "www.ataraxiapro.com",
    "projects.project3.description":
      "Deployment of machine learning models using Docker, AWS ECS, a load balancer, and API Gateway. The infrastructure was implemented with AWS CDK, and the model was deployed using FastAPI along with Docker. The frontend, where requests are made, was implemented on my testing and personal blog page.",

    // Skills
    "skills.title": "Skills",
    "skills.category1": "Web Development",
    "skills.category2": "Cloud and Databases",
    "skills.category3": "Artificial Intelligence",
    "skills.category4": "Other Technologies",

    // Footer
    "footer.rights": "All rights reserved",

    //Theme
    "theme.title": "Change theme",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System"
  },
}

export function LanguageProvider({ children, defaultLanguage = "es", storageKey = "language" }) {
  const [language, setLanguage] = useState(defaultLanguage)

  // Cargar el idioma guardado en localStorage al iniciar
  useEffect(() => {
    const savedLanguage = localStorage.getItem(storageKey)
    if (savedLanguage && Object.keys(languages).includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [storageKey])

  // Función para traducir textos
  const t = (key) => {
    return translations[language][key] || key
  }

  // Guardar el idioma seleccionado en localStorage
  const handleSetLanguage = (newLanguage) => {
    localStorage.setItem(storageKey, newLanguage)
    setLanguage(newLanguage)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        languages,
        setLanguage: handleSetLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

// Hook para usar el contexto de idioma
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
