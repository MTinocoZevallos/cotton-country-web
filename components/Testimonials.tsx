"use client"

import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react"
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
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const touch = useRef<{ x: number; y: number } | null>(null)
  const count = testimonials.length
  const move = (direction: number) => setActive(current => (current + direction + count) % count)
  const handleKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === "ArrowRight") next = (index + 1) % count
    else if (event.key === "ArrowLeft") next = (index + count - 1) % count
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = count - 1
    else return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
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
    <section className={styles.cases} aria-labelledby="cases-title">
      <div className={styles.casesHeading} data-reveal>
        <h2 id="cases-title">Nuestros clientes opinan</h2>
      </div>
      <div className={styles.caseStage} data-reveal role="region" aria-roledescription="carrusel" aria-label="Nuestros clientes opinan">
        <div className={styles.caseTabs} role="tablist" aria-label="Seleccionar testimonio">
          {testimonials.map((item, index) => (
            <button key={item.company} role="tab" id={`case-tab-${index}`} aria-controls={`case-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} ref={element => { tabs.current[index] = element }} onClick={() => setActive(index)} onKeyDown={event => handleKeys(event, index)}>
              {item.company}
            </button>
          ))}
        </div>
        <div className={styles.caseSlides} onTouchStart={event => {
          const point = event.touches[0]
          if (point && event.touches.length === 1) touch.current = { x: point.clientX, y: point.clientY }
          else touch.current = null
        }} onTouchEnd={endTouch} onTouchCancel={() => { touch.current = null }}>
          <div className={styles.caseTrack} style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}>
            {testimonials.map((item, index) => (
              <div key={item.company} role="tabpanel" id={`case-panel-${index}`} aria-labelledby={`case-tab-${index}`} aria-hidden={active !== index} inert={active !== index} className={styles.casePanel} tabIndex={0}>
                <article className={styles.case}>
                  <div className={styles.caseIdentity}>
                    <div className={styles.caseLogo}>
                      <Image src={item.logo} alt={`Logo de ${item.company}`} fill sizes="180px" className="object-contain" />
                    </div>
                    <h3>{item.company}</h3>
                    <p className={styles.caseFocus}>{item.focus}</p>
                  </div>
                  <div className={styles.caseContent}>
                    <p className={styles.quoteLabel}>Opinión del cliente</p>
                    <blockquote className={styles.caseQuote}><p>{item.text}</p></blockquote>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.caseControls}>
          <span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
          <div>
            <button type="button" aria-label="Testimonio anterior" onClick={() => move(-1)}><ArrowLeft aria-hidden="true" size={18} /><span>Anterior</span></button>
            <button type="button" aria-label="Testimonio siguiente" onClick={() => move(1)}><span>Siguiente</span><ArrowRight aria-hidden="true" size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
