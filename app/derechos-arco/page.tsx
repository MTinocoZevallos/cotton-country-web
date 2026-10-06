import PrivacyRequestForm from "@/components/PrivacyRequestForm"

export default function DerechosARCO() {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-32 pb-16">
      <article className="prose prose-slate max-w-none">
        <h1>Gestiona tus datos personales</h1>

        <p>
          SANTELA S.A.C., titular de la marca Cotton Country, pone a tu
          disposición este formulario para ejercer los derechos reconocidos por
          la Ley N.º 29733, Ley de Protección de Datos Personales, y su
          Reglamento aprobado mediante Decreto Supremo N.º 016-2024-JUS.
        </p>

        <p>
          Puedes solicitar acceso, rectificación, cancelación u oposición
          respecto de tus datos personales. También puedes pedir que dejemos de
          enviarte comunicaciones comerciales.
        </p>

        <p>
          Este formulario está dirigido a personas cuyos datos hayan sido
          proporcionados a Cotton Country en representación o como contacto de
          una empresa.
        </p>

        <div className="not-prose mt-10 rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
          <PrivacyRequestForm />
        </div>

        <h2 className="mt-12">Atención de solicitudes</h2>

        <p>
          Las solicitudes serán atendidas dentro de los plazos establecidos por
          la normativa vigente. Cuando sea necesario para proteger tus datos,
          podremos solicitar información adicional que permita verificar tu
          identidad o localizar correctamente la información relacionada con tu
          solicitud.
        </p>

        <p>
          También puedes realizar consultas relacionadas con protección de datos
          personales escribiendo a{" "}
          <a href="mailto:info@cottoncountry.com.pe">
            info@cottoncountry.com.pe
          </a>.
        </p>
      </article>
    </section>
  )
}