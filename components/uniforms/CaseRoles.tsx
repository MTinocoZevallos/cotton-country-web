import Image from "next/image"
import { type ProjectCase } from "@/lib/uniforms"
import styles from "./uniforms.module.css"

export default function CaseRoles({ project }: { project: ProjectCase }) {
  return <>
    <section className={`${styles.section} ${styles.split}`} aria-labelledby="role-challenge-title">
      <div><h2 id="role-challenge-title">El desafío</h2><h3 className={styles.roleSubtitle}>{project.roleHeadings?.challenge}</h3></div>
      <div className={styles.copy}>{project.story.challenge?.split("\n\n").map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
    </section>
    <section className={styles.section} aria-labelledby="role-solution-title">
      <h2 id="role-solution-title">Nuestra solución</h2>
      <h3 className={styles.roleSubtitle}>{project.story.solution}</h3>
      <div>{project.roles?.map(role => <article key={role.id} className={styles.roleRow} aria-labelledby={`role-${role.id}`}>
        <figure className={styles.editorialPhoto}>
          <Image src={role.photo.src} alt={role.photo.alt} width={role.photo.width ?? 1024} height={role.photo.height ?? 1536} sizes="(max-width:575px) 100vw, 520px" />
        </figure>
        <div><h3 id={`role-${role.id}`}>{role.title}</h3><p className={styles.copy}>{role.description}</p></div>
      </article>)}</div>
    </section>
    <section className={`${styles.section} ${styles.split}`} aria-labelledby="role-result-title">
      <h2 id="role-result-title">{project.roleHeadings?.result}</h2>
      <div className={styles.copy}>{project.story.result?.split("\n\n").map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
    </section>
  </>
}
