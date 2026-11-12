import type { Metadata } from "next"
import { garmentModels } from "@/lib/garment-models"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { editorialSerif } from "@/components/home-font"
import { contactHref } from "@/lib/contact-context"
import styles from "@/components/uniforms/uniforms.module.css"

export const metadata: Metadata = {
  title: "Casacas corporativas | Cotton Country",
  description: "Siete modelos de casacas corporativas: doble desmontable, tipo saco impermeable, impermeable con cintas reflectivas, sport elegante, acolchada, softshell y drill industrial.",
  alternates: { canonical: "/uniformes/casacas" },
  openGraph: {
    title: "Casacas corporativas | Cotton Country",
    description: "Explora siete modelos de casacas fabricadas por Cotton Country, con fotografías y detalles de cada prenda.",
    url: "/uniformes/casacas",
    siteName: "Cotton Country",
    locale: "es_PE",
    type: "website",
    images: [{
      url: "/prendas/casaca-doble-desmontable-zoomlion-2027.webp",
      width: 1145,
      height: 1374,
      alt: "Casaca doble desmontable negra con capucha y cierre frontal cubierto",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casacas corporativas | Cotton Country",
    description: "Siete modelos de casacas con fotografías y detalles de confección visibles en cada prenda.",
    images: ["/prendas/casaca-doble-desmontable-zoomlion-2027.webp"],
  },
}

const models = garmentModels["casacas"]

export default function CasacasPage() {
  return (
    <div className={`${styles.page} ${editorialSerif.variable}`}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <div className={styles.back}>
            <Link href="/uniformes" className={styles.link}>← Volver a uniformes</Link>
          </div>
          <p className={styles.eyebrow}>Uniformes / Casacas</p>
          <h1>Casacas corporativas</h1>
          <div className={styles.copy}>
            <p>Siete modelos de casacas fabricadas por Cotton Country, con distintas siluetas, colores y acabados para la presentación de equipos de trabajo.</p>
            <p>Explora las fotografías y los detalles de cada prenda como referencia para preparar el requerimiento de tu organización.</p>
          </div>
        </header>

        <section aria-label="Modelos de casacas corporativas">
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
                <h3 className={styles.modelLabel}>Características del modelo</h3>
                <ul className={styles.list}>
                  {model.details?.map(detail => <li key={detail}>{detail}</li>)}
                </ul>
                <p className={styles.copy}>{model.description}</p>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.cta} aria-labelledby="solicitar-propuesta">
          <div>
            <h2 id="solicitar-propuesta">¿Necesitas casacas corporativas para tu equipo?</h2>
            <p>Solicita una propuesta según el tipo de prenda, los acabados, las cantidades y el uso requerido.</p>
          </div>
          <a href={contactHref({ source_path: "/uniformes/casacas" })} className={styles.button}>Solicitar propuesta <ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>
      </div>
    </div>
  )
}
