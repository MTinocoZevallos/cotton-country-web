import ContactForm from "@/components/ContactForm"

export const metadata = {
  title: "Proveedor de Uniformes para Empresas | Cotton Country",
  description:
    "Fabricamos uniformes corporativos para empresas en Perú con criterios técnicos de tallaje, muestras, fichas técnicas y continuidad en reposiciones.",
}

export default function CorporateUniformsPage() {
  return (
    <main className="bg-white text-gray-900">
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 md:pt-28 md:pb-20 grid items-start gap-12 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#01018B]">
            Fabricación de uniformes corporativos en Perú
          </p>

          <h1 className="max-w-xl text-4xl font-bold leading-tight text-gray-950 md:text-6xl">
            Proveedor de uniformes para empresas
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            Desarrollamos camisas, blusas, polos, pantalones, casacas y prendas
            corporativas con criterios técnicos de tallaje, calidad y continuidad.
          </p>

          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Nuestro enfoque combina muestras, pruebas de tallaje, fichas técnicas
            y reposiciones para reducir incidencias y mantener una imagen
            profesional en el tiempo.
          </p>

          <div className="mt-8">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-lg bg-[#01018B] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#0202a8]"
            >
              Solicitar propuesta
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
          <img
            src="/landing-corporativo-hero.jpg"
            alt="Uniformes corporativos para empresas"
            className="w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-10 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#01018B]">
              Qué hacemos y por qué funciona
            </p>

            <h2 className="text-3xl font-semibold mb-5">
              Más que uniformes, un sistema de trabajo
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Las organizaciones cambian constantemente. Los uniformes también
              deben estar preparados para hacerlo. Por eso trabajamos con
              criterios técnicos que ayudan a mantener continuidad entre
              entregas, tallas y futuras reposiciones.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Muestras</h3>
              <p className="text-sm text-gray-600">
                Validamos diseño, uso y acabados antes de iniciar producción.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Sizeset</h3>
              <p className="text-sm text-gray-600">
                Realizamos pruebas de tallaje para reducir incidencias en la
                entrega.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Fichas técnicas</h3>
              <p className="text-sm text-gray-600">
                Documentamos materiales, medidas y criterios de confección.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Reposiciones</h3>
              <p className="text-sm text-gray-600">
                Facilitamos continuidad para nuevas incorporaciones y entregas
                futuras.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10 max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#01018B]">
            Evidencias
          </p>

          <h2 className="text-3xl font-semibold mb-4">
            Proyectos destacados
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Desde polos y camisería hasta prendas estructuradas como blazers o
            desarrollos en denim, cada proyecto responde a necesidades
            específicas de imagen, uso y operación.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <img
              src="/proyecto-avinka.png"
              alt="Uniformes para retail Avinka"
              className="h-72 w-full object-cover"
            />
            <div className="p-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#01018B]">
                Retail
              </p>
              <h3 className="text-xl font-semibold mb-2">Avinka</h3>
              <p className="text-sm text-gray-600">
                Blusa y pantalón para atención al cliente, presentación y
                comodidad en operación diaria.
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <img
              src="/proyecto-vilaseca.png"
              alt="Uniformes industriales Grupo Vilaseca"
              className="h-72 w-full object-cover"
            />
            <div className="p-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#01018B]">
                Industria
              </p>
              <h3 className="text-xl font-semibold mb-2">Grupo Vilaseca</h3>
              <p className="text-sm text-gray-600">
                Camisa y pantalón denim orientados a durabilidad y continuidad
                operativa.
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <img
              src="/proyecto-florerias-unidas.png"
              alt="Uniformes Florerías Unidas"
              className="h-72 w-full object-cover"
            />
            <div className="p-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#01018B]">
                Servicios
              </p>
              <h3 className="text-xl font-semibold mb-2">Florerías Unidas</h3>
              <p className="text-sm text-gray-600">
                Blazer y blusa para reforzar imagen institucional y atención
                personalizada.
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <img
              src="/proyecto-liqui-moly.png"
              alt="Uniformes Liqui Moly canal tradicional"
              className="h-72 w-full object-cover"
            />
            <div className="p-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#01018B]">
                Canal tradicional
              </p>
              <h3 className="text-xl font-semibold mb-2">Liqui Moly</h3>
              <p className="text-sm text-gray-600">
                Polo box y pantalón drill para actividades comerciales y
                presencia en punto de venta.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section id="contacto" className="max-w-6xl mx-auto px-6 py-16">
        <ContactForm />
      </section>
    </main>
  )
}