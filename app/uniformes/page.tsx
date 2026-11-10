import type { Metadata } from "next"
import Link from "next/link"
import { editorialSerif } from "@/components/home-font"
import Catalog from "@/components/uniforms/Catalog"
import { sectors } from "@/lib/uniforms"
import { contactHref } from "@/lib/contact-context"
import styles from "@/components/uniforms/uniforms.module.css"

export const metadata: Metadata = { title: "Uniformes corporativos para empresas | Cotton Country", description: "Desarrolla tu proyecto de uniformes corporativos: requerimientos, criterios por sector y referencias de camisas, blusas, pantalones y polos.", alternates: { canonical: "/uniformes" } }
const requirements = ["Tipo de organización y funciones del personal.", "Prendas requeridas y cantidades por modelo.", "Condiciones de uso, retos y objetivos.", "Materiales y características técnicas.", "Tallas, medidas y necesidades de tallaje.", "Bordados, estampados, aplicaciones y acabados.", "Plazos y condiciones de entrega."]
export default function UniformesPage() {
  return <div className={`${styles.page} ${editorialSerif.variable}`}>
    <div className={styles.container}><section className={styles.intro}>
      <p className={styles.eyebrow}>Uniformes / Cotton Country</p>
      <h1>Uniformes corporativos para cada desafío.</h1>
      <div className={styles.copy}><p>Cada organización tiene necesidades distintas. En Cotton Country desarrollamos proyectos de uniformes corporativos a partir de una comprensión clara de las funciones, objetivos y características de cada empresa.</p><p>Nuestro trabajo comienza con un requerimiento bien definido y continúa con la evaluación de prendas, materiales, especificaciones, acabados y condiciones de producción y entrega.</p></div>
    </section></div>
    <section className={`${styles.section} ${styles.ivory}`} aria-labelledby="requirements-title"><div className={`${styles.container} ${styles.split}`}>
      <div><p className={styles.eyebrow}>El punto de partida</p><h2 id="requirements-title">Un buen uniforme comienza con buena información.</h2><p className={styles.copy}>Definir el contexto y las necesidades del equipo nos permite evaluar las alternativas del proyecto. Estos son los aspectos que conviene preparar antes de conversar.</p></div>
      <ul className={styles.list}>{requirements.map(item => <li key={item}>{item}</li>)}</ul>
    </div></section>
    <section className={styles.section} aria-labelledby="projects-title"><div className={styles.container}>
      <p className={styles.eyebrow}>Una mirada por sector</p><h2 id="projects-title">Proyectos que hablan por sí mismos.</h2>
      <p className={styles.copy}>Las funciones del equipo y su entorno de trabajo orientan cada decisión. Explora los criterios de desarrollo por sector.</p>
      <div className={styles.sectors}>{sectors.filter(item => item.public).map(item => <article className={styles.sector} key={item.id}><h3>{item.name}</h3><p>{item.intro}</p><Link className={styles.link} href={`/uniformes/${item.id}`}>Explorar {item.name.toLowerCase()} →</Link></article>)}</div>
    </div></section>
    <Catalog />
    <div className={styles.ivory}><div className={`${styles.container} ${styles.cta}`}><div><h2>Conversemos sobre tu proyecto.</h2><p>Cuéntanos qué necesita tu organización.</p></div><Link className={styles.button} href={contactHref({ source_path: "/uniformes" })}>Solicitar una propuesta →</Link></div></div>
  </div>
}
