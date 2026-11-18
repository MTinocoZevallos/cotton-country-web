export type HistoricalExchange = { question: string; answer: string }

export function historicalChatSource(content: string): string {
  const start = content.indexOf("(Cotton Country)")
  if (start < 0) throw new Error("Historical conversation is missing")
  const endings = [content.indexOf("\n## ", start), content.indexOf("\nSin duda nos aterra", start)].filter(index => index >= 0)
  return content.slice(start, endings.length ? Math.min(...endings) : undefined).trim()
}

export function parseHistoricalChat(source: string, expectedCount = 3): HistoricalExchange[] {
  const exchanges = [...source.matchAll(/\(Cotton Country\)\s*([\s\S]*?)\n+\(ChatGPT\)\s*([\s\S]*?)(?=\n+\(Cotton Country\)|$)/g)]
    .map(match => ({ question: match[1].trim(), answer: match[2].trim() }))
  if (exchanges.length !== expectedCount) throw new Error(`Expected ${expectedCount} original exchanges`)
  return exchanges
}

export function parseFullSizeChat(content: string): HistoricalExchange[] {
  return parseHistoricalChat(historicalChatSource(content), 2)
}
