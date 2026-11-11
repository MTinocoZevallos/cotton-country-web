import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { editorialSerif } from "@/components/home-font"
import { contactHref } from "@/lib/contact-context"
import styles from "@/components/uniforms/uniforms.module.css"

export const metadata: Metadata = {
  title: "Casacas corporativas | Cotton Country",
  description: "Seis modelos de casacas corporativas: doble desmontable, saco impermeable, impermeable Rija, sport elegante, acolchada y softshell.",
  alternates: { canonical: "/uniformes/casacas" },
  openGraph: {
    title: "Casacas corporativas | Cotton Country",
    description: "Explora seis modelos de casacas fabricadas por Cotton Country, con fotografías y detalles de cada prenda.",
    url: "/uniformes/casacas",
    siteName: "Cotton Country",
    locale: "es_PE",
    type: "website",
    images: [{
      url: "/prendas/casaca-doble-desmontable-zoomlion.webp",
      width: 1024,
      height: 1536,
      alt: "Casaca doble desmontable negra con capucha y logotipo Zoomlion",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casacas corporativas | Cotton Country",
    description: "Seis modelos de casacas con fotografías y detalles de confección visibles en cada prenda.",
    images: ["/prendas/casaca-doble-desmontable-zoomlion.webp"],
  },
}

const models = [
  {
    number: "01",
    title: "Casaca doble desmontable — Zoomlion",
    image: "casaca-doble-desmontable-zoomlion.webp",
    width: 1024,
    height: 1536,
    alt: "Modelo con casaca negra de capucha, cierre frontal y logotipo Zoomlion",
    application: "Capucha y cierre frontal",
    description: "Casaca negra con capucha y cierre frontal cubierto. Los bolsillos laterales y el logotipo Zoomlion en el pecho acompañan una presentación de líneas sobrias.",
  },
  {
    number: "02",
    title: "Casaca saco impermeable — CIP",
    image: "casaca-saco-impermeable-cip.webp",
    width: 1199,
    height: 1312,
    alt: "Modelo con casaca larga verde de capucha, dos franjas claras en el torso y emblema del Colegio de Ingenieros del Perú",
    application: "Largo tipo saco",
    description: "Diseño verde de largo tipo saco, con capucha, cierre frontal y bolsillos delanteros. Dos franjas claras recorren el torso, mientras el emblema del Colegio de Ingenieros del Perú identifica la prenda en el pecho.",
  },
  {
    number: "03",
    title: "Casaca impermeable Rija — Ineco",
    image: "casaca-impermeable-rija-ineco.webp",
    width: 1199,
    height: 1312,
    alt: "Modelo con casaca roja Ineco, cierre frontal cubierto y franjas claras en el torso y las mangas",
    application: "Franjas en contraste",
    description: "El rojo y las franjas claras del torso y las mangas definen la presentación de este modelo. El cuello alto, el cierre frontal cubierto y el logotipo Ineco completan sus detalles visibles.",
  },
  {
    number: "04",
    title: "Casaca sport elegante — Glencore",
    image: "casaca-sport-elegante-glencore.webp",
    width: 1536,
    height: 1024,
    alt: "Casaca negra Glencore en vistas delantera y posterior, con detalles del cuello y del puño",
    application: "Vistas y detalles",
    description: "Casaca negra con cuello alto, cierre frontal y bolsillos con cierre. La fotografía muestra el delantero, la espalda y acercamientos del cuello y del puño, junto al logotipo Glencore en el pecho.",
  },
  {
    number: "05",
    title: "Casaca acolchada — ElectroDunas",
    image: "casaca-acolchada-electrodunas.webp",
    width: 1199,
    height: 1312,
    alt: "Modelo con casaca negra de acolchado horizontal, cierre frontal y logotipo ElectroDunas",
    application: "Acolchado horizontal",
    description: "El acolchado de líneas horizontales da textura a esta casaca negra. Incorpora cuello alto, cierre frontal y bolsillos laterales, con el logotipo ElectroDunas en el pecho.",
  },
  {
    number: "06",
    title: "Casaca softshell — Minera Bateas",
    image: "casaca-softshell-minera-bateas.webp",
    width: 1199,
    height: 1312,
    alt: "Modelo con casaca azul marino, cuello alto, cierre frontal y logotipo Minera Bateas",
    application: "Líneas sobrias",
    description: "Modelo azul marino con cuello alto, cierre frontal y bolsillos laterales. La superficie lisa y el logotipo Minera Bateas en el pecho definen una presentación de líneas sencillas.",
  },
] as const

export default function CasacasPage() {
  return (
    <main className={`${styles.page} ${editorialSerif.variable}`}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <div className={styles.back}>
            <Link href="/uniformes" className={styles.link}>← Volver a uniformes</Link>
          </div>
          <p className={styles.eyebrow}>Uniformes / Casacas</p>
          <h1>Casacas corporativas</h1>
          <div className={styles.copy}>
            <p>Seis modelos de casacas fabricadas por Cotton Country, con distintas siluetas, colores y acabados para la presentación de equipos de trabajo.</p>
            <p>Explora las fotografías y los detalles de cada prenda como referencia para preparar el requerimiento de tu organización.</p>
          </div>
        </header>

        <section aria-label="Modelos de casacas corporativas">
          {models.map((model) => (
            <article key={model.number} className={styles.roleRow} aria-labelledby={`modelo-${model.number}`}>
              <figure className={styles.editorialPhoto}>
                <Image
                  src={`/prendas/${model.image}`}
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
            <h2 id="solicitar-propuesta">¿Necesitas casacas corporativas para tu equipo?</h2>
            <p>Solicita una propuesta según el tipo de prenda, los acabados, las cantidades y el uso requerido.</p>
          </div>
          <a href={contactHref({ source_path: "/uniformes/casacas" })} className={styles.button}>Solicitar propuesta <ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>
      </div>
    </main>
  )
}
