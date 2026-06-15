import Image from "next/image"
import Link from "next/link"

const items = [
  {
    title: "Blusa Corte Inglés",
    image: "/uniformes/blusa-corte-inglés.png",
    text: "Blusa corporativa de corte formal que proyecta seriedad, elegancia y profesionalismo. Es una de las opciones preferidas por bancos, instituciones educativas, entidades normativas y organizaciones que requieren una imagen institucional sólida.",
  },
  {
    title: "Blusa Corte Pinzas",
    image: "/uniformes/blusa-corte-pinzas.png",
    text: "Diseño versátil que combina comodidad y presentación profesional. Ideal para equipos comerciales, personal administrativo, operaciones y colaboradores que requieren libertad de movimiento durante toda la jornada.",
  },
  {
    title: "Blusa Corte Princesa",
    image: "/uniformes/blusa-corte-princesa.png",
    text: "Corte femenino que brinda excelente ajuste, comodidad y una imagen moderna. Muy utilizado por equipos de atención al cliente, fuerza de ventas, retail y empresas orientadas al servicio.",
  },
]

export default function BlusasPage() {
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
            Uniformes / Blusas
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Blusas corporativas
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Blusas diseñadas para equipos que necesitan una imagen profesional,
            comodidad durante la jornada y coherencia visual con la identidad
            de la empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-[420px] w-full">
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
              ¿Necesitas blusas corporativas para tu equipo?
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