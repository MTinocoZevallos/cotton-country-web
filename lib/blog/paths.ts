import { postCategoryIds } from "./taxonomy"

export const BLOG_ORIGIN = "https://cottoncountry.com.pe"
const slugs = new Set(Object.keys(postCategoryIds))

export function postPath(post: { slug: string; canonicalPath?: string }) {
  return post.canonicalPath ?? `/${post.slug}`
}

// Only aliases with an identified equivalent are normalized. Unknown URLs stay unknown.
export function normalizeBlogHref(href: string): string | undefined {
  const value = href.trim().replace(/&amp;/g, "&")
  if (/^[#?]/.test(value)) return value
  if (!value || value.startsWith("//") || /[\u0000-\u0020\u007f]/.test(value)) return undefined
  let url: URL
  try { url = new URL(value, BLOG_ORIGIN) } catch { return undefined }
  if (!["http:", "https:"].includes(url.protocol)) return undefined
  const local = ["cottoncountry.com.pe", "www.cottoncountry.com.pe"].includes(url.hostname)
  if (!local) return url.href
  const path = url.pathname.replace(/\/+$/, "") || "/"
  const slug = path.startsWith("/blog/") ? path.slice(6) : path.slice(1)
  const canonical = slugs.has(slug) ? `/${slug}` : path
  return `${canonical}${url.search}${url.hash}`
}
