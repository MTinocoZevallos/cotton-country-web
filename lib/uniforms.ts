import { garmentModels } from "./garment-models"

export const garmentCategories = [
  { id: "camisas", name: "Camisas", href: "/uniformes/camisas" },
  { id: "blusas", name: "Blusas", href: "/uniformes/blusas" },
  { id: "pantalones-dama", name: "Pantalones de dama", href: "/uniformes/pantalones-dama" },
  { id: "pantalones-caballero", name: "Pantalones de caballero", href: "/uniformes/pantalones-caballero" },
  { id: "polos", name: "Polos", href: "/uniformes/polos" },
  { id: "chalecos", name: "Chalecos", href: "/uniformes?categoria=chalecos#prendas" },
  { id: "casacas", name: "Casacas", href: "/uniformes/casacas" },
  { id: "sacos", name: "Sacos", href: "/uniformes?categoria=sacos#prendas" },
] as const
export type GarmentCategory = typeof garmentCategories[number]["id"]
export type SectorId = "retail" | "educacion" | "agroindustria"
export const sectors: { id: SectorId; name: string; public: boolean; title: string; intro: string; criteria: string[] }[] = [
  { id: "retail", name: "Retail", public: true, title: "Uniformes para equipos que representan tu marca.", intro: "La atención al público y el trabajo en tienda requieren una presentación coherente con la identidad de cada empresa. El proyecto debe considerar las funciones de venta, atención y operación, además de las condiciones de cada punto de contacto.", criteria: ["Identidad visual y presentación del equipo.", "Movilidad y comodidad durante la jornada.", "Diferenciación de funciones y necesidades de reposición."] },
  { id: "educacion", name: "Educación", public: true, title: "Una identidad institucional que se viste cada día.", intro: "Los equipos de una institución educativa cumplen funciones distintas: atención, administración, docencia y apoyo. Definir esas actividades permite evaluar prendas apropiadas para cada entorno y una presentación institucional consistente.", criteria: ["Funciones y protocolos de presentación de cada área.", "Tallaje y comodidad para diferentes actividades.", "Identificación institucional, acabados y continuidad entre entregas."] },
  { id: "agroindustria", name: "Agroindustria", public: false, title: "El uniforme parte de las condiciones de trabajo.", intro: "En un proyecto agroindustrial es necesario conocer las funciones, las condiciones del entorno y los protocolos de la organización antes de definir las prendas. La información técnica del requerimiento orienta la evaluación de materiales y confección.", criteria: ["Condiciones de uso y actividades del personal.", "Requisitos técnicos y protocolos definidos por la empresa.", "Tallaje, mantenimiento y planificación de entregas."] },
]
export type Garment = { id: string; category: GarmentCategory; number: string; name: string; image: string; alt: string; description: string; caseId?: string }
// Only approved editorial models enter the catalog. Case associations are separate.
export const garments: Garment[] = Object.entries(garmentModels).flatMap(([category, models]) =>
  models.map(model => ({
    id: `${category}-${model.number}`,
    category: category as GarmentCategory,
    number: model.number,
    name: model.title,
    image: model.image,
    alt: model.alt,
    description: model.description,
  }))
)
export type CasePhoto = { src: string; alt: string; evidence: string; width?: number; height?: number; caption?: string }
export type CaseSeason = {
  id: string; name: string
  outfits: { id: string; name: string; status: "draft" | "published"; fullImage?: CasePhoto; garmentIds: string[]; confirmedDescription?: string }[]
}
export type ProjectCase = {
  id: string; client: string; sector: SectorId; status: "draft" | "published"
  fullImages: CasePhoto[]
  subtitle?: string; concept?: string; seasons?: CaseSeason[]
  title?: string; eyebrow?: string; presentation?: "editorial" | "variants" | "roles"
  intro?: string
  roleHeadings?: { challenge: string; result: string }
  roles?: { id: string; title: string; description: string; photo: CasePhoto }[]
  seo?: { title: string; description: string }
  features?: { name: string; description: string }[]
  futureCategories?: string[]
  garmentIds: string[]; categories: GarmentCategory[]
  story: { requirement?: string; challenge?: string; solution?: string; result?: string }
  pending: string[]
}
const decorWinter: CasePhoto = { src: "/casos/decor-center/invierno-dama.webp", alt: "Uniforme de invierno de Decor Center: chaleco largo camel sin botones, blusa negra y pantalón negro", width: 1254, height: 1254, evidence: "Versión con postura y nitidez ajustadas, aprobada en la conversación; referencia: Uniforme Completo - DecorCenter Invierno.png" }
const decorSummer: CasePhoto = { src: "/casos/decor-center/verano-dama.webp", alt: "Uniforme de verano de Decor Center: polo negro de cuello V y pantalón negro", width: 1071, height: 1468, evidence: "Versión con postura y nitidez ajustadas, aprobada en la conversación; referencia: Uniforme Completo - DecorCenter Verano.png" }
const decorWinterMan: CasePhoto = { src: "/casos/decor-center/invierno-caballero.webp", alt: "Uniforme masculino de invierno de Decor Center: chompa camel de cuello V, camisa negra y pantalón negro", width: 768, height: 1024, evidence: "Fotografía definitiva proporcionada en Decor Center Hombres.zip: DecorCenter_Hombre_Invierno.png; optimización WebP sin pérdida" }
const decorSummerMan: CasePhoto = { src: "/casos/decor-center/verano-caballero.webp", alt: "Uniforme masculino de verano de Decor Center: polo box negro con identificación corporativa y pantalón negro", width: 768, height: 1024, evidence: "Fotografía definitiva proporcionada en Decor Center Hombres.zip: DecorCenter_Hombre_Verano.png; optimización WebP sin pérdida" }
const isilPhotos: CasePhoto[] = [
  { src: "/casos/isil/01-supervisoras.webp", alt: "Supervisora de Servicios al Estudiante de ISIL con casaca acolchada negra, polo blanco y pantalón oscuro de drill", width: 1024, height: 1536, evidence: "01_Supervisoras.png de Isil.zip, optimización WebP sin pérdida" },
  { src: "/casos/isil/02-asesores.webp", alt: "Asesor de ISIL con chaleco acolchado negro, polo negro institucional y jean", width: 1024, height: 1536, evidence: "02_Asesores.png de Isil.zip, optimización WebP sin pérdida" },
  { src: "/casos/isil/03-recursos-tecnologicos.webp", alt: "Personal de Recursos Tecnológicos con casaca softshell gris, bordado ISIL y jean", width: 1024, height: 1536, evidence: "03_Recursos_Tecnologicos.png de Isil.zip, optimización WebP sin pérdida" },
  { src: "/casos/isil/04-prospeccion.webp", alt: "Personal de Prospección con bomber azul oscuro de mangas beige, bordado ISIL y jean", width: 1024, height: 1536, evidence: "04_Prospeccion.png de Isil.zip, optimización WebP sin pérdida" },
  { src: "/casos/isil/05-harson.webp", alt: "Uniforme Harson University con casaca verde, distintivo HU, parche de bandera estadounidense y pantalón oscuro de drill", width: 1024, height: 1536, evidence: "05_Harson.png de Isil.zip, optimización WebP sin pérdida" },
]
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
  {
    id: "avinka", client: "Avinka Artisan", sector: "retail", status: "published", presentation: "editorial",
    eyebrow: "AVINKA — ARTISAN", title: "Del concepto de marca a un uniforme con identidad propia.",
    seo: { title: "Uniformes para Avinka Artisan | Caso de éxito Cotton Country", description: "Conoce cómo Cotton Country transformó el concepto de Avinka Artisan en uniformes para anfitrionas, combinando diseño, colores y acabados." },
    fullImages: [
      { src: "/casos/avinka/uniforme-artisan.jpg", alt: "Anfitriona de Avinka Artisan con gorra verde tipo Cristina, blusa amarillo maíz con cuello y puños verdes y pantalón verde", width: 1684, height: 2528, evidence: "Avinka Uniforme.jfif de Avinka.zip, archivo JPEG original copiado sin recomprimir ni retocar" },
      { src: "/casos/avinka/equipo-artisan.jpg", alt: "Equipo de impulsadoras de Avinka Artisan con gorras verdes y blusas amarillo maíz durante el lanzamiento de pollos de crianza natural", width: 2752, height: 1536, evidence: "Artisan Team.jfif de Avinka.zip, archivo JPEG original copiado sin recomprimir ni retocar" },
    ],
    garmentIds: [], categories: ["blusas", "pantalones-dama"], futureCategories: ["gorras"],
    features: [
      { name: "Gorra", description: "Tipo Cristina, verde oliva." },
      { name: "Blusa", description: "Corte con pinzas, popelina amarillo maíz, cuello y puños verdes." },
      { name: "Pantalón", description: "Chino clásico con pretina ancha, verde." },
      { name: "Bordado", description: "Gran formato, apariencia artesanal." },
    ],
    story: {
      challenge: "Para el lanzamiento de Artisan, su línea de pollos de crianza natural, Avinka buscaba un uniforme para las anfitrionas encargadas de presentar el producto en supermercados.\n\nLa marca contaba con una propuesta gráfica inicial, pero necesitaba convertirla en prendas concretas que comunicaran naturalidad, cercanía y una presentación diferenciada en el punto de venta.\n\nEl desafío consistía en interpretar ese concepto, identificar las prendas adecuadas y encontrar los materiales, colores y acabados que permitieran hacerlo realidad.",
      solution: "En Cotton Country transformamos la propuesta gráfica en un conjunto de prendas con características definidas.\n\nSeleccionamos una gorra tipo Cristina, una blusa de corte con pinzas y un pantalón chino clásico con pretina ancha.\n\nLa elección de colores fue determinante. El verde oliva debía transmitir la conexión con lo natural, mientras que el amarillo maíz requería encontrar una tonalidad específica de popelina que respetara la identidad de la nueva línea.\n\nCompletamos el conjunto con un bordado de gran formato y apariencia artesanal, pensado para reforzar el carácter del producto.\n\nCada decisión permitió trasladar el concepto original de Artisan a una presentación coherente y reconocible.",
      result: "El uniforme tuvo una excelente recepción tanto en el área de marketing de Avinka como entre las impulsadoras que lo utilizaron.\n\nLa combinación de colores, cortes y bordados consiguió expresar la identidad de Artisan y ofrecer al equipo una presentación distintiva durante el lanzamiento.",
    },
    concept: "Un buen uniforme convierte una idea de marca en una experiencia visible.",
    pending: ["Fotografías individuales de las prendas"],
  },
  {
    id: "isil", client: "ISIL", sector: "educacion", status: "published", presentation: "roles",
    eyebrow: "ISIL", title: "ISIL: una identidad, distintas funciones",
    intro: "En una institución educativa, no todos los equipos desempeñan las mismas funciones ni necesitan vestir de la misma manera.\n\nISIL buscaba desarrollar una propuesta de uniformes que respondiera a las particularidades de sus diferentes áreas, manteniendo una identidad institucional reconocible.\n\nEl proyecto comprendió cinco grupos de personal, cada uno con requerimientos específicos de presentación, comodidad y funcionalidad.",
    seo: { title: "Uniformes para ISIL | Cotton Country", description: "Conoce el proyecto de uniformes para cinco equipos de ISIL: propuestas para distintas funciones con una identidad institucional reconocible." },
    fullImages: isilPhotos, garmentIds: [], categories: ["casacas", "chalecos", "polos", "pantalones-dama", "pantalones-caballero"],
    roleHeadings: { challenge: "Diferenciar funciones sin perder identidad", result: "La coherencia no exige uniformidad" },
    roles: [
      { id: "supervisoras", title: "01 — Supervisoras de Servicios al Estudiante", photo: isilPhotos[0], description: "Una propuesta de presentación profesional que combina prendas de líneas sobrias con alternativas de abrigo, manteniendo una imagen institucional adecuada para la atención y supervisión." },
      { id: "asesores", title: "02 — Asesores", photo: isilPhotos[1], description: "Una combinación de polo institucional y prendas de abrigo que aporta comodidad y una imagen contemporánea para el trabajo diario y el contacto con estudiantes." },
      { id: "recursos-tecnologicos", title: "03 — Recursos Tecnológicos", photo: isilPhotos[2], description: "Una propuesta funcional de tonos grises, con casaca softshell y detalles institucionales, pensada para acompañar las actividades del equipo tecnológico." },
      { id: "prospeccion", title: "04 — Prospección", photo: isilPhotos[3], description: "Una interpretación más dinámica de la identidad institucional mediante una casaca bomber de inspiración universitaria, con combinaciones cromáticas y acabados diferenciados." },
      { id: "harson", title: "05 — Harson University", photo: isilPhotos[4], description: "Una propuesta con identidad propia, desarrollada alrededor del verde institucional, los distintivos HU y los detalles característicos de su indumentaria universitaria." },
    ],
    story: {
      challenge: "El reto consistía en interpretar las referencias y especificaciones de cada área para convertirlas en prendas concretas, coherentes con la identidad visual de ISIL y adecuadas al trabajo cotidiano.\n\nNo se trataba de aplicar un mismo uniforme a toda la organización, sino de resolver necesidades distintas mediante una propuesta coordinada.",
      solution: "Cinco equipos, cinco propuestas",
      result: "El resultado es un conjunto de propuestas que reconoce las diferencias entre equipos y funciones sin renunciar a una presentación institucional cuidada.\n\nCada prenda responde a un contexto específico, mientras los colores, materiales, acabados y detalles contribuyen a construir una identidad visual consistente.",
    },
    pending: [],
  },
  {
    id: "columbia", client: "Instituto Columbia", sector: "educacion", status: "published", presentation: "variants",
    eyebrow: "INSTITUTO COLUMBIA", title: "De una idea de diseño a un uniforme para todas las estaciones.",
    subtitle: "Un único uniforme adaptable a invierno y verano.",
    seo: { title: "Uniformes para Instituto Columbia | Cotton Country", description: "Conoce cómo Cotton Country convirtió las ideas de diseño del Instituto Columbia en un uniforme institucional versátil para invierno y verano." },
    fullImages: [
      { src: "/casos/columbia/con-saco.webp", alt: "Uniforme del Instituto Columbia con saco azul institucional, blusa blanca, pantalón azul y pañuelo azul y amarillo", width: 1024, height: 1536, caption: "Con saco — Invierno", evidence: "columbia-1.png de imagenes-cotton-country-2027.zip; WebP de alta calidad sin retoques ni cambio de proporciones" },
      { src: "/casos/columbia/sin-saco.webp", alt: "El mismo uniforme del Instituto Columbia sin saco: blusa blanca de manga corta con detalle de confección, pantalón azul institucional y pañuelo azul y amarillo", width: 1024, height: 1536, caption: "Sin saco — Verano", evidence: "columbia-2.png de imagenes-cotton-country-2027.zip; WebP de alta calidad sin retoques ni cambio de proporciones" },
    ],
    garmentIds: [], categories: ["sacos", "blusas", "pantalones-dama"],
    features: [
      { name: "Saco de dama", description: "Azul institucional, corte contemporáneo." },
      { name: "Blusa", description: "Blanca, manga corta con detalle especial de confección." },
      { name: "Pantalón de dama", description: "Azul institucional, corte definido para el conjunto." },
      { name: "Pañuelo", description: "Azul y amarillo, complemento distintivo." },
    ],
    story: {
      challenge: "El Instituto Columbia buscaba renovar los uniformes de su personal administrativo y de sus distintas sedes.\n\nLa institución había investigado referencias de diseño y tenía una idea clara de la imagen que deseaba proyectar. El reto consistía en determinar cómo trasladar esas referencias a prendas reales, conservando los detalles que consideraba importantes.\n\nColumbia buscaba una presentación profesional y contemporánea, con un carácter más juvenil y alejado de la estética tradicional de los uniformes institucionales.\n\nAdemás, el conjunto debía ofrecer una solución práctica para invierno y verano, sin necesidad de desarrollar dos uniformes completamente diferentes.",
      solution: "En Cotton Country trabajamos a partir de las referencias proporcionadas por Columbia, traduciendo su propuesta visual a modelos concretos y detalles de confección.\n\nPrestamos especial atención al diseño de las mangas de la blusa, el corte del pantalón, la estructura del saco y el pañuelo como elemento distintivo del conjunto.\n\nLa elección del color también fue fundamental. En lugar del azul marino convencional, se seleccionó una tonalidad de azul que aportara frescura y personalidad, manteniendo la formalidad necesaria para el entorno educativo.\n\nEl conjunto se resolvió como un sistema de prendas complementarias: con saco para invierno y sin saco para verano, conservando los mismos elementos de identidad.\n\nDe esta manera, una sola propuesta de uniforme podía adaptarse a diferentes condiciones de uso.",
      result: "El proyecto permitió convertir las referencias de diseño de Columbia en un uniforme real, coherente y versátil.\n\nLos cortes contemporáneos, los detalles de confección, el pañuelo y la tonalidad de azul construyeron una identidad institucional renovada.\n\nLa posibilidad de utilizar el mismo conjunto en invierno y verano aportó flexibilidad sin perder uniformidad visual.",
    },
    concept: "Un buen proyecto de uniformes no consiste únicamente en reproducir una imagen, sino en convertir una idea en prendas que funcionen en la realidad.",
    pending: ["Fotografías individuales de las prendas"],
  },
  { id: "molino-contreras", client: "Molino Contreras", sector: "agroindustria", status: "draft", fullImages: [], garmentIds: [], categories: [], story: {}, pending: ["Fotografías aprobadas a partir de muestras reales", "Historia del proyecto"] },
  { id: "premex", client: "Premex", sector: "agroindustria", status: "draft", fullImages: [], garmentIds: [], categories: [], story: {}, pending: ["Fotografías aprobadas a partir de muestras reales", "Historia del proyecto"] },
]
export function isPublishedCase(item: ProjectCase) {
  return item.status === "published" && !!sectors.find(s => s.id === item.sector)?.public && item.fullImages.length > 0 &&
    item.garmentIds.every(id => garments.some(g => g.id === id && g.caseId === item.id)) &&
    (item.presentation === "roles"
      ? !!item.roles?.length && item.roles.every(role => role.title.trim() && role.description.trim() && item.fullImages.some(photo => photo.src === role.photo.src)) && [item.story.challenge, item.story.solution, item.story.result].every(value => !!value?.trim())
      : (item.presentation === "editorial" || item.presentation === "variants")
      ? item.fullImages.length >= 2 && [item.story.challenge, item.story.solution, item.story.result].every(value => !!value?.trim())
      : item.seasons
      ? item.seasons.some(season => season.outfits.some(outfit => outfit.status === "published" && !!outfit.fullImage)) && [item.story.challenge, item.story.solution, item.story.result].every(value => !!value?.trim())
      : item.garmentIds.length > 0 && Object.values(item.story).length === 4 && Object.values(item.story).every(value => !!value?.trim()))
}
export const publishedCases = projectCases.filter(isPublishedCase)
export function casePath(item: ProjectCase) { return `/uniformes/${item.sector}/${item.id}` }
