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
      <div className={styles.seasonOutfits}>
      {outfits.map(outfit => {
        const photo = outfit.fullImage!
        const pieces = garments.filter(garment => garment.caseId === project.id && outfit.garmentIds.includes(garment.id))
        return <div key={outfit.id} className={`${styles.seasonLayout} ${pieces.length ? styles.seasonWithPieces : ""}`}>
          <figure className={styles.seasonFull}>
            <div className={styles.seasonPhoto}>
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width:575px) 100vw, 50vw" />
            </div>
            <figcaption>{outfit.name} · {season.name.toLowerCase()}</figcaption>
          </figure>
          {pieces.length > 0 && <div className={styles.caseGarments} aria-label={`Prendas del uniforme de ${season.name.toLowerCase()}`}>
            {pieces.map(garment => <Link key={garment.id} href={garmentCategories.find(category => category.id === garment.category)!.href}>
              <div className={styles.photo}><Image src={garment.image} alt={garment.alt} fill sizes="(max-width:575px) 100vw, 40vw" /></div><h3>{garment.name}</h3>
            </Link>)}
          </div>}
        </div>
      })}
      </div>
    </section>
  })
}
