import Image from "next/image"
import Link from "next/link"
import { casePath, publishedCases, type SectorId } from "@/lib/uniforms"
import styles from "./uniforms.module.css"

export default function Projects({ sector }: { sector: SectorId }) {
  const items = publishedCases.filter(item => item.sector === sector)
  if (!items.length) return <p className={styles.copy}>Conversemos sobre las funciones, las prendas y los criterios que necesita tu organización para su próximo proyecto de uniformes.</p>
  return <div className={styles.sectors}>{items.map(item => <article className={styles.projectCard} key={item.id}>
    <Link href={casePath(item)}><div className={styles.projectPhoto}><Image src={item.fullImages[0].src} alt={item.fullImages[0].alt} fill sizes="(max-width:575px) calc(100vw - 40px), (max-width:900px) calc((100vw - 96px) / 2), 616px" /></div></Link>
    <h3><Link href={casePath(item)}>{item.client}</Link></h3>
    <Link className={styles.link} href={casePath(item)}>Explorar el proyecto →</Link>
  </article>)}</div>
}
