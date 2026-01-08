import Hero from '@/components/Hero'
import ThreeReasons from '@/components/ThreeReasons'
import Basics from '@/components/Basics'
import Testimonials from '@/components/Testimonials'
import ContactForm from '@/components/ContactForm'

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
