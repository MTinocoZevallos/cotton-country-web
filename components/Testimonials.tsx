import Image from "next/image"

const testimonials = [
  {
    company: "Colegio de Ingenieros del Perú",
    logo: "/clientes/ciplima-logo.png",
    text: "Cotton Country destacó por la calidad de los acabados y la selección de materiales. Buscábamos uniformes que representen el nivel institucional del Colegio, y el resultado fue impecable en cada detalle.",
  },
  {
    company: "Decor Center",
    logo: "/clientes/decorcenter-logo.png",
    text: "Buscábamos uniformes que reflejaran la identidad visual de nuestra marca. El equipo de Cotton Country entendió el concepto desde el inicio y propuso soluciones técnicas y estéticas que superaron nuestras expectativas. Su metodología de sizeset nos permitió validar el fit antes de la producción, logrando una presentación uniforme y profesional en todo el personal.",
  },
  {
    company: "Zoomlion",
    logo: "/clientes/zoomlion-logo.png",
    text: "Como empresa transnacional, nuestros uniformes deben cumplir lineamientos definidos desde la matriz. Cotton Country supo adaptarlos con precisión a las condiciones locales. Las casacas fueron un éxito: el equipo simplemente las amó.",
  },
]

export default function Testimonials() {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Título */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Empresas que confían en Cotton Country
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg">
            Experiencia comprobada con instituciones, marcas y corporaciones de alto estándar.
          </p>
        </div>

        {/* Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm flex flex-col justify-between"
            >
              <p className="text-gray-700 text-sm leading-relaxed mb-8">
                “{item.text}”
              </p>

              <div className="flex items-center gap-4">
                <div className="relative w-24 h-10">
                  <Image
                    src={item.logo}
                    alt={item.company}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {item.company}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
