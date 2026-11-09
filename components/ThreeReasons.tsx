import styles from "./home.module.css"

const approach = [
  { title: "Asesoría", text: "comprender las necesidades y especificaciones del cliente." },
  { title: "Método", text: "convertir esos requerimientos en decisiones técnicas y procesos de confección." },
  { title: "Cumplimiento", text: "ejecutar y entregar conforme a los compromisos establecidos." },
]

export default function ThreeReasons() {
  return (
    <section id="metodo" className={styles.approach} aria-labelledby="approach-title">
      <div className={styles.approachCopy} data-reveal>
        <h2 id="approach-title" className={styles.statement}>Los detalles <span>NO</span> son un detalle en la confección.</h2>
        <p className={styles.bodyCopy}>
          Cada proyecto empieza por entender lo que tu empresa necesita. A partir
          de ese requerimiento, definimos las especificaciones: tejidos, acabados
          y funcionalidad de cada prenda. La calidad de confección y el cuidado
          en la ejecución orientan el trabajo para cumplir lo acordado.
        </p>
      </div>
      <div className={styles.pillars} role="group" aria-label="El cumplimiento es consecuencia de la asesoría y el método" data-reveal>
        <ol className={styles.pillarList}>
          {approach.map(item => (
            <li key={item.title} className={styles.pillar}>
              <svg className={styles.pillarShape} viewBox="1850 0 630 594" aria-hidden="true" focusable="false">
                {/* Original four-piece isotype, isolated without redrawing its geometry. */}
                <image href="/logo-cotton-country.png" width="3004" height="1268" />
              </svg>
              <div className={styles.pillarText}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
