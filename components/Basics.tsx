"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import styles from "./home.module.css"

const families = [
  { name: "Camisas", href: "/uniformes/camisas", image: "/home-2027/camisas.webp", alt: "Camisa blanca de manga larga en un entorno corporativo", detail: "La presencia está en los detalles." },
  { name: "Blusas", href: "/uniformes/blusas", image: "/home-2027/blusas.webp", alt: "Blusa de manga larga en un entorno profesional", detail: "Una expresión de tu identidad." },
  { name: "Polos", href: "/uniformes/polos", image: "/home-2027/polos.webp", alt: "Polo de cuello y manga corta en un entorno de atención al público", detail: "Tu marca, en movimiento." },
  { name: "Pantalones", href: "/uniformes/pantalones-caballero", image: "/home-2027/pantalon-hombre.webp", alt: "Pantalón azul marino de hombre", detail: "Cada pieza cuenta." },
  { name: "Pantalones", href: "/uniformes/pantalones-dama", image: "/home-2027/pantalon-mujer.webp", alt: "Pantalón azul marino de mujer", detail: "Cada pieza cuenta." },
  { name: "Casacas", href: "/uniformes/casacas", image: "/home-2027/casaca-softshell-azul.webp", alt: "Casaca softshell azul con cierre frontal en un entorno corporativo", detail: "La presencia está en los detalles." },
  { name: "Chalecos", href: "/uniformes/chalecos", image: "/prendas/chaleco-azul-cotton-country.webp", alt: "Chaleco azul marino con cierre frontal, bolsillos y bandas claras en el pecho", detail: "Cada pieza cuenta." },
  { name: "Sacos", href: "/uniformes/sacos", image: "/home-2027/saco-moderno-dama.webp", alt: "Saco moderno azul de dama, con solapas y un botón, en un entorno profesional", detail: "Una expresión de tu identidad." },
]

const groupSize = 4
const groupCount = Math.ceil(families.length / groupSize)

export default function Basics() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [perView, setPerView] = useState(4)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [touching, setTouching] = useState(false)
  const [paused, setPaused] = useState(false)
  const [rotationReset, setRotationReset] = useState(0)
  const positions = groupCount

  useEffect(() => {
    const element = track.current
    if (!element) return
    const measure = () => {
      const count = Number(getComputedStyle(element).getPropertyValue("--products-per-view")) || 1
      setPerView(count)
      const step = (element.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? 1
      const gap = parseFloat(getComputedStyle(element).columnGap) || 0
      setActive(Math.min(groupCount - 1, Math.floor(Math.round(element.scrollLeft / (step + gap)) / groupSize)))
    }
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotion = () => setReducedMotion(motion.matches)
    const updatePage = () => setPageVisible(!document.hidden)
    measure()
    updateMotion()
    updatePage()
    const resize = new ResizeObserver(measure)
    resize.observe(element)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 })
    if (section.current) observer.observe(section.current)
    motion.addEventListener("change", updateMotion)
    document.addEventListener("visibilitychange", updatePage)
    return () => {
      resize.disconnect()
      observer.disconnect()
      motion.removeEventListener("change", updateMotion)
      document.removeEventListener("visibilitychange", updatePage)
    }
  }, [])

  const selectModel = useCallback((index: number) => {
    const element = track.current
    if (!element) return
    const item = element.children[index] as HTMLElement | undefined
    if (!item) return
    element.scrollTo({ left: item.offsetLeft - (element.firstElementChild as HTMLElement).offsetLeft, behavior: reducedMotion ? "instant" : "smooth" })
    setRotationReset(current => current + 1)
  }, [reducedMotion])
  const autoRunning = positions > 1 && visible && pageVisible && !reducedMotion && !hovered && !focused && !touching && !paused
  useEffect(() => {
    if (!autoRunning) return
    const timer = window.setInterval(() => {
      const element = track.current
      if (!element) return
      const step = (element.firstElementChild as HTMLElement).getBoundingClientRect().width + (parseFloat(getComputedStyle(element).columnGap) || 0)
      const current = Math.round(element.scrollLeft / step)
      selectModel((current + perView) % families.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [perView, autoRunning, rotationReset, selectModel])

  return (
    <section ref={section} className={styles.products} aria-labelledby="products-title"
      onFocusCapture={event => setFocused(event.target.matches(":focus-visible"))}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
      data-products-state={JSON.stringify({ active, positions, hovered, touching, focused, reducedMotion, visible, autoRunning })}>
      <div className={styles.productsInner}>
        <div className={styles.sectionHeading} data-reveal>
          <p className={styles.eyebrow}>Nuestros uniformes</p>
          <h2 id="products-title">Prendas <span>destacadas</span></h2>
        </div>
        <div className={styles.productCarousel}
          onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true) }}
          onPointerLeave={event => { if (event.pointerType === "mouse") setHovered(false) }}
          role="region" aria-roledescription="carrusel" aria-label="Fotografías de prendas">
          <button type="button" className={styles.productPause} disabled={reducedMotion}
            onClick={() => setPaused(current => !current)}>
            {paused ? "Reanudar avance automático de prendas" : "Pausar avance automático de prendas"}
          </button>
          <div ref={track} className={styles.productGrid} id="product-carousel"
            onTouchStart={() => setTouching(true)}
            onTouchEnd={() => { setTouching(false); setRotationReset(current => current + 1) }}
            onTouchCancel={() => setTouching(false)}
            onScroll={event => {
              const element = event.currentTarget
              const step = (element.firstElementChild as HTMLElement).getBoundingClientRect().width + (parseFloat(getComputedStyle(element).columnGap) || 0)
              setActive(Math.min(groupCount - 1, Math.floor(Math.round(element.scrollLeft / step) / groupSize)))
            }}>
            {families.map((family, index) => (
              <Link key={family.image} href={family.href} className={styles.product} data-product-group={Math.floor(index / groupSize) + 1}>
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
          <div className={styles.productIndicators} role="group" aria-label="Seleccionar grupo de prendas">
            {Array.from({ length: positions }, (_, index) => (
              <button key={index} type="button" aria-label={`Ver grupo ${index + 1} de ${positions}: prendas ${index * groupSize + 1} a ${(index + 1) * groupSize}`}
                aria-controls="product-carousel" aria-current={active === index ? "true" : undefined}
                onClick={() => selectModel(index * groupSize)}><span aria-hidden="true" /></button>
            ))}
          </div>
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
