import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/header'
import Footer from '../components/footer'
import Sidebar from '../components/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hoja de Vida de Cesar Enrique Manzano Velasco',
  description: 'Ingeniero en electrónica y telecomunicaciones, desarrollador web y especialista en IA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}