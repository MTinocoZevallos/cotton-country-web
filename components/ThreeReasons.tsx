export default function ThreeReasons() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Título */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Cómo trabajamos
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Diseñamos, producimos y cumplimos bajo un método probado para
            proyectos corporativos exigentes.
          </p>
        </div>

        {/* Razones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Diseño */}
          <div className="border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#01018B]/10">
              {/* Icono regla */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-[#01018B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3l5 5-13 13H3v-5L16 3z" />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Diseño
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              ¿Tienes un diseño? Lo traducimos a una prenda funcional.
              <br />
              <br />
              ¿Necesitas uno? Desarrollamos una propuesta técnica pensada
              exclusivamente para tu necesidad.
              <br />
              <br />
              El diseño no es solo estético: comunica, informa y define los
              detalles técnicos de cada prenda.
            </p>
          </div>

          {/* Método */}
          <div className="border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#01018B]/10">
              {/* Icono reloj */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-[#01018B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Método
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              Los uniformes corporativos exigen más que buena confección:
              requieren método y flexibilidad.
              <br />
              <br />
              Nuestro modelo productivo está diseñado y probado para adaptarse
              a las particularidades de cada empresa.
            </p>
          </div>

          {/* Cumplimiento */}
          <div className="border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#01018B]/10">
              {/* Icono check */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-[#01018B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Cumplimiento
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              El cumplimiento no es casualidad: es el resultado de un proceso
              ordenado y un método probado.
              <br />
              <br />
              Contamos con información técnica de todos los insumos y materiales
              con los que trabajamos, lo que respalda cada entrega.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
