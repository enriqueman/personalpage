// import Link from 'next/link';

// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <aside className="w-64 bg-white shadow-md">
//         <nav className="mt-5">
//           <Link href="/admin" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
//             Dashboard
//           </Link>
//           <Link href="/admin/experience" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
//             Experiencia
//           </Link>
//           <Link href="/admin/education" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
//             Educación
//           </Link>
//           <Link href="/admin/skills" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
//             Habilidades
//           </Link>
//           <Link href="/admin/intro" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
//             Introducción
//           </Link>
//         </nav>
//       </aside>
//       <main className="flex-1 p-10 overflow-y-auto">
//         {children}
//       </main>
//     </div>
//   );
// }

import Link from "next/link";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Panel - CV Manager",
  description: "Manage your CV content",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className={`min-h-screen bg-gray-100 ${inter.className}`}>
          <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link
                    href="/admin"
                    className="flex-shrink-0 flex items-center"
                  >
                    <span className="text-xl font-bold text-gray-800">
                      CV Admin
                    </span>
                  </Link>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      href="/admin/intro"
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Intro
                    </Link>
                    <Link
                      href="/admin/experience"
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Experience
                    </Link>
                    <Link
                      href="/admin/education"
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Education
                    </Link>
                    <Link
                      href="/admin/skills"
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Skills
                    </Link>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <Link
                    href="/"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View CV
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>

         
        </div>
        <footer className="bg-white shadow-md p-4 mt-8">
            <div className="container mx-auto text-center">
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} CV Manager. All rights
                  reserved.
                </p>
              </div>
            </div>
          </footer>
      </body>
     
    </html>
  );
}
