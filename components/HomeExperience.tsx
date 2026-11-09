"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { editorialSerif } from "./home-font"
import styles from "./home.module.css"

/** Content remains readable without JavaScript or with reduced motion. */
export default function HomeExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = root.current
    if (!element) return
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    let observer: IntersectionObserver | undefined
    const initialize = () => {
      observer?.disconnect()
      element.removeAttribute("data-motion")
      if (preference.matches || !("IntersectionObserver" in window)) return
      const reveals = element.querySelectorAll<HTMLElement>("[data-reveal]")
      for (const item of reveals) {
        if (item.getBoundingClientRect().top < window.innerHeight * .96) item.dataset.inView = "true"
      }
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).dataset.inView = "true"
            observer?.unobserve(entry.target)
          }
        }
      }, { threshold: .08, rootMargin: "0px 0px -4% 0px" })
      reveals.forEach(item => observer?.observe(item))
      element.dataset.motion = "ready"
    }
    initialize()
    preference.addEventListener("change", initialize)
    return () => {
      observer?.disconnect()
      preference.removeEventListener("change", initialize)
      element.removeAttribute("data-motion")
    }
  }, [])

  return <div ref={root} className={`${styles.home} ${editorialSerif.variable}`}>{children}</div>
}
