import { posts, type Post } from "@/app/blog/posts"

const archivePosition = new Map(posts.map((post,index)=>[post.slug,index]))

export function originalPublicationTime(value?: string): number | undefined {
  if (!value) return undefined
  // Calendar-only dates remain calendar dates; no UTC/local-day conversion.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const timestamp=Date.parse(value+"T12:00:00Z")
    return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0,10) === value ? timestamp : undefined
  }
  if (!/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return undefined
  const timestamp=Date.parse(value)
  return Number.isFinite(timestamp)?timestamp:undefined
}

export function orderPostsByPublication(items: readonly Post[]): Post[] {
  return [...items].sort((a,b)=>{
    const first=originalPublicationTime(a.publishedAt),second=originalPublicationTime(b.publishedAt)
    if(first!==undefined&&second!==undefined)return second-first
    if(first!==undefined)return -1
    if(second!==undefined)return 1
    // Evidence: c77676c ordered this imported archive using reverse insertion order.
    // This fallback is not represented as a verified original publication date.
    return (archivePosition.get(b.slug)??-1)-(archivePosition.get(a.slug)??-1)
  })
}

export function publicationLabel(value: string): string | undefined {
  if(originalPublicationTime(value)===undefined)return undefined
  const dateOnly=/^\d{4}-\d{2}-\d{2}$/.test(value)
  return new Intl.DateTimeFormat("es-PE",{dateStyle:"long",timeZone:dateOnly?"UTC":"America/Lima"}).format(new Date(dateOnly?value+"T12:00:00Z":value))
}
