import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/hero-bg.png"
          alt="Uniformes Corporativos Cotton Country"
          className="w-full h-full object-cover object-top"
        />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/55"></div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-6 pt-24">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl">
          El uniforme, la mejor herramienta de marketing
        </h1>

        <p className="mt-6 text-white/90 text-lg md:text-xl max-w-2xl">
          Estudios comprueban que el uniforme influye tanto en la percepción del
          cliente como en la motivación del colaborador. En Cotton Country
          convertimos tu marca en una potente herramienta de comunicación.
        </p>

        {/* Botón único */}
        <div className="mt-10">
          <a
            href="mailto:info@cottoncountry.com.pe"
            className="inline-flex items-center justify-center bg-white text-[#01018B] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Solicitar propuesta
          </a>
        </div>
      </div>
    </section>
  );
}
