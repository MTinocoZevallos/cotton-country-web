import Image from "next/image"
import { Fragment } from "react"
import type { Block } from "@/lib/blog/content"
import { inlineText } from "@/lib/blog/content"
import Content from "./Content"
import styles from "./high-visibility.module.css"

type TableProps = { id: string; caption: string; headers: string[]; rows: string[][]; note: string }
export function TechnicalTable({ id, caption, headers, rows, note }: TableProps) {
  return <div className={styles.tableBlock}>
    <div className={styles.tableScroll} role="region" aria-labelledby={`${id}-caption`} aria-describedby={`${id}-note`} tabIndex={0}>
      <table><caption id={`${id}-caption`}>{caption}</caption>
        <thead><tr>{headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row,index) => <tr key={index}>{row.map((cell,column) => column === 0 ? <th scope="row" key={column}>{cell}</th> : <td key={column}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
    <p className={styles.note} id={`${id}-note`}>{note}</p>
  </div>
}
export function TechnicalFigure({ file, alt, caption }: { file: string; alt: string; caption: string }) {
  const src = `/blog/alta-visibilidad/${file}.svg`
  return <figure className={styles.figure}>
    <Image src={src} alt={alt} width={1200} height={600} sizes="(max-width:900px) 100vw, 760px" />
    <figcaption>{caption} <a href={src} target="_blank" rel="noopener noreferrer">Ampliar lámina en una pestaña nueva</a></figcaption>
  </figure>
}
function Comparison() {
  return <>
    <TechnicalTable id="comparacion-normas" caption="Cuadro 1 — ISO 20471 frente a ANSI/ISEA 107" headers={["Aspecto", "ISO 20471", "ANSI/ISEA 107-2020"]} rows={[
      ["Ámbito", "Norma internacional", "Norma estadounidense"],
      ["Clasificación", "Clases 1, 2 y 3", "Tipos O, R y P; clases según tipo"],
      ["Enfoque", "Superficies mínimas, diseño y desempeño", "Tipo de uso, superficies, diseño y desempeño"],
      ["Aplicación en compras peruanas", "Referencia técnica según exigencias aplicables", "Referencia técnica según exigencias aplicables"],
    ]} note="Las clases de las dos normas no son automáticamente equivalentes." />
    <TechnicalTable id="tipos-ansi" caption="Cuadro 3 — ANSI/ISEA 107-2020: tipos de uso" headers={["Tipo", "Contexto", "Clase"]} rows={[
      ["O", "Operaciones fuera de vías públicas con determinados riesgos de vehículos/equipos móviles", "1"],
      ["R", "Tránsito vial y equipos móviles", "2 o 3"],
      ["P", "Seguridad pública y emergencias", "2 o 3"],
    ]} note="El tipo indica el contexto de uso; la clase determina requisitos de desempeño. No tratar estos tipos como categorías de prenda." />
    <TechnicalFigure file="tipos-ansi" alt="Tipos ANSI/ISEA 107: O para determinados riesgos fuera de vías públicas, R para tránsito vial y P para seguridad pública y emergencias" caption="Los tipos describen contextos de uso; no son categorías de prenda." />
  </>
}
function MinimumAreas() {
  return <>
    <TechnicalTable id="superficies-iso" caption="Cuadro 2 — ISO 20471: superficies mínimas" headers={["Clase", "Material de fondo fluorescente", "Material retrorreflectivo"]} rows={[
      ["1", "0,14 m²", "0,10 m²"], ["2", "0,50 m²", "0,13 m²"], ["3", "0,80 m²", "0,20 m²"],
    ]} note="Cifras para materiales separados; verificar las condiciones específicas de la norma y los requisitos de diseño, superficies y desempeño. No atribuir clase por superficie únicamente." />
    <TechnicalFigure file="clases-iso" alt="Comparación de superficies mínimas relativas en las clases 1, 2 y 3 de ISO 20471; los bloques de material no representan prendas clasificadas" caption="Comparación de mínimos para materiales separados. Las superficies no bastan para atribuir una clase a un diseño." />
  </>
}
export default function HighVisibilityContent({ blocks }: { blocks: Block[] }) {
  return <>{blocks.map((block,index) => <Fragment key={index}>
    {block.type === "heading" && block.id === "que-significan-las-clases-1-2-y-3" && <Comparison />}
    <Content blocks={[block]} />
    {block.type === "paragraph" && inlineText(block.children).startsWith("Clase 3: establece") && <MinimumAreas />}
  </Fragment>)}
    <section className={styles.sources} aria-labelledby="referencias-alta-visibilidad">
      <h2 id="referencias-alta-visibilidad">Referencias técnicas</h2>
      <ul>
        <li><a href="https://www.iso.org/standard/42816.html" target="_blank" rel="noopener noreferrer">ISO 20471: ropa de alta visibilidad</a></li>
        <li><a href="https://webstore.ansi.org/standards/isea/ansiisea1072020" target="_blank" rel="noopener noreferrer">ANSI/ISEA 107-2020</a></li>
        <li><a href="https://multimedia.3m.com/mws/media/638577O/ansi-107-2020-made-easier.pdf" target="_blank" rel="noopener noreferrer">Guía ANSI/ISEA 107 publicada por 3M (PDF)</a></li>
      </ul>
      <p className={styles.note}>Consultar la edición y las exigencias aplicables antes de especificar una compra. Los esquemas son ilustrativos, sin escala, y no acreditan certificación ni clase de una prenda.</p>
    </section>
  </>
}
