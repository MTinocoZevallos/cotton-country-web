import type { Metadata } from "next"
import { garmentModels } from "@/lib/garment-models"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { editorialSerif } from "@/components/home-font"
import { contactHref } from "@/lib/contact-context"
import styles from "@/components/uniforms/uniforms.module.css"

export const metadata: Metadata = {
  title: "Pantalones de dama corporativos | Cotton Country",
  description: "Pantalones de vestir y de drill para uniformes corporativos. Diferentes cortes, pretinas, bolsillos y acabados para cada entorno laboral.",
  alternates: { canonical: "/uniformes/pantalones-dama" },
  openGraph: {
    title: "Pantalones de dama corporativos | Cotton Country",
    description: "Seis modelos de pantalones de vestir y de drill para equipos corporativos, con vistas delantera y posterior y diferentes acabados de confección.",
    url: "/uniformes/pantalones-dama",
    siteName: "Cotton Country",
    locale: "es_PE",
    type: "website",
    images: [{
      url: "/uniformes/pantalones-dama-2027/01_pantalon_vestir_pretina_elasticada.png",
      width: 1312,
      height: 1199,
      alt: "Pantalón de dama con pretina elasticada, vistas delantera y posterior",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pantalones de dama corporativos | Cotton Country",
    description: "Seis modelos de pantalones de vestir y de drill para uniformes corporativos.",
    images: ["/uniformes/pantalones-dama-2027/01_pantalon_vestir_pretina_elasticada.png"],
  },
}

const models = garmentModels["pantalones-dama"]

export default function PantalonesDamaPage() {
  return (
    <div className={`${styles.page} ${editorialSerif.variable}`}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <div className={styles.back}>
            <Link href="/uniformes" className={styles.link}>← Volver a uniformes</Link>
          </div>
          <p className={styles.eyebrow}>Uniformes / Pantalones de dama</p>
          <h1>Pantalones de dama</h1>
          <div className={styles.copy}>
            <p>Alternativas de confección para distintos entornos laborales, desde pantalones de vestir con acabados estructurados hasta modelos de drill para uso cotidiano.</p>
            <p>Diferentes configuraciones de cintura, bolsillos y bastas permiten seleccionar prendas según las necesidades de cada equipo.</p>
          </div>
        </header>
        <section aria-label="Modelos de pantalones de dama">
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
          <a href={contactHref({ source_path: "/uniformes/pantalones-dama" })} className={styles.button}>Solicitar propuesta <ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>
      </div>
    </div>
  )
}
