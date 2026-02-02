"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Definir los idiomas disponibles
const languages = {
  es: "Spanish",
  en: "English",
  // pt: "Portuguese",
  // it: "Italian",
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
    "cv.download": "Descargar CV",
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
    "theme.system": "Sistema",

    // Home page – Hero
    "home.hero.greeting": "Hola, soy",
    "home.hero.name": "Cesar Enrique Manzano Velasco",
    "home.hero.title": "Magíster en Inteligencia Artificial · Ingeniero en Electrónica y Telecomunicaciones · Soluciones de IA en la nube",
    "home.hero.bio":
      "Construyo soluciones de IA y arquitecturas serverless en la nube. Especializado en llevar modelos y productos desde el diseño hasta producción — backend, datos e infraestructura.",
    "home.hero.cta.projects": "Ver proyectos",
    "home.hero.cta.contact": "Contactar",
    "home.hero.availability": "Disponible para proyectos remotos y roles backend/IA",

    "home.stats.years": "Años de experiencia",
    "home.stats.projects": "Proyectos realizados",
    "home.stats.technologies": "Tecnologías",

    // Home page (legacy)
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
    "home.skills.description": "Principales tecnologías con las que trabajo a diario",
    "home.skills.verTodas": "Ver todas las habilidades",

    // Sobre mí
    "home.about.title": "Sobre mí",
    "home.about.p1":
      "Soy ingeniero en electrónica y telecomunicaciones y me dedico a unir electrónica, desarrollo de software, IA y arquitecturas en la nube. Mi formación en sistemas me permite diseñar soluciones que van desde el prototipo hasta producción: aplicaciones, integración de modelos de lenguaje y arquitecturas escalables en AWS.",
    "home.about.p2":
      "Trabajo a diario con modelos de lenguaje como Amazon Bedrock, OpenAI y Claude, y con frameworks como LangChain y LangSmith para orquestar flujos, trazar ejecuciones y medir resultados. En la nube diseño y despliego soluciones serverless —Lambda, API Gateway, almacenamiento y pipelines de datos— pensadas para crecer sin sacrificar mantenibilidad ni visibilidad.",
    "home.about.p3":
      "Me interesa que lo que construyo aporte al negocio: por eso priorizo escalabilidad, código mantenible, observabilidad y pipelines CI/CD que permitan iterar con confianza. Busco proyectos donde IA, datos y cloud se integren para resolver problemas reales.",

    "home.contact.invitation":
      "¿Tienes un proyecto en mente, una idea con IA o una vacante relacionada con cloud e IA? Estoy abierto a conversar.",
    "home.contact.emailLabel": "Correo",
    "home.contact.phoneLabel": "Teléfono / WhatsApp",
    "home.contact.githubLabel": "GitHub",
    "home.contact.locationLabel": "Ubicación",

    "home.projects.sectionTitle": "Proyectos destacados",
    "home.projects.verTodos": "Ver todos los proyectos",
    "home.projects.cta": "Ver proyecto",

    "home.value.title": "Cómo puedo aportar",
    "home.value.bullet1": "Diseño y despliego soluciones de IA en AWS con arquitecturas serverless, desde prototipo hasta producción.",
    "home.value.bullet2": "Integro LLMs en aplicaciones y APIs con LangChain y LangSmith, con trazabilidad y métricas.",
    "home.value.bullet3": "Automatizo despliegues con CI/CD (AWS SAM, CDK, Terraform) y buenas prácticas de observabilidad.",
    "home.value.bullet4": "Colaboro con equipos técnicos para alinear requisitos, priorizar entregas y mantener código mantenible y documentado.",
    "home.value.bullet5": "Entrego soluciones robustas y medibles: priorizo métricas, pruebas y pipelines que permiten iterar con confianza.",
    "home.value.bullet6": "Conecto IA, datos y cloud para resolver problemas de negocio reales, reduciendo tiempo de entrega y costos operativos.",

    // Education
    "education.title": "Educación",
    "education.hero.greeting": "Formación",
    "education.hero.subtitle": "Formación académica, certificaciones y cursos especializados.",
    "education.hero.backHome": "Volver al inicio",
    "education.section.title": "Formación y certificaciones",
    "education.section.description": "Títulos, programas y certificaciones que respaldan mi perfil técnico.",
    "education.degree1": "Magíster en inteligencia artificial aplicada",
    "education.institution1": "Universidad Icesi",
    "education.period1": "Julio 2024 – Diciembre 2025",
    "education.degree1.note": "A la espera de grado (marzo 2026). Todos los requisitos cumplidos.",
    "education.description1": "Formación en técnicas avanzadas de IA y su aplicación práctica en diversos ámbitos. El programa cubre los cinco tipos principales de machine learning tradicional (supervisado, no supervisado, autosupervisado, por refuerzo y semisupervisado), pipelines de datos, diseño y despliegue de modelos de IA en la nube, y procesamiento del lenguaje natural (NLP). Incluye además aplicaciones de IA generativa con frameworks como n8n, LangChain y otros.",

    "education.degree2": "Ingeniería Electrónica y Telecomunicaciones",
    "education.institution2": "Universidad del Cauca",
    "education.period2": "Abril 2024",
    "education.description2": "Formación integral en electrónica, telecomunicaciones y sistemas digitales. Desarrolla competencias en diseño, implementación y gestión de soluciones tecnológicas que integran hardware, software y redes de comunicación. Enfocado en la innovación, la investigación y el impacto social, el programa prepara profesionales capaces de afrontar los retos de la conectividad global, la automatización y las tecnologías emergentes en el ámbito de las TIC.",

    "education.degree3": "AWS Certified Cloud Practitioner",
    "education.institution3": "Amazon Web Services (AWS)",
    "education.period3": "Noviembre 2023",
    "education.description3": "Certificación de nivel fundamental que valida el conocimiento de los servicios en la nube de AWS, los conceptos clave de computación en la nube, terminología, seguridad, precios y mejores prácticas. Constituye un punto de entrada sólido para carreras en AWS y acredita competencia en fundamentos cloud.",

    "education.degree4": "Misión TIC 2022",
    "education.institution4": "Universidad Tecnológica de Pereira",
    "education.period4": "Abril 2022",
    "education.description4": "Programa intensivo gratuito del Ministerio TIC de Colombia para formar talento digital en desarrollo de software, programación, redes de datos y habilidades digitales. Operado por la Universidad Tecnológica de Pereira, con competencias técnicas alineadas al mercado laboral y énfasis en inclusión y acompañamiento integral.",

    "education.degree5": "Data Science",
    "education.institution5": "CoderHouse",
    "education.period5": "Mayo 2022",
    "education.description5": "Curso especializado en fundamentos de ciencia de datos: análisis exploratorio, manipulación de datos con Python (Pandas, NumPy), SQL, visualizaciones y estadística. Incluye machine learning supervisado y no supervisado, y aplicaciones prácticas de IA para extraer insights y construir modelos predictivos.",

    // Experience
    "experience.title": "Experiencia",
    "experience.hero.greeting": "Trayectoria",
    "experience.hero.subtitle": "Resumen de mi experiencia laboral y académica.",
    "experience.hero.backHome": "Volver al inicio",
    "experience.work.title": "Experiencia laboral",
    "experience.work.description": "Puestos y proyectos en el ámbito profesional.",
    "experience.academic.title": "Experiencia Académica",
    "experience.academic.description": "Proyectos y formaciones en el ámbito académico.",

    "experience.job1.title": "Desarrollador equipo Ayte",
    "experience.job1.company": "Ayte",
    "experience.job1.period": "Septiembre 2023 - Actualidad",
    "experience.job1.intro":
      "Actualmente formo parte del equipo de soporte HDI Colombia, donde desarrollo mejoras innovadoras de producto y entrego soluciones a los retos del sector asegurador utilizando tecnologías serverless en AWS y bases de datos gestionadas.",
    "experience.job1.client1.title": "Equipo de innovación GenAI",
    "experience.job1.client1.description":
      "Participé en el desarrollo de agentes de IA generativa desplegados en múltiples canales de comunicación, como Microsoft Teams, Google Chat y WhatsApp. Implementé sistemas RAG (Retrieval-Augmented Generation) avanzados con bases de datos vectoriales, bases de conocimiento y orquestación inteligente usando LangChain y LangSmith para habilitar soluciones de IA conversacional escalables.",
    "experience.job1.client2.title": "Plataforma de suscripción Liberty Seguros Colombia",
    "experience.job1.client2.description":
      "Contribuí al desarrollo full-stack de una nueva aplicación de suscripciones para una aseguradora líder. Diseñé un frontend responsive en React y servicios backend escalables en Node.js, con infraestructura serverless en AWS Lambda, DynamoDB y S3 para transacciones de alto volumen y procesamiento de datos.",
    "experience.job1.client3.title": "Soluciones empresariales",
    "experience.job1.client3.description":
      "Participé en el desarrollo de nuevas funcionalidades y mejoras para varios clientes empresariales, entre ellos Allianz y Grupo Lemco (Challenger, Sky). Aproveché tecnologías serverless en AWS para construir servicios web robustos que mejoraron la eficiencia operativa y la experiencia del cliente.",

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

    "experience.academic3.title": "Sistema de Gestor Estratégico de Talento y Habilidades",
    "experience.academic3.company": "Universidad Icesi · Coomeva",
    "experience.academic3.period": "2024-2025",
    "experience.academic3.description":
      "Proyecto de trabajo de grado para la Maestría en Inteligencia Artificial Aplicada. Sistema recomendador que recibe un Excel con ID de usuario e ID de supervisor; cada supervisor escribe comentarios con áreas de mejora por empleado. El sistema analiza cada comentario, busca la competencia relevante en base de datos y, si no la encuentra, consulta la red con la API de Perplexity, persiste los datos y asigna curso o ruta de formación. Incluye descarga de reportes. Tecnologías: LangChain, DynamoDB, Supabase (base de datos y vectorial), S3, GitHub Actions, JavaScript y Python.",
    "experience.academic3.url": "https://d2j1f9rczww7xs.cloudfront.net/results",

    // Projects
    "projects.title": "Proyectos personales",
    "projects.hero.greeting": "Portafolio",
    "projects.hero.subtitle": "Proyectos personales y profesionales: web, despliegue e infraestructura.",
    "projects.hero.backHome": "Volver al inicio",
    "projects.section.title": "Proyectos destacados",
    "projects.section.description": "Desarrollo, despliegue y arquitectura en Next.js, AWS y machine learning.",

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
    "projects.project2.url": "https://www.enriquemv.com/",

    "projects.project3.title": "Sistema de Gestión y Publicación de Blog Ataraxia",
    "projects.project3.type": "Full Stack Serverless | Panel administrativo + Blog público con Gen AI · 2024-2025",
    "projects.project3.period": "www.ataraxiapro.com",
    "projects.project3.description":
      "Sistema completo de gestión de contenidos para el blog de Ataraxia, demostrando arquitectura serverless escalable en AWS. El panel administrativo (Next.js + React 19) permite a editores autenticarse, crear y gestionar borradores de artículos, autores, categorías y etiquetas, además de subir y procesar imágenes.<br/><br/>Backend Serverless (AWS Lambda): Implementé microservicios con Lambda para autenticación JWT con DynamoDB, gestión de borradores, procesamiento y almacenamiento de imágenes en S3, y orquestación de publicación. La función de publicación automatiza la lectura de datos desde DynamoDB, descarga de assets desde S3, y generación de contenido estático con commit automático a Git, activando despliegue en GitHub Pages mediante webhooks. Esto demuestra capacidad de ETL y automatización de pipelines de datos.<br/><br/>Frontend + Arquitectura UI: Implementé Atomic Design (atoms, molecules, organisms, templates) para componentes reutilizables y escalables, utilizando React 19, Tailwind CSS y Radix UI para una UI profesional y accesible.<br/><br/>Seguridad e Infraestructura: Control granular de acceso por roles (EDITOR, ADMIN) con validación robusta (Joi y Zod), JWT para autenticación stateless, CI/CD automatizado con GitHub Actions, y deployments sin servidor con API Gateway + Lambda + DynamoDB.<br/><br/>Tecnologías: Next.js 15, React 19, Tailwind CSS, Radix UI, AWS (Lambda, API Gateway, DynamoDB, S3), GitHub Actions, Node.js, JWT.",
    "projects.project3.url": "https://www.ataraxiapro.com/",

    "projects.project4.title": "Sistema de Gestor Estratégico de Talento y Habilidades",
    "projects.project4.type": "IA aplicada / Trabajo de grado",
    "projects.project4.period": "Universidad Icesi · Coomeva · 2024-2025",
    "projects.project4.description":
      "Proyecto de trabajo de grado para la Maestría en Inteligencia Artificial Aplicada. Sistema recomendador que recibe un Excel con ID de usuario e ID de supervisor; cada supervisor escribe comentarios con áreas de mejora por empleado. El sistema analiza cada comentario, busca la competencia relevante en base de datos y, si no la encuentra, consulta la red con la API de Perplexity, persiste los datos y asigna curso o ruta de formación. Incluye descarga de reportes. Desarrollado como proyecto práctico con Coomeva. Tecnologías: LangChain, DynamoDB, Supabase (base de datos y vectorial), S3, GitHub Actions, JavaScript y Python.",
    "projects.project4.url": "https://d2j1f9rczww7xs.cloudfront.net",
    "projects.viewSite": "Ver sitio web",
    "projects.viewImages": "Ver capturas",
    "projects.gallery.dashboard": "Dashboard",
    "projects.gallery.upload": "Carga de datos",
    "projects.gallery.results": "Resultados",

    "projects.project5.title": "Sistema de notificación para noticias falsas en el contexto político colombiano",
    "projects.project5.type": "Proyecto de grado",
    "projects.project5.period": "Universidad del Cauca · Enero 2023 - Agosto 2023",
    "projects.project5.description":
      "Proyecto de trabajo de grado que consistió en la creación de un sistema de identificación y notificación de noticias falsas, utilizando diversas APIs para el reconocimiento y divulgación de contenido verificado en la red. La interfaz fue desarrollada en Angular para sitios web y Kotlin para una app.<br/> • El proyecto tuvo diferentes etapas, incluyendo la recolección de noticias de diversas fuentes como Twitter (ahora X) y Colombia Check, utilizando la API de Twitter y técnicas de web scraping. Se realizó el proceso de fine-tuning a un modelo de FastAPI para comprobar la veracidad de las noticias.<br/> • Se implementó una aplicación para visualizar las noticias verificadas utilizando Kotlin, donde se empleó Firebase como base de datos.",

    "projects.project6.title": "Sistema veterinario para Mascotas",
    "projects.project6.type": "Proyecto de grado",
    "projects.project6.period": "Misión TIC 2022 · Abril 2022 - Diciembre 2022",
    "projects.project6.description":
      "Proyecto de validación del Curso Misión TIC, que consiste en la creación de un sistema de gestión de mascotas para una veterinaria, para gestionar citas, clientes y mascotas. El sistema fue desarrollado en Node.js y Angular.",

    // Skills
    "skills.title": "Habilidades",
    "skills.hero.greeting": "Tecnologías",
    "skills.hero.subtitle": "Tecnologías y herramientas agrupadas por área: backend, frontend, cloud y datos.",
    "skills.hero.backHome": "Volver al inicio",
    "skills.section.title": "Tecnologías por categoría",
    "skills.section.description": "Agrupación por áreas: backend, frontend, cloud y datos.",
    "skills.about.title": "Sobre mis habilidades",
    "skills.about.cloud": "Mi enfoque principal es el desarrollo serverless en la nube, con mayor experiencia en AWS. También trabajo con servicios de otros proveedores como Google Cloud y Azure cuando el proyecto lo requiere.",
    "skills.about.cicd": "Desarrollo soluciones serverless y tengo experiencia sólida en CI/CD con GitHub Actions, utilizando infraestructura como código con AWS SAM, AWS CDK y Terraform.",
    "skills.about.frontend": "En frontend trabajo con Next.js, React y Vue. Despliego aplicaciones SPA (single page application) que consumen APIs y servicios del backend.",
    "skills.about.hosting": "Gestiono hosting en Hostinger y configuro DNS y enrutamiento con Route 53 o con los dominios de Hostinger.",
    "skills.about.agents": "Desarrollo sistemas multiagente en Python con LangChain y LangSmith para orquestar flujos de IA.",
    "skills.about.rag": "Implemento bases de datos vectoriales para sistemas RAG (Retrieval-Augmented Generation) que mejoran la precisión de los modelos de lenguaje.",
    "skills.category1": "Desarrollo Web",
    "skills.category2": "Cloud y Bases de Datos",
    "skills.category3": "Inteligencia Artificial",
    "skills.category4": "Otras Tecnologías",
    "skills.categoryBackend": "Backend y APIs",
    "skills.categoryFrontend": "Frontend",
    "skills.categoryCloud": "Cloud y DevOps",
    "skills.categoryData": "Datos e IA",
    "skills.level.high": "nivel alto",
    "skills.level.mid": "nivel intermedio",
    // Backend y APIs
    "skills.backend.item1": "NodeJS",
    "skills.backend.item2": "Python",
    "skills.backend.item3": "Diseño de APIs REST",
    "skills.backend.item4": "FastAPI",
    "skills.backend.item5": "Integración serverless",
    // Frontend
    "skills.frontend.item1": "React",
    "skills.frontend.item2": "Next.js",
    "skills.frontend.item3": "JavaScript / TypeScript",
    "skills.frontend.item4": "HTML / CSS",
    // Cloud y DevOps
    "skills.cloud.item1": "AWS",
    "skills.cloud.item2": "Arquitecturas serverless",
    "skills.cloud.item3": "AWS SAM y CDK",
    "skills.cloud.item4": "Terraform",
    "skills.cloud.item5": "CI/CD y GitHub Actions",
    "skills.cloud.item6": "Monitoreo básico",
    // Datos e IA
    "skills.data.item1": "ETL y pipelines de datos",
    "skills.data.item2": "SQL y bases relacionales",
    "skills.data.item3": "MongoDB y NoSQL",
    "skills.data.item4": "Modelos Bedrock, OpenAI y Claude",
    "skills.data.item5": "LangChain y LangSmith",

    // Footer
    "footer.rights": "Todos los derechos reservados",

    //Theme
    "theme.title": "Cambiar tema",
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
    "theme.system": "Sistema",

    // 404 Page
    "404.title": "404 - Página no encontrada",
    "404.description": "Lo sentimos, la página que buscas no existe.",
    "404.button": "Volver al inicio",
  },
  en: {
    // Header
    "nav.home": "Home",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "cv.download": "Download CV",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",

    // Home page – Hero
    "home.hero.greeting": "Hi, I'm",
    "home.hero.name": "Cesar Enrique Manzano Velasco",
    "home.hero.title": "Master's in Artificial Intelligence · Electronics and Telecommunications Engineer · AI Solutions in the Cloud",
    "home.hero.bio":
      "I build AI solutions and serverless cloud architectures. I specialize in taking models and products from design to production—backend, data, and infrastructure.",
    "home.hero.cta.projects": "View projects",
    "home.hero.cta.contact": "Contact",
    "home.hero.availability": "Available for remote projects and backend/AI roles",

    "home.stats.years": "Years of experience",
    "home.stats.projects": "Projects completed",
    "home.stats.technologies": "Technologies",

    // Home page (legacy)
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
    "home.skills.description": "Main technologies I work with on a daily basis",
    "home.skills.verTodas": "View all skills",

    "home.about.title": "About me",
    "home.about.p1":
      "I'm an electronics and telecommunications engineer focused on bringing together electronics, software development, AI, and cloud architectures. My systems background lets me design solutions from prototype to production: applications, language model integration, and scalable architectures on AWS.",
    "home.about.p2":
      "I work daily with language models such as Amazon Bedrock, OpenAI, and Claude, and with frameworks like LangChain and LangSmith to orchestrate flows, trace runs, and measure outcomes. In the cloud I design and deploy serverless solutions —Lambda, API Gateway, storage, and data pipelines— built to scale without sacrificing maintainability or visibility.",
    "home.about.p3":
      "I care that what I build delivers for the business: that's why I prioritize scalability, maintainable code, observability, and CI/CD pipelines that allow teams to iterate with confidence. I look for projects where AI, data, and cloud come together to solve real problems.",

    "home.contact.invitation":
      "Do you have a project in mind, an AI idea, or a role related to cloud and AI? I'm open to talking.",
    "home.contact.emailLabel": "Email",
    "home.contact.phoneLabel": "Phone / WhatsApp",
    "home.contact.githubLabel": "GitHub",
    "home.contact.locationLabel": "Location",

    "home.projects.sectionTitle": "Featured projects",
    "home.projects.verTodos": "View all projects",
    "home.projects.cta": "View project",

    "home.value.title": "How I can contribute",
    "home.value.bullet1": "Design and deploy AI solutions on AWS with serverless architectures, from prototype to production.",
    "home.value.bullet2": "Integrate LLMs into applications and APIs with LangChain and LangSmith, with traceability and metrics.",
    "home.value.bullet3": "Automate deployments with CI/CD (AWS SAM, CDK, Terraform) and observability best practices.",
    "home.value.bullet4": "Collaborate with technical teams to align requirements, prioritize deliverables, and keep code maintainable and documented.",
    "home.value.bullet5": "Deliver robust, measurable solutions: I prioritize metrics, testing, and pipelines that let teams iterate with confidence.",
    "home.value.bullet6": "Connect AI, data, and cloud to solve real business problems, reducing time to delivery and operational costs.",

    // Education
    "education.title": "Education",
    "education.hero.greeting": "Learning",
    "education.hero.subtitle": "Academic education, certifications, and specialized courses.",
    "education.hero.backHome": "Back to home",
    "education.section.title": "Education and certifications",
    "education.section.description": "Degrees, programs, and certifications that support my technical profile.",
    "education.degree1": "Master's in Applied Artificial Intelligence",
    "education.institution1": "Icesi University",
    "education.period1": "July 2024 – December 2025",
    "education.degree1.note": "Pending degree conferral (March 2026). All requirements completed.",
    "education.description1": "Training in advanced AI techniques and their practical application across various domains. The program covers the five main types of traditional machine learning (supervised, unsupervised, self-supervised, reinforcement, and semi-supervised), data pipelines, design and deployment of AI models in the cloud, and natural language processing (NLP). It also includes generative AI applications with frameworks such as n8n, LangChain, and others.",

    "education.degree2": "Electronics and Telecommunications Engineering",
    "education.institution2": "University of Cauca",
    "education.period2": "April 2024",
    "education.description2": "Comprehensive training in electronics, telecommunications, and digital systems. Develops competencies in design, implementation, and management of technological solutions that integrate hardware, software, and communication networks. Focused on innovation, research, and social impact, the program prepares professionals to address the challenges of global connectivity, automation, and emerging technologies in the ICT field.",

    "education.degree3": "AWS Certified Cloud Practitioner",
    "education.institution3": "Amazon Web Services (AWS)",
    "education.period3": "November 2023",
    "education.description3": "Entry-level certification that validates knowledge of AWS cloud services, key cloud computing concepts, terminology, security, pricing, and best practices. Provides a solid entry point for AWS careers and attests to foundational cloud competency.",

    "education.degree4": "Mission TIC 2022",
    "education.institution4": "Technological University of Pereira",
    "education.period4": "April 2022",
    "education.description4": "Free intensive program by Colombia's Ministry of ICT to train digital talent in software development, programming, data networks, and digital skills. Operated by the Technological University of Pereira, with technical competencies aligned to the labor market and a focus on inclusion and comprehensive support.",

    "education.degree5": "Data Science",
    "education.institution5": "CoderHouse",
    "education.period5": "May 2022",
    "education.description5": "Specialized course in data science fundamentals: exploratory analysis, data manipulation with Python (Pandas, NumPy), SQL, visualizations, and statistics. Includes supervised and unsupervised machine learning, and practical AI applications to extract insights and build predictive models.",

    // Experience
    "experience.title": "Experience",
    "experience.hero.greeting": "Background",
    "experience.hero.subtitle": "Summary of my work and academic experience.",
    "experience.hero.backHome": "Back to home",
    "experience.work.title": "Work experience",
    "experience.work.description": "Positions and projects in a professional setting.",
    "experience.academic.title": "Academic Experience",
    "experience.academic.description": "Projects and training in an academic setting.",

    "experience.job1.title": "Developer at Ayte Team",
    "experience.job1.company": "Ayte",
    "experience.job1.period": "September 2023 - Present",
    "experience.job1.intro":
      "I am currently a member of the HDI Colombia support team, where I develop innovative product improvements and deliver solutions to insurance industry challenges leveraging serverless AWS technologies and managed databases.",
    "experience.job1.client1.title": "GenAI Innovation Team",
    "experience.job1.client1.description":
      "I participated in developing generative AI agents deployed across multiple communication channels including Microsoft Teams, Google Chat, and WhatsApp. I implemented advanced RAG (Retrieval-Augmented Generation) systems with vectorized databases, knowledge bases, and intelligent orchestration using LangChain and LangSmith to enable scalable conversational AI solutions.",
    "experience.job1.client2.title": "Liberty Seguros Colombia Subscription Platform",
    "experience.job1.client2.description":
      "I contributed to the full-stack development of a new subscription application for a major insurance provider. I engineered a responsive React frontend and scalable Node.js backend services, designing a serverless infrastructure using AWS Lambda, DynamoDB, and S3 to handle high-volume transactions and data processing efficiently.",
    "experience.job1.client3.title": "Enterprise Solutions",
    "experience.job1.client3.description":
      "I participated in developing new features and enhancements for multiple enterprise clients including Allianz and Grupo Lemco (Challenger, Sky). I leveraged serverless AWS technologies to build robust web services that improved operational efficiency and customer experience.",

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

    "experience.academic3.title": "Strategic Talent and Skills Management System",
    "experience.academic3.company": "Icesi University · Coomeva",
    "experience.academic3.period": "2024-2025",
    "experience.academic3.description":
      "Thesis project for the Master's in Applied Artificial Intelligence. Recommender system that takes an Excel with user ID and supervisor ID; each supervisor writes comments with areas for improvement per employee. The system analyzes each comment, looks up the relevant competency in the database, and if not found, queries the web via Perplexity API, persists the data, and assigns a course or learning path. Includes report download. Technologies: LangChain, DynamoDB, Supabase (database and vector store), S3, GitHub Actions, JavaScript, and Python.",
    "experience.academic3.url": "https://d2j1f9rczww7xs.cloudfront.net/results",

    // Projects
    "projects.title": "Personal Projects",
    "projects.hero.greeting": "Portfolio",
    "projects.hero.subtitle": "Personal and professional projects: web, deployment, and infrastructure.",
    "projects.hero.backHome": "Back to home",
    "projects.section.title": "Featured projects",
    "projects.section.description": "Development, deployment, and architecture in Next.js, AWS, and machine learning.",

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
    "projects.project2.url": "https://www.enriquemv.com/",

    "projects.project3.title": "Ataraxia Blog Management and Publishing System",
    "projects.project3.type": "Full Stack Serverless | Admin panel + Public blog with Gen AI · 2024-2025",
    "projects.project3.period": "www.ataraxiapro.com",
    "projects.project3.description":
      "Complete content management system for the Ataraxia blog, demonstrating scalable serverless architecture on AWS. The admin panel (Next.js + React 19) lets editors authenticate, create and manage article drafts, authors, categories and tags, and upload and process images.<br/><br/>Serverless Backend (AWS Lambda): I implemented microservices with Lambda for JWT authentication with DynamoDB, draft management, image processing and storage in S3, and publication orchestration. The publish function automates reading data from DynamoDB, downloading assets from S3, and generating static content with automatic Git commit, triggering deployment to GitHub Pages via webhooks. This demonstrates ETL capability and data pipeline automation.<br/><br/>Frontend + UI Architecture: I implemented Atomic Design (atoms, molecules, organisms, templates) for reusable, scalable components, using React 19, Tailwind CSS and Radix UI for a professional, accessible UI.<br/><br/>Security and Infrastructure: Granular role-based access control (EDITOR, ADMIN) with robust validation (Joi and Zod), JWT for stateless authentication, automated CI/CD with GitHub Actions, and serverless deployments with API Gateway + Lambda + DynamoDB.<br/><br/>Technologies: Next.js 15, React 19, Tailwind CSS, Radix UI, AWS (Lambda, API Gateway, DynamoDB, S3), GitHub Actions, Node.js, JWT.",
    "projects.project3.url": "https://www.ataraxiapro.com/",

    "projects.project4.title": "Strategic Talent and Skills Management System",
    "projects.project4.type": "Applied AI / Thesis project",
    "projects.project4.period": "Icesi University · Coomeva · 2024-2025",
    "projects.project4.description":
      "Thesis project for the Master's in Applied Artificial Intelligence. Recommender system that takes an Excel with user ID and supervisor ID; each supervisor writes comments with areas for improvement per employee. The system analyzes each comment, looks up the relevant competency in the database, and if not found, queries the web via Perplexity API, persists the data, and assigns a course or learning path. Includes report download. Developed as a practical project with Coomeva. Technologies: LangChain, DynamoDB, Supabase (database and vector store), S3, GitHub Actions, JavaScript, and Python.",
    "projects.project4.url": "https://d2j1f9rczww7xs.cloudfront.net",
    "projects.viewSite": "View website",
    "projects.viewImages": "View screenshots",
    "projects.gallery.dashboard": "Dashboard",
    "projects.gallery.upload": "Data upload",
    "projects.gallery.results": "Results",

    "projects.project5.title": "Fake News Notification System in the Colombian Political Context",
    "projects.project5.type": "Thesis project",
    "projects.project5.period": "University of Cauca · January 2023 - August 2023",
    "projects.project5.description":
      "Thesis project that consisted of creating a system for identifying and notifying fake news, using various APIs for the recognition and dissemination of verified content on the network. The interface was developed in Angular for websites and Kotlin for an app.<br/> • The project had different stages, including collecting news from various sources such as Twitter (now X) and Colombia Check, using the Twitter API and web scraping techniques. A fine-tuning process was performed on a FastAPI model to verify the veracity of the news.<br/> • An application was implemented to visualize the verified news using Kotlin, where Firebase was used as a database.",

    "projects.project6.title": "Veterinary System for Pets",
    "projects.project6.type": "Academic project",
    "projects.project6.period": "Mission TIC 2022 · April 2022 - December 2022",
    "projects.project6.description":
      "Validation project for the Mission TIC Course, which consists of creating a pet management system for a veterinary clinic, to manage appointments, clients, and pets. The system was developed in Node.js and Angular.",

    // Skills
    "skills.title": "Skills",
    "skills.hero.greeting": "Technologies",
    "skills.hero.subtitle": "Tools and languages I use in development, cloud, and data.",
    "skills.hero.backHome": "Back to home",
    "skills.section.title": "Technologies by category",
    "skills.section.description": "Grouped by area: backend, frontend, cloud, and data.",
    "skills.about.title": "About my skills",
    "skills.about.cloud": "My main focus is serverless development in the cloud, with the strongest experience on AWS. I also work with services from other providers such as Google Cloud and Azure when the project requires it.",
    "skills.about.cicd": "I build serverless solutions and have solid experience in CI/CD with GitHub Actions, using infrastructure as code with AWS SAM, AWS CDK, and Terraform.",
    "skills.about.frontend": "On the frontend I work with Next.js, React, and Vue. I deploy SPAs (single page applications) that consume APIs and backend services.",
    "skills.about.hosting": "I manage hosting on Hostinger and configure DNS and routing with Route 53 or with Hostinger domains.",
    "skills.about.agents": "I develop multi-agent systems in Python with LangChain and LangSmith to orchestrate AI workflows.",
    "skills.about.rag": "I implement vector databases for RAG (Retrieval-Augmented Generation) systems that improve the accuracy of language models.",
    "skills.category1": "Web Development",
    "skills.category2": "Cloud and Databases",
    "skills.category3": "Artificial Intelligence",
    "skills.category4": "Other Technologies",
    "skills.categoryBackend": "Backend and APIs",
    "skills.categoryFrontend": "Frontend",
    "skills.categoryCloud": "Cloud and DevOps",
    "skills.categoryData": "Data and AI",
    "skills.level.high": "high level",
    "skills.level.mid": "intermediate level",
    // Backend and APIs
    "skills.backend.item1": "NodeJS",
    "skills.backend.item2": "Python",
    "skills.backend.item3": "REST API design",
    "skills.backend.item4": "FastAPI",
    "skills.backend.item5": "Serverless integration",
    // Frontend
    "skills.frontend.item1": "React",
    "skills.frontend.item2": "Next.js",
    "skills.frontend.item3": "JavaScript / TypeScript",
    "skills.frontend.item4": "HTML / CSS",
    // Cloud and DevOps
    "skills.cloud.item1": "AWS",
    "skills.cloud.item2": "Serverless architectures",
    "skills.cloud.item3": "AWS SAM and CDK",
    "skills.cloud.item4": "Terraform",
    "skills.cloud.item5": "CI/CD and GitHub Actions",
    "skills.cloud.item6": "Basic monitoring",
    // Data and AI
    "skills.data.item1": "ETL and data pipelines",
    "skills.data.item2": "SQL and relational databases",
    "skills.data.item3": "MongoDB and NoSQL",
    "skills.data.item4": "Bedrock, OpenAI and Claude models",
    "skills.data.item5": "LangChain and LangSmith",

    // Footer
    "footer.rights": "All rights reserved",

    //Theme
    "theme.title": "Change theme",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",

    // 404 Page
    "404.title": "404 - Page Not Found",
    "404.description": "Sorry, the page you are looking for does not exist.",
    "404.button": "Back to Home",
  },
  pt: {
    // Header
    "nav.home": "Início",
    "home.hero.greeting": "Olá, sou",
    "home.hero.title": "Mestrado em Inteligência Artificial Aplicada / Engenheiro de Eletrônica e Telecomunicações · Soluções de IA na nuvem",
    "nav.experience": "Experiência",
    "nav.education": "Educação",
    "nav.skills": "Habilidades",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",
    "cv.download": "Baixar currículo",
    "theme.light": "Claro",
    "theme.dark": "Escuro",
    "theme.system": "Sistema",

    // Home page
    "home.title": "Cesar Enrique Manzano Velasco",
    "home.profession": "Engenheiro de Eletrônica e Telecomunicações",
    "home.bio":
      "Apaixonado por desenvolver soluções inovadoras e atraentes. Realizei diversos projetos web e aplicações de inteligência artificial, utilizando modelos de linguagem de diferentes provedores como Bedrock, OpenAI e Claude, além de ferramentas como LangChain e LangSmith. Tenho experiência em arquiteturas em nuvem, especialmente em ambientes serverless e no gerenciamento de bancos de dados SQL e NoSQL. Além disso, possuo habilidades em ferramentas CI/CD, utilizando AWS SAM, CDK e Terraform para implantação de sites e modelos de machine learning.",
    "home.contact": "Contato",
    "home.contact.description": "Informações de contato profissional",
    "home.phone": "Telefone",
    "home.email": "E-mail",
    "home.location": "Localização",
    "home.skills": "Habilidades",
    "home.skills.description": "Principais tecnologias com as quais trabalho no dia a dia",

    // Education
    "education.title": "Educação",
    "education.hero.greeting": "Formação",
    "education.hero.subtitle": "Formação acadêmica, certificações e cursos especializados.",
    "education.hero.backHome": "Voltar ao início",
    "education.section.title": "Formação e certificações",
    "education.section.description": "Títulos, programas e certificações que respaldam meu perfil técnico.",
    "education.degree1": "Mestrado em Inteligência Artificial Aplicada",
    "education.institution1": "Universidade Icesi",
    "education.period1": "Julho de 2024 – Dezembro de 2025",
    "education.degree1.note": "Aguardando colação de grau (março de 2026). Todos os requisitos cumpridos.",
    "education.description1": "Formação em técnicas avançadas de IA e sua aplicação prática em diversos âmbitos. O programa abrange os cinco tipos principais de machine learning tradicional (supervisionado, não supervisionado, autosupervisionado, por reforço e semissupervisionado), pipelines de dados, desenho e implantação de modelos de IA na nuvem e processamento de linguagem natural (NLP). Inclui ainda aplicações de IA generativa com frameworks como n8n, LangChain e outros.",

    "education.degree2": "Engenharia Eletrônica e de Telecomunicações",
    "education.institution2": "Universidade del Cauca",
    "education.period2": "Abril de 2024",
    "education.description2": "Formação integral em eletrônica, telecomunicações e sistemas digitais. Desenvolve competências em projeto, implementação e gestão de soluções tecnológicas que integram hardware, software e redes de comunicação. Com foco em inovação, pesquisa e impacto social, o programa prepara profissionais capazes de enfrentar os desafios da conectividade global, da automação e das tecnologias emergentes no âmbito das TIC.",

    "education.degree3": "AWS Certified Cloud Practitioner",
    "education.institution3": "Amazon Web Services (AWS)",
    "education.period3": "Novembro de 2023",
    "education.description3": "Certificação de nível fundamental que valida o conhecimento dos serviços em nuvem da AWS, conceitos-chave de computação em nuvem, terminologia, segurança, preços e melhores práticas. Constitui um ponto de entrada sólido para carreiras em AWS e atesta competência em fundamentos cloud.",

    "education.degree4": "Misión TIC 2022",
    "education.institution4": "Universidade Tecnológica de Pereira",
    "education.period4": "Abril de 2022",
    "education.description4": "Programa intensivo gratuito do Ministério TIC da Colômbia para formar talento digital em desenvolvimento de software, programação, redes de dados e habilidades digitais. Operado pela Universidade Tecnológica de Pereira, com competências técnicas alinhadas ao mercado de trabalho e ênfase em inclusão e acompanhamento integral.",

    "education.degree5": "Ciência de Dados",
    "education.institution5": "CoderHouse",
    "education.period5": "Maio de 2022",
    "education.description5": "Curso especializado em fundamentos de ciência de dados: análise exploratória, manipulação de dados com Python (Pandas, NumPy), SQL, visualizações e estatística. Inclui machine learning supervisionado e não supervisionado, e aplicações práticas de IA para extrair insights e construir modelos preditivos.",

    // Experience
    "experience.title": "Experiência",
    "experience.hero.greeting": "Trajetória",
    "experience.hero.subtitle": "Resumo da minha experiência profissional e acadêmica.",
    "experience.hero.backHome": "Voltar ao início",
    "experience.work.title": "Experiência profissional",
    "experience.work.description": "Cargos e projetos no âmbito profissional.",
    "experience.academic.title": "Experiência Acadêmica",
    "experience.academic.description": "Projetos e formações no âmbito acadêmico.",

    "experience.job1.title": "Desenvolvedor da equipe Ayte",
    "experience.job1.company": "Ayte",
    "experience.job1.period": "Setembro de 2023 - Atual",
    "experience.job1.intro":
      "Atualmente faço parte da equipe de suporte HDI Colômbia, onde desenvolvo melhorias inovadoras de produtos e entrego soluções para os desafios do setor de seguros utilizando tecnologias serverless na AWS e bancos de dados gerenciados.",
    "experience.job1.client1.title": "Equipe de inovação GenAI",
    "experience.job1.client1.description":
      "Participei do desenvolvimento de agentes de IA generativa implantados em múltiplos canais de comunicação, incluindo Microsoft Teams, Google Chat e WhatsApp. Implementei sistemas RAG (Retrieval-Augmented Generation) avançados com bancos de dados vetoriais, bases de conhecimento e orquestração inteligente usando LangChain e LangSmith para habilitar soluções de IA conversacional escaláveis.",
    "experience.job1.client2.title": "Plataforma de assinatura Liberty Seguros Colômbia",
    "experience.job1.client2.description":
      "Contribuí para o desenvolvimento full-stack de uma nova aplicação de assinaturas para uma grande seguradora. Projetei um frontend responsivo em React e serviços backend escaláveis em Node.js, com infraestrutura serverless em AWS Lambda, DynamoDB e S3 para transações de alto volume e processamento de dados.",
    "experience.job1.client3.title": "Soluções empresariais",
    "experience.job1.client3.description":
      "Participei do desenvolvimento de novas funcionalidades e melhorias para vários clientes empresariais, incluindo Allianz e Grupo Lemco (Challenger, Sky). Utilizei tecnologias serverless na AWS para construir serviços web robustos que melhoraram a eficiência operacional e a experiência do cliente.",

    "experience.academic1.title": "Sistema de notificação para fake news no contexto político colombiano",
    "experience.academic1.company": "Universidade del Cauca",
    "experience.academic1.period": "Janeiro de 2023 - Agosto de 2023",
    "experience.academic1.description":
      "Projeto de trabalho de conclusão de curso que consistiu na criação de um sistema de identificação e notificação de fake news, utilizando diversas APIs para o reconhecimento e divulgação de conteúdo verificado na rede. A interface foi desenvolvida em Angular para sites e Kotlin para um aplicativo.<br/> • O projeto teve diferentes etapas, incluindo coleta de notícias de diversas fontes como Twitter (atual X) e Colombia Check, utilizando a API do Twitter e técnicas de web scraping. Foi realizado o processo de fine-tuning em um modelo FastAPI para verificar a veracidade das notícias.<br/> • Foi implementado um aplicativo para visualizar as notícias verificadas utilizando Kotlin, com Firebase como banco de dados.",

    "experience.academic2.title": "Sistema veterinário para Pets",
    "experience.academic2.company": "Misión TIC 2022",
    "experience.academic2.period": "Abril de 2022 - Dezembro de 2022",
    "experience.academic2.description":
      "Projeto de validação do Curso Misión TIC, consistindo na criação de um sistema de gestão de pets para uma clínica veterinária, para gerenciar consultas, clientes e animais. O sistema foi desenvolvido em Node.js e Angular.",

    "experience.academic3.title": "Sistema de Gestão Estratégica de Talento e Habilidades",
    "experience.academic3.company": "Universidade Icesi · Coomeva",
    "experience.academic3.period": "2024-2025",
    "experience.academic3.description":
      "Projeto de conclusão da Maestría em Inteligência Artificial Aplicada. Sistema recomendador que recebe um Excel com ID do usuário e ID do supervisor; cada supervisor escreve comentários com áreas de melhoria por colaborador. O sistema analisa cada comentário, busca a competência relevante no banco de dados e, se não encontrar, consulta a rede via API Perplexity, persiste os dados e atribui curso ou trilha de formação. Inclui download de relatórios. Tecnologias: LangChain, DynamoDB, Supabase (banco de dados e vetorial), S3, GitHub Actions, JavaScript e Python.",
    "experience.academic3.url": "https://d2j1f9rczww7xs.cloudfront.net/results",

    // Projects
    "projects.title": "Projetos Pessoais",
    "projects.hero.greeting": "Portfólio",
    "projects.hero.subtitle": "Projetos pessoais e profissionais: web, implantação e infraestrutura.",
    "projects.hero.backHome": "Voltar ao início",
    "projects.section.title": "Projetos em destaque",
    "projects.section.description": "Desenvolvimento, implantação e arquitetura em Next.js, AWS e machine learning.",

    "projects.project1.title": "Criação e implantação do site para Empreendimento Ghaiasolution.com",
    "projects.project1.type": "Website",
    "projects.project1.period": "www.ghaiasolutions.com",
    "projects.project1.description":
      "Desenvolvimento e implantação da arquitetura e estrutura de implementação para um site de empreendimento, construído em Next.js e hospedado na AWS, utilizando S3, CloudFront e Route 53. Implementação de um sistema de notificação de mensagens via SES para armazenar informações de contato de interessados",

    "projects.project2.title": "Criação e implantação de Portfólio Pessoal",
    "projects.project2.type": "Website",
    "projects.project2.period": "www.enriquemv.com",
    "projects.project2.description":
      "Site para apresentação do meu portfólio pessoal, construído em Next.js, hospedado no S3 e implantado no CloudFront e Route 53. Implementa três tipos de ambientes: desenvolvimento, testes e produção, utilizando GitHub Actions e AWS Serverless Application Model para implantação",
    "projects.project2.url": "https://www.enriquemv.com/",

    "projects.project3.title": "Sistema de Gestão e Publicação de Blog Ataraxia",
    "projects.project3.type": "Full Stack Serverless | Painel administrativo + Blog público com Gen AI · 2024-2025",
    "projects.project3.period": "www.ataraxiapro.com",
    "projects.project3.description":
      "Sistema completo de gestão de conteúdos para o blog Ataraxia, demonstrando arquitetura serverless escalável na AWS. O painel administrativo (Next.js + React 19) permite que editores se autentiquem, criem e gerenciem rascunhos de artigos, autores, categorias e tags, além de enviar e processar imagens.<br/><br/>Backend Serverless (AWS Lambda): Implementei microserviços com Lambda para autenticação JWT com DynamoDB, gestão de rascunhos, processamento e armazenamento de imagens no S3, e orquestração de publicação. A função de publicação automatiza a leitura de dados do DynamoDB, download de assets do S3 e geração de conteúdo estático com commit automático no Git, acionando implantação no GitHub Pages via webhooks. Isso demonstra capacidade de ETL e automação de pipelines de dados.<br/><br/>Frontend + Arquitetura UI: Implementei Atomic Design (atoms, molecules, organisms, templates) para componentes reutilizáveis e escaláveis, utilizando React 19, Tailwind CSS e Radix UI para uma UI profissional e acessível.<br/><br/>Segurança e Infraestrutura: Controle granular de acesso por funções (EDITOR, ADMIN) com validação robusta (Joi e Zod), JWT para autenticação stateless, CI/CD automatizado com GitHub Actions e implantações serverless com API Gateway + Lambda + DynamoDB.<br/><br/>Tecnologias: Next.js 15, React 19, Tailwind CSS, Radix UI, AWS (Lambda, API Gateway, DynamoDB, S3), GitHub Actions, Node.js, JWT.",
    "projects.project3.url": "https://www.ataraxiapro.com/",

    "projects.project4.title": "Sistema de Gestão Estratégica de Talento e Habilidades",
    "projects.project4.type": "IA aplicada / Projeto de conclusão",
    "projects.project4.period": "Universidade Icesi · Coomeva · 2024-2025",
    "projects.project4.description":
      "Projeto de conclusão da Maestría em Inteligência Artificial Aplicada. Sistema recomendador que recebe um Excel com ID do usuário e ID do supervisor; cada supervisor escreve comentários com áreas de melhoria por colaborador. O sistema analisa cada comentário, busca a competência relevante no banco de dados e, se não encontrar, consulta a rede via API Perplexity, persiste os dados e atribui curso ou trilha de formação. Inclui download de relatórios. Desenvolvido como projeto prático com Coomeva. Tecnologias: LangChain, DynamoDB, Supabase (banco de dados e vetorial), S3, GitHub Actions, JavaScript e Python.",
    "projects.project4.url": "https://d2j1f9rczww7xs.cloudfront.net",
    "projects.viewSite": "Ver site",
    "projects.viewImages": "Ver capturas",
    "projects.gallery.dashboard": "Dashboard",
    "projects.gallery.upload": "Carga de dados",
    "projects.gallery.results": "Resultados",

    "projects.project5.title": "Sistema de notificação para fake news no contexto político colombiano",
    "projects.project5.type": "Projeto de conclusão",
    "projects.project5.period": "Universidade del Cauca · Janeiro de 2023 - Agosto de 2023",
    "projects.project5.description":
      "Projeto de trabalho de conclusão de curso que consistiu na criação de um sistema de identificação e notificação de fake news, utilizando diversas APIs para o reconhecimento e divulgação de conteúdo verificado na rede. A interface foi desenvolvida em Angular para sites e Kotlin para um aplicativo.<br/> • O projeto teve diferentes etapas, incluindo coleta de notícias de diversas fontes como Twitter (atual X) e Colombia Check, utilizando a API do Twitter e técnicas de web scraping. Foi realizado o processo de fine-tuning em um modelo FastAPI para verificar a veracidade das notícias.<br/> • Foi implementado um aplicativo para visualizar as notícias verificadas utilizando Kotlin, com Firebase como banco de dados.",

    "projects.project6.title": "Sistema veterinário para Pets",
    "projects.project6.type": "Projeto de conclusão",
    "projects.project6.period": "Misión TIC 2022 · Abril de 2022 - Dezembro de 2022",
    "projects.project6.description":
      "Projeto de validação do Curso Misión TIC, consistindo na criação de um sistema de gestão de pets para uma clínica veterinária, para gerenciar consultas, clientes e animais. O sistema foi desenvolvido em Node.js e Angular.",

    // Skills
    "skills.title": "Habilidades",
    "skills.hero.greeting": "Tecnologias",
    "skills.hero.subtitle": "Ferramentas e linguagens que utilizo em desenvolvimento, cloud e dados.",
    "skills.hero.backHome": "Voltar ao início",
    "skills.section.title": "Tecnologias por categoria",
    "skills.section.description": "Agrupadas por área: backend, frontend, cloud e dados.",
    "skills.about.title": "Sobre minhas habilidades",
    "skills.about.cloud": "Meu foco principal é o desenvolvimento serverless na nuvem, com maior experiência em AWS. Também trabalho com serviços de outros provedores como Google Cloud e Azure quando o projeto exige.",
    "skills.about.cicd": "Desenvolvo soluções serverless e tenho experiência sólida em CI/CD com GitHub Actions, utilizando infraestrutura como código com AWS SAM, AWS CDK e Terraform.",
    "skills.about.frontend": "No frontend trabalho com Next.js, React e Vue. Faço o deploy de SPAs (single page application) que consomem APIs e serviços do backend.",
    "skills.about.hosting": "Gerencio hospedagem na Hostinger e configuro DNS e roteamento com Route 53 ou com os domínios da Hostinger.",
    "skills.about.agents": "Desenvolvo sistemas multiagente em Python com LangChain e LangSmith para orquestrar fluxos de IA.",
    "skills.about.rag": "Implemento bases de dados vetoriais para sistemas RAG (Retrieval-Augmented Generation) que melhoram a precisão dos modelos de linguagem.",
    "skills.category1": "Desenvolvimento Web",
    "skills.category2": "Cloud e Bancos de Dados",
    "skills.category3": "Inteligência Artificial",
    "skills.category4": "Outras Tecnologias",
    "skills.categoryBackend": "Backend e APIs",
    "skills.categoryFrontend": "Frontend",
    "skills.categoryCloud": "Cloud e DevOps",
    "skills.categoryData": "Dados e IA",
    "skills.level.high": "nível alto",
    "skills.level.mid": "nível intermediário",
    "skills.backend.item1": "NodeJS",
    "skills.backend.item2": "Python",
    "skills.backend.item3": "Design de APIs REST",
    "skills.backend.item4": "FastAPI",
    "skills.backend.item5": "Integração serverless",
    "skills.frontend.item1": "React",
    "skills.frontend.item2": "Next.js",
    "skills.frontend.item3": "JavaScript / TypeScript",
    "skills.frontend.item4": "HTML / CSS",
    "skills.cloud.item1": "AWS",
    "skills.cloud.item2": "Arquiteturas serverless",
    "skills.cloud.item3": "AWS SAM e CDK",
    "skills.cloud.item4": "Terraform",
    "skills.cloud.item5": "CI/CD e GitHub Actions",
    "skills.cloud.item6": "Monitoramento básico",
    "skills.data.item1": "ETL e pipelines de dados",
    "skills.data.item2": "SQL e bancos relacionais",
    "skills.data.item3": "MongoDB e NoSQL",
    "skills.data.item4": "Modelos Bedrock, OpenAI e Claude",
    "skills.data.item5": "LangChain e LangSmith",

    // Footer
    "footer.rights": "Todos os direitos reservados",

    // Theme
    "theme.title": "Mudar tema",
    "theme.light": "Claro",
    "theme.dark": "Escuro",
    "theme.system": "Sistema"
  },
  it: {
    // Header
    "nav.home": "Home",
    "home.hero.greeting": "Ciao, sono",
    "home.hero.title": "Master in Intelligenza Artificiale / Ingegnere Elettronico e delle Telecomunicazioni · Soluzioni IA nel cloud",
    "nav.experience": "Esperienza",
    "nav.education": "Formazione",
    "nav.skills": "Competenze",
    "nav.projects": "Progetti",
    "nav.contact": "Contatto",
    "cv.download": "Scarica CV",
    "theme.light": "Chiaro",
    "theme.dark": "Scuro",
    "theme.system": "Sistema",

    // Home page
    "home.title": "Cesar Enrique Manzano Velasco",
    "home.profession": "Ingegnere Elettronico e delle Telecomunicazioni",
    "home.bio":
      "Appassionato nello sviluppo di soluzioni innovative e attraenti. Ho realizzato vari progetti web e applicazioni di intelligenza artificiale, utilizzando modelli linguistici di diversi provider come Bedrock, OpenAI e Claude, oltre a strumenti come LangChain e LangSmith. Ho esperienza in architetture cloud, specialmente in ambienti serverless e nella gestione di database SQL e NoSQL. Inoltre, possiedo competenze in strumenti CI/CD, utilizzando AWS SAM, CDK e Terraform per il deployment di siti web e modelli di machine learning.",
    "home.contact": "Contatto",
    "home.contact.description": "Informazioni di contatto professionali",
    "home.phone": "Telefono",
    "home.email": "Email",
    "home.location": "Ubicazione",
    "home.skills": "Competenze",
    "home.skills.description": "Principali tecnologie con cui lavoro quotidianamente",

    // Education
    "education.title": "Formazione",
    "education.hero.greeting": "Formazione",
    "education.hero.subtitle": "Formazione accademica, certificazioni e corsi specializzati.",
    "education.hero.backHome": "Torna alla home",
    "education.section.title": "Formazione e certificazioni",
    "education.section.description": "Titoli, programmi e certificazioni che supportano il mio profilo tecnico.",
    "education.degree1": "Magistrale in Intelligenza Artificiale Applicata",
    "education.institution1": "Universidad Icesi",
    "education.period1": "Luglio 2024 – Dicembre 2025",
    "education.degree1.note": "In attesa di conferimento del titolo (marzo 2026). Tutti i requisiti completati.",
    "education.description1": "Formazione in tecniche avanzate di IA e loro applicazione pratica in diversi ambiti. Il programma copre i cinque tipi principali di machine learning tradizionale (supervisionato, non supervisionato, autosupervisionato, per rinforzo e semisupervisionato), pipeline di dati, progettazione e deployment di modelli di IA nel cloud e elaborazione del linguaggio naturale (NLP). Include inoltre applicazioni di IA generativa con framework come n8n, LangChain e altri.",

    "education.degree2": "Ingegneria Elettronica e delle Telecomunicazioni",
    "education.institution2": "Universidad del Cauca",
    "education.period2": "Aprile 2024",
    "education.description2": "Formazione completa in elettronica, telecomunicazioni e sistemi digitali. Sviluppa competenze in progettazione, implementazione e gestione di soluzioni tecnologiche che integrano hardware, software e reti di comunicazione. Con focus su innovazione, ricerca e impatto sociale, il programma prepara professionisti in grado di affrontare le sfide della connettività globale, dell'automazione e delle tecnologie emergenti nel settore delle TIC.",

    "education.degree3": "AWS Certified Cloud Practitioner",
    "education.institution3": "Amazon Web Services (AWS)",
    "education.period3": "Novembre 2023",
    "education.description3": "Certificazione di livello fondamentale che valida la conoscenza dei servizi cloud AWS, i concetti chiave del cloud computing, terminologia, sicurezza, prezzi e best practice. Costituisce un solido punto di ingresso per carriere in AWS e attesta competenza nei fondamenti cloud.",

    "education.degree4": "Misión TIC 2022",
    "education.institution4": "Universidad Tecnológica de Pereira",
    "education.period4": "Aprile 2022",
    "education.description4": "Programma intensivo gratuito del Ministero TIC della Colombia per formare talento digitale in sviluppo software, programmazione, reti di dati e competenze digitali. Gestito dalla Universidad Tecnológica de Pereira, con competenze tecniche allineate al mercato del lavoro ed enfasi su inclusione e accompagnamento integrale.",

    "education.degree5": "Data Science",
    "education.institution5": "CoderHouse",
    "education.period5": "Maggio 2022",
    "education.description5": "Corso specializzato nei fondamenti della data science: analisi esplorativa, manipolazione dati con Python (Pandas, NumPy), SQL, visualizzazioni e statistica. Include machine learning supervisionato e non supervisionato, e applicazioni pratiche di IA per estrarre insight e costruire modelli predittivi.",

    // Experience
    "experience.title": "Esperienza",
    "experience.hero.greeting": "Percorso",
    "experience.hero.subtitle": "Riepilogo della mia esperienza lavorativa e accademica.",
    "experience.hero.backHome": "Torna alla home",
    "experience.work.title": "Esperienza lavorativa",
    "experience.work.description": "Posizioni e progetti in ambito professionale.",
    "experience.academic.title": "Esperienza Accademica",
    "experience.academic.description": "Progetti e formazione in ambito accademico.",

    "experience.job1.title": "Sviluppatore nel Team Ayte",
    "experience.job1.company": "Ayte",
    "experience.job1.period": "Settembre 2023 - Attuale",
    "experience.job1.intro":
      "Attualmente faccio parte del team di supporto HDI Colombia, dove sviluppo miglioramenti innovativi dei prodotti e fornisco soluzioni alle sfide del settore assicurativo utilizzando tecnologie serverless su AWS e database gestiti.",
    "experience.job1.client1.title": "Team innovazione GenAI",
    "experience.job1.client1.description":
      "Ho partecipato allo sviluppo di agenti di IA generativa distribuiti su più canali di comunicazione tra cui Microsoft Teams, Google Chat e WhatsApp. Ho implementato sistemi RAG (Retrieval-Augmented Generation) avanzati con database vettoriali, basi di conoscenza e orchestrazione intelligente con LangChain e LangSmith per soluzioni di IA conversazionale scalabili.",
    "experience.job1.client2.title": "Piattaforma abbonamenti Liberty Seguros Colombia",
    "experience.job1.client2.description":
      "Ho contribuito allo sviluppo full-stack di una nuova applicazione di abbonamento per un importante assicuratore. Ho progettato un frontend reattivo in React e servizi backend scalabili in Node.js, con infrastruttura serverless su AWS Lambda, DynamoDB e S3 per transazioni ad alto volume e elaborazione dati.",
    "experience.job1.client3.title": "Soluzioni enterprise",
    "experience.job1.client3.description":
      "Ho partecipato allo sviluppo di nuove funzionalità e miglioramenti per diversi clienti enterprise tra cui Allianz e Grupo Lemco (Challenger, Sky). Ho utilizzato tecnologie serverless AWS per costruire servizi web robusti che hanno migliorato l'efficienza operativa e l'esperienza cliente.",

    "experience.academic1.title": "Sistema di notifica per fake news nel contesto politico colombiano",
    "experience.academic1.company": "Universidad del Cauca",
    "experience.academic1.period": "Gennaio 2023 - Agosto 2023",
    "experience.academic1.description":
      "Progetto di tesi che consisteva nella creazione di un sistema di identificazione e notifica di fake news, utilizzando varie API per il riconoscimento e la diffusione di contenuti verificati in rete. L'interfaccia è stata sviluppata in Angular per siti web e Kotlin per un'app.<br/> • Il progetto ha avuto diverse fasi, inclusa la raccolta di notizie da varie fonti come Twitter (ora X) e Colombia Check, utilizzando l'API di Twitter e tecniche di web scraping. È stato effettuato un processo di fine-tuning su un modello FastAPI per verificare la veridicità delle notizie.<br/> • È stata implementata un'applicazione per visualizzare le notizie verificate utilizzando Kotlin, con Firebase come database.",

    "experience.academic2.title": "Sistema veterinario per animali domestici",
    "experience.academic2.company": "Misión TIC 2022",
    "experience.academic2.period": "Aprile 2022 - Dicembre 2022",
    "experience.academic2.description":
      "Progetto di validazione del Corso Misión TIC, consistente nella creazione di un sistema di gestione per animali domestici in una clinica veterinaria, per gestire appuntamenti, clienti e animali. Il sistema è stato sviluppato in Node.js e Angular.",

    "experience.academic3.title": "Sistema di Gestione Strategica del Talento e delle Competenze",
    "experience.academic3.company": "Universidad Icesi · Coomeva",
    "experience.academic3.period": "2024-2025",
    "experience.academic3.description":
      "Progetto di tesi per il Master in Intelligenza Artificiale Applicata. Sistema raccomandatore che riceve un Excel con ID utente e ID supervisore; ogni supervisore scrive commenti con aree di miglioramento per dipendente. Il sistema analizza ogni commento, cerca la competenza rilevante nel database e, se non la trova, interroga il web tramite API Perplexity, persiste i dati e assegna corso o percorso formativo. Include download report. Tecnologie: LangChain, DynamoDB, Supabase (database e vettoriale), S3, GitHub Actions, JavaScript e Python.",
    "experience.academic3.url": "https://d2j1f9rczww7xs.cloudfront.net/results",

    // Projects
    "projects.title": "Progetti Personali",
    "projects.hero.greeting": "Portfolio",
    "projects.hero.subtitle": "Progetti personali e professionali: web, deployment e infrastruttura.",
    "projects.hero.backHome": "Torna alla home",
    "projects.section.title": "Progetti in evidenza",
    "projects.section.description": "Sviluppo, deployment e architettura in Next.js, AWS e machine learning.",

    "projects.project1.title": "Creazione e deployment del sito web per l'impresa Ghaiasolution.com",
    "projects.project1.type": "Sito web",
    "projects.project1.period": "www.ghaiasolutions.com",
    "projects.project1.description":
      "Sviluppo e deployment dell'architettura e struttura di implementazione per un sito web aziendale, costruito in Next.js e ospitato su AWS, utilizzando S3, CloudFront e Route 53. Implementazione di un sistema di notifica messaggi tramite SES per memorizzare le informazioni di contatto degli interessati",

    "projects.project2.title": "Creazione e Deployment di Portfolio Personale",
    "projects.project2.type": "Sito web",
    "projects.project2.period": "www.enriquemv.com",
    "projects.project2.description":
      "Sito web per la presentazione del mio portfolio personale, costruito in Next.js, ospitato su S3 e deployato su CloudFront e Route 53. Implementa tre tipi di ambienti: sviluppo, testing e produzione, utilizzando GitHub Actions e AWS Serverless Application Model per il deployment",
    "projects.project2.url": "https://www.enriquemv.com/",

    "projects.project3.title": "Sistema di Gestione e Pubblicazione del Blog Ataraxia",
    "projects.project3.type": "Full Stack Serverless | Pannello admin + Blog pubblico con Gen AI · 2024-2025",
    "projects.project3.period": "www.ataraxiapro.com",
    "projects.project3.description":
      "Sistema completo di gestione dei contenuti per il blog Ataraxia, che dimostra un'architettura serverless scalabile su AWS. Il pannello amministrativo (Next.js + React 19) consente agli editori di autenticarsi, creare e gestire bozze di articoli, autori, categorie e tag, oltre a caricare e processare immagini.<br/><br/>Backend Serverless (AWS Lambda): Ho implementato microservizi con Lambda per autenticazione JWT con DynamoDB, gestione delle bozze, elaborazione e archiviazione di immagini su S3 e orchestrazione della pubblicazione. La funzione di pubblicazione automatizza la lettura dei dati da DynamoDB, il download degli asset da S3 e la generazione di contenuti statici con commit automatico su Git, attivando il deployment su GitHub Pages tramite webhook. Questo dimostra capacità ETL e automazione di pipeline dati.<br/><br/>Frontend + Architettura UI: Ho implementato Atomic Design (atoms, molecules, organisms, templates) per componenti riutilizzabili e scalabili, utilizzando React 19, Tailwind CSS e Radix UI per un'interfaccia professionale e accessibile.<br/><br/>Sicurezza e Infrastruttura: Controllo granulare dell'accesso per ruoli (EDITOR, ADMIN) con validazione robusta (Joi e Zod), JWT per autenticazione stateless, CI/CD automatizzato con GitHub Actions e deployment serverless con API Gateway + Lambda + DynamoDB.<br/><br/>Tecnologie: Next.js 15, React 19, Tailwind CSS, Radix UI, AWS (Lambda, API Gateway, DynamoDB, S3), GitHub Actions, Node.js, JWT.",
    "projects.project3.url": "https://www.ataraxiapro.com/",

    "projects.project4.title": "Sistema di Gestione Strategica del Talento e delle Competenze",
    "projects.project4.type": "IA applicata / Progetto di tesi",
    "projects.project4.period": "Universidad Icesi · Coomeva · 2024-2025",
    "projects.project4.description":
      "Progetto di tesi per il Master in Intelligenza Artificiale Applicata. Sistema raccomandatore che riceve un Excel con ID utente e ID supervisore; ogni supervisore scrive commenti con aree di miglioramento per dipendente. Il sistema analizza ogni commento, cerca la competenza rilevante nel database e, se non la trova, interroga il web tramite API Perplexity, persiste i dati e assegna corso o percorso formativo. Include download report. Sviluppato come progetto pratico con Coomeva. Tecnologie: LangChain, DynamoDB, Supabase (database e vettoriale), S3, GitHub Actions, JavaScript e Python.",
    "projects.project4.url": "https://d2j1f9rczww7xs.cloudfront.net",
    "projects.viewSite": "Vedi sito web",
    "projects.viewImages": "Vedi screenshot",
    "projects.gallery.dashboard": "Dashboard",
    "projects.gallery.upload": "Caricamento dati",
    "projects.gallery.results": "Risultati",

    "projects.project5.title": "Sistema di notifica per fake news nel contesto politico colombiano",
    "projects.project5.type": "Progetto di tesi",
    "projects.project5.period": "Universidad del Cauca · Gennaio 2023 - Agosto 2023",
    "projects.project5.description":
      "Progetto di tesi che consisteva nella creazione di un sistema di identificazione e notifica di fake news, utilizzando varie API per il riconoscimento e la diffusione di contenuti verificati in rete. L'interfaccia è stata sviluppata in Angular per siti web e Kotlin per un'app.<br/> • Il progetto ha avuto diverse fasi, inclusa la raccolta di notizie da varie fonti come Twitter (ora X) e Colombia Check, utilizzando l'API di Twitter e tecniche di web scraping. È stato effettuato un processo di fine-tuning su un modello FastAPI per verificare la veridicità delle notizie.<br/> • È stata implementata un'applicazione per visualizzare le notizie verificate utilizzando Kotlin, con Firebase come database.",

    "projects.project6.title": "Sistema veterinario per animali domestici",
    "projects.project6.type": "Progetto accademico",
    "projects.project6.period": "Misión TIC 2022 · Aprile 2022 - Dicembre 2022",
    "projects.project6.description":
      "Progetto di validazione del Corso Misión TIC, consistente nella creazione di un sistema di gestione per animali domestici in una clinica veterinaria, per gestire appuntamenti, clienti e animali. Il sistema è stato sviluppato in Node.js e Angular.",

    // Skills
    "skills.title": "Competenze",
    "skills.hero.greeting": "Tecnologie",
    "skills.hero.subtitle": "Strumenti e linguaggi che utilizzo in sviluppo, cloud e dati.",
    "skills.hero.backHome": "Torna alla home",
    "skills.section.title": "Tecnologie per categoria",
    "skills.section.description": "Raggruppate per area: backend, frontend, cloud e dati.",
    "skills.about.title": "Sulle mie competenze",
    "skills.about.cloud": "Il mio focus principale è lo sviluppo serverless nel cloud, con maggiore esperienza su AWS. Utilizzo anche servizi di altri provider come Google Cloud e Azure quando il progetto lo richiede.",
    "skills.about.cicd": "Sviluppo soluzioni serverless e ho esperienza solida in CI/CD con GitHub Actions, utilizzando infrastruttura come codice con AWS SAM, AWS CDK e Terraform.",
    "skills.about.frontend": "Nel frontend lavoro con Next.js, React e Vue. Eseguo il deployment di SPA (single page application) che consumano API e servizi backend.",
    "skills.about.hosting": "Gestisco hosting su Hostinger e configuro DNS e routing con Route 53 o con i domini Hostinger.",
    "skills.about.agents": "Sviluppo sistemi multiagente in Python con LangChain e LangSmith per orchestrare flussi di IA.",
    "skills.about.rag": "Implemento basi di dati vettoriali per sistemi RAG (Retrieval-Augmented Generation) che migliorano la precisione dei modelli di linguaggio.",
    "skills.category1": "Sviluppo Web",
    "skills.category2": "Cloud e Database",
    "skills.category3": "Intelligenza Artificiale",
    "skills.category4": "Altre Tecnologie",
    "skills.categoryBackend": "Backend e API",
    "skills.categoryFrontend": "Frontend",
    "skills.categoryCloud": "Cloud e DevOps",
    "skills.categoryData": "Dati e IA",
    "skills.level.high": "livello alto",
    "skills.level.mid": "livello intermedio",
    "skills.backend.item1": "NodeJS",
    "skills.backend.item2": "Python",
    "skills.backend.item3": "Design API REST",
    "skills.backend.item4": "FastAPI",
    "skills.backend.item5": "Integrazione serverless",
    "skills.frontend.item1": "React",
    "skills.frontend.item2": "Next.js",
    "skills.frontend.item3": "JavaScript / TypeScript",
    "skills.frontend.item4": "HTML / CSS",
    "skills.cloud.item1": "AWS",
    "skills.cloud.item2": "Architetture serverless",
    "skills.cloud.item3": "AWS SAM e CDK",
    "skills.cloud.item4": "Terraform",
    "skills.cloud.item5": "CI/CD e GitHub Actions",
    "skills.cloud.item6": "Monitoraggio base",
    "skills.data.item1": "ETL e pipeline dati",
    "skills.data.item2": "SQL e database relazionali",
    "skills.data.item3": "MongoDB e NoSQL",
    "skills.data.item4": "Modelli Bedrock, OpenAI e Claude",
    "skills.data.item5": "LangChain e LangSmith",

    // Footer
    "footer.rights": "Tutti i diritti riservati",

    // Theme
    "theme.title": "Cambia tema",
    "theme.light": "Chiaro",
    "theme.dark": "Scuro",
    "theme.system": "Sistema",

    // 404 Page
    "404.title": "404 - Page Not Found",
    "404.description": "Sorry, the page you are looking for does not exist.",
    "404.button": "Back to Home",
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
