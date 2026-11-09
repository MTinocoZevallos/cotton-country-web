"use client"

import { useEffect, useRef, type ReactNode } from "react"
import styles from "./home.module.css"

/** Progressive enhancement: content stays visible without JavaScript or motion. */
export default function HomeExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = root.current
    if (!element) return
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    let cleanup = () => {}
    const initialize = () => {
      cleanup()
      element.removeAttribute("data-motion")
      if (preference.matches || !("IntersectionObserver" in window)) return
      const visible = new Set<HTMLElement>()
      const reveals = element.querySelectorAll<HTMLElement>("[data-reveal]")
      for (const item of reveals) {
        if (item.getBoundingClientRect().top < window.innerHeight * .96) item.dataset.inView = "true"
      }
      const revealObserver = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).dataset.inView = "true"
            revealObserver.unobserve(entry.target)
          }
        }
      }, { threshold: .08, rootMargin: "0px 0px -4% 0px" })
      reveals.forEach(item => revealObserver.observe(item))
      let frame = 0
      const paint = () => {
        frame = 0
        for (const item of visible) {
          const rect = item.getBoundingClientRect()
          const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - rect.top - rect.height / 2) / window.innerHeight))
          // Keep the displacement inside the image's overscan at every breakpoint.
          item.style.setProperty("--parallax-y", `${progress * Math.min(30, rect.height * .045) * Math.min(1.15, Number(item.dataset.parallaxSpeed) || 1)}px`)
        }
      }
      const schedule = () => { if (!frame) frame = requestAnimationFrame(paint) }
      const parallaxObserver = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target as HTMLElement)
          else visible.delete(entry.target as HTMLElement)
        }
        schedule()
      }, { rootMargin: "100px" })
      element.querySelectorAll<HTMLElement>("[data-parallax]").forEach(item => parallaxObserver.observe(item))
      element.dataset.motion = "ready"
      window.addEventListener("scroll", schedule, { passive: true })
      window.addEventListener("resize", schedule)
      cleanup = () => {
        revealObserver.disconnect()
        parallaxObserver.disconnect()
        window.removeEventListener("scroll", schedule)
        window.removeEventListener("resize", schedule)
        cancelAnimationFrame(frame)
        element.querySelectorAll<HTMLElement>("[data-parallax]").forEach(item => item.style.removeProperty("--parallax-y"))
      }
    }
    initialize()
    preference.addEventListener("change", initialize)
    return () => { cleanup(); preference.removeEventListener("change", initialize); element.removeAttribute("data-motion") }
  }, [])

  return <div ref={root} className={styles.home}>{children}</div>
}
