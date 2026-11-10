import type { Metadata } from "next"
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

const models = [
  {
    number: "01",
    title: "Camisa de vestir, cuello italiano",
    image: "01_camisa_vestir_italiano",
    width: 1199,
    height: 1312,
    alt: "Modelo con camisa gris muy claro, cuello italiano y corbata, pechera doblada y sin bolsillo",
    application: "Presentación formal",
    description: "Una propuesta para oficinas, hotelería, gastronomía y atención al público que requieren una imagen formal y elegante.",
    details: ["Color gris muy claro.", "Cuello italiano estructurado para corbata.", "Pechera doblada, sin bolsillo y puño diamante."],
  },
  {
    number: "02",
    title: "Camisa Oxford blanca, pechera doblada",
    image: "02_camisa_oxford_blanca",
    width: 1199,
    height: 1312,
    alt: "Modelo con camisa Oxford blanca de corte regular, cuello americano con botones y pechera doblada",
    application: "Imagen corporativa",
    description: "Una camisa de estilo casual para equipos comerciales y administrativos que buscan una presentación profesional y comodidad durante la jornada.",
    details: ["Tejido Oxford 100 % algodón, color blanco.", "Cuello americano con botones y corte regular.", "Pechera doblada."],
  },
  {
    number: "03",
    title: "Camisa Oxford azul, pechera pespuntada",
    image: "03_camisa_oxford_azul",
    width: 1199,
    height: 1312,
    alt: "Modelo con camisa Oxford azul, cuello americano con botones, bolsillo en el pecho y pechera pespuntada de pieza adicional",
    application: "Identidad de equipo",
    description: "Una propuesta para equipos comerciales, oficinas y atención al cliente, con detalles de confección que acompañan la identidad de la empresa.",
    details: ["Color azul y cuello americano con botones.", "Pechera pespuntada de pieza adicional.", "Bolsillo en el pecho."],
  },
  {
    number: "04",
    title: "Camisa tipo Columbia",
    image: "04_camisa_tipo_columbia",
    width: 1312,
    height: 1199,
    alt: "Modelo con camisa funcional beige de manga larga y dos bolsillos delanteros con tapa",
    application: "Uso funcional",
    description: "Diseño funcional para operaciones de campo y equipos que necesitan una presentación profesional en sus actividades diarias.",
    details: ["Color beige y manga larga.", "Dos bolsillos delanteros con tapa."],
  },
  {
    number: "05",
    title: "Camisa Safari blanca",
    image: "05_camisa_safari_blanca",
    width: 1312,
    height: 1199,
    alt: "Modelo con camisa Safari blanca, bolsillos con pliegues y tapas, canesú ventilado con malla y manga con sistema roll-up",
    application: "Confección funcional",
    description: "Camisa para el trabajo de campo, con canesú ventilado y mangas ajustables mediante sistema roll-up.",
    details: ["Color blanco, con detalles y cintas al tono.", "Bolsillos delanteros con pliegues y tapas.", "Canesú posterior ventilado con malla interior.", "Manga larga con sistema roll-up."],
  },
]

export default function CamisasPage() {
  return (
    <main className={`${styles.page} ${editorialSerif.variable}`}>
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
                  src={`/uniformes/camisas-2027/${model.image}.webp`}
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
                  {model.details.map((detail) => <li key={detail}>{detail}</li>)}
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
    </main>
  )
}
