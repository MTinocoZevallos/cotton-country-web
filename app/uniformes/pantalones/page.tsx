import Image from "next/image"
import Link from "next/link"

const items = [
  {
    title: "Pantalón Corte Chino Caballero",
    image: "/uniformes/pantalon-corte-chino-caballero.png",
    text: "Pantalón corporativo de corte clásico que combina comodidad y presentación profesional. Puede confeccionarse en drill, algodón o tejidos con stretch para adaptarse a diferentes niveles de exigencia operativa.",
  },
  {
    title: "Pantalón Corte Chino Dama",
    image: "/uniformes/pantalon-corte-chino-dama.png",
    text: "Pantalón femenino diseñado para complementar uniformes corporativos de oficina y atención al cliente. Disponible en diversas composiciones textiles para maximizar confort, movilidad y durabilidad.",
  },
  {
    title: "Pantalón Corte Jean Caballero",
    image: "/uniformes/pantalon-corte-jean-caballero.png",
    text: "Opción casual para empresas que requieren una imagen moderna y funcional. Ideal para ventas, operaciones, logística y actividades que demandan movilidad constante.",
  },
  {
    title: "Pantalón Corte Jean Dama",
    image: "/uniformes/pantalon-corte-jean-dama.png",
    text: "Pantalón de estilo casual diseñado para actividades de campo, ventas y trabajo operativo. Combina comodidad, resistencia y una apariencia profesional adaptable a múltiples sectores.",
  },
]

export default function PantalonesPage() {
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
            Uniformes / Pantalones
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Pantalones corporativos
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Pantalones diseñados para complementar uniformes corporativos,
            comerciales y operativos, combinando presentación profesional,
            comodidad y resistencia para el uso diario.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              ¿Necesitas pantalones corporativos para tu equipo?
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