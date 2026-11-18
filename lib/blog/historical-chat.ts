export type HistoricalExchange = { question: string; answer: string }

export function parseFullSizeChat(content: string): HistoricalExchange[] {
  const exchanges = [...content.matchAll(/\*\*Cotton Country: ([^\n]+)\*\*\s+\*\*ChatGPT \(respuesta original de 2023\):\*\*\s*([\s\S]*?)(?=\n\*\*Cotton Country:|\n---|$)/g)]
    .map(match => ({ question: match[1].trim(), answer: match[2].trim() }))
  if (exchanges.length !== 2) throw new Error("Expected the two historical full-size exchanges")
  return exchanges
}

export function historicalChatSource(content: string): string {
  const start = content.indexOf("(Cotton Country)")
  if (start < 0) throw new Error("Historical conversation is missing")
  const end = content.indexOf("\n## ", start)
  return content.slice(start, end < 0 ? undefined : end).trim()
}

export function parseHistoricalChat(source: string): HistoricalExchange[] {
  const exchanges = [...source.matchAll(/\(Cotton Country\)\s*([\s\S]*?)\n+\(ChatGPT\)\s*([\s\S]*?)(?=\n+\(Cotton Country\)|$)/g)]
    .map(match => ({ question: match[1].trim(), answer: match[2].trim() }))
  if (exchanges.length !== 3) throw new Error("Expected the three historical exchanges")
  return exchanges
}
