import Link from 'next/link';
import AdminLayout from './layout';

export default function AdminDashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/admin/experience" className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200">
          Gestionar Experiencia Laboral
        </Link>
        <Link href="/admin/education" className="p-4 bg-green-100 rounded-lg hover:bg-green-200">
          Gestionar Educación
        </Link>
        <Link href="/admin/skills" className="p-4 bg-yellow-100 rounded-lg hover:bg-yellow-200">
          Gestionar Habilidades
        </Link>
        <Link href="/admin/intro" className="p-4 bg-purple-100 rounded-lg hover:bg-purple-200">
          Editar Introducción
        </Link>
      </div>
    </>
  );
}