import type { Metadata } from "next"
import { garmentModels } from "@/lib/garment-models"
import Image from "next/image"
import Link from "next/link"
import { editorialSerif } from "@/components/home-font"
import styles from "@/components/uniforms/uniforms.module.css"
import { contactHref } from "@/lib/contact-context"

export const metadata: Metadata = {
  title: "Blusas corporativas | Cotton Country",
  description: "Blusas corporativas con pinzas, cortes princesa e inglés, safari y cuello neru. Alternativas de cuello, manga y acabados para distintos entornos laborales.",
  alternates: { canonical: "/uniformes/blusas" },
}

const models = garmentModels["blusas"]

export default function BlusasPage() {
  return (
    <div className={`${styles.page} ${editorialSerif.variable}`}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <div className={styles.back}>
            <Link href="/uniformes" className={styles.link}>← Volver a uniformes</Link>
          </div>
          <p className={styles.eyebrow}>Uniformes / Blusas</p>
          <h1>Blusas corporativas</h1>
          <div className={styles.copy}>
            <p>Diferentes cortes y acabados para responder a las necesidades de presentación y comodidad de cada equipo.</p>
            <p>Desde siluetas entalladas hasta modelos funcionales, desarrollamos blusas con alternativas de cuello, manga y confección para distintos entornos laborales.</p>
          </div>
        </header>

        <section aria-label="Modelos de blusas corporativas">
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
            <h2 id="solicitar-propuesta">¿Necesitas blusas corporativas para tu equipo?</h2>
            <p>Solicita una propuesta según el diseño, tejido, cantidad y uso requerido.</p>
          </div>
          <a href={contactHref({ source_path: "/uniformes/blusas" })} className={styles.button}>Solicitar propuesta <span aria-hidden="true">↗</span></a>
        </section>
      </div>
    </div>
  )
}
