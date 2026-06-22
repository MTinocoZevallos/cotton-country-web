import ContactForm from "@/components/ContactForm"

export const metadata = {
  title: "Proveedor de Uniformes Corporativos para Empresas | Cotton Country",
  description:
    "Fabricamos uniformes corporativos para empresas en Perú. Camisas, blusas, polos y prendas corporativas para fortalecer la imagen institucional de su organización.",
}

export default function CorporateUniformsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 bg-white text-gray-900">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">
          Proveedor de Uniformes Corporativos para Empresas
        </h1>

        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Diseñamos y fabricamos uniformes corporativos para organizaciones que
          buscan proyectar una imagen profesional, consistente y alineada con su
          marca.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Qué fabricamos
        </h2>

        <ul className="grid md:grid-cols-2 gap-4">
          <li>Camisas corporativas</li>
          <li>Blusas corporativas</li>
          <li>Polos corporativos</li>
          <li>Pantalones corporativos</li>
          <li>Chalecos corporativos</li>
          <li>Casacas corporativas</li>
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Sectores que atendemos
        </h2>

        <ul className="grid md:grid-cols-3 gap-4">
          <li>Banca</li>
          <li>Seguros</li>
          <li>Retail</li>
          <li>Tecnología</li>
          <li>Salud</li>
          <li>Servicios</li>
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Nuestro proceso
        </h2>

        <ol className="space-y-3">
          <li>1. Diagnóstico de necesidades</li>
          <li>2. Desarrollo de propuesta</li>
          <li>3. Elaboración de muestras</li>
          <li>4. Producción</li>
          <li>5. Entrega</li>
        </ol>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          ¿Por qué las empresas cambian de proveedor?
        </h2>

        <p className="mb-4">
          Los problemas de tallaje, retrasos, variaciones de calidad y falta de
          continuidad suelen ser las razones más frecuentes para buscar un nuevo
          proveedor de uniformes corporativos.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Solicite una propuesta
        </h2>

        <ContactForm />
      </section>
    </main>
  )
}