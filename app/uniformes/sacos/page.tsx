import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { editorialSerif } from "@/components/home-font"
import { garmentModels } from "@/lib/garment-models"
import { contactHref } from "@/lib/contact-context"
import styles from "@/components/uniforms/uniforms.module.css"

export const metadata: Metadata = {
  title: "Sacos corporativos para dama y caballero | Cotton Country",
  description: "Tres modelos de sacos: corte princesa azul, corto gris de dama y slim fit de caballero. Alternativas para la presentación corporativa y formal de tu equipo.",
  alternates: { canonical: "/uniformes/sacos" },
  openGraph: {
    title: "Sacos corporativos para dama y caballero | Cotton Country",
    description: "Explora tres modelos de sacos para dama y caballero, con fotografías y características de cada prenda.",
    url: "/uniformes/sacos",
    siteName: "Cotton Country",
    locale: "es_PE",
    type: "website",
    images: [{
      url: "/uniformes/sacos-2027/01_saco_princesa_azul_columbia.webp",
      width: 1086,
      height: 1448,
      alt: "Saco femenino azul de corte princesa, con solapas y dos botones",
    }],
  },
}

const models = garmentModels.sacos

export default function SacosPage() {
  return (
    <div className={`${styles.page} ${editorialSerif.variable}`}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <div className={styles.back}>
            <Link href="/uniformes" className={styles.link}>← Volver a uniformes</Link>
          </div>
          <p className={styles.eyebrow}>Uniformes / Sacos</p>
          <h1>Sacos corporativos</h1>
          <div className={styles.copy}>
            <p>Tres modelos para dama y caballero, con distintos cortes, largos y cierres para la presentación de equipos corporativos.</p>
            <p>Explora las fotografías y las características de cada modelo como referencia para preparar el requerimiento de tu organización.</p>
          </div>
        </header>

        <section aria-label="Modelos de sacos corporativos">
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
            <h2 id="solicitar-propuesta">¿Necesitas sacos corporativos para tu equipo?</h2>
            <p>Solicita una propuesta según el modelo, las cantidades y las funciones del personal.</p>
          </div>
          <a href={contactHref({ source_path: "/uniformes/sacos" })} className={styles.button}>Solicitar propuesta <ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>
      </div>
    </div>
  )
}
