import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { sectors, publishedCases } from "@/lib/uniforms"
import { contactHref } from "@/lib/contact-context"
import { editorialSerif } from "@/components/home-font"
import Projects from "@/components/uniforms/Projects"
import styles from "@/components/uniforms/uniforms.module.css"
export function generateStaticParams() { return sectors.map(item => ({ sector: item.id })) }
export async function generateMetadata({ params }: { params: Promise<{ sector: string }> }): Promise<Metadata> {
  const { sector } = await params
  const item = sectors.find(item => item.id === sector)
  if (!item) return { robots: { index: false, follow: false } }
  return { title: `Uniformes para ${item.name} | Cotton Country`, description: item.intro, alternates: { canonical: `/uniformes/${item.id}` }, ...(!item.public ? { robots: { index: false, follow: false } } : {}) }
}
export default async function SectorPage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params
  const item = sectors.find(item => item.id === sector)
  if (!item) notFound()
  return <div className={`${styles.page} ${editorialSerif.variable}`}><div className={styles.container}>
    <section className={styles.intro}><div className={styles.back}><Link href="/uniformes" className={styles.link}>← Uniformes</Link></div><p className={styles.eyebrow}>{item.name}</p><h1>{item.title}</h1><p className={styles.copy}>{item.intro}</p></section>
    <section className={`${styles.section} ${styles.split}`}><h2>Criterios para definir el proyecto.</h2><ul className={styles.list}>{item.criteria.map(text => <li key={text}>{text}</li>)}</ul></section>
    {publishedCases.some(project => project.sector === item.id) && <section className={styles.section}><h2>Proyectos de {item.name.toLowerCase()}.</h2><Projects sector={item.id} /></section>}
    <section className={styles.section}><h2>Las prendas son parte de la solución.</h2><p className={styles.copy}>Revisa nuestras referencias para preparar las prendas que requiere tu equipo.</p><Link href="/uniformes#prendas" className={styles.link}>Explorar prendas →</Link></section>
    <div className={styles.cta}><h2>Definamos tu requerimiento.</h2><Link className={styles.button} href={contactHref({ source_path: `/uniformes/${item.id}` })}>Solicitar una propuesta →</Link></div>
  </div></div>
}
