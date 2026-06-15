import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    title: "Camisas",
    href: "/uniformes/camisas",
    image: "/uniformes/camisa-cuello-americano.png",
    text: "Camisas corporativas diseñadas para oficinas, ventas, operaciones e imagen institucional.",
  },
  {
    title: "Blusas",
    href: "/uniformes/blusas",
    image: "/uniformes/blusa-corte-princesa.png",
    text: "Blusas corporativas con diferentes cortes para atención al cliente, retail y fuerza comercial.",
  },
  {
    title: "Pantalones",
    href: "/uniformes/pantalones",
    image: "/uniformes/pantalon-corte-chino-caballero.png",
    text: "Pantalones corporativos y casuales desarrollados para comodidad, durabilidad y presentación.",
  },
  {
    title: "Polos",
    href: "/uniformes/polos",
    image: "/uniformes/polo-box-caballero.png",
    text: "Polos corporativos ideales para retail, promoción, logística, servicios y operaciones.",
  },
  {
    title: "Scrubs",
    href: "/uniformes/scrubs",
    image: "/uniformes/scrub-dentista.png",
    text: "Prendas para profesionales de salud diseñadas para comodidad, higiene e imagen profesional.",
  },
]

export default function UniformesPage() {
  return (
    <main className="pt-20 bg-white">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-medium text-[#01018B] mb-3">
            Uniformes Corporativos
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Soluciones textiles para cada necesidad
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Desarrollamos uniformes corporativos, institucionales e industriales
            diseñados para fortalecer la imagen de marca, mejorar la experiencia
            del colaborador y garantizar una presentación consistente en cada
            punto de contacto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-[360px] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {item.text}
                </p>

                <span className="inline-block mt-4 text-[#01018B] font-medium">
                  Ver colección →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}