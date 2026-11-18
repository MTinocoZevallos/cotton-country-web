import { Fragment } from "react"
import { parseContent } from "@/lib/blog/content"
import { parseHistoricalChat, type HistoricalExchange } from "@/lib/blog/historical-chat"
import Content from "./Content"
import styles from "./HistoricalChat.module.css"

export default function HistoricalChat(props: ({ source: string } | { exchanges: HistoricalExchange[] })) {
  const exchanges = "exchanges" in props ? props.exchanges : parseHistoricalChat(props.source)
  return <div className={styles.conversation} role="group" aria-label="Cotton Country conversa con ChatGPT">
    <header className={styles.header}>
      <h2 id="cotton-country-conversa-con-chatgpt" className={styles.title} data-layout-added-heading>Cotton Country conversa con ChatGPT</h2>
    </header>
    <ol className={styles.messages} aria-label="Conversación original">
      {exchanges.map((exchange, index) => <Fragment key={index}>
        <li className={styles.question} data-speaker="cotton-country">
          <p className={styles.speaker}>(Cotton Country)</p>
          <p>{exchange.question}</p>
        </li>
        <li className={styles.answer} data-speaker="chatgpt">
          <p className={styles.speaker}>(ChatGPT)</p>
          <div className={styles.messageContent}>
            {parseContent(exchange.answer).map((block, blockIndex) => {
              if (block.type !== "table") return <Content key={blockIndex} blocks={[block]}/>
              const audience = index === 1 ? "mujeres" : "varones"
              return <figure key={blockIndex} className={styles.tableFigure}>
                <div className={styles.tableScroll} role="region" aria-label={`Tabla de medidas para ${audience}`} tabIndex={0}>
                  <table>
                    <thead><tr>{block.headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
                    <tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row">{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              </figure>
            })}
          </div>
        </li>
      </Fragment>)}
    </ol>
  </div>
}
