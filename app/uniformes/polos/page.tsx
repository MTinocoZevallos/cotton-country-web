import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { editorialSerif } from "@/components/home-font"
import { garmentModels } from "@/lib/garment-models"
import { contactHref } from "@/lib/contact-context"
import styles from "@/components/uniforms/uniforms.module.css"

export const metadata: Metadata = {
  title: "Polos corporativos de piqué, interlock y jersey | Cotton Country",
  description: "Cuatro modelos de polos box y T-shirts para dama y caballero. Piqué 30/1, interlock y jersey, con alternativas de acabados y personalización corporativa.",
  alternates: { canonical: "/uniformes/polos" },
  openGraph: {
    title: "Polos corporativos | Cotton Country",
    description: "Polos box y T-shirts para equipos empresariales, con tejidos y acabados según el modelo y el requerimiento de la organización.",
    url: "/uniformes/polos",
    siteName: "Cotton Country",
    locale: "es_PE",
    type: "website",
    images: [{
      url: "/uniformes/polos-2027/01_polo_box_dama.webp",
      width: 1086,
      height: 1448,
      alt: "Polo box blanco para dama con cuello camisero y detalles oscuros en cuello y puños",
    }],
  },
}

const models = garmentModels.polos

export default function PolosPage() {
  return (
    <div className={`${styles.page} ${editorialSerif.variable}`}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <div className={styles.back}>
            <Link href="/uniformes" className={styles.link}>← Volver a uniformes</Link>
          </div>
          <p className={styles.eyebrow}>Uniformes / Polos</p>
          <h1>Polos corporativos</h1>
          <div className={styles.copy}>
            <p>Polos box y T-shirts para equipos comerciales, retail, servicios y atención al cliente. Cuatro modelos para dama y caballero que permiten coordinar el vestuario con la identidad de cada organización.</p>
            <p>Explora sus tejidos, cuellos y mangas como punto de partida para definir el diseño, los acabados y la personalización de tu proyecto.</p>
          </div>
        </header>

        <section aria-label="Modelos de polos corporativos">
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

        <section className={styles.section} aria-labelledby="tejidos-acabados">
          <h2 id="tejidos-acabados">Tejidos, acabados y personalización</h2>
          <div className={styles.copy}>
            <p>Los polos box se presentan en piqué 30/1. El T-shirt de cuello V fotografiado está confeccionado en interlock y también puede desarrollarse en jersey. El modelo de manga larga para caballero utiliza jersey 20/1.</p>
            <p>En los polos box pueden evaluarse cuellos y puños tejidos, colores sólidos y detalles tipping en cuello o puños, según el diseño. En los T-shirts, la definición del escote, la manga y el color parte de las características de cada modelo.</p>
            <p>Los bordados corporativos y las aplicaciones mediante DTF se evalúan según el tejido, el modelo y el diseño de la organización. Definimos la ubicación y los acabados al preparar la propuesta comercial.</p>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="solicitar-propuesta">
          <div>
            <h2 id="solicitar-propuesta">¿Necesitas polos corporativos para tu equipo?</h2>
            <p>Solicita una propuesta según el diseño, tejido, cantidad y uso requerido.</p>
          </div>
          <a href={contactHref({ source_path: "/uniformes/polos" })} className={styles.button}>Solicitar propuesta <ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>
      </div>
    </div>
  )
}
