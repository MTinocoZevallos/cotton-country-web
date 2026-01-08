import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cotton Country | Uniformes Corporativos",
  description:
    "Uniformes corporativos, institucionales e industriales diseñados y producidos en Perú.",
  verification: {
    google: "zpHF0Zr6rY5sswtDJjqndC4cUnDXGsfkldktUVcTv2g",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
