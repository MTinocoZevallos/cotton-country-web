import Image from "next/image"
import Link from "next/link"

const items = [
  {
    title: "Camisa Cuello Americano",
    image: "/uniformes/camisa-cuello-americano.png",
    text: "Camisa corporativa de estilo casual con cuello abotonado y diseño funcional. Perfecta para equipos comerciales, oficinas, operaciones de campo e industrias que buscan una imagen profesional sin perder comodidad.",
  },
  {
    title: "Camisa Cuello Italiano",
    image: "/uniformes/camisa-cuello-italiano.png",
    text: "Camisa de vestir con cuello italiano y bolsillo frontal. Diseñada para entornos corporativos que requieren una imagen formal y elegante, ideal para oficinas, seguridad, hotelería, gastronomía y atención al público.",
  },
  {
    title: "Camisa Cuello Neru",
    image: "/uniformes/camisa-cuello-neru.png",
    text: "Camisa de cuello neru para empresas que buscan una imagen diferenciada, moderna y sobria. Ideal para atención al cliente, hotelería, restaurantes, eventos corporativos y marcas con identidad visual definida.",
  },
]

export default function CamisasPage() {
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
            Uniformes / Camisas
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Camisas corporativas
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Camisas para empresas que necesitan proyectar orden, profesionalismo
            y coherencia visual en equipos administrativos, comerciales,
            operativos e institucionales.
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
              ¿Necesitas camisas corporativas para tu equipo?
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