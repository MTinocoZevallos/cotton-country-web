"use client"

import Image from "next/image"
import Link from "next/link"
import { useSyncExternalStore } from "react"
import { garmentCategories, garments } from "@/lib/uniforms"
import { contactHref } from "@/lib/contact-context"
import styles from "./uniforms.module.css"

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback)
  return () => window.removeEventListener("popstate", callback)
}
const snapshot = () => new URLSearchParams(window.location.search).get("categoria") ?? "todas"
export default function Catalog() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "todas")
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
    <section className={styles.section} id="prendas" aria-labelledby="catalog-title">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Prendas para tu proyecto</p>
        <h2 id="catalog-title">Explora nuestras prendas.</h2>
        <div className={styles.filters} role="group" aria-label="Filtrar prendas">
          <button type="button" aria-controls="catalog-results" aria-pressed={selected === "todas"} onClick={() => select("todas")}>Todas</button>
          {garmentCategories.map(item => <button key={item.id} type="button" aria-controls="catalog-results" aria-pressed={selected === item.id} onClick={() => select(item.id)}>{item.name}</button>)}
        </div>
        <p role="status" aria-atomic="true" className={styles.eyebrow}>{items.length} referencias disponibles</p>
        <div className={styles.catalog} id="catalog-results">
          {items.map(item => {
            const category = garmentCategories.find(category => category.id === item.category)!
            const modelHref = `${category.href}#modelo-${item.number}`
            return <article key={item.id}>
              <Link href={modelHref} aria-label={`Ver ${item.name.toLowerCase()}`}>
                <div className={styles.photo} data-category={item.category}><Image src={item.image} alt={item.alt} fill sizes="(max-width:575px) 116vw, (max-width:900px) 58vw, 39vw" /></div>
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
    </section>
  )
}
