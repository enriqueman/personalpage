import { Inter } from "next/font/google"
import "./globals.css"
import Header from "../components/header"
import Footer from "../components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Enrique Manzano",
  description: "Ingeniero en electrónica y telecomunicaciones, desarrollador web y especialista en IA",
  icons: {
    icon: "/svg.svg",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
      <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex flex-1">
                <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
              </div>
              <Footer />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
