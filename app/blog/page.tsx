export default function BlogPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-6">
          Blog de Innovación Textil
        </h1>

        <p className="text-neutral-400 text-lg mb-16">
          Análisis sobre telas inteligentes, procesos productivos,
          sostenibilidad y tecnología aplicada a la confección de uniformes.
        </p>

        <div className="space-y-8">
          <div className="p-6 border border-neutral-800 rounded-lg">
            <h2 className="text-2xl font-semibold">
              Próximamente
            </h2>
            <p className="text-neutral-400 mt-2">
              Estamos preparando contenido especializado para empresas e
              industrias.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
