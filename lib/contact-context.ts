import { casePath, garmentCategories, publishedCases, sectors } from "./uniforms"

export type ContactContext = { source_path: string; interest_type?: "sector" | "caso" | "prenda"; sector?: string; case_id?: string; garment_category?: string }
const generalPaths = new Set(["/", "/contacto", "/uniformes", "/proveedor-de-uniformes-corporativos", "/uniformes/scrubs"])
// Only known local paths and catalog identifiers can enter the email. Incoming labels are never trusted.
export function sanitizeContactContext(input: unknown): ContactContext {
  const raw = input && typeof input === "object" ? input as Record<string, unknown> : {}
  const path = typeof raw.source_path === "string" ? raw.source_path : "/contacto"
  const project = publishedCases.find(item => casePath(item) === path)
  if (project) return { source_path: path, interest_type: "caso", sector: project.sector, case_id: project.id }
  const sector = sectors.find(item => `/uniformes/${item.id}` === path)
  if (sector) return { source_path: path, interest_type: "sector", sector: sector.id }
  const matches = garmentCategories.filter(item => item.href === path && !item.href.includes("?"))
  const category = garmentCategories.find(item => item.id === raw.garment_category)
  if (matches.length) return { source_path: path, interest_type: "prenda", garment_category: matches.find(item => item.id === category?.id)?.id ?? (matches.length === 1 ? matches[0].id : "pantalones") }
  if (path === "/uniformes" && category) return { source_path: path, interest_type: "prenda", garment_category: category.id }
  return { source_path: generalPaths.has(path) ? path : "/contacto" }
}
export function browserContactContext(path: string, query: URLSearchParams): ContactContext {
  return sanitizeContactContext({ source_path: path === "/contacto" ? query.get("source_path") ?? path : path, garment_category: query.get("garment_category") ?? query.get("categoria") })
}
export function contactHref(context: { source_path: string; garment_category?: string }) {
  const clean = sanitizeContactContext(context)
  return `/contacto?${new URLSearchParams(Object.entries(clean)).toString()}#contacto`
}
export function contactContextText(context: ContactContext) {
  return `\nContexto de la consulta:\n${Object.entries(context).map(([key, value]) => `${key}: ${value}`).join("\n")}\n`
}
