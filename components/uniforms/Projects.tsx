import Image from "next/image"
import Link from "next/link"
import { casePath, publishedCases, type SectorId } from "@/lib/uniforms"
import styles from "./uniforms.module.css"

export default function Projects({ sector }: { sector: SectorId }) {
  const items = publishedCases.filter(item => item.sector === sector)
  if (!items.length) return <p className={styles.copy}>Conversemos sobre las funciones, las prendas y los criterios que necesita tu organización para su próximo proyecto de uniformes.</p>
  return <div className={styles.sectors}>{items.map(item => <article key={item.id}>
    <Link href={casePath(item)}><div className={styles.photo}><Image src={item.fullImages[0].src} alt={item.fullImages[0].alt} fill sizes="(max-width:575px) 100vw, 50vw" /></div><h3>{item.client}</h3></Link>
    <Link className={styles.link} href={casePath(item)}>Explorar el proyecto →</Link>
  </article>)}</div>
}
