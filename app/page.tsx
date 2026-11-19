import Hero from '@/components/Hero'
import ThreeReasons from '@/components/ThreeReasons'
import Basics from '@/components/Basics'
import Testimonials from '@/components/Testimonials'
import ContactForm from '@/components/ContactForm'
import HomeExperience from '@/components/HomeExperience'
import { brandSocialImage } from '@/lib/social'

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
    images: [brandSocialImage()],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cotton Country | Uniformes Corporativos",
    description:
      "Uniformes corporativos, institucionales e industriales diseñados y producidos en Perú.",
    images: [brandSocialImage()],
  },
}

export default function Home() {
  return (
    <HomeExperience>
      <Hero />
      <ThreeReasons />
      <Basics />
      <Testimonials />
      <ContactForm home />
    </HomeExperience>
  )
}
