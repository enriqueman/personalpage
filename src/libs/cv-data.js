/**
 * Datos del CV para descarga en PDF (ES/EN).
 * Contenido alineado al CV proporcionado.
 */

export const cvData = {
  es: {
    name: "Cesar Enrique Manzano Velasco",
    title: "Magíster en IA Aplicada | Ingeniero en Electrónica y Telecomunicaciones | Desarrollador Full Stack",
    summary:
      "Apasionado por desarrollar soluciones innovadoras y atractivas. He llevado a cabo diversos proyectos web y aplicaciones de inteligencia artificial, utilizando modelos de lenguaje de diferentes proveedores como Bedrock, OpenAI y Claude, así como herramientas como LangChain y LangSmith. Tengo experiencia en arquitecturas en la nube, especialmente en entornos serverless y en bases de datos SQL y NoSQL. Además, poseo habilidades en herramientas CI/CD con AWS SAM, CDK y Terraform, para el despliegue de sitios web y modelos de machine learning.",

    workTitle: "EXPERIENCIA LABORAL",
    job1: {
      role: "Desarrollador – Equipo Ayté",
      period: "Septiembre 2023 – Actualidad",
      points: [
        "Miembro del equipo de soporte HDI Colombia, donde desarrollo mejoras innovadoras de producto y entrego soluciones a los retos del sector asegurador utilizando tecnologías serverless en AWS y bases de datos gestionadas.",
        "Participación en diferentes equipos dentro de Ayté, donde se desarrollaron varios proyectos web con tecnologías como Node.js y React, integrando servicios web y aplicaciones con inteligencia artificial generativa.",
        "Miembro del equipo de desarrollo para Liberty Colombia, donde construimos una nueva aplicación de endosos para la aseguradora. A cargo del desarrollo del sitio web y servicios back-end, usando React en el front-end y Node.js en el back-end, integrando AWS Lambda, DynamoDB y S3, entre otros.",
      ],
    },

    academicTitle: "EXPERIENCIA ACADÉMICA",
    academic1: {
      name: "Sistema de Gestión Estratégica de Talento y Habilidades",
      period: "2024 – 2025",
      desc: "Proyecto de tesis para la Maestría en Inteligencia Artificial Aplicada, desarrollado en colaboración con Coomeva. El sistema es un motor de recomendación diseñado para optimizar el desarrollo del talento y la gestión de habilidades, automatizando la identificación de brechas de competencias de los empleados y asignando rutas de aprendizaje personalizadas. Procesa retroalimentación de supervisores mediante archivos Excel, analiza comentarios escritos para extraer competencias relevantes y utiliza fuentes de conocimiento externas vía API Perplexity. Construido con LangChain, DynamoDB, Supabase y S3, con despliegue automatizado mediante GitHub Actions.",
    },
    academic2: {
      name: "Sistema de notificación de noticias falsas en el contexto político colombiano",
      period: "2023",
      desc: "Proyecto de grado que consistió en la creación de un sistema de identificación y notificación de noticias falsas, utilizando diversas APIs para el reconocimiento y divulgación de contenido verificado. La interfaz fue desarrollada en Angular para sitios web y Kotlin para una app. Incluyó recolección de noticias de fuentes como Twitter (ahora X) y Colombia Check, fine-tuning a un modelo FastAPI para verificar la veracidad, y una aplicación en Kotlin con Firebase como base de datos.",
    },
    academic3: {
      name: "Sistema veterinario para mascotas",
      period: "Abril 2022 – Diciembre 2022",
      desc: "Proyecto de validación del Curso Misión TIC, que consiste en la creación de un sistema de gestión de mascotas para una veterinaria, para gestionar citas, clientes y mascotas. El sistema fue desarrollado en Node.js y Angular.",
    },

    projectsTitle: "PROYECTOS PERSONALES",
    projectsIntro: "A lo largo de mi carrera profesional he llevado a cabo diferentes proyectos para fortalecer mis habilidades. Algunos de estos proyectos siguen en desarrollo.",
    proj1: "Portafolio web personal: sitio para la presentación de mi portafolio, construido en Next.js, alojado en S3 y desplegado en CloudFront y Route 53. Implementa entornos de desarrollo, pruebas y producción, desplegados mediante GitHub Actions con AWS SAM. www.enriquemv.com",
    proj2: "Sistema de gestión y publicación del blog Ataraxia: CMS serverless Full Stack con panel administrativo en Next.js y publicación automática de blog estático. Microservicios AWS Lambda para autenticación JWT, gestión de contenido, procesamiento de imágenes en S3 y publicación automática con despliegue en GitHub Pages. Next.js 15, React 19, AWS Lambda, DynamoDB, S3, GitHub Actions. www.ataraxiapro.com",

    educationTitle: "FORMACIÓN ACADÉMICA",
    edu1: "Magíster en Inteligencia Artificial Aplicada · Julio 2024 – Diciembre 2025 · Universidad Icesi",
    edu2: "Ingeniería Electrónica y Telecomunicaciones · Abril 2024 · Universidad del Cauca",
    edu3: "AWS Cloud Practitioner · Noviembre 2023 · Amazon Web Services (AWS)",
    edu4: "Misión TIC 2022 · Abril 2022 · Universidad Tecnológica de Pereira",
    edu5: "Data Science · Mayo 2022 · CoderHouse",

    contactTitle: "CONTACTO",
    phone: "301 733 5302",
    location: "Popayán, Colombia",
    email: "ceman217@gmail.com",
    linkedin: "EnriqueManzano217",
    github: "enriqueman",
    web: "www.enriquemv.com",

    languagesTitle: "IDIOMAS",
    languages: "Inglés intermedio B1",

    skillsTitle: "HABILIDADES",
    skills: "React, NodeJS, AWS, Python, Langchain, RAG, ETL, SQL, Mongo",

    softSkillsTitle: "HABILIDADES BLANDAS",
    softSkills: "Liderazgo y comunicación. Resolución de conflictos. Adaptación a entornos exigentes. Resiliencia. Responsabilidad y compromiso.",

    referencesTitle: "REFERENCIAS PERSONALES",
    ref1: { name: "Eduardo Flores", title: "Ingeniero Electrónico", phone: "318 310 5291" },
    ref2: { name: "Andrés Jojoa", title: "Ingeniero Electrónico", phone: "312 779 9551" },
    ref3: { name: "Javier Fernández", title: "Ingeniero Electrónico", phone: "317 288 9760" },
  },

  en: {
    name: "Cesar Enrique Manzano Velasco",
    title: "Master in Applied AI | Electronics and telecommunications engineer | Full stack developer",
    summary:
      "Passionate about developing innovative and engaging solutions. I have carried out several web projects and artificial intelligence applications, using language models from different vendors such as Bedrock, OpenAI and Claude, as well as tools such as LangChain and LangSmith. I have experience in cloud architectures, especially in serverless environments and SQL and NoSQL databases. In addition, I have skills in CI/CD tools with AWS SAM, CDK and Terraform, for the deployment of websites and machine learning models.",

    workTitle: "WORK EXPERIENCE",
    job1: {
      role: "Developer – Ayté team",
      period: "September 2023 – Present",
      points: [
        "I am currently a member of the HDI Colombia support team, where I develop innovative product improvements and deliver solutions to insurance industry challenges leveraging serverless AWS technologies and managed databases.",
        "Participated in different teams within Ayté, where several web projects were developed using technologies such as Node.js and React, integrating web services and applications with generative artificial intelligence.",
        "Member of the development team for Liberty Colombia, where we built a new endorsement application for the insurer. I was in charge of the development of the website and back-end services, using React for the front-end and Node.js for the back-end, integrating AWS Lambda, DynamoDB and S3, among others.",
      ],
    },

    academicTitle: "ACADEMIC EXPERIENCE",
    academic1: {
      name: "Strategic Talent and Skills Management System",
      period: "2024 – 2025",
      desc: "Thesis project for the Master's in Applied Artificial Intelligence, developed in collaboration with Coomeva. The system is a recommender engine designed to optimize talent development and skills management by automating the identification of employee competency gaps and assigning personalized learning paths. It processes supervisor feedback through Excel files, analyzes written comments to extract relevant competencies, and leverages external knowledge sources via Perplexity API. The platform automates what traditionally requires manual HR intervention. Built with LangChain, DynamoDB, Supabase, and S3, with automated deployment via GitHub Actions, providing actionable insights through downloadable reports.",
    },
    academic2: {
      name: "Notification system for fake news in the Colombian political context",
      period: "2023",
      desc: "Degree project that consisted in the creation of a system for identification and notification of fake news, using various APIs for the recognition and dissemination of verified content on the network. The interface was developed in Angular for websites and Kotlin for an app. The project had different stages, including the collection of news from various sources such as Twitter (now X) and Colombia Check, using the Twitter API and web scraping techniques. Fine-tuning to a FastAPI model was performed to check the veracity of the news. An application was implemented to visualize the verified news using Kotlin, where Firebase was used as the database.",
    },
    academic3: {
      name: "Veterinary System for Pets",
      period: "April 2022 – December 2022",
      desc: "Validation project of the ICT Mission Course, which consists of the creation of a pet management system for a veterinarian, to manage appointments, clients and pets. The system was developed in Node.js and Angular.",
    },

    projectsTitle: "PERSONAL PROJECTS",
    projectsIntro: "Throughout my professional career, I have carried out different projects in order to strengthen my skills as a professional. Some of these projects are still in development.",
    proj1: "Personal web portfolio: website for the presentation of my personal portfolio, built in Next.js, hosted in S3 and deployed in CloudFront and Route 53. It implements three types of environments: development, testing and production, deployed through GitHub Actions using AWS SAM (Serverless Application Model). www.enriquemv.com",
    proj2: "Ataraxia Blog Management and Publishing System: Full Stack serverless CMS with administrative panel in Next.js and automatic static blog publishing. AWS Lambda microservices for JWT authentication, content management, image processing in S3 and automatic publishing with deployment on GitHub Pages. Atomic Design, role-based access control and CI/CD with GitHub Actions. Technologies: Next.js 15, React 19, AWS Lambda, DynamoDB, S3, GitHub Actions. www.ataraxiapro.com",

    educationTitle: "ACADEMIC BACKGROUND",
    edu1: "Master in Applied Artificial Intelligence · July 2024 – December 2025 · Icesi University",
    edu2: "Electronics and telecommunications engineering · April 2024 · University of Cauca",
    edu3: "AWS Cloud Practitioner · November 2023 · Amazon Web Services (AWS)",
    edu4: "Misión TIC 2022 · April 2022 · Technological University of Pereira",
    edu5: "Data Science · May 2022 · CoderHouse",

    contactTitle: "CONTACT",
    phone: "301 733 5302",
    location: "Popayán, Colombia",
    email: "ceman217@gmail.com",
    linkedin: "EnriqueManzano217",
    github: "enriqueman",
    web: "www.enriquemv.com",

    languagesTitle: "LANGUAGES",
    languages: "Intermediate English B1",

    skillsTitle: "SKILLS",
    skills: "React, NodeJS, AWS, Python, Langchain, RAG, ETL, SQL, Mongo",

    softSkillsTitle: "SOFT SKILLS",
    softSkills: "Leadership and communication skills. Conflict resolution. Adaptation to demanding environments. Resilience. Responsibility and commitment.",

    referencesTitle: "PERSONAL REFERENCES",
    ref1: { name: "Eduardo Flores", title: "Electronics Engineer", phone: "318 310 5291" },
    ref2: { name: "Andrés Jojoa", title: "Electronics Engineer", phone: "312 779 9551" },
    ref3: { name: "Javier Fernández", title: "Electronics Engineer", phone: "317 288 9760" },
  },
}
