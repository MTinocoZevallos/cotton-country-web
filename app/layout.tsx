import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  metadataBase: new URL("https://cottoncountry.com.pe"),

  alternates: {
    canonical: "https://cottoncountry.com.pe",
  },

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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cotton Country Uniformes Corporativos",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cotton Country | Uniformes Corporativos",
    description:
      "Uniformes corporativos, institucionales e industriales diseñados y producidos en Perú.",
    images: ["/og-image.png"],
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7VEMKX1RHX"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7VEMKX1RHX');
          `}
        </Script>

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}