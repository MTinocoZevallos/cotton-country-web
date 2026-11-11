"use client"

import Image from "next/image"
import Link from "next/link"
import { useSyncExternalStore } from "react"
import { casePath, garmentCategories, garments, publishedCases } from "@/lib/uniforms"
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
          <button type="button" aria-pressed={selected === "todas"} onClick={() => select("todas")}>Todas</button>
          {garmentCategories.map(item => item.id === "casacas"
            ? <Link key={item.id} href={item.href}>{item.name}</Link>
            : <button key={item.id} type="button" aria-pressed={selected === item.id} onClick={() => select(item.id)}>{item.name}</button>)}
        </div>
        <p role="status" className={styles.eyebrow}>{items.length} referencias disponibles</p>
        <div className={styles.catalog}>
          {items.map(item => {
            const category = garmentCategories.find(category => category.id === item.category)!
            const project = publishedCases.find(project => project.id === item.caseId)
            return <article key={item.id}>
              <Link href={category.href} aria-label={`Explorar ${category.name.toLowerCase()}`}>
                <div className={styles.photo}><Image src={item.image} alt={item.alt} fill sizes="(max-width:575px) 100vw, (max-width:900px) 50vw, 33vw" /></div>
              </Link>
              <h3>{item.name}</h3>
              <Link className={styles.link} href={category.href}>Explorar {category.name.toLowerCase()} →</Link>
              {project && <Link className={styles.link} href={casePath(project)}>Ver proyecto {project.client}</Link>}
              <Link className={styles.link} href={contactHref({ source_path: "/uniformes", garment_category: item.category })}>Consultar sobre esta prenda →</Link>
            </article>
          })}
        </div>
        {!items.length && <div className={styles.empty}><p>Aún no hay referencias fotográficas publicadas en esta categoría. Cuéntanos qué prendas necesita tu equipo para evaluar el requerimiento.</p><Link className={styles.link} href={contactHref({ source_path: "/uniformes", garment_category: selected })}>Consultar sobre esta categoría →</Link></div>}
      </div>
    </section>
  )
}
