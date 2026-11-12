import { normalizeBlogHref } from "./paths"

export type Inline = { type: "text"; text: string } | { type: "strong" | "em"; children: Inline[] } | { type: "link"; href: string; children: Inline[] }
export type Block = { type: "paragraph"; children: Inline[] } | { type: "heading"; level: 2 | 3; id: string; children: Inline[] } | { type: "list"; ordered: boolean; items: Inline[][] } | { type: "divider" } | { type: "image"; src: string; alt: string }

function entities(text: string) {
  return text.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (match, code: string) => {
    const named: Record<string, string> = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " }
    if (code[0] !== "#") return named[code.toLowerCase()] ?? match
    const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2),16) : parseInt(code.slice(1),10)
    return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : ""
  })
}

// A constrained tokenizer, not an HTML renderer: React escapes every text node.
// Only links and inline emphasis are interpreted; scripts, attributes and styles never execute.
export function parseInline(text: string): Inline[] {
  const nodes: Inline[] = []
  const pattern = /<a\b([^>]*)>([\s\S]*?)<\/a\s*>|\[([^\]\n]+)\]\(([^\s)]+)\)|\*\*([^*]+)\*\*|<(strong|b|em|i)\b[^>]*>([\s\S]*?)<\/\6\s*>/gi
  let start = 0
  const addText = (part: string) => {
    // Unsupported markup is preserved as visible text, never inserted as HTML.
    if (part) nodes.push({ type:"text", text:entities(part) })
  }
  for (const match of text.matchAll(pattern)) {
    addText(text.slice(start, match.index))
    if (match[1] !== undefined) {
      const raw = match[1].match(/(?:^|\s)href\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s]+))/i)
      const href = raw ? normalizeBlogHref(entities(raw[1] ?? raw[2] ?? raw[3])) : undefined
      const children = parseInline(match[2])
      if (href) nodes.push({ type:"link",href,children }); else nodes.push(...children)
    } else if (match[3] !== undefined) {
      const href = normalizeBlogHref(entities(match[4]))
      const children = parseInline(match[3])
      if (href) nodes.push({type:"link",href,children}); else nodes.push(...children)
    } else if (match[5] !== undefined) nodes.push({type:"strong",children:parseInline(match[5])})
    else nodes.push({type:/^(em|i)$/i.test(match[6])?"em":"strong",children:parseInline(match[7])})
    start = match.index! + match[0].length
  }
  addText(text.slice(start))
  return nodes
}

export function inlineText(nodes: Inline[]): string {
  return nodes.map(node => node.type === "text" ? node.text : inlineText(node.children)).join("")
}

export function parseContent(content: string): Block[] {
  const blocks: Block[] = [], ids = new Map<string, number>()
  const lines = content.replace(/<\/?p\s*>/gi,"\n").replace(/<br\s*\/?>/gi,"\n").split(/\r?\n/).map(s=>s.trim()).filter(Boolean)
  for (const line of lines) {
    if (line === "---") { blocks.push({type:"divider"}); continue }
    const image = line.match(/^!\[([^\]]*)\]\(([^\s)]+)\)$/)
    if (image) { if (/^\/blog\/[a-z0-9-]+\.(webp|png|jpe?g)$/.test(image[2])) blocks.push({type:"image",src:image[2],alt:entities(image[1])}); continue }
    const markdown = line.match(/^(#{1,3})\s+(.+)$/)
    const legacyHeading = line.length < 130 && (/^\d+\.\s/.test(line) || /^(Conclusión|Continúa leyendo)/i.test(line))
    if (markdown || legacyHeading) {
      const children = parseInline(markdown ? markdown[2] : line)
      const base = inlineText(children).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") || "seccion"
      const count = (ids.get(base) ?? 0) + 1; ids.set(base,count)
      blocks.push({type:"heading",level:markdown?.[1]==="###"?3:2,id:count===1?base:`${base}-${count}`,children});continue
    }
    const list = line.match(/^(?:([*-])|\d+\))\s+(.+)$/)
    if (list) {
      const ordered = !list[1], previous = blocks.at(-1), children = parseInline(list[2])
      if (previous?.type === "list" && previous.ordered === ordered) previous.items.push(children)
      else blocks.push({type:"list",ordered,items:[children]})
      continue
    }
    blocks.push({type:"paragraph",children:parseInline(line)})
  }
  return blocks
}

export function contentText(content: string) {
  return parseContent(content).map(block=>block.type==="paragraph"||block.type==="heading"?inlineText(block.children):block.type==="list"?block.items.map(inlineText).join(" "):"").filter(Boolean).join(" ")
}
