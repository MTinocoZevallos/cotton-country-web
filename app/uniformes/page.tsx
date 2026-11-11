import type { Metadata } from "next"
import Link from "next/link"
import { editorialSerif } from "@/components/home-font"
import Catalog from "@/components/uniforms/Catalog"
import { sectors } from "@/lib/uniforms"
import { contactHref } from "@/lib/contact-context"
import styles from "@/components/uniforms/uniforms.module.css"

export const metadata: Metadata = {
  title: "Uniformes corporativos para empresas | Cotton Country",
  description: "Explora 30 modelos de camisas, blusas, pantalones y casacas. Define el requerimiento de tu empresa y conoce nuestros proyectos por sector.",
  alternates: { canonical: "/uniformes" },
  openGraph: {
    title: "Uniformes corporativos para empresas | Cotton Country",
    description: "Modelos de prendas, criterios para preparar tu requerimiento y proyectos de uniformes por sector empresarial.",
    url: "/uniformes",
    siteName: "Cotton Country",
    locale: "es_PE",
    type: "website",
  },
}
const requirements = ["Tipo de organización y funciones del personal.", "Prendas requeridas y cantidades por modelo.", "Condiciones de uso, retos y objetivos.", "Materiales y características técnicas.", "Tallas, medidas y necesidades de tallaje.", "Bordados, estampados, aplicaciones y acabados.", "Plazos y condiciones de entrega."]
export default function UniformesPage() {
  return <div className={`${styles.page} ${editorialSerif.variable}`}>
    <div className={styles.container}><section className={styles.intro}>
      <p className={styles.eyebrow}>Uniformes / Cotton Country</p>
      <h1>Uniformes corporativos para cada desafío.</h1>
      <div className={styles.copy}><p>El uniforme debe responder a las funciones del equipo, las condiciones de trabajo y la identidad de la organización.</p><p>Explora nuestros modelos de prendas, prepara los criterios de tu requerimiento y conoce proyectos desarrollados para distintos sectores empresariales.</p></div>
    </section></div>
    <Catalog />
    <section className={`${styles.section} ${styles.ivory}`} aria-labelledby="requirements-title"><div className={`${styles.container} ${styles.split}`}>
      <div><p className={styles.eyebrow}>El punto de partida</p><h2 id="requirements-title">Un buen uniforme comienza con buena información.</h2><p className={styles.copy}>Definir el contexto y las necesidades del equipo nos permite evaluar las alternativas del proyecto. Estos son los aspectos que conviene preparar antes de conversar.</p></div>
      <ul className={styles.list}>{requirements.map(item => <li key={item}>{item}</li>)}</ul>
    </div></section>
    <section className={styles.section} id="sectores" aria-labelledby="projects-title"><div className={styles.container}>
      <p className={styles.eyebrow}>Sectores empresariales</p><h2 id="projects-title">Cada sector plantea necesidades distintas.</h2>
      <p className={styles.copy}>Conoce los criterios de cada sector y descubre sus casos de éxito. Cada proyecto muestra cómo las prendas forman parte de una solución para el equipo.</p>
      <div className={styles.sectors}>{sectors.filter(item => item.public).map(item => <article className={styles.sector} key={item.id}><h3>{item.name}</h3><p>{item.intro}</p><Link className={styles.link} href={`/uniformes/${item.id}`}>Explorar {item.name.toLowerCase()} →</Link></article>)}</div>
    </div></section>
    <div className={styles.ivory}><div className={`${styles.container} ${styles.cta}`}><div><h2>Conversemos sobre tu proyecto.</h2><p>Cuéntanos qué necesita tu organización.</p></div><Link className={styles.button} href={contactHref({ source_path: "/uniformes" })}>Solicitar una propuesta →</Link></div></div>
  </div>
}
