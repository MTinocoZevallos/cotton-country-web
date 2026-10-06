import Link from "next/link"

export default function PoliticaPrivacidad() {
  return (
    <section className="w-full bg-white text-gray-900 px-6 pt-32 pb-20">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#01018B]">
            Protección de datos
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-gray-950">
            Política de Privacidad
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Te explicamos qué datos personales puede tratar Cotton Country,
            para qué los utiliza y cómo puedes ejercer tus derechos.
          </p>
        </header>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8 mb-12">
          <p className="text-gray-700 leading-7">
            SANTELA S.A.C., identificada con RUC N.º 20611504951 y titular de la
            marca Cotton Country, con domicilio en Av. Los Mochicas 179,
            Urbanización Salamanca de Monterrico, Ate, Lima, Perú, informa
            mediante esta Política de Privacidad cómo trata los datos personales
            que recibe a través del sitio web https://cottoncountry.com.pe/.
          </p>

          <p className="mt-4 text-gray-700 leading-7">
            Esta política se aplica principalmente a los datos personales de
            representantes, colaboradores y personas de contacto de empresas que
            solicitan información, propuestas comerciales o mantienen una
            relación con Cotton Country.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-gray-950">
              1. ¿Qué datos podemos recopilar?
            </h2>

            <p className="mt-4 text-gray-700 leading-7">
              A través de nuestros formularios y canales de contacto podemos
              recibir:
            </p>

            <ul className="mt-5 space-y-3 text-gray-700">
              <li>• Nombres y apellidos.</li>
              <li>• Correo electrónico corporativo.</li>
              <li>• Teléfono de contacto.</li>
              <li>
                • Información de la empresa que representa, como razón social o
                RUC.
              </li>
              <li>• El contenido de la consulta o solicitud enviada.</li>
            </ul>

            <p className="mt-5 text-gray-700 leading-7">
              Asimismo, el sitio puede recopilar información técnica relacionada
              con la navegación, como dirección IP, navegador, dispositivo,
              páginas visitadas y otros datos técnicos necesarios para seguridad,
              medición y funcionamiento del sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-950">
              2. ¿Para qué utilizamos los datos?
            </h2>

            <ul className="mt-5 space-y-3 text-gray-700">
              <li>• Atender consultas y solicitudes enviadas desde el sitio web.</li>
              <li>• Preparar y gestionar propuestas comerciales.</li>
              <li>
                • Mantener comunicaciones relacionadas con una relación comercial
                o potencial relación comercial.
              </li>
              <li>• Brindar atención y seguimiento a clientes empresariales.</li>
              <li>
                • Mejorar el funcionamiento, seguridad y experiencia de
                navegación del sitio web.
              </li>
              <li>
                • Enviar comunicaciones comerciales cuando exista una base legal
                que lo permita y respetando el derecho del titular a oponerse o
                retirar su consentimiento cuando corresponda.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-950">
              3. Base legal del tratamiento
            </h2>

            <p className="mt-4 text-gray-700 leading-7">
              El tratamiento de los datos personales se realiza conforme a la
              Ley N.º 29733, Ley de Protección de Datos Personales, y su
              Reglamento aprobado mediante Decreto Supremo N.º 016-2024-JUS.
            </p>

            <p className="mt-4 text-gray-700 leading-7">
              Dependiendo de la finalidad, el tratamiento puede sustentarse en
              el consentimiento del titular, en la atención de una solicitud
              realizada por este o en las demás bases legales previstas por la
              normativa aplicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-950">
              4. Conservación de los datos
            </h2>

            <p className="mt-4 text-gray-700 leading-7">
              Los datos personales se conservarán únicamente durante el tiempo
              necesario para cumplir las finalidades para las cuales fueron
              recopilados, atender la relación comercial correspondiente y
              cumplir las obligaciones legales aplicables.
            </p>

            <p className="mt-4 text-gray-700 leading-7">
              Cuando los datos ya no sean necesarios y no exista obligación
              legal de conservarlos, podrán ser eliminados o anonimizados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-950">
              5. Proveedores y encargados de tratamiento
            </h2>

            <p className="mt-4 text-gray-700 leading-7">
              Cotton Country puede utilizar proveedores tecnológicos para operar
              el sitio web, gestionar formularios, comunicaciones, alojamiento,
              seguridad, analítica u otros servicios relacionados.
            </p>

            <p className="mt-4 text-gray-700 leading-7">
              Estos proveedores podrán tratar datos únicamente en la medida
              necesaria para prestar dichos servicios y conforme a las
              obligaciones aplicables en materia de protección de datos
              personales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-950">
              6. Transferencias y alojamiento
            </h2>

            <p className="mt-4 text-gray-700 leading-7">
              Algunos proveedores tecnológicos utilizados por Cotton Country
              pueden almacenar o procesar información mediante infraestructura
              ubicada fuera del Perú.
            </p>

            <p className="mt-4 text-gray-700 leading-7">
              Cuando corresponda, estas operaciones se realizarán de conformidad
              con las disposiciones aplicables sobre flujo transfronterizo de
              datos personales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-950">
              7. Seguridad
            </h2>

            <p className="mt-4 text-gray-700 leading-7">
              Cotton Country adopta medidas técnicas y organizativas razonables
              para proteger los datos personales frente a pérdida, acceso no
              autorizado, alteración, divulgación o tratamiento indebido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-950">
              8. Cookies y herramientas de medición
            </h2>

            <p className="mt-4 text-gray-700 leading-7">
              El sitio web puede utilizar cookies y tecnologías similares para
              funcionamiento, seguridad, medición de tráfico y análisis del uso
              del sitio.
            </p>

            <p className="mt-4 text-gray-700 leading-7">
              Algunas de estas tecnologías pueden ser proporcionadas por
              terceros, como herramientas de analítica o servicios utilizados
              para medir el rendimiento del sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-950">
              9. Tus derechos
            </h2>

            <p className="mt-4 text-gray-700 leading-7">
              El titular de los datos personales puede ejercer los derechos
              reconocidos por la legislación peruana, incluyendo los derechos de
              acceso, rectificación, cancelación y oposición.
            </p>

            <p className="mt-4 text-gray-700 leading-7">
              Asimismo, cuando el tratamiento se base en el consentimiento, el
              titular puede retirarlo conforme a la normativa aplicable.
            </p>

            <div className="mt-8 rounded-2xl bg-[#01018B] p-6 md:p-8 text-white">
              <h3 className="text-2xl font-semibold">
                ¿Quieres gestionar tus datos personales?
              </h3>

              <p className="mt-3 text-white/85 leading-7">
                Puedes solicitar acceso, rectificación, cancelación u oposición,
                o pedir que dejemos de enviarte comunicaciones comerciales.
              </p>

              <Link
                href="/derechos-arco"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-[#01018B] hover:bg-gray-100 transition"
              >
                Gestionar mis datos
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-950">
              10. Contacto
            </h2>

            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-gray-700 leading-7">
                Para consultas relacionadas con protección de datos personales
                puedes escribir a{" "}
                <a
                  href="mailto:info@cottoncountry.com.pe"
                  className="font-medium text-[#01018B] hover:underline"
                >
                  info@cottoncountry.com.pe
                </a>{" "}
                o utilizar el formulario disponible en la sección de derechos
                sobre datos personales.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-950">
              11. Modificaciones de esta Política
            </h2>

            <p className="mt-4 text-gray-700 leading-7">
              Cotton Country podrá actualizar esta Política de Privacidad cuando
              sea necesario para reflejar cambios legales, tecnológicos o en sus
              procesos. La versión vigente estará disponible en este sitio web.
            </p>
          </section>
        </div>
      </div>
    </section>
  )
}