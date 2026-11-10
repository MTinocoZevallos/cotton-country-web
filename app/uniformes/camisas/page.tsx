import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { editorialSerif } from "@/components/home-font"
import styles from "@/components/uniforms/uniforms.module.css"
import { contactHref } from "@/lib/contact-context"

export const metadata: Metadata = {
  title: "Camisas corporativas | Cotton Country",
  description: "Camisas de vestir, Oxford y funcionales. Desarrollamos cortes, cuellos, pecheras y acabados según las especificaciones de cada proyecto corporativo.",
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
    title: "Camisa Oxford azul, pechera con pespuntes",
    image: "03_camisa_oxford_azul",
    width: 1199,
    height: 1312,
    alt: "Modelo con camisa Oxford azul, cuello americano con botones, bolsillo en el pecho y pechera de pieza adicional con pespuntes",
    application: "Identidad de equipo",
    description: "Una propuesta para equipos comerciales, oficinas y atención al cliente, con detalles de confección que acompañan la identidad de la empresa.",
    details: ["Color azul y cuello americano con botones.", "Pechera de pieza adicional con pespuntes visibles.", "Bolsillo en el pecho."],
  },
  {
    number: "04",
    title: "Camisa tipo Columbia",
    image: "04_camisa_tipo_columbia",
    width: 1312,
    height: 1199,
    alt: "Modelo con camisa funcional beige de manga larga y dos bolsillos delanteros con tapa, sin cintas reflectivas",
    application: "Uso funcional",
    description: "Diseño funcional para operaciones de campo y equipos que necesitan una presentación profesional en sus actividades diarias.",
    details: ["Color beige y manga larga.", "Dos bolsillos delanteros con tapa.", "Sin cintas reflectivas."],
  },
  {
    number: "05",
    title: "Camisa Safari blanca",
    image: "05_camisa_safari_blanca",
    width: 1312,
    height: 1199,
    alt: "Modelo con camisa Safari blanca y detalles originales de bolsillos con pliegues y tapas, canesú posterior con malla y manga recogida",
    application: "Confección funcional",
    description: "Una propuesta de manga larga con sistema de recogido y detalles funcionales para el trabajo de campo.",
    details: ["Color blanco, con detalles y cintas al tono.", "Bolsillos delanteros con pliegues y tapas.", "Canesú posterior aéreo con malla interior.", "Manga larga con sistema de recogido."],
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
            <p>Desarrollamos diferentes opciones de corte, cuello, pechera, bolsillos y acabados para aplicaciones formales, corporativas y funcionales. Los cortes regular y slim fit se definen según las especificaciones de cada proyecto; no todos los modelos fotografiados se ofrecen en ambos cortes.</p>
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
          <h2 id="proyecto">Una camisa para cada proyecto</h2>
          <div className={styles.copy}>
            <p>La elección del cuello y los acabados permite definir una presentación formal o una imagen más casual. Las opciones de cuello neru ofrecen una imagen diferenciada, moderna y sobria para atención al cliente, hotelería, restaurantes y eventos corporativos.</p>
            <p>Definimos la propuesta de acuerdo con la identidad visual de tu empresa y el uso previsto, sin limitar el desarrollo a los modelos fotografiados.</p>
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
