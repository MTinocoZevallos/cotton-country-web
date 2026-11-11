import type { Metadata } from "next"
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

const models = [
  {
    number: "01",
    title: "Pantalón de vestir con pretina elasticada",
    image: "01_pantalon_vestir_pretina_elasticada",
    alt: "Vistas delantera y posterior de pantalón de vestir gris con pretina elasticada en la espalda y bolsillos laterales",
    application: "Comodidad y presentación",
    description: "Combina un delantero de vestir con una pretina elasticada en la espalda, que facilita el ajuste de cintura. Su corte recto y los bolsillos laterales lo hacen apropiado para jornadas de oficina y atención al público.",
  },
  {
    number: "02",
    title: "Pantalón de tiro alto con pinzas",
    image: "02_pantalon_tiro_alto_sin_pretina",
    alt: "Vistas de pantalón azul marino de tiro alto, con pinzas delanteras y cintura sin pretina independiente",
    application: "Cintura de líneas limpias",
    description: "La cintura alta, terminada sin pretina independiente, y las pinzas delanteras aportan una silueta estructurada y elegante. Una alternativa de vestir para equipos administrativos y comerciales.",
  },
  {
    number: "03",
    title: "Pantalón de vestir con pretina ancha",
    image: "03_pantalon_vestir_pretina_ancha",
    alt: "Vistas de pantalón azul marino con pretina ancha de dos botones y bolsillos laterales",
    application: "Corte clásico",
    description: "La pretina ancha con cierre de dos botones aporta definición a la cintura. Los bolsillos laterales complementan un pantalón de vestir versátil para distintas funciones corporativas.",
  },
  {
    number: "04",
    title: "Pantalón de vestir con vena central",
    image: "04_pantalon_vestir_vena_central",
    alt: "Vistas de pantalón azul medio con pretina ancha de dos botones y vena marcada en el centro delantero de las piernas",
    application: "Detalle de confección",
    description: "Incorpora una vena longitudinal en el delantero que acentúa la línea de las piernas. La pretina ancha de dos botones completa una presentación formal con un acabado distintivo.",
  },
  {
    number: "05",
    title: "Pantalón de vestir con basta doblada",
    image: "05_pantalon_vestir_basta_doblada",
    alt: "Vistas de pantalón de vestir con pretina media, un botón y basta doblada alta; espalda con cuatro pinzas",
    application: "Acabado de basta",
    description: "La basta doblada de mayor altura aporta un detalle visible al acabado del pantalón. Su pretina media y las pinzas posteriores permiten una silueta de vestir bien definida.",
  },
  {
    number: "06",
    title: "Pantalón de drill para dama",
    image: "06_pantalon_drill_dama",
    alt: "Vistas delantera y posterior de pantalón de drill beige, con bolsillos laterales, bolsillos posteriores tipo ojal y zapatos bajos",
    application: "Uso cotidiano",
    description: "Confección en drill de corte recto, con bolsillos laterales y posteriores tipo ojal. Una alternativa funcional para equipos que necesitan movilidad y una presentación ordenada durante la jornada.",
  },
] as const

export default function PantalonesDamaPage() {
  return (
    <main className={`${styles.page} ${editorialSerif.variable}`}>
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
                  src={`/uniformes/pantalones-dama-2027/${model.image}.png`}
                  alt={model.alt}
                  width={1312}
                  height={1199}
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
    </main>
  )
}
