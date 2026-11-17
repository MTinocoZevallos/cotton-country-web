import { Fragment } from "react"
import { parseContent } from "@/lib/blog/content"
import { parseHistoricalChat } from "@/lib/blog/historical-chat"
import Content from "./Content"
import styles from "./HistoricalChat.module.css"

const tableNotice = "Datos generados por ChatGPT durante el experimento original. No verificados como estándar antropométrico peruano"

export default function HistoricalChat({ source }: { source: string }) {
  const exchanges = parseHistoricalChat(source)
  return <div className={styles.conversation} role="group" aria-label="Cotton Country conversa con ChatGPT">
    <header className={styles.header}>
      <p className={styles.title}>Cotton Country conversa con ChatGPT</p>
      <p className={styles.subtitle}>Reproducción de la conversación original</p>
    </header>
    <ol className={styles.messages} aria-label="Conversación original">
      {exchanges.map((exchange, index) => <Fragment key={index}>
        <li className={styles.question} data-speaker="cotton-country">
          <p className={styles.speaker}>Cotton Country</p>
          <p>{exchange.question}</p>
        </li>
        <li className={styles.answer} data-speaker="chatgpt">
          <p className={styles.speaker}>ChatGPT</p>
          <div className={styles.messageContent}>
            {parseContent(exchange.answer).map((block, blockIndex) => {
              if (block.type !== "table") return <Content key={blockIndex} blocks={[block]}/>
              const audience = index === 1 ? "mujeres" : "varones"
              const noteId = `chat-table-note-${index}-${blockIndex}`
              return <figure key={blockIndex} className={styles.tableFigure}>
                <div className={styles.tableScroll} role="region" aria-label={`Tabla de medidas para ${audience}`} tabIndex={0}>
                  <table aria-describedby={noteId}>
                    <caption>Medidas para {audience} (cm)</caption>
                    <thead><tr>{block.headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
                    <tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row">{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
                  </table>
                </div>
                <figcaption id={noteId} className={styles.tableNotice}>{tableNotice}</figcaption>
              </figure>
            })}
          </div>
        </li>
      </Fragment>)}
    </ol>
  </div>
}
