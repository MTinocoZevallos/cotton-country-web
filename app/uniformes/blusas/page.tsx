import type { Metadata } from "next"
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

const models = [
  {
    number: "01",
    title: "Blusa entallada con pinzas",
    image: "01_blusa_pinzas_contraste",
    width: 1199,
    height: 1312,
    alt: "Modelo con blusa clara entallada, pinzas delanteras, cuello y puños oscuros en contraste",
    application: "Entalle y contraste",
    description: "Las pinzas delanteras y posteriores definen la silueta. El contraste de cuello y puños distingue este modelo de manga larga para equipos comerciales y de atención al cliente.",
  },
  {
    number: "02",
    title: "Blusa corte princesa",
    image: "02_blusa_corte_princesa",
    width: 1199,
    height: 1312,
    alt: "Modelo con blusa gris de manga larga y costuras curvas de corte princesa desde la sisa hasta el ruedo",
    application: "Silueta de líneas curvas",
    description: "Las costuras curvas desde la sisa dan forma al delantero y permiten adaptar el entalle a diferentes siluetas. Una alternativa en gris y manga larga para equipos administrativos y de servicio.",
  },
  {
    number: "03",
    title: "Blusa corte inglés",
    image: "03_blusa_corte_ingles",
    width: 1199,
    height: 1312,
    alt: "Modelo con blusa blanca de manga larga y costuras longitudinales de corte inglés desde el hombro hasta el ruedo",
    application: "Líneas verticales",
    description: "Las costuras longitudinales que parten del hombro estructuran una silueta de líneas verticales. El blanco y la manga larga ofrecen una presentación formal para oficinas y entornos institucionales.",
  },
  {
    number: "04",
    title: "Blusa safari",
    image: "04_blusa_safari",
    width: 1199,
    height: 1312,
    alt: "Modelo con blusa safari oscura de manga larga, bolsillos de pecho con tapas y detalles de mangas y canesú posterior",
    application: "Confección funcional",
    description: "Los bolsillos de pecho con tapas y detalles de cinta acompañan una construcción funcional de manga larga. El canesú ventilado con malla interior aporta ventilación para las actividades de campo.",
  },
  {
    number: "05",
    title: "Blusa con pinzas y escote en V",
    image: "05_blusa_pinzas_escote_v",
    width: 1199,
    height: 1312,
    alt: "Modelo con blusa blanca de manga larga, escote en V, botonadura frontal y pinzas verticales en el delantero",
    application: "Entalle con escote abierto",
    description: "El escote en V y las pinzas verticales definen un modelo blanco de manga larga. Una opción entallada para oficinas y atención al público que combina un cuello abierto con botonadura frontal.",
  },
  {
    number: "06",
    title: "Blusa de vestir manga corta",
    image: "06_blusa_vestir_manga_corta",
    width: 1024,
    height: 1536,
    alt: "Modelo con blusa blanca de vestir, manga corta con detalle en V y botón decorativo, y pinzas laterales en el busto",
    application: "Acabados de vestir",
    description: "Confeccionada en seda francesa sintética, con pinzas laterales en el busto. La manga corta de borde recto incorpora un detalle en V y un botón decorativo como acabado distintivo.",
  },
  {
    number: "07",
    title: "Blusa cuello neru y escote en V",
    image: "07_blusa_cuello_neru",
    width: 1024,
    height: 1536,
    alt: "Modelo con blusa blanca de cuello neru y abertura en V, delantero liso y mangas largas con puños estrechos",
    application: "Delantero de líneas limpias",
    description: "El cuello neru con abertura en V se combina con un delantero liso y pinzas laterales en el busto. Las mangas largas con puños estrechos completan una alternativa sobria para equipos de servicio y oficinas.",
  },
]

export default function BlusasPage() {
  return (
    <main className={`${styles.page} ${editorialSerif.variable}`}>
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
                  src={`/uniformes/blusas-2027/${model.image}.png`}
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
    </main>
  )
}
