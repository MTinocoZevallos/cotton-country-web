import Image from "next/image"
import Link from "next/link"

const items = [
  {
    title: "Scrub Dentista",
    image: "/uniformes/scrub-dentista.png",
    text: "Uniforme médico diseñado para consultorios odontológicos, clínicas y centros de salud. Confeccionado en tejidos tecnológicos de fácil mantenimiento que brindan comodidad, higiene y una imagen profesional durante toda la jornada.",
  },
]

export default function ScrubsPage() {
  return (
    <main className="pt-20 bg-white">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-10">
          <Link href="/uniformes" className="text-sm text-[#01018B] hover:underline">
            ← Volver a uniformes
          </Link>
        </div>

        <div className="max-w-3xl mb-14">
          <p className="text-sm font-medium text-[#01018B] mb-3">
            Uniformes / Scrubs
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Scrubs y uniformes para salud
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Prendas diseñadas para profesionales de salud que requieren
            comodidad, higiene, libertad de movimiento y una presentación
            profesional durante toda la jornada laboral.
          </p>
        </div>

        <div className="max-w-md">
          {items.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-[520px] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-[#01018B] px-8 py-10 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold">
              ¿Necesitas uniformes para profesionales de salud?
            </h2>
            <p className="mt-2 text-white/80">
              Solicita una propuesta según el diseño, tejido, cantidad y uso requerido.
            </p>
          </div>

          <a
            href="mailto:info@cottoncountry.com.pe"
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-[#01018B] hover:bg-gray-100 transition"
          >
            Solicitar propuesta
          </a>
        </div>
      </section>
    </main>
  )
}