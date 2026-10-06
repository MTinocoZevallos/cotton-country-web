import Hero from '@/components/Hero'
import ThreeReasons from '@/components/ThreeReasons'
import Basics from '@/components/Basics'
import Testimonials from '@/components/Testimonials'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: "Cotton Country | Uniformes Corporativos",
  description:
    "Uniformes corporativos, institucionales e industriales diseñados y producidos en Perú.",
  alternates: {
    canonical: "https://cottoncountry.com.pe",
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
        url: "/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Cotton Country - Uniformes corporativos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cotton Country | Uniformes Corporativos",
    description:
      "Uniformes corporativos, institucionales e industriales diseñados y producidos en Perú.",
    images: ["/og-home.webp"],
  },
}

export default function Home() {
  return (
    <main className="pt-20">
      <Hero />
      <ThreeReasons />
      <Basics />
      <Testimonials />
      <ContactForm />
    </main>
  )
}
