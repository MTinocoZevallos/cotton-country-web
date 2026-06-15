import Image from "next/image"
import Link from "next/link"

const items = [
  {
    title: "Polo Box Caballero",
    image: "/uniformes/polo-box-caballero.png",
    text: "Uno de los uniformes corporativos más utilizados por empresas de retail, servicios y promoción. Confeccionado en algodón de alta calidad para ofrecer comodidad, frescura y excelente presentación.",
  },
  {
    title: "Polo Box Dama",
    image: "/uniformes/polo-box-dama.png",
    text: "Polo corporativo femenino confeccionado en tejido piqué de alta calidad. Su suavidad, resistencia y comodidad lo convierten en una excelente opción para uniformar equipos comerciales y de atención al cliente.",
  },
]

export default function PolosPage() {
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
            Uniformes / Polos
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Polos corporativos
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Polos diseñados para equipos comerciales, retail, activaciones,
            atención al cliente y operaciones que requieren una prenda cómoda,
            funcional y alineada a la identidad de la empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              ¿Necesitas polos corporativos para tu equipo?
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