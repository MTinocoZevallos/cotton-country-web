import { MessagesSquare, ClipboardList, BadgeCheck } from "lucide-react"
import styles from "./home.module.css"

const approach = [
  { icon: MessagesSquare, title: "Asesoría", text: "comprender las necesidades y especificaciones del cliente." },
  { icon: ClipboardList, title: "Método", text: "convertir esos requerimientos en decisiones técnicas y procesos de confección." },
  { icon: BadgeCheck, title: "Cumplimiento", text: "ejecutar y entregar conforme a los compromisos establecidos." },
]

export default function ThreeReasons() {
  return (
    <section id="metodo" className={styles.approach} aria-labelledby="approach-title">
      <div className={styles.approachCopy} data-reveal>
        <h2 id="approach-title" className={styles.statement}>Cada detalle cuenta.</h2>
        <p className={styles.bodyCopy}>
          Cada proyecto empieza por entender lo que tu empresa necesita. A partir
          de ese requerimiento, definimos las especificaciones: tejidos, acabados
          y funcionalidad de cada prenda. La calidad de confección y el cuidado
          en la ejecución orientan el trabajo para cumplir lo acordado.
        </p>
      </div>
      <div className={styles.pillars} role="group" aria-label="El cumplimiento es consecuencia de la asesoría y el método">
        <ol className={styles.pillarList}>
          {approach.map(({ icon: Icon, ...item }) => (
            <li key={item.title} className={styles.pillar} data-reveal>
              <Icon className={styles.pillarIcon} size={36} strokeWidth={1.5} aria-hidden="true" />
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
