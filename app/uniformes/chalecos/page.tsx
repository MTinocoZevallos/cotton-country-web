import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { editorialSerif } from "@/components/home-font"
import { garmentModels } from "@/lib/garment-models"
import { contactHref } from "@/lib/contact-context"
import styles from "@/components/uniforms/uniforms.module.css"

export const metadata: Metadata = {
  title: "Chalecos corporativos y operativos | Cotton Country",
  description: "Siete modelos de chalecos: acolchados, de paño, reflectivo básico, impermeable y multibolsillos. Alternativas para equipos corporativos, técnicos y operativos.",
  alternates: { canonical: "/uniformes/chalecos" },
  openGraph: {
    title: "Chalecos corporativos y operativos | Cotton Country",
    description: "Explora siete modelos de chalecos y sus características para preparar el requerimiento de tu organización.",
    url: "/uniformes/chalecos",
    siteName: "Cotton Country",
    locale: "es_PE",
    type: "website",
    images: [{
      url: "/uniformes/chalecos-2027/01_chaleco_acolchado_caballero.webp",
      width: 1086,
      height: 1448,
      alt: "Chaleco acolchado negro para caballero, con cuello alto y cierre frontal",
    }],
  },
}

const models = garmentModels.chalecos

export default function ChalecosPage() {
  return (
    <div className={`${styles.page} ${editorialSerif.variable}`}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <div className={styles.back}>
            <Link href="/uniformes" className={styles.link}>← Volver a uniformes</Link>
          </div>
          <p className={styles.eyebrow}>Uniformes / Chalecos</p>
          <h1>Chalecos corporativos y operativos</h1>
          <div className={styles.copy}>
            <p>Siete modelos para la presentación corporativa y el trabajo operativo: chalecos acolchados, de paño, reflectivos, impermeables y multibolsillos.</p>
            <p>Explora sus características como referencia para definir las prendas de tu equipo según sus funciones y el requerimiento de la organización.</p>
          </div>
        </header>

        <section aria-label="Modelos de chalecos corporativos y operativos">
          {models.map(model => (
            <article key={model.number} className={styles.roleRow} aria-labelledby={`modelo-${model.number}`}>
              <figure className={styles.editorialPhoto}>
                <Image
                  src={model.image}
                  alt={model.alt}
                  width={model.width}
                  height={model.height}
                  sizes="(max-width: 575px) calc(100vw - 40px), (max-width: 900px) calc((100vw - 88px) / 2), 520px"
                />
              </figure>
              <div>
                <p className={styles.eyebrow}>Modelo {model.number} · {model.application}</p>
                <h2 id={`modelo-${model.number}`}>{model.title}</h2>
                <p className={styles.copy}>{model.description}</p>
                <ul className={styles.list}>
                  {model.details?.map(detail => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.cta} aria-labelledby="solicitar-propuesta">
          <div>
            <h2 id="solicitar-propuesta">¿Necesitas chalecos para tu equipo?</h2>
            <p>Solicita una propuesta según el modelo, las cantidades y las funciones del personal.</p>
          </div>
          <a href={contactHref({ source_path: "/uniformes/chalecos" })} className={styles.button}>Solicitar propuesta <ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>
      </div>
    </div>
  )
}
