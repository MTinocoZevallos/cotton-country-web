import type { Metadata } from "next"
import { garmentModels } from "@/lib/garment-models"
import Image from "next/image"
import Link from "next/link"
import { editorialSerif } from "@/components/home-font"
import styles from "@/components/uniforms/uniforms.module.css"
import { contactHref } from "@/lib/contact-context"

export const metadata: Metadata = {
  title: "Camisas corporativas | Cotton Country",
  description: "Camisas de vestir, Oxford y funcionales. Desarrollamos cortes, cuellos, pecheras y acabados según las necesidades de cada empresa.",
  alternates: { canonical: "/uniformes/camisas" },
}

const models = garmentModels["camisas"]

export default function CamisasPage() {
  return (
    <div className={`${styles.page} ${editorialSerif.variable}`}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <div className={styles.back}>
            <Link href="/uniformes" className={styles.link}>← Volver a uniformes</Link>
          </div>
          <p className={styles.eyebrow}>Uniformes / Camisas</p>
          <h1>Camisas corporativas</h1>
          <div className={styles.copy}>
            <p>Camisas para empresas que necesitan proyectar orden, profesionalismo y coherencia visual en equipos administrativos, comerciales, operativos e institucionales.</p>
            <p>Los cortes regular y slim fit se definen según el modelo y las especificaciones de cada empresa.</p>
          </div>
        </header>

        <section aria-label="Modelos de camisas corporativas">
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
                <ul className={styles.list}>
                  {model.details?.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.section} aria-labelledby="proyecto">
          <h2 id="proyecto">Camisas para distintas necesidades</h2>
          <div className={styles.copy}>
            <p>Desde camisas de vestir para entornos ejecutivos hasta opciones casuales y funcionales para actividades de campo, desarrollamos prendas que combinan presentación, comodidad y acabados de confección.</p>
            <p>Ofrecemos alternativas de cuello, corte, pechera, bolsillos y tejidos, adaptadas a las necesidades de cada empresa y a las condiciones de uso.</p>
          </div>
        </section>
        <section className={styles.cta} aria-labelledby="solicitar-propuesta">
          <div>
            <h2 id="solicitar-propuesta">¿Necesitas camisas corporativas para tu equipo?</h2>
            <p>Solicita una propuesta según el diseño, tejido, cantidad y uso requerido.</p>
          </div>
          <a href={contactHref({ source_path: "/uniformes/camisas" })} className={styles.button}>Solicitar propuesta <span aria-hidden="true">↗</span></a>
        </section>
      </div>
    </div>
  )
}
