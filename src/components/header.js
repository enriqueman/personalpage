import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Cesar Manzano
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-gray-300">Inicio</Link></li>
          <li><Link href="/experience" className="hover:text-gray-300">Experiencia</Link></li>
          <li><Link href="/education" className="hover:text-gray-300">Educación</Link></li>
          <li><Link href="/skills" className="hover:text-gray-300">Habilidades</Link></li>
        </ul>
      </nav>
    </header>
  )
}