import type { Metadata } from "next"
import { garmentModels } from "@/lib/garment-models"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { editorialSerif } from "@/components/home-font"
import { contactHref } from "@/lib/contact-context"
import styles from "@/components/uniforms/uniforms.module.css"

export const metadata: Metadata = {
  title: "Pantalones de caballero corporativos | Cotton Country",
  description: "Pantalones de caballero para uniformes corporativos: drill de corte chino y jean, lanilla de vestir y modelos cargo con alternativas de bolsillos, reflectivos y refuerzos.",
  alternates: { canonical: "/uniformes/pantalones-caballero" },
  openGraph: {
    title: "Pantalones de caballero corporativos | Cotton Country",
    description: "Seis modelos de pantalones para equipos corporativos y operativos, con vistas delantera y posterior y diferentes acabados de confección.",
    url: "/uniformes/pantalones-caballero",
    siteName: "Cotton Country",
    locale: "es_PE",
    type: "website",
    images: [{
      url: "/uniformes/pantalones-caballero-2027/01_pantalon_chino_drill.png",
      width: 1536,
      height: 1024,
      alt: "Pantalón chino de drill para caballero, vistas delantera y posterior",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pantalones de caballero corporativos | Cotton Country",
    description: "Seis modelos de pantalones de drill, lanilla y trabajo para equipos corporativos y operativos.",
    images: ["/uniformes/pantalones-caballero-2027/01_pantalon_chino_drill.png"],
  },
}

const models = garmentModels["pantalones-caballero"]

export default function PantalonesCaballeroPage() {
  return (
    <div className={`${styles.page} ${editorialSerif.variable}`}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <div className={styles.back}>
            <Link href="/uniformes" className={styles.link}>← Volver a uniformes</Link>
          </div>
          <p className={styles.eyebrow}>Uniformes / Pantalones de caballero</p>
          <h1>Pantalones de caballero</h1>
          <div className={styles.copy}>
            <p>Alternativas para acompañar las distintas funciones de tu equipo, desde pantalones de vestir de lanilla hasta modelos de drill y propuestas cargo para actividades operativas.</p>
            <p>Los cortes, bolsillos y acabados permiten elegir una presentación acorde con el entorno laboral y las necesidades de cada puesto.</p>
          </div>
        </header>

        <section aria-label="Modelos de pantalones de caballero">
          {models.map((model) => (
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
              </div>
            </article>
          ))}
        </section>

        <section className={styles.cta} aria-labelledby="solicitar-propuesta">
          <div>
            <h2 id="solicitar-propuesta">¿Necesitas pantalones corporativos para tu equipo?</h2>
            <p>Solicita una propuesta según el tipo de prenda, los acabados, las cantidades y el uso requerido.</p>
          </div>
          <a href={contactHref({ source_path: "/uniformes/pantalones-caballero" })} className={styles.button}>Solicitar propuesta <ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>
      </div>
    </div>
  )
}
