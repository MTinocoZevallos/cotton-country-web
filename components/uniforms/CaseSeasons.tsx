import Image from "next/image"
import Link from "next/link"
import { garmentCategories, garments, type ProjectCase } from "@/lib/uniforms"
import styles from "./uniforms.module.css"

export default function CaseSeasons({ project }: { project: ProjectCase }) {
  return project.seasons?.map(season => {
    const outfits = season.outfits.filter(outfit => outfit.status === "published" && outfit.fullImage)
    if (!outfits.length) return null
    return <section key={season.id} className={styles.season} aria-labelledby={`season-${season.id}`}>
      <p className={styles.eyebrow}>Colección por temporada</p>
      <h2 id={`season-${season.id}`}>{season.name}</h2>
      {outfits.map(outfit => {
        const photo = outfit.fullImage!
        const pieces = garments.filter(garment => garment.caseId === project.id && outfit.garmentIds.includes(garment.id))
        return <div key={outfit.id} className={`${styles.seasonLayout} ${pieces.length ? styles.seasonWithPieces : ""}`}>
          <figure className={styles.seasonFull}>
            <Image src={photo.src} alt={photo.alt} width={photo.width ?? 1024} height={photo.height ?? 1024} sizes={pieces.length ? "(max-width:575px) 100vw, 60vw" : "(max-width:900px) 100vw, 820px"} />
            <figcaption>{outfit.name} · {season.name.toLowerCase()}</figcaption>
          </figure>
          {pieces.length > 0 && <div className={styles.caseGarments} aria-label={`Prendas del uniforme de ${season.name.toLowerCase()}`}>
            {pieces.map(garment => <Link key={garment.id} href={garmentCategories.find(category => category.id === garment.category)!.href}>
              <div className={styles.photo}><Image src={garment.image} alt={garment.alt} fill sizes="(max-width:575px) 100vw, 40vw" /></div><h3>{garment.name}</h3>
            </Link>)}
          </div>}
        </div>
      })}
    </section>
  })
}
