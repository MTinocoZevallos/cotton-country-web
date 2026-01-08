import Image from "next/image"

const items = [
  {
    title: "Camisas corporativas",
    text: "Camisas diseñadas para una imagen profesional y consistente en entornos corporativos.",
    image: "/prendas/camisa-ca.png",
  },
  {
    title: "Blusas corporativas",
    text: "Blusas elegantes y funcionales alineadas a la identidad de tu empresa.",
    image: "/prendas/blusa-cp.png",
  },
  {
    title: "Pantalón dama",
    text: "Prendas cómodas y formales pensadas para el uso diario en oficina.",
    image: "/prendas/pantalon-dama.png",
  },
  {
    title: "Polo box",
    text: "Polos corporativos ideales para equipos comerciales, activaciones y uso operativo.",
    image: "/prendas/polobox-hombre.png",
  },
]

export default function PrendasCorporativas() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Título */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Prendas corporativas
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg">
            Diseñadas para representar la identidad de tu empresa en cada entorno de trabajo.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
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
                <h3 className="text-base font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
