import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  metadataBase: new URL("https://cottoncountry.com.pe"),

  title: "Cotton Country | Uniformes Corporativos",

  description:
    "Uniformes corporativos, institucionales e industriales diseñados y producidos en Perú.",

  verification: {
    google: "zpHF0Zr6rY5sswtDJjqndC4cUnDXGsfkldktUVcTv2g",
  },

  openGraph: {
    title: "Cotton Country | Uniformes Corporativos",
    description:
      "Uniformes corporativos, institucionales e industriales diseñados y producidos en Perú.",
    url: "https://cottoncountry.com.pe",
    siteName: "Cotton Country",
    locale: "es_PE",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}