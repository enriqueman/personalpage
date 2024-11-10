'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path) => pathname === path

  return (
    <aside className="bg-gray-100 w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/" className={`block p-2 rounded ${isActive('/') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/experience" className={`block p-2 rounded ${isActive('/experience') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
              Experiencia
            </Link>
          </li>
          <li>
            <Link href="/education" className={`block p-2 rounded ${isActive('/education') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
              Educación
            </Link>
          </li>
          <li>
            <Link href="/skills" className={`block p-2 rounded ${isActive('/skills') ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
              Habilidades
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}