export const garmentCategories = [
  { id: "camisas", name: "Camisas", href: "/uniformes/camisas" },
  { id: "blusas", name: "Blusas", href: "/uniformes/blusas" },
  { id: "pantalones-dama", name: "Pantalones de dama", href: "/uniformes/pantalones" },
  { id: "pantalones-caballero", name: "Pantalones de caballero", href: "/uniformes/pantalones" },
  { id: "polos", name: "Polos", href: "/uniformes/polos" },
  { id: "chalecos", name: "Chalecos", href: "/uniformes?categoria=chalecos#prendas" },
  { id: "casacas", name: "Casacas", href: "/uniformes?categoria=casacas#prendas" },
  { id: "sacos", name: "Sacos", href: "/uniformes?categoria=sacos#prendas" },
] as const
export type GarmentCategory = typeof garmentCategories[number]["id"]
export type SectorId = "retail" | "educacion" | "agroindustria"
export const sectors: { id: SectorId; name: string; public: boolean; title: string; intro: string; criteria: string[] }[] = [
  { id: "retail", name: "Retail", public: true, title: "Uniformes para equipos que representan tu marca.", intro: "La atención al público y el trabajo en tienda requieren una presentación coherente con la identidad de cada empresa. El proyecto debe considerar las funciones de venta, atención y operación, además de las condiciones de cada punto de contacto.", criteria: ["Identidad visual y presentación del equipo.", "Movilidad y comodidad durante la jornada.", "Diferenciación de funciones y necesidades de reposición."] },
  { id: "educacion", name: "Educación", public: true, title: "Una identidad institucional que se viste cada día.", intro: "Los equipos de una institución educativa cumplen funciones distintas: atención, administración, docencia y apoyo. Definir esas actividades permite evaluar prendas apropiadas para cada entorno y una presentación institucional consistente.", criteria: ["Funciones y protocolos de presentación de cada área.", "Tallaje y comodidad para diferentes actividades.", "Identificación institucional, acabados y continuidad entre entregas."] },
  { id: "agroindustria", name: "Agroindustria", public: false, title: "El uniforme parte de las condiciones de trabajo.", intro: "En un proyecto agroindustrial es necesario conocer las funciones, las condiciones del entorno y los protocolos de la organización antes de definir las prendas. La información técnica del requerimiento orienta la evaluación de materiales y confección.", criteria: ["Condiciones de uso y actividades del personal.", "Requisitos técnicos y protocolos definidos por la empresa.", "Tallaje, mantenimiento y planificación de entregas."] },
]
export type Garment = { id: string; category: GarmentCategory; name: string; image: string; alt: string; caseId?: string }
// These five photographs were supplied and approved for Home 2027. No client association is inferred.
export const garments: Garment[] = [
  { id: "camisa-blanca", category: "camisas", name: "Camisa blanca de manga larga", image: "/home-2027/camisas.webp", alt: "Modelo masculino con camisa blanca de manga larga" },
  { id: "blusa-blanca", category: "blusas", name: "Blusa blanca de manga larga", image: "/home-2027/blusas.webp", alt: "Modelo femenino con blusa blanca de manga larga" },
  { id: "pantalon-dama", category: "pantalones-dama", name: "Pantalón azul marino de dama", image: "/home-2027/pantalon-mujer.webp", alt: "Pantalón azul marino de dama, vista completa" },
  { id: "pantalon-caballero", category: "pantalones-caballero", name: "Pantalón azul marino de caballero", image: "/home-2027/pantalon-hombre.webp", alt: "Pantalón azul marino de caballero, vista completa" },
  { id: "polo-marino", category: "polos", name: "Polo azul marino", image: "/home-2027/polos.webp", alt: "Modelo masculino con polo azul marino de manga corta" },
]
export type CasePhoto = { src: string; alt: string; evidence: string; width?: number; height?: number }
export type CaseSeason = {
  id: string; name: string
  outfits: { id: string; name: string; status: "draft" | "published"; fullImage?: CasePhoto; garmentIds: string[]; confirmedDescription?: string }[]
}
export type ProjectCase = {
  id: string; client: string; sector: SectorId; status: "draft" | "published"
  fullImages: CasePhoto[]
  subtitle?: string; concept?: string; seasons?: CaseSeason[]
  garmentIds: string[]; categories: GarmentCategory[]
  story: { requirement?: string; challenge?: string; solution?: string; result?: string }
  pending: string[]
}
const decorWinter: CasePhoto = { src: "/casos/decor-center/invierno-dama.webp", alt: "Uniforme de invierno de Decor Center: chaleco largo camel sin botones, blusa negra y pantalón negro", width: 1254, height: 1254, evidence: "Versión con postura y nitidez ajustadas, aprobada en la conversación; referencia: Uniforme Completo - DecorCenter Invierno.png" }
const decorSummer: CasePhoto = { src: "/casos/decor-center/verano-dama.webp", alt: "Uniforme de verano de Decor Center: polo negro de cuello V y pantalón negro", width: 1071, height: 1468, evidence: "Versión con postura y nitidez ajustadas, aprobada en la conversación; referencia: Uniforme Completo - DecorCenter Verano.png" }
const decorWinterMan: CasePhoto = { src: "/casos/decor-center/invierno-caballero.webp", alt: "Uniforme masculino de invierno de Decor Center: chompa camel de cuello V, camisa negra y pantalón negro", width: 768, height: 1024, evidence: "Fotografía definitiva proporcionada en Decor Center Hombres.zip: DecorCenter_Hombre_Invierno.png; optimización WebP sin pérdida" }
const decorSummerMan: CasePhoto = { src: "/casos/decor-center/verano-caballero.webp", alt: "Uniforme masculino de verano de Decor Center: polo box negro con identificación corporativa y pantalón negro", width: 768, height: 1024, evidence: "Fotografía definitiva proporcionada en Decor Center Hombres.zip: DecorCenter_Hombre_Verano.png; optimización WebP sin pérdida" }
export const projectCases: ProjectCase[] = [
  {
    id: "decor-center", client: "Decor Center", sector: "retail", status: "published",
    subtitle: "Uniformes que conectan identidad, estilo y personas.",
    concept: "La identidad corporativa no siempre necesita un logotipo. También puede expresarse mediante el diseño del uniforme.",
    fullImages: [decorWinter, decorWinterMan, decorSummer, decorSummerMan], garmentIds: [], categories: ["chalecos", "blusas", "polos", "pantalones-dama", "pantalones-caballero"],
    seasons: [
      { id: "invierno", name: "Invierno", outfits: [
        { id: "invierno-dama", name: "Uniforme de dama", status: "published", fullImage: decorWinter, garmentIds: [] },
        { id: "invierno-caballero", name: "Uniforme de caballero", status: "published", fullImage: decorWinterMan, garmentIds: [], confirmedDescription: "Chompa de cuello V camel/marrón, camisa negra y pantalón negro. Silueta estilizada y presentación contemporánea, sin logotipos, bordados ni estampados." },
      ] },
      { id: "verano", name: "Verano", outfits: [
        { id: "verano-dama", name: "Uniforme de dama", status: "published", fullImage: decorSummer, garmentIds: [] },
        { id: "verano-caballero", name: "Uniforme de caballero", status: "published", fullImage: decorSummerMan, garmentIds: [] },
      ] },
    ],
    story: {
      challenge: "Desarrollar uniformes acordes con la presentación que los clientes esperan en los espacios comerciales de Decor Center, considerando también las preferencias estéticas de sus colaboradores.",
      solution: "Diseñamos propuestas diferenciadas para invierno y verano. Incorporamos el camel, un color de tendencia en aquel momento, y prendas de cortes estilizados. El chaleco femenino y la chompa masculina aportaron una identidad visual reconocible, mientras que los conjuntos de verano ofrecieron una alternativa más ligera.",
      result: "La propuesta tuvo una recepción positiva entre los colaboradores, quienes valoraron que el vestuario considerara sus preferencias de estilo. El uniforme contribuyó a expresar la identidad de la empresa mediante sus propios colores, siluetas y acabados.",
    },
    pending: ["Fotografías individuales de las prendas"],
  },
  { id: "avinka", client: "Avinka", sector: "retail", status: "draft", fullImages: [{ src: "/proyecto-avinka.png", alt: "Uniforme Avinka con blusa y pantalón", evidence: "app/proveedor-de-uniformes-corporativos/page.tsx: proyecto Avinka identificado con este archivo" }], garmentIds: [], categories: ["blusas", "pantalones-dama"], story: { solution: "Blusa y pantalón para atención al cliente, presentación y comodidad en operación diaria." }, pending: ["Fotografías individuales verificadas", "Requerimiento, desafío y resultado documentados"] },
  { id: "isil", client: "ISIL", sector: "educacion", status: "draft", fullImages: [], garmentIds: [], categories: [], story: {}, pending: ["Fotografías verificadas", "Historia del proyecto"] },
  { id: "columbia", client: "Columbia", sector: "educacion", status: "draft", fullImages: [], garmentIds: [], categories: [], story: {}, pending: ["Fotografías verificadas", "Historia del proyecto"] },
  { id: "molino-contreras", client: "Molino Contreras", sector: "agroindustria", status: "draft", fullImages: [], garmentIds: [], categories: [], story: {}, pending: ["Fotografías aprobadas a partir de muestras reales", "Historia del proyecto"] },
  { id: "premex", client: "Premex", sector: "agroindustria", status: "draft", fullImages: [], garmentIds: [], categories: [], story: {}, pending: ["Fotografías aprobadas a partir de muestras reales", "Historia del proyecto"] },
]
export function isPublishedCase(item: ProjectCase) {
  return item.status === "published" && !!sectors.find(s => s.id === item.sector)?.public && item.fullImages.length > 0 &&
    item.garmentIds.every(id => garments.some(g => g.id === id && g.caseId === item.id)) &&
    (item.seasons
      ? item.seasons.some(season => season.outfits.some(outfit => outfit.status === "published" && !!outfit.fullImage)) && [item.story.challenge, item.story.solution, item.story.result].every(value => !!value?.trim())
      : item.garmentIds.length > 0 && Object.values(item.story).length === 4 && Object.values(item.story).every(value => !!value?.trim()))
}
export const publishedCases = projectCases.filter(isPublishedCase)
export function casePath(item: ProjectCase) { return `/uniformes/${item.sector}/${item.id}` }
