import type { Metadata } from "next"
import { editorialSerif } from "@/components/home-font"
import editorial from "@/components/uniforms/uniforms.module.css"
import styles from "./nosotros.module.css"

const title = "Nosotros | Cotton Country"
const description = "Conoce la historia de Cotton Country: una mirada empresarial y técnica a los uniformes corporativos y a los desafíos de la industria textil peruana."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://cottoncountry.com.pe/nosotros" },
  robots: process.env.VERCEL_ENV === "preview" ? { index: false, follow: false } : undefined,
  openGraph: {
    title, description,
    url: "https://cottoncountry.com.pe/nosotros",
    siteName: "Cotton Country", locale: "es_PE", type: "website",
  },
}

export default function NosotrosPage() {
  return <div className={`${editorial.page} ${editorialSerif.variable} ${styles.page}`} data-nosotros-content>
    <div className={editorial.container}>
      <header className={`${editorial.intro} ${styles.intro}`}>
        <h1>No empezamos fabricando uniformes. Empezamos cuestionando cómo se hacían.</h1>
      </header>
    </div>
    <section className={`${editorial.section} ${styles.section}`} aria-labelledby="origen-cotton-country">
      <div className={`${editorial.container} ${styles.sectionLayout}`}>
        <h2 id="origen-cotton-country" className={styles.sectionTitle}>Una pregunta que dio origen a Cotton Country</h2>
        <div className={`${editorial.copy} ${styles.body}`}>
          <p>Cotton Country nació en 2014, después de una experiencia con uniformes corporativos en una importante empresa de retail.</p>
          <p>Lo que parecía un problema cotidiano despertó una pregunta más profunda: <strong>¿cómo era posible que una industria tan importante no contara con una marca de uniformes claramente reconocida y posicionada en el mercado?</strong></p>
          <p>La respuesta fue emprender.</p>
          <p>Combinamos experiencia en administración, retail financiero, marketing y ventas con ingeniería industrial especializada en confecciones. Desde el principio tuvimos una convicción: el mercado necesitaba algo más que otro fabricante de uniformes.</p>
          <p>Necesitaba una forma diferente de entender el negocio.</p>
        </div>
      </div>
    </section>
    <section className={`${editorial.section} ${styles.section} ${editorial.ivory}`} aria-labelledby="valor-del-uniforme">
      <div className={`${editorial.container} ${styles.sectionLayout}`}>
        <h2 id="valor-del-uniforme" className={styles.sectionTitle}>El uniforme no es simplemente una prenda</h2>
        <div className={`${editorial.copy} ${styles.body}`}>
          <p>Muchas empresas siguen comprando uniformes bajo una lógica centrada casi exclusivamente en el precio.</p>
          <p>Nosotros los entendemos de otra manera.</p>
          <p><strong>Un uniforme es una herramienta de marketing, identidad y comunicación.</strong> Representa a la organización, proyecta su imagen y acompaña diariamente a las personas que hacen posible su negocio.</p>
          <p>Pero también debe funcionar: tener tallas adecuadas, materiales apropiados, comodidad, durabilidad y responder a las exigencias de cada actividad.</p>
          <p>Por eso creemos que el verdadero valor de un uniforme no está únicamente en cuánto cuesta, sino en lo que aporta a la empresa y a quienes lo utilizan.</p>
        </div>
      </div>
    </section>
    <section className={`${editorial.section} ${styles.section}`} aria-labelledby="resolver-problemas">
      <div className={`${editorial.container} ${styles.sectionLayout}`}>
        <h2 id="resolver-problemas" className={styles.sectionTitle}>Resolver problemas, no solamente fabricar prendas</h2>
        <div className={`${editorial.copy} ${styles.body}`}>
          <p>El negocio de los uniformes corporativos es mucho más complejo de lo que parece.</p>
          <p>Cada industria, cada empresa y cada área de una organización entiende el uniforme de manera diferente. Para algunas es una herramienta de identidad y marketing; para otras, una necesidad operativa, una exigencia de seguridad o simplemente un gasto que debe controlarse.</p>
          <p>Esta diversidad plantea un desafío: <strong>no basta con saber confeccionar una prenda. Hay que comprender cómo funciona cada negocio, sus procesos de compra, sus exigencias técnicas y las expectativas de quienes utilizarán los uniformes.</strong></p>
          <p>A ello se suman problemas recurrentes: tallas que no corresponden, información insuficiente sobre materiales, especificaciones poco claras, dificultades para garantizar acabados consistentes y compromisos de entrega cada vez más exigentes.</p>
          <p>Todo esto ocurre dentro de una industria textil peruana que enfrenta desafíos estructurales: baja productividad, informalidad, brechas tecnológicas, limitada inversión en investigación y desarrollo, asimetrías de información y una intensa competencia en mercados fragmentados, donde el precio suele imponerse sobre la diferenciación.</p>
          <p><strong>El verdadero desafío no es solamente producir uniformes, sino gestionar todas estas variables para obtener un resultado satisfactorio.</strong></p>
          <p>En Cotton Country desarrollamos un modelo especializado y ágil, apoyado en una red de producción tercerizada. Integramos conocimiento textil, ingeniería, marketing y tecnología para comprender las necesidades de cada cliente y desarrollar soluciones a problemas reales.</p>
          <p>Porque detrás de un buen uniforme hay mucho más que tela y confección: hay conocimiento, decisiones técnicas, coordinación y una comprensión profunda del negocio al que debe servir.</p>
        </div>
      </div>
    </section>
    <section className={`${editorial.section} ${styles.section} ${editorial.ivory}`} aria-labelledby="otra-manera">
      <div className={`${editorial.container} ${styles.sectionLayout}`}>
        <h2 id="otra-manera" className={styles.sectionTitle}>Una manera diferente de hacer las cosas</h2>
        <div className={`${editorial.copy} ${styles.body}`}>
          <p>El mercado está cambiando y las empresas necesitan proveedores capaces de ofrecer algo más que productos y cotizaciones.</p>
          <p>Creemos en una industria textil peruana que compita por conocimiento, especialización, eficiencia e innovación, aprovechando su tradición y sus ventajas productivas.</p>
          <p>Sabemos que los desafíos del sector siguen presentes. No pretendemos haberlos resuelto todos, pero sí contribuir a mejorar la manera en que se desarrollan y gestionan los proyectos de uniformes.</p>
          <p><strong>Cada empresa que elige Cotton Country también apuesta por esa transformación.</strong> Por procesos mejor pensados, decisiones más informadas y una cadena textil que puede generar mayor valor para todos.</p>
          <p>Creemos que una buena compra no se define únicamente por el precio. Se reconoce en los compromisos cumplidos, en la calidad de los acabados, en una prenda que calza bien y en colaboradores que se sienten cómodos y orgullosos de vestirla. Esos detalles hacen la diferencia entre simplemente entregar uniformes y aportar valor a una organización.</p>
        </div>
      </div>
    </section>
    <section className={`${editorial.section} ${styles.closing}`} aria-label="Cotton Country">
      <div className={editorial.container}>
        <p className={styles.signature}><strong>COTTON COUNTRY</strong></p>
        <div className={styles.closingStatement}>
          <p><strong>Hay uniformes que son un costo.</strong></p>
          <p><strong>Y uniformes que son parte del éxito.</strong></p>
        </div>
      </div>
    </section>
  </div>
}
