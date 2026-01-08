export default function ContactForm() {
  return (
    <section id="contacto" className="w-full bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Texto de invitación */}
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Solicita una propuesta personalizada
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            Cuéntanos sobre tu empresa y el tipo de uniformes que necesitas.
            Nuestro equipo te contactará en menos de 24 horas para coordinar
            una propuesta adaptada a tus requerimientos técnicos y de imagen.
          </p>
        </div>

        {/* Formulario */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          action="#"
          method="post"
        >
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre y Apellido
            </label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#01018B]"
            />
          </div>

          {/* RUC */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RUC
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#01018B]"
            />
          </div>

          {/* Correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo de empresa
            </label>
            <input
              type="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#01018B]"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#01018B]"
            />
          </div>

          {/* Mensaje libre */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cuéntanos qué tipo de uniformes necesitas
            </label>
            <textarea
              rows={5}
              placeholder="Ejemplo: camisas corporativas para equipo administrativo, cantidades aproximadas, fecha requerida, colores, etc."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#01018B]"
            />
          </div>

          {/* Botón */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-[#01018B] px-8 py-4 text-white text-sm font-medium hover:bg-[#0202a8] transition"
            >
              Solicitar propuesta
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
