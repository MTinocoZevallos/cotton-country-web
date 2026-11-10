import type { Metadata } from "next"
import ContactForm from "@/components/ContactForm"
import { editorialSerif } from "@/components/home-font"
import styles from "@/components/uniforms/uniforms.module.css"
export const metadata: Metadata = { title: "Contacto para proyectos de uniformes | Cotton Country", description: "Cuéntanos el requerimiento de uniformes de tu organización.", alternates: { canonical: "/contacto" } }
export default function ContactoPage() {
  return <div className={`${styles.page} ${editorialSerif.variable}`}><div className={styles.container}><section className={styles.intro}><p className={styles.eyebrow}>Contacto</p><h1>Hablemos de los uniformes de tu equipo.</h1><p className={styles.copy}>Comparte el requerimiento de tu organización para evaluar el proyecto.</p></section></div><ContactForm /></div>
}
