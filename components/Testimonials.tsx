"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type TouchEvent } from "react"
import styles from "./home.module.css"

const testimonials = [
  {
    company: "Colegio de Ingenieros del Perú",
    focus: "Acabados y selección de materiales",
    logo: "/clientes/ciplima-logo.png",
    text: "Cotton Country destacó por la calidad de los acabados y la selección de materiales. Buscábamos uniformes que representen el nivel institucional del Colegio, y el resultado fue impecable en cada detalle.",
  },
  {
    company: "DecorCenter",
    focus: "Identidad visual y validación del fit",
    logo: "/clientes/decorcenter-logo.png",
    text: "Buscábamos uniformes que reflejaran la identidad visual de nuestra marca. El equipo de Cotton Country entendió el concepto desde el inicio y propuso soluciones técnicas y estéticas que superaron nuestras expectativas. Su metodología de sizeset nos permitió validar el fit antes de la producción, logrando una presentación uniforme y profesional en todo el personal.",
  },
  {
    company: "Zoomlion",
    focus: "Lineamientos de matriz y adaptación local",
    logo: "/clientes/zoomlion-logo.png",
    text: "Como empresa transnacional, nuestros uniformes deben cumplir lineamientos definidos desde la matriz. Cotton Country supo adaptarlos con precisión a las condiciones locales. Las casacas fueron un éxito: el equipo simplemente las amó.",
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const section = useRef<HTMLElement>(null)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [touching, setTouching] = useState(false)
  const [rotationReset, setRotationReset] = useState(0)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const panels = useRef<(HTMLDivElement | null)[]>([])
  const [slideHeight, setSlideHeight] = useState<number>()
  const count = testimonials.length

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotion = () => setReducedMotion(preference.matches)
    const updateVisibility = () => setPageVisible(!document.hidden)
    updateMotion()
    updateVisibility()
    preference.addEventListener("change", updateMotion)
    document.addEventListener("visibilitychange", updateVisibility)
    let observer: IntersectionObserver | undefined
    let disposed = false
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 })
      if (section.current) observer.observe(section.current)
    } else {
      queueMicrotask(() => { if (!disposed) setVisible(true) })
    }
    return () => {
      disposed = true
      preference.removeEventListener("change", updateMotion)
      document.removeEventListener("visibilitychange", updateVisibility)
      observer?.disconnect()
    }
  }, [])

  const autoRunning = !userPaused && !hovered && !touching && visible && pageVisible && !reducedMotion
  useEffect(() => {
    if (!autoRunning) return
    const timer = window.setTimeout(() => setActive(current => (current + 1) % count), 4000)
    return () => window.clearTimeout(timer)
  }, [active, autoRunning, count, rotationReset])

  useEffect(() => {
    const panel = panels.current[active]
    if (!panel) return
    const measure = () => setSlideHeight(Math.ceil(panel.getBoundingClientRect().height))
    measure()
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure)
      return () => window.removeEventListener("resize", measure)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(panel)
    return () => observer.disconnect()
  }, [active])
  const restartInterval = () => setRotationReset(current => current + 1)
  const releaseTouch = () => {
    setTouching(false)
    restartInterval()
  }
  const move = (direction: number) => {
    restartInterval()
    setActive(current => (current + direction + count) % count)
  }
  const endTouch = (event: TouchEvent<HTMLDivElement>) => {
    const start = touch.current
    const end = event.changedTouches[0]
    touch.current = null
    if (!start || !end) return
    const dx = end.clientX - start.x, dy = end.clientY - start.y
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.35) move(dx < 0 ? 1 : -1)
  }

  return (
    <section ref={section} className={styles.cases} aria-labelledby="cases-title">
      <div className={styles.casesHeading} data-reveal>
        <h2 id="cases-title">Nuestros clientes opinan</h2>
      </div>
      <div className={styles.caseStage} data-reveal
        data-autoplay-state={JSON.stringify({ active: active + 1, userPaused, hovered, touching, visible, pageVisible, reducedMotion, autoRunning })}
        onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true) }}
        onPointerLeave={event => { if (event.pointerType === "mouse") setHovered(false) }}
        onTouchStartCapture={() => setTouching(true)}
        onTouchEndCapture={releaseTouch}
        onTouchCancelCapture={releaseTouch}
        role="region" aria-roledescription="carrusel" aria-label="Nuestros clientes opinan">
        <button type="button" className={styles.caseAccessibilityControl} disabled={reducedMotion}
          aria-label={userPaused ? "Reanudar avance automático de testimonios" : "Pausar avance automático de testimonios"}
          onClick={() => { setUserPaused(current => !current); restartInterval() }}>
          {userPaused ? "Reanudar testimonios" : "Pausar testimonios"}
        </button>
        <div className={styles.caseSlides} style={{ height: slideHeight }}
          aria-keyshortcuts="ArrowLeft ArrowRight Home End"
          onKeyDown={event => {
            let next = active
            if (event.key === "ArrowLeft") next = (active + count - 1) % count
            else if (event.key === "ArrowRight") next = (active + 1) % count
            else if (event.key === "Home") next = 0
            else if (event.key === "End") next = count - 1
            else return
            event.preventDefault()
            restartInterval()
            setActive(next)
            requestAnimationFrame(() => panels.current[next]?.focus())
          }} onTouchStart={event => {
          const point = event.touches[0]
          if (point && event.touches.length === 1) touch.current = { x: point.clientX, y: point.clientY }
          else touch.current = null
        }} onTouchEnd={endTouch} onTouchCancel={() => { touch.current = null }}>
          <div className={styles.caseTrack} style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}>
            {testimonials.map((item, index) => (
              <div key={item.company} role="group" aria-roledescription="diapositiva" id={`case-panel-${index}`} aria-label={`${index + 1} de ${count}: ${item.company}`} aria-hidden={active !== index} inert={active !== index} className={styles.casePanel} ref={element => { panels.current[index] = element }} tabIndex={0}>
                <article className={styles.case}>
                  <div className={styles.caseContent}>
                    <blockquote className={styles.caseQuote}><p>{item.text}</p></blockquote>
                  </div>
                  <div className={styles.caseIdentity}>
                    <div className={styles.caseLogo}>
                      <Image src={item.logo} alt={`Logo de ${item.company}`} fill sizes="72px" className="object-contain" />
                    </div>
                    <h3>{item.company}</h3>
                    <p className={styles.caseFocus}>{item.focus}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.caseIndicators} role="group" aria-label="Seleccionar opinión">
          {testimonials.map((item, index) => (
            <button key={item.company} type="button"
              aria-label={`Ver opinión ${index + 1}: ${item.company}`}
              aria-controls={`case-panel-${index}`} aria-current={active === index ? "true" : undefined}
              onClick={() => { restartInterval(); setActive(index) }}>
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
