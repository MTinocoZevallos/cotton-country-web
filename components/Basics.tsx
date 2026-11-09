import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import styles from "./home.module.css"

const families = [
  { name: "Camisas", href: "/uniformes/camisas", image: "/uniformes/camisa-cuello-italiano.png", alt: "Camisa blanca de manga larga en un entorno corporativo", detail: "La presencia está en los detalles." },
  { name: "Blusas", href: "/uniformes/blusas", image: "/uniformes/blusa-corte-pinzas.png", alt: "Blusa de manga larga en un entorno profesional", detail: "Una expresión de tu identidad." },
  { name: "Polos", href: "/uniformes/polos", image: "/uniformes/polo-box-caballero.png", alt: "Polo de cuello y manga corta en un entorno de atención al público", detail: "Tu marca, en movimiento." },
  { name: "Pantalones", href: "/uniformes/pantalones", image: "/uniformes/pantalon-corte-chino-caballero.png", alt: "Pantalón azul de corte chino con camisa corporativa", detail: "Cada pieza cuenta." },
]

export default function Basics() {
  return (
    <section className={styles.products} aria-labelledby="products-title">
      <div className={styles.productsInner}>
        <div className={styles.sectionHeading} data-reveal>
          <p className={styles.eyebrow}>Nuestros uniformes</p>
          <h2 id="products-title">Prendas <span>destacadas</span></h2>
        </div>
        <div className={styles.productGrid}>
          {families.map(family => (
            <Link key={family.name} href={family.href} className={styles.product} data-reveal>
              <div className={styles.productVisual}>
                <Image src={family.image} alt={family.alt} fill sizes="(max-width: 575px) 100vw, (max-width: 1023px) 50vw, 25vw" className={styles.productImage} />
              </div>
              <div className={styles.productTitle}>
                <h3>{family.name}</h3>
              </div>
              <p className={styles.productDetail}>{family.detail}</p>
              <span className={styles.productLink}>Ver {family.name.toLowerCase()} <ArrowUpRight aria-hidden="true" size={16} /></span>
            </Link>
          ))}
        </div>
        <div className={styles.productsClosing} data-reveal>
          <p>Esto es solo una muestra. Hay mucho más por descubrir.</p>
          <Link href="/uniformes" className={styles.textLink}>
            Descubre nuestros uniformes <ArrowUpRight aria-hidden="true" size={22} />
          </Link>
        </div>
      </div>
    </section>
  )
}
