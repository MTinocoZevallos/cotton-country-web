import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import "./design-tokens.css"
import { manrope, inter } from "./fonts"
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${manrope.variable} ${inter.variable}`}>
      <body className="flex flex-col min-h-screen">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K9LCWTCT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K9LCWTCT');
          `}
        </Script>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://cottoncountry.com.pe/#organization",
          name: "Cotton Country",
          url: "https://cottoncountry.com.pe",
          logo: "https://cottoncountry.com.pe/logo-cotton-country.png",
          email: "info@cottoncountry.com.pe",
          telephone: "+5117397979",
        }) }} />
        <Header />
        <main id="contenido" tabIndex={-1} className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
