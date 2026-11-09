"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import styles from "./home.module.css"
import { editorialSerif } from "./home-font"

const lines = ["¿De qué viste", "tu marca?"]

export default function Hero() {
  const hero = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = hero.current
    if (!element) return
    const values = element.querySelectorAll<HTMLElement>("[data-typed-value]")
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const timers: ReturnType<typeof setTimeout>[] = []
    let alive = true
    const clear = () => { timers.forEach(clearTimeout); timers.length = 0 }
    const finish = () => {
      clear()
      values.forEach((value, index) => { value.textContent = lines[index] })
      element.dataset.heroPhase = "complete"
    }
    const changePreference = () => { if (preference.matches) finish() }
    const schedule = (action: () => void, delay: number) => timers.push(setTimeout(action, delay))
    preference.addEventListener("change", changePreference)
    if (preference.matches) finish()
    else void document.fonts.ready.then(() => {
      if (!alive || preference.matches || element.dataset.heroPhase === "complete") return
      lines.forEach((line, lineIndex) => {
        Array.from(line).forEach((_, index) => schedule(() => {
          values[lineIndex].textContent = line.slice(0, index + 1)
        }, (lineIndex === 0 ? 220 : 1350) + index * 72))
      })
      schedule(() => { element.dataset.heroPhase = "subtitle" }, 2150)
      schedule(() => { element.dataset.heroPhase = "cta" }, 2650)
      schedule(finish, 3350)
    })
    return () => { alive = false; clear(); preference.removeEventListener("change", changePreference) }
  }, [])

  return (
    <section ref={hero} className={`${styles.hero} ${editorialSerif.variable}`} aria-labelledby="hero-title" data-hero-phase="typing">
      <div className={styles.heroBackdrop}>
        <Image src="/hero-airport-natural.webp" alt="Uniforme corporativo en un entorno profesional" fill unoptimized sizes="(max-width: 767px) 1200px, 100vw" preload className={styles.heroImage} />
      </div>
      <div className={styles.heroShade} />
      <div className={styles.heroContent}>
        {/* The invisible complete lines reserve geometry; the overlay receives actual typed text. */}
        <h1 id="hero-title" className={styles.heroTitle} aria-label="¿De qué viste tu marca?">
          {lines.map((line, lineIndex) => (
            <span key={line} className={styles.heroLine} aria-hidden="true" data-typing-line={lineIndex}>
              <span className={styles.reservedLine} data-reserved-text>{line}</span>
              <span className={styles.typedValue} data-typed-value />
            </span>
          ))}
        </h1>
        <noscript><style>{`[data-reserved-text]{visibility:visible!important}[data-hero-subtitle],[data-hero-cta]{opacity:1!important;transform:none!important}`}</style></noscript>
        <div className={styles.heroBottom}>
          <div className={styles.heroCopy}>
            <div className={styles.heroSubtitle} data-hero-subtitle>
              <p>Al igual que las personas, las marcas también visten para expresar quiénes son, lo que representan y los valores que las distinguen.</p>
              <p>Te invitamos a descubrir el poder del uniforme.</p>
            </div>
            <Link href="/uniformes" className={styles.primaryLink} data-hero-cta>
              Descubre nuestros uniformes <ArrowRight aria-hidden="true" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
