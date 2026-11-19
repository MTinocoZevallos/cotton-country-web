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
    <section className={`${editorial.section} ${styles.section}`} aria-labelledby="nuestra-historia">
      <div className={`${editorial.container} ${styles.sectionLayout}`}>
        <h2 id="nuestra-historia" className={styles.sectionTitle}>Nuestra historia</h2>
        <div className={`${editorial.copy} ${styles.body}`}>
          <p>Cotton Country nació en 2014, a partir de una experiencia que nos llevó a mirar de otra manera el mercado de los uniformes corporativos.</p>
          <p>Todo comenzó cuando uno de nuestros fundadores, encargado de una tienda de una importante empresa de retail, experimentó de primera mano las dificultades que podía ocasionar una mala gestión de uniformes.</p>
          <p>Aquella experiencia despertó una pregunta que terminaría dando origen a nuestra empresa:</p>
          <p><strong>¿Cómo era posible que, en una industria tan importante, no existiera una marca de uniformes claramente reconocida y posicionada en el mercado?</strong></p>
          <p>La inquietud iba más allá de encontrar un proveedor eficiente. Se trataba de comprender por qué un producto tan presente en la vida de las organizaciones no había desarrollado una propuesta de marca y una experiencia comercial a la altura de su importancia.</p>
          <p>La idea encontró raíces en experiencias familiares vinculadas a la confección. Nuestra madre, profesora de profesión, confeccionaba su propia ropa. Un pequeño taller de servicios textiles que había tenido nuestra familia nos permitió conocer desde dentro las dificultades del sector: informalidad, alta rotación de trabajadores, competencia intensa y una industria fragmentada.</p>
          <p>A ello se sumaron dos especialidades complementarias: una trayectoria profesional en el retail y el sector financiero, con experiencia en bancos y algunos de los principales grupos económicos del país, formación en administración, marketing y ventas; y conocimientos de ingeniería industrial especializada en confecciones.</p>
          <p>Así nació Cotton Country: de combinar una mirada empresarial y comercial con el conocimiento técnico de la industria textil.</p>
        </div>
      </div>
    </section>
    <section className={`${editorial.section} ${styles.section} ${editorial.ivory}`} aria-labelledby="industria-textil">
      <div className={`${editorial.container} ${styles.sectionLayout}`}>
        <h2 id="industria-textil" className={styles.sectionTitle}>Una industria con mucho potencial y desafíos pendientes</h2>
        <div className={`${editorial.copy} ${styles.body}`}>
          <p>El Perú cuenta con una importante tradición textil, materias primas reconocidas internacionalmente y conocimientos productivos desarrollados durante generaciones.</p>
          <p>Sin embargo, ese potencial convive con desafíos estructurales: informalidad, fragmentación empresarial, dificultades para incorporar tecnología, limitada estandarización de procesos y una competencia que con frecuencia se concentra exclusivamente en el precio.</p>
          <p>En el mercado de uniformes, estos problemas se manifiestan de maneras muy concretas.</p>
          <p>La incertidumbre sobre las tallas, la información insuficiente acerca de los materiales, las diferencias entre especificaciones técnicas y productos terminados, los tiempos de entrega y la coordinación de procesos productivos pueden convertir una compra aparentemente sencilla en una operación compleja.</p>
          <p>Son dificultades que afectan tanto a las empresas compradoras como a quienes participan en la cadena de confección.</p>
          <p><strong>Entendimos que existía una oportunidad para crear valor precisamente donde la industria todavía tenía problemas por resolver.</strong></p>
        </div>
      </div>
    </section>
    <section className={`${editorial.section} ${styles.section}`} aria-labelledby="valor-del-uniforme">
      <div className={`${editorial.container} ${styles.sectionLayout}`}>
        <h2 id="valor-del-uniforme" className={styles.sectionTitle}>El uniforme vale más que su precio</h2>
        <div className={`${editorial.copy} ${styles.body}`}>
          <p>Durante mucho tiempo, los uniformes han sido tratados como una compra operativa: definir una prenda, solicitar cotizaciones y elegir al proveedor que ofrece el menor precio.</p>
          <p>Pero un uniforme representa mucho más que una partida del presupuesto.</p>
          <p>Es una de las expresiones más visibles y cotidianas de la identidad de una organización. Acompaña a sus colaboradores, proyecta su imagen frente a los clientes y contribuye a construir una experiencia de marca coherente.</p>
          <p>También debe responder a necesidades prácticas: comodidad, funcionalidad, durabilidad, tallas adecuadas y materiales apropiados para cada actividad.</p>
          <p><strong>Un uniforme económico no necesariamente representa una buena compra. Su verdadero valor está en lo que aporta a la empresa y a las personas que lo utilizan.</strong></p>
          <p>Por eso, en Cotton Country entendemos el uniforme como una herramienta de comunicación, identidad y gestión empresarial.</p>
          <p>Nuestro trabajo comienza por comprender qué necesita realmente cada organización, no simplemente por reproducir una prenda a partir de una cotización.</p>
        </div>
      </div>
    </section>
    <section className={`${editorial.section} ${styles.section} ${editorial.ivory}`} aria-labelledby="forma-de-hacer-empresa">
      <div className={`${editorial.container} ${styles.sectionLayout}`}>
        <h2 id="forma-de-hacer-empresa" className={styles.sectionTitle}>Una forma diferente de hacer empresa</h2>
        <div className={`${editorial.copy} ${styles.body}`}>
          <p>Cotton Country es una empresa especializada que combina administración, marketing, ingeniería industrial y conocimiento textil.</p>
          <p>Trabajamos con una estructura ágil y un modelo de producción tercerizada que nos permite integrar capacidades de distintos especialistas y talleres, según las características de cada proyecto.</p>
          <p>Creemos que el valor de una empresa no debe medirse únicamente por el tamaño de sus instalaciones, sino también por su capacidad para comprender problemas, desarrollar soluciones y gestionar adecuadamente los recursos disponibles.</p>
          <p>Esta filosofía nos ha llevado a explorar caminos poco habituales en el sector: comercializar servicios de diseño y fichas técnicas, desarrollar presencia digital mediante posicionamiento orgánico en buscadores e implementar metodologías orientadas a mejorar los procesos de tallaje.</p>
          <p>La tecnología, la información y el conocimiento forman parte de nuestra manera de trabajar.</p>
          <p>No innovamos por seguir una tendencia. <strong>Buscamos soluciones a problemas reales que las empresas enfrentan al gestionar sus uniformes.</strong></p>
        </div>
      </div>
    </section>
    <section className={`${editorial.section} ${styles.section}`} aria-labelledby="hacer-las-cosas-mejor">
      <div className={`${editorial.container} ${styles.sectionLayout}`}>
        <h2 id="hacer-las-cosas-mejor" className={styles.sectionTitle}>Creemos en una industria que puede hacer las cosas mejor</h2>
        <div className={`${editorial.copy} ${styles.body}`}>
          <p>El mercado está cambiando. Las empresas demandan mayor información, transparencia, rapidez, especialización y soluciones adaptadas a sus operaciones.</p>
          <p>Al mismo tiempo, la industria textil peruana continúa enfrentando desafíos que ninguna empresa puede resolver por sí sola.</p>
          <p>En Cotton Country creemos que mejorar el sector requiere cambiar también la forma en que se relacionan quienes compran, desarrollan y producen.</p>
          <p>Cada proyecto es una oportunidad para promover especificaciones más claras, decisiones mejor informadas, procesos más ordenados y una mayor valoración del conocimiento técnico.</p>
          <p>No pretendemos afirmar que hemos resuelto todos los problemas de la industria. Muchos siguen presentes y también forman parte de nuestros desafíos cotidianos.</p>
          <p>Pero estamos convencidos de que las mejoras comienzan cuando dejamos de aceptar que las cosas tienen que hacerse siempre de la misma manera.</p>
          <p><strong>Cuando una empresa elige Cotton Country, no solo está eligiendo uniformes. Está respaldando una manera diferente de entender el negocio: una que valora el conocimiento, la innovación y el trabajo especializado, y que busca contribuir al desarrollo de toda la cadena textil.</strong></p>
          <p>Porque transformar una industria no depende únicamente de grandes inversiones o nuevas tecnologías.</p>
          <p><strong>También comienza con algo más sencillo: hacer mejores preguntas, tomar mejores decisiones y demostrar, proyecto a proyecto, que existe otra manera de hacer las cosas.</strong></p>
        </div>
      </div>
    </section>
  </div>
}
