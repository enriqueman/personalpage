import { Inter } from "next/font/google"
import "./globals.css"
import Header from "../components/header"
import Footer from "../components/footer"
import { ThemeProvider } from "@/components/theme-provider"

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
              <main className="flex-1 p-6">{children}</main>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
