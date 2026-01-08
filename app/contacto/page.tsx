export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-6">
          Solicita una cotización corporativa
        </h1>

        <p className="text-neutral-400 text-lg mb-12">
          Completa el formulario y un asesor especializado se pondrá en contacto
          contigo.
        </p>

        <form className="space-y-6 max-w-2xl">
          {/* Empresa */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Empresa
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:border-white"
              placeholder="Nombre de la empresa"
            />
          </div>

          {/* RUC */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              RUC
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:border-white"
              placeholder="11 dígitos"
            />
          </div>

          {/* Cargo */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Cargo
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:border-white"
              placeholder="Ej. Jefe de Compras, RRHH, Operaciones"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Correo corporativo
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:border-white"
              placeholder="nombre@empresa.com"
            />
          </div>

          {/* Mensaje */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Mensaje
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:border-white"
              placeholder="Cuéntanos brevemente qué tipo de uniformes necesitas"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 px-6 py-4 bg-white text-neutral-900 font-semibold rounded-lg hover:bg-neutral-200 transition"
          >
            Enviar solicitud
          </button>
        </form>
      </section>
    </main>
  );
}
