import Image from 'next/image'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Cesar Enrique Manzano Velasco</h1>
      <div className="flex items-center mb-6">
        <Image
          src="/profile-picture.jpg"
          alt="Cesar Enrique Manzano Velasco"
          width={150}
          height={150}
          className="rounded-full mr-6"
        />
        <div>
          <p className="text-lg mb-2">Ingeniero en electrónica y telecomunicaciones</p>
          <p className="text-gray-600">
            Apasionado por el desarrollo de soluciones innovadoras y atractivas. 
            Experiencia en proyectos web, aplicaciones de inteligencia artificial, 
            y arquitecturas en la nube.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Contacto</h2>
          <p>Teléfono: 3017335302</p>
          <p>Email: ceman217@gmail.com</p>
          <p>LinkedIn: EnriqueManzano217</p>
          <p>Ubicación: Popayán, Colombia</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Habilidades</h2>
          <ul className="list-disc list-inside">
            <li>React</li>
            <li>NodeJS</li>
            <li>AWS</li>
            <li>Python</li>
            <li>Langchain</li>
            <li>ETL</li>
            <li>SQL</li>
            <li>Mongo</li>
          </ul>
        </div>
      </div>
    </div>
  )
}