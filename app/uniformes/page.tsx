import Image from "next/image"
import Link from "next/link"

const items = [
  {
    title: "Camisas corporativas",
    text: "Camisas diseñadas para proyectar una imagen profesional, ordenada y coherente con la identidad de tu empresa.",
    image: "/prendas/camisa-ca.png",
  },
  {
    title: "Blusas corporativas",
    text: "Blusas elegantes y funcionales para equipos administrativos, comerciales e institucionales.",
    image: "/prendas/blusa-cp.png",
  },
  {
    title: "Pantalón dama",
    text: "Prendas formales y cómodas pensadas para el uso diario en oficina y atención al público.",
    image: "/prendas/pantalon-dama.png",
  },
  {
    title: "Polo box",
    text: "Polos corporativos ideales para equipos comerciales, activaciones, atención operativa y uso institucional.",
    image: "/prendas/polobox-hombre.png",
  },
]

export default function UniformesPage() {
  return (
    <main className="pt-20 bg-white">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl mb-14">
          <p className="text-sm font-medium text-[#01018B] mb-3">
            Uniformes corporativos
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Prendas diseñadas para representar tu marca
          </h1>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Desarrollamos uniformes corporativos para empresas que necesitan
            proyectar una imagen profesional, cuidar la comodidad de sus
            colaboradores y mantener consistencia visual en cada punto de
            contacto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="relative w-full h-[420px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">
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
              ¿Necesitas uniformes para tu empresa?
            </h2>
            <p className="mt-2 text-white/80">
              Cuéntanos qué prendas necesitas y prepararemos una propuesta para tu equipo.
            </p>
          </div>

          <Link
            href="mailto:info@cottoncountry.com.pe"
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-[#01018B] hover:bg-gray-100 transition"
          >
            Solicitar propuesta
          </Link>
        </div>
      </section>
    </main>
  )
}