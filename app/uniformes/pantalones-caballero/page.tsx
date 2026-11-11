import type { Metadata } from "next"
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

const models = [
  {
    number: "01",
    title: "Pantalón chino de drill",
    image: "01_pantalon_chino_drill.png",
    alt: "Vistas delantera y posterior de pantalón chino de drill para caballero, con bolsillos laterales, bolsillos posteriores tipo ojal y pretina con pasadores",
    application: "Presentación cotidiana",
    description: "El corte chino combina bolsillos delanteros laterales y posteriores tipo ojal en una prenda de drill de líneas sobrias. La pretina con pasadores y la basta con pespunte completan una alternativa para uniformes corporativos de uso diario.",
  },
  {
    number: "02",
    title: "Pantalón de drill corte jean",
    image: "02_pantalon_drill_jean_cut.png",
    alt: "Vistas delantera y posterior de pantalón de drill corte jean, con bolsillos delanteros curvos, bolsillos posteriores de parche y basta con pespunte",
    application: "Estilo casual",
    description: "Confeccionado en drill, incorpora bolsillos delanteros curvos de corte jean y bolsillos posteriores de parche. La basta con pespunte acompaña una presentación casual para equipos comerciales y operativos.",
  },
  {
    number: "03",
    title: "Pantalón de vestir de lanilla",
    image: "03_pantalon_vestir_lanilla.png",
    alt: "Vistas delantera y posterior de pantalón negro de vestir de lanilla, con línea de planchado central en ambas piernas y basta invisible",
    application: "Presentación formal",
    description: "La lanilla negra y la línea de planchado central en ambas piernas definen una silueta de vestir. La basta invisible aporta un acabado discreto para equipos administrativos y funciones que requieren una presentación formal.",
  },
  {
    number: "04",
    title: "Pantalón cargo de drill",
    image: "04_pantalon_cargo_drill.png",
    alt: "Vistas delantera y posterior de pantalón cargo de drill plomo, con bolsillos cargo laterales con tapa",
    application: "Funciones operativas",
    description: "El drill plomo y los bolsillos cargo laterales con tapa conforman una propuesta funcional para actividades operativas. Su distribución de bolsillos permite mantener a mano los objetos necesarios durante la jornada.",
  },
  {
    number: "05",
    title: "Pantalón cargo con cintas reflectivas",
    image: "05_pantalon_cargo_reflectivo.png",
    alt: "Vistas delantera y posterior de pantalón cargo azul marino, con bolsillos laterales y cintas reflectivas alrededor de ambas piernas",
    application: "Detalle reflectivo",
    description: "Combina una base azul marino con bolsillos laterales de diseño cargo. Las cintas reflectivas rodean ambas piernas y aportan un detalle distintivo a esta alternativa de vestuario operativo.",
  },
  {
    number: "06",
    title: "Pantalón cargo con refuerzos de rodilla",
    image: "06_pantalon_cargo_reforzado.png",
    alt: "Vistas delantera y posterior de pantalón de trabajo azul marino y gris, con refuerzos de rodilla, vivos reflectivos, pretina elasticada y bolsillos posteriores de parche con tapa",
    application: "Confección para el trabajo",
    description: "El diseño bicolor azul marino y gris incorpora refuerzos en las rodillas y vivos reflectivos. La pretina elasticada favorece el ajuste, mientras los bolsillos posteriores de parche con tapa complementan una prenda orientada al trabajo operativo.",
  },
] as const

export default function PantalonesCaballeroPage() {
  return (
    <main className={`${styles.page} ${editorialSerif.variable}`}>
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
                  src={`/uniformes/pantalones-caballero-2027/${model.image}`}
                  alt={model.alt}
                  width={1536}
                  height={1024}
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
    </main>
  )
}
