"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { ChevronDown } from "lucide-react"
import { garmentCategories, garments } from "@/lib/uniforms"
import { contactHref } from "@/lib/contact-context"
import styles from "./uniforms.module.css"

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback)
  window.addEventListener("hashchange", callback)
  return () => {
    window.removeEventListener("popstate", callback)
    window.removeEventListener("hashchange", callback)
  }
}
const snapshot = () => window.location.search + window.location.hash
export default function Catalog() {
  const location = useSyncExternalStore(subscribe, snapshot, () => "")
  const [query, hash = ""] = location.split("#")
  const raw = new URLSearchParams(query).get("categoria") ?? "todas"
  const toggleButton = useRef<HTMLButtonElement>(null)
  const [disclosure, setDisclosure] = useState<{ location: string; expanded: boolean } | null>(null)
  // Direct category/model links open the catalog; a manual toggle applies to the current URL.
  const linkedToCatalog = garmentCategories.some(item => item.id === raw) || hash === "prendas" || garments.some(item => item.id === hash)
  const expanded = disclosure?.location === location ? disclosure.expanded : linkedToCatalog

  useEffect(() => {
    if (!expanded || !(hash === "prendas" || garments.some(item => item.id === hash))) return
    const target = document.getElementById(hash)
    target?.scrollIntoView({ block: "start", behavior: "instant" })
  }, [expanded, hash, location])

  function toggle() {
    const nextLocation = expanded ? query : location
    if (expanded && hash) window.history.replaceState(null, "", window.location.pathname + query)
    setDisclosure({ location: nextLocation, expanded: !expanded })
    if (expanded && hash) window.dispatchEvent(new PopStateEvent("popstate"))
    if (expanded) requestAnimationFrame(() => {
      const button = toggleButton.current
      if (!button) return
      button.focus({ preventScroll: true })
      const box = button.getBoundingClientRect()
      if (box.top < 96 || box.bottom > window.innerHeight) button.scrollIntoView({ block: "start", behavior: "instant" })
    })
  }
  const selected = garmentCategories.some(item => item.id === raw) ? raw : "todas"
  const items = garments.filter(item => selected === "todas" || item.category === selected)
  const selectedCategory = garmentCategories.find(item => item.id === selected)
  function select(value: string) {
    const url = new URL(window.location.href)
    if (value === "todas") url.searchParams.delete("categoria")
    else url.searchParams.set("categoria", value)
    window.history.replaceState(null, "", `${url.pathname}${url.search}#prendas`)
    window.dispatchEvent(new PopStateEvent("popstate"))
  }
  return (
    <section className={`${styles.section} ${styles.catalogSection}`} data-expanded={expanded} id="prendas" aria-labelledby="catalog-title">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Prendas para tu proyecto</p>
        <h2 id="catalog-title">Explora nuestras prendas.</h2>
        <button ref={toggleButton} type="button" className={`${styles.button} ${styles.catalogToggle}`} aria-expanded={expanded} aria-controls="catalog-content" onClick={toggle}>
          {expanded ? "Ocultar prendas" : "Ver todas las prendas"}<ChevronDown size={18} aria-hidden="true" />
        </button>
        <div id="catalog-content" hidden={!expanded}>
          <div className={styles.filters} role="group" aria-label="Filtrar prendas">
            <button type="button" aria-controls="catalog-results" aria-pressed={selected === "todas"} onClick={() => select("todas")}>Todas</button>
            {garmentCategories.map(item => <button key={item.id} type="button" aria-controls="catalog-results" aria-pressed={selected === item.id} onClick={() => select(item.id)}>{item.name}</button>)}
          </div>
          <p role="status" aria-atomic="true" className={styles.eyebrow}>{items.length} referencias disponibles</p>
          <div className={styles.catalog} id="catalog-results">
            {items.map(item => {
              const category = garmentCategories.find(category => category.id === item.category)!
              const modelHref = item.category === "guardapolvos" ? `${category.href}#${item.id}` : `${category.href}#modelo-${item.number}`
              const paired = item.category === "pantalones-dama" || item.category === "pantalones-caballero"
              return <article key={item.id} id={item.category === "guardapolvos" ? item.id : undefined}>
                <Link href={modelHref} aria-label={`Ver ${item.name.toLowerCase()}`}>
                  <div className={`${styles.photo} ${styles.catalogPhoto}`} data-category={item.category} data-layout={paired ? "paired" : item.width > item.height ? "landscape" : "portrait"}>
                    {paired ? <div className={styles.pairedPhoto} role="img" aria-label={item.alt}>
                      {/* Two windows into the same original preserve both views while
                          removing background between them, without editing the file. */}
                      {["front", "back"].map(view => <span className={styles.pairedView} data-view={view} key={view} aria-hidden="true">
                        <Image src={item.image} alt="" width={item.width} height={item.height} sizes="(max-width:575px) 150vw, (max-width:900px) 75vw, 50vw" />
                      </span>)}
                    </div> : <Image src={item.image} alt={item.alt} width={item.width} height={item.height} sizes="(max-width:575px) calc(100vw - 40px), (max-width:900px) 50vw, 33vw" />}
                  </div>
                </Link>
                <h3>{item.name}</h3>
                <p className={styles.catalogDescription}>{item.description}</p>
                <Link className={styles.link} href={modelHref}>Ver modelo en {category.name.toLowerCase()} →</Link>
                <Link className={styles.link} href={contactHref({ source_path: "/uniformes", garment_category: item.category })}>Consultar sobre esta prenda →</Link>
              </article>
            })}
          </div>
          {!items.length && <div className={styles.empty}><p>El catálogo editorial de {selectedCategory?.name.toLowerCase()} está en preparación. Publicaremos sus modelos cuando contemos con fotografías y especificaciones aprobadas.</p><Link className={styles.link} href={contactHref({ source_path: "/uniformes", garment_category: selected })}>Consultar sobre esta categoría →</Link></div>}
        </div>
      </div>
    </section>
  )
}
