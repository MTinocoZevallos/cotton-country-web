import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { casePath, garmentCategories, garments, publishedCases } from "@/lib/uniforms"
import { contactHref } from "@/lib/contact-context"
import { editorialSerif } from "@/components/home-font"
import CaseRoles from "@/components/uniforms/CaseRoles"
import CaseSeasons from "@/components/uniforms/CaseSeasons"
import styles from "@/components/uniforms/uniforms.module.css"
type Params = { sector: string; caseId: string }
function getCase(params: Params) { return publishedCases.find(item => item.sector === params.sector && item.id === params.caseId) }
export function generateStaticParams() { return publishedCases.map(item => ({ sector: item.sector, caseId: item.id })) }
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const item = getCase(await params)
  return item ? { title: item.seo?.title ?? `${item.client}: proyecto de uniformes | Cotton Country`, description: item.seo?.description ?? item.story.solution, alternates: { canonical: casePath(item) } } : { robots: { index: false, follow: false } }
}
export default async function CasePage({ params }: { params: Promise<Params> }) {
  const item = getCase(await params)
  if (!item) notFound()
  const related = garments.filter(garment => item.garmentIds.includes(garment.id))
  const labels = { requirement: "El requerimiento", challenge: "El desafío", solution: "Nuestra solución", result: "El resultado" }
  return <div className={`${styles.page} ${editorialSerif.variable}`}><div className={styles.container}>
    <section className={styles.intro}><Link className={styles.link} href={`/uniformes/${item.sector}`}>← Volver al sector</Link><p className={styles.eyebrow}>{item.eyebrow ?? "Proyecto de uniformes"}</p><h1>{item.title ?? item.client}</h1>{item.subtitle && <p className={styles.copy}>{item.subtitle}</p>}{item.intro && <div className={styles.copy}>{item.intro.split("\n\n").map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>}</section>
    {item.presentation === "roles" ? <CaseRoles project={item} /> : item.presentation === "variants" ? <section aria-label="Un mismo uniforme para invierno y verano">
      <div className={styles.uniformVariants}>{item.fullImages.map(photo => <figure key={photo.src} className={styles.editorialPhoto}>
        <Image src={photo.src} alt={photo.alt} width={photo.width ?? 1024} height={photo.height ?? 1024} sizes="(max-width:575px) 100vw, 50vw" />
        <figcaption>{photo.caption}</figcaption>
      </figure>)}</div>
      <div className={`${styles.section} ${styles.split}`}>
        <div><h2>Un conjunto, prendas complementarias.</h2>
          <nav className={styles.caseLinks} aria-label={`Categorías relacionadas con ${item.client}`}>{item.categories.map(id => {
            const category = garmentCategories.find(category => category.id === id)!
            return <Link key={id} className={styles.link} href={category.href}>{category.name} →</Link>
          })}</nav>
        </div>
        <dl className={styles.caseFeatures}>{item.features?.map(feature => <div key={feature.name}><dt>{feature.name}</dt><dd>{feature.description}</dd></div>)}</dl>
      </div>
    </section> : item.presentation === "editorial" ? <section aria-label={`Uniformes de ${item.client}`}>
      <div className={styles.editorialLead}>
        <figure className={styles.editorialPhoto}>
          <Image src={item.fullImages[0].src} alt={item.fullImages[0].alt} width={item.fullImages[0].width ?? 1024} height={item.fullImages[0].height ?? 1024} sizes="(max-width:900px) 100vw, 55vw" />
          <figcaption>Anfitriona Artisan · propuesta individual</figcaption>
        </figure>
        <div className={styles.editorialDetails}>
          <h2>Características del uniforme.</h2>
          <dl className={styles.caseFeatures}>{item.features?.map(feature => <div key={feature.name}><dt>{feature.name}</dt><dd>{feature.description}</dd></div>)}</dl>
          <h3>Prendas relacionadas</h3>
          <nav className={styles.caseLinks} aria-label="Categorías relacionadas con Avinka Artisan">{item.categories.map(id => {
            const category = garmentCategories.find(category => category.id === id)!
            return <Link key={id} className={styles.link} href={category.href}>{category.name} →</Link>
          })}</nav>
        </div>
      </div>
      {item.fullImages.slice(1).map(photo => <figure key={photo.src} className={`${styles.editorialPhoto} ${styles.editorialTeam}`}>
        <Image src={photo.src} alt={photo.alt} width={photo.width ?? 1024} height={photo.height ?? 1024} sizes="100vw" />
        <figcaption>Equipo de impulsadoras Artisan</figcaption>
      </figure>)}
    </section> : item.seasons ? <CaseSeasons project={item} /> : <div className={styles.caseLayout}><div>{item.fullImages.map(photo => <div key={photo.src} className={styles.caseMain}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width:575px) 100vw, 60vw" /></div>)}</div><div className={styles.caseGarments}>{related.map(garment => <Link key={garment.id} href={garmentCategories.find(category => category.id === garment.category)!.href}><div className={styles.photo}><Image src={garment.image} alt={garment.alt} fill sizes="(max-width:575px) 100vw, 40vw" /></div><h3>{garment.name}</h3></Link>)}</div></div>}
    {item.presentation !== "roles" && <section className={`${styles.section} ${styles.story}`}>{Object.entries(labels).filter(([key]) => item.story[key as keyof typeof labels]).map(([key,label]) => <article key={key}><h2>{label}</h2>{item.story[key as keyof typeof labels]!.split("\n\n").map(paragraph => <p key={paragraph} className={styles.copy}>{paragraph}</p>)}</article>)}</section>}
    {item.concept && <div className={styles.caseConcept}><p className={styles.eyebrow}>Concepto central</p><p>{item.concept}</p></div>}
    <div className={styles.cta}><h2>Hablemos de tu proyecto.</h2><Link className={styles.button} href={contactHref({ source_path: casePath(item) })}>Solicitar una propuesta →</Link></div>
  </div></div>
}
