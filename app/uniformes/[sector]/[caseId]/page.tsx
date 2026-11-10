import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { casePath, garmentCategories, garments, publishedCases } from "@/lib/uniforms"
import { contactHref } from "@/lib/contact-context"
import { editorialSerif } from "@/components/home-font"
import styles from "@/components/uniforms/uniforms.module.css"
type Params = { sector: string; caseId: string }
function getCase(params: Params) { return publishedCases.find(item => item.sector === params.sector && item.id === params.caseId) }
export function generateStaticParams() { return publishedCases.map(item => ({ sector: item.sector, caseId: item.id })) }
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const item = getCase(await params)
  return item ? { title: `${item.client}: proyecto de uniformes | Cotton Country`, description: item.story.solution, alternates: { canonical: casePath(item) } } : { robots: { index: false, follow: false } }
}
export default async function CasePage({ params }: { params: Promise<Params> }) {
  const item = getCase(await params)
  if (!item) notFound()
  const related = garments.filter(garment => item.garmentIds.includes(garment.id))
  const labels = { requirement: "El requerimiento", challenge: "El desafío", solution: "Nuestra solución", result: "El resultado" }
  return <div className={`${styles.page} ${editorialSerif.variable}`}><div className={styles.container}>
    <section className={styles.intro}><Link className={styles.link} href={`/uniformes/${item.sector}`}>← Volver al sector</Link><p className={styles.eyebrow}>Proyecto de uniformes</p><h1>{item.client}</h1></section>
    <div className={styles.caseLayout}><div>{item.fullImages.map(photo => <div key={photo.src} className={styles.caseMain}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width:575px) 100vw, 60vw" /></div>)}</div><div className={styles.caseGarments}>{related.map(garment => <Link key={garment.id} href={garmentCategories.find(category => category.id === garment.category)!.href}><div className={styles.photo}><Image src={garment.image} alt={garment.alt} fill sizes="(max-width:575px) 100vw, 40vw" /></div><h3>{garment.name}</h3></Link>)}</div></div>
    <section className={`${styles.section} ${styles.story}`}>{Object.entries(labels).map(([key,label]) => <article key={key}><h2>{label}</h2><p className={styles.copy}>{item.story[key as keyof typeof labels]}</p></article>)}</section>
    <div className={styles.cta}><h2>Hablemos de tu proyecto.</h2><Link className={styles.button} href={contactHref({ source_path: casePath(item) })}>Solicitar una propuesta →</Link></div>
  </div></div>
}
