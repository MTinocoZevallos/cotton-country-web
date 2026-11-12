export const blogCategories = [
  {
    "id": "algodon",
    "slug": "algodon-y-cultura-textil",
    "name": "Algodón y cultura textil",
    "description": "La fibra, su historia y las personas que dan forma a nuestra cultura textil."
  },
  {
    "id": "industria",
    "slug": "industria-y-materiales",
    "name": "Industria y materiales",
    "description": "Fibras, tejidos y procesos para comprender las decisiones detrás de cada prenda."
  },
  {
    "id": "compras",
    "slug": "compras-y-logistica",
    "name": "Compras y logística",
    "description": "Criterios para definir proyectos, comparar propuestas y organizar el abastecimiento."
  },
  {
    "id": "tallaje",
    "slug": "tallaje-y-dotaciones",
    "name": "Tallaje y dotaciones",
    "description": "Medidas, patrones y pruebas para organizar una dotación que considere a sus usuarios."
  },
  {
    "id": "uniformes",
    "slug": "uniformes-y-aplicaciones",
    "name": "Uniformes y aplicaciones",
    "description": "Diseño y uso de prendas en distintos equipos, funciones y entornos de trabajo."
  }
] as const

export type BlogCategoryId = typeof blogCategories[number]["id"]

export const postCategoryIds: Record<string, BlogCategoryId> = {
  "el-algodon-se-caso-con-el-poliester-en-oxford": "algodon",
  "dime-que-uniforme-usas-y-te-dire-cuanto-te-quieren": "uniformes",
  "es-mejor-elegir-a-un-proveedor-de-uniformes-con-taller-o-sin-taller": "compras",
  "5-tipos-de-tejidos-inteligentes": "industria",
  "estafas-textiles-no-seas-victima-de-la-falta-de-informacion": "compras",
  "mascarillas-y-covid-19": "uniformes",
  "materiales-textiles-inteligentes-segun-el-tipo-de-uniformes": "industria",
  "por-que-comprar-uniformes-de-trabajo-para-mis-empleados": "uniformes",
  "uniformes-de-chef-que-tela-elegir": "uniformes",
  "que-caracteristicas-deben-tener-los-uniformes-de-seguridad-industrial": "uniformes",
  "el-uniforme-de-farmacia": "uniformes",
  "por-que-usar-mascarillas-reutilizables-lavables": "uniformes",
  "cuales-son-las-caracteristicas-que-deben-tener-las-mascarillas-de-tela": "uniformes",
  "venta-de-mascarillas-en-lima-como-saber-que-mi-mascarilla-me-protege": "uniformes",
  "escudos-faciales-o-mascarillas-de-tela-cual-es-mas-efectivo": "uniformes",
  "como-cuidar-tu-mascarilla-de-tela-certificada": "uniformes",
  "mascarillas-y-covid-19-segunda-ola": "uniformes",
  "empaques-sostenibles-y-bioseguridad-en-el-transporte-de-prendas": "compras",
  "ntp-aplicada-en-mascarillas-reutilizables": "uniformes",
  "procesos-de-confeccion-seguros": "industria",
  "delivery-aliado-de-la-industria-textil-confecciones": "compras",
  "que-talla-eres-en-peru": "tallaje",
  "el-problema-de-las-tallas": "tallaje",
  "ntp-para-la-designacion-de-tallas": "tallaje",
  "la-talla-peruana": "tallaje",
  "medalla-de-oro-en-uniformes": "uniformes",
  "los-uniformes-un-problema-olimpico": "uniformes",
  "disenador-a-sus-disenos": "uniformes",
  "3-consejos-para-compradores-de-textiles-b2b": "compras",
  "el-futuro-de-la-industria-textil-y-de-confecciones": "industria",
  "logistica-y-abastecimiento-textil-2022": "compras",
  "que-significa-tallas-completas-en-ropa": "tallaje",
  "guia-de-tallas-online": "tallaje",
  "una-breve-historia-del-algodon": "algodon",
  "el-ano-del-algodon-2022": "algodon",
  "tallas-completas-en-peru": "tallaje",
  "las-tallas-completas-segun-una-ia": "tallaje",
  "como-elegir-el-uniforme-perfecto-para-tu-negocio-segun-chatgpt": "uniformes",
  "una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano": "tallaje",
  "uniformes-de-guerra": "uniformes",
  "un-tejido-llamado-gaza": "algodon",
  "perumin-2023": "industria",
  "como-elegir-la-prenda-de-invierno-ideal-segun-tu-rubro-empresarial": "uniformes",
  "compras-comerciales-vs-compras-industriales-por-que-fabricar-uniformes-a-pedido-es-la-mejor-opcion": "compras",
  "novedades-en-el-mercado-de-uniformes-para-el-2025-tendencias-que-no-puedes-perderte": "industria",
  "uniformes-a-medida-o-por-tallas-descubre-la-opcion-mas-practica-y-conveniente": "tallaje",
  "mujeres-que-tejen-el-mundo-con-su-fuerza-y-pasion": "algodon",
  "como-definir-un-proyecto-de-uniformes-corporativos": "compras",
  "por-que-las-empresas-tienen-problemas-con-las-tallas": "tallaje",
  "de-que-depende-el-tiempo-de-entrega-de-uniformes": "compras",
  "dia-mundial-del-algodon-2026": "algodon",
  "el-fenomeno-del-nino-y-su-impacto-en-la-industria-textil": "industria",
  "sector-textil-peruano-emergencia-productividad-2026": "industria"
}
