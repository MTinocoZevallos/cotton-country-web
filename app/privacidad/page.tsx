import Link from "next/link"

export default function PoliticaPrivacidad() {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-32 pb-16">
      <article className="prose prose-slate max-w-none">
        <h1>Política de Privacidad</h1>

        <p>
          SANTELA S.A.C., identificada con RUC N.º 20611504951 y titular de la
          marca Cotton Country, con domicilio en Av. Los Mochicas 179,
          Urbanización Salamanca de Monterrico, Ate, Lima, Perú, informa mediante
          esta Política de Privacidad cómo trata los datos personales que recibe
          a través del sitio web https://cottoncountry.com.pe/.
        </p>

        <p>
          Esta política se aplica principalmente a los datos personales de
          representantes, colaboradores y personas de contacto de empresas que
          solicitan información, propuestas comerciales o mantienen una relación
          con Cotton Country.
        </p>

        <h2>1. ¿Qué datos podemos recopilar?</h2>

        <p>
          A través de nuestros formularios y canales de contacto podemos recibir:
        </p>

        <ul>
          <li>Nombres y apellidos.</li>
          <li>Correo electrónico corporativo.</li>
          <li>Teléfono de contacto.</li>
          <li>
            Información de la empresa que representa, como razón social o RUC.
          </li>
          <li>El contenido de la consulta o solicitud enviada.</li>
        </ul>

        <p>
          Asimismo, el sitio puede recopilar información técnica relacionada con
          la navegación, como dirección IP, navegador, dispositivo, páginas
          visitadas y otros datos técnicos necesarios para seguridad, medición y
          funcionamiento del sitio web.
        </p>

        <h2>2. ¿Para qué utilizamos los datos?</h2>

        <p>Los datos podrán utilizarse para las siguientes finalidades:</p>

        <ul>
          <li>Atender consultas y solicitudes enviadas desde el sitio web.</li>
          <li>Preparar y gestionar propuestas comerciales.</li>
          <li>
            Mantener comunicaciones relacionadas con una relación comercial o
            potencial relación comercial.
          </li>
          <li>Brindar atención y seguimiento a clientes empresariales.</li>
          <li>
            Mejorar el funcionamiento, seguridad y experiencia de navegación del
            sitio web.
          </li>
          <li>
            Enviar comunicaciones comerciales cuando exista una base legal que
            lo permita y respetando el derecho del titular a oponerse o retirar
            su consentimiento cuando corresponda.
          </li>
        </ul>

        <h2>3. Base legal del tratamiento</h2>

        <p>
          El tratamiento de los datos personales se realiza conforme a la Ley
          N.º 29733, Ley de Protección de Datos Personales, y su Reglamento
          aprobado mediante Decreto Supremo N.º 016-2024-JUS.
        </p>

        <p>
          Dependiendo de la finalidad, el tratamiento puede sustentarse en el
          consentimiento del titular, en la atención de una solicitud realizada
          por este o en las demás bases legales previstas por la normativa
          aplicable.
        </p>

        <h2>4. ¿Durante cuánto tiempo conservamos los datos?</h2>

        <p>
          Los datos personales se conservarán únicamente durante el tiempo
          necesario para cumplir las finalidades para las cuales fueron
          recopilados, atender la relación comercial correspondiente y cumplir
          las obligaciones legales aplicables.
        </p>

        <p>
          Cuando los datos ya no sean necesarios y no exista obligación legal de
          conservarlos, podrán ser eliminados o anonimizados.
        </p>

        <h2>5. Proveedores y encargados de tratamiento</h2>

        <p>
          Cotton Country puede utilizar proveedores tecnológicos para operar el
          sitio web, gestionar formularios, comunicaciones, alojamiento,
          seguridad, analítica u otros servicios relacionados.
        </p>

        <p>
          Estos proveedores podrán tratar datos únicamente en la medida
          necesaria para prestar dichos servicios y conforme a las obligaciones
          aplicables en materia de protección de datos personales.
        </p>

        <h2>6. Transferencias y alojamiento de información</h2>

        <p>
          Algunos proveedores tecnológicos utilizados por Cotton Country pueden
          almacenar o procesar información mediante infraestructura ubicada fuera
          del Perú.
        </p>

        <p>
          Cuando corresponda, estas operaciones se realizarán de conformidad con
          las disposiciones aplicables sobre flujo transfronterizo de datos
          personales.
        </p>

        <h2>7. Seguridad</h2>

        <p>
          Cotton Country adopta medidas técnicas y organizativas razonables para
          proteger los datos personales frente a pérdida, acceso no autorizado,
          alteración, divulgación o tratamiento indebido.
        </p>

        <h2>8. Cookies y herramientas de medición</h2>

        <p>
          El sitio web puede utilizar cookies y tecnologías similares para
          funcionamiento, seguridad, medición de tráfico y análisis del uso del
          sitio.
        </p>

        <p>
          Algunas de estas tecnologías pueden ser proporcionadas por terceros,
          como herramientas de analítica o servicios utilizados para medir el
          rendimiento del sitio.
        </p>

        <h2>9. Derechos sobre sus datos personales</h2>

        <p>
          El titular de los datos personales puede ejercer los derechos
          reconocidos por la legislación peruana, incluyendo los derechos de
          acceso, rectificación, cancelación y oposición.
        </p>

        <p>
          Asimismo, cuando el tratamiento se base en el consentimiento, el
          titular puede retirarlo conforme a la normativa aplicable. El nuevo
          Reglamento reconoce expresamente el derecho de negarse, oponerse o
          revocar el consentimiento en determinados tratamientos de publicidad
          y prospección comercial. 
        </p>

        <div className="not-prose my-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-2xl font-semibold text-gray-950">
            ¿Quieres gestionar tus datos personales?
          </h2>

          <p className="mt-3 text-gray-700">
            Puedes solicitar acceso, rectificación, cancelación u oposición, o
            pedir que dejemos de enviarte comunicaciones comerciales.
          </p>

          <Link
            href="/derechos-arco"
            className="mt-5 inline-flex items-center justify-center rounded-md bg-[#01018B] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
          >
            Gestionar mis datos
          </Link>
        </div>

        <h2>10. Contacto</h2>

        <p>
          Para consultas relacionadas con protección de datos personales puedes
          escribir a info@cottoncountry.com.pe o utilizar el formulario
          disponible en la sección de derechos sobre datos personales.
        </p>

        <h2>11. Modificaciones de esta Política</h2>

        <p>
          Cotton Country podrá actualizar esta Política de Privacidad cuando sea
          necesario para reflejar cambios legales, tecnológicos o en sus
          procesos. La versión vigente estará disponible en este sitio web.
        </p>
      </article>
    </section>
  )
}