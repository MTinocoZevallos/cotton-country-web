// Existing approved assets; dimensions read from the original files.
export type BlogImage = { src: string; width: number; height: number; alt: string }
const images: Record<string, BlogImage> = {
  "el-algodon-se-caso-con-el-poliester-en-oxford": {
    "src": "/blog/el-algodon-se-caso-con-el-poliester-en-oxford.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Detalle de una tela azul con una aguja de coser"
  },
  "dime-que-uniforme-usas-y-te-dire-cuanto-te-quieren": {
    "src": "/blog/dime-que-uniforme-usas-y-te-dire-cuanto-te-quieren.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Camisas de distintos colores colgadas en perchas de madera"
  },
  "es-mejor-elegir-a-un-proveedor-de-uniformes-con-taller-o-sin-taller": {
    "src": "/blog/es-mejor-elegir-a-un-proveedor-de-uniformes-con-taller-o-sin-taller.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Pie de una máquina de coser trabajando sobre tela azul"
  },
  "5-tipos-de-tejidos-inteligentes": {
    "src": "/blog/5-tipos-de-tejidos-inteligentes.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Detalle de la textura de un tejido azul"
  },
  "estafas-textiles-no-seas-victima-de-la-falta-de-informacion": {
    "src": "/blog/estafas-textiles-no-seas-victima-de-la-falta-de-informacion.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Muestrarios de telas de diferentes colores abiertos sobre una mesa"
  },
  "mascarillas-y-covid-19": {
    "src": "/blog/mascarillas-y-covid-19.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Mujer con mascarilla de tela azul"
  },
  "materiales-textiles-inteligentes-segun-el-tipo-de-uniformes": {
    "src": "/blog/materiales-textiles-inteligentes-segun-el-tipo-de-uniformes.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Persona con uniforme sanitario verde y guantes frente a un fondo amarillo"
  },
  "por-que-comprar-uniformes-de-trabajo-para-mis-empleados": {
    "src": "/blog/por-que-comprar-uniformes-de-trabajo-para-mis-empleados.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Persona con polo verde y gorra sosteniendo un envase de papel"
  },
  "uniformes-de-chef-que-tela-elegir": {
    "src": "/blog/uniformes-de-chef-que-tela-elegir.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Persona con chaqueta blanca y gorro de cocina"
  },
  "que-caracteristicas-deben-tener-los-uniformes-de-seguridad-industrial": {
    "src": "/blog/que-caracteristicas-deben-tener-los-uniformes-de-seguridad-industrial.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Persona con casco y chaleco naranja en un entorno industrial"
  },
  "el-uniforme-de-farmacia": {
    "src": "/blog/el-uniforme-de-farmacia.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Mano con varios envases de medicamentos frente a una bata blanca"
  },
  "por-que-usar-mascarillas-reutilizables-lavables": {
    "src": "/blog/por-que-usar-mascarillas-reutilizables-lavables.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Persona con mascarilla blanca y prenda amarilla frente a un fondo azul"
  },
  "cuales-son-las-caracteristicas-que-deben-tener-las-mascarillas-de-tela": {
    "src": "/blog/cuales-son-las-caracteristicas-que-deben-tener-las-mascarillas-de-tela.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Mujer con mascarilla de tela en un espacio de trabajo"
  },
  "venta-de-mascarillas-en-lima-como-saber-que-mi-mascarilla-me-protege": {
    "src": "/blog/venta-de-mascarillas-en-lima-como-saber-que-mi-mascarilla-me-protege.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Mascarillas y materiales de confección junto a una cinta métrica"
  },
  "escudos-faciales-o-mascarillas-de-tela-cual-es-mas-efectivo": {
    "src": "/blog/escudos-faciales-o-mascarillas-de-tela-cual-es-mas-efectivo.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Personas en una mesa, una de ellas con protector facial"
  },
  "como-cuidar-tu-mascarilla-de-tela-certificada": {
    "src": "/blog/como-cuidar-tu-mascarilla-de-tela-certificada.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Manos sujetando una mascarilla de tela oscura"
  },
  "mascarillas-y-covid-19-segunda-ola": {
    "src": "/blog/mascarillas-y-covid-19-segunda-ola.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Persona ajustándose una mascarilla de tela oscura"
  },
  "empaques-sostenibles-y-bioseguridad-en-el-transporte-de-prendas": {
    "src": "/blog/empaques-sostenibles-y-bioseguridad-en-el-transporte-de-prendas.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Bolsa de papel naranja sobre un fondo azul"
  },
  "ntp-aplicada-en-mascarillas-reutilizables": {
    "src": "/blog/ntp-aplicada-en-mascarillas-reutilizables.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Persona con mascarilla amarilla"
  },
  "procesos-de-confeccion-seguros": {
    "src": "/blog/procesos-de-confeccion-seguros.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Persona con mascarilla y guantes junto a una máquina de coser"
  },
  "delivery-aliado-de-la-industria-textil-confecciones": {
    "src": "/blog/delivery-aliado-de-la-industria-textil-confecciones.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Persona con mascarilla y guantes sosteniendo una caja de cartón"
  },
  "que-talla-eres-en-peru": {
    "src": "/blog/que-talla-eres-en-peru.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Cinta métrica blanca dispuesta en curvas"
  },
  "el-problema-de-las-tallas": {
    "src": "/blog/el-problema-de-las-tallas.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Toma de una medida sobre una prenda azul con cinta métrica"
  },
  "ntp-para-la-designacion-de-tallas": {
    "src": "/blog/ntp-para-la-designacion-de-tallas.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Persona con gafas y cinta métrica al cuello frente a prendas colgadas"
  },
  "la-talla-peruana": {
    "src": "/blog/la-talla-peruana.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Manos registrando medidas junto a una prenda verde"
  },
  "medalla-de-oro-en-uniformes": {
    "src": "/blog/medalla-de-oro-en-uniformes.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Medalla deportiva sostenida sobre un uniforme rojo"
  },
  "los-uniformes-un-problema-olimpico": {
    "src": "/blog/los-uniformes-un-problema-olimpico.jpg",
    "width": 1024,
    "height": 585,
    "alt": "Dos personas con ropa deportiva roja y blanca en un recinto deportivo"
  },
  "disenador-a-sus-disenos": {
    "src": "/blog/disenador-a-sus-disenos.jpg",
    "width": 400,
    "height": 274,
    "alt": "Persona dibujando un diseño de moda en una mesa de trabajo"
  },
  "3-consejos-para-compradores-de-textiles-b2b": {
    "src": "/blog/3-consejos-para-compradores-de-textiles-b2b.jpg",
    "width": 400,
    "height": 267,
    "alt": "Manos midiendo tela sobre una mesa de corte"
  },
  "el-futuro-de-la-industria-textil-y-de-confecciones": {
    "src": "/blog/el-futuro-de-la-industria-textil-y-de-confecciones.jpg",
    "width": 400,
    "height": 267,
    "alt": "Una mano robótica frente a una mano humana"
  },
  "logistica-y-abastecimiento-textil-2022": {
    "src": "/blog/logistica-y-abastecimiento-textil-2022.png",
    "width": 1024,
    "height": 683,
    "alt": "Contenedores de transporte apilados bajo el cielo azul"
  },
  "que-significa-tallas-completas-en-ropa": {
    "src": "/blog/que-significa-tallas-completas-en-ropa.jpg",
    "width": 1024,
    "height": 569,
    "alt": "Perchas de madera con etiquetas de tallas de XXS a XXL"
  },
  "guia-de-tallas-online": {
    "src": "/blog/guia-de-tallas-online.jpg",
    "width": 1024,
    "height": 576,
    "alt": "Gráfico de medidas y tallas sobre un fondo rojo"
  },
  "una-breve-historia-del-algodon": {
    "src": "/blog/una-breve-historia-del-algodon.jpg",
    "width": 1024,
    "height": 569,
    "alt": "Cápsulas de algodón abiertas en un campo"
  },
  "el-ano-del-algodon-2022": {
    "src": "/blog/el-ano-del-algodon-2022.jpg",
    "width": 1024,
    "height": 576,
    "alt": "Algodón exhibido en recipientes de una balanza"
  },
  "tallas-completas-en-peru": {
    "src": "/blog/tallas-completas-en-peru.jpg",
    "width": 1024,
    "height": 632,
    "alt": "Cinta métrica sobre un fondo amarillo"
  },
  "las-tallas-completas-segun-una-ia": {
    "src": "/blog/las-tallas-completas-segun-una-ia.jpg",
    "width": 1024,
    "height": 684,
    "alt": "Brazo robótico frente a dos personas con una tableta"
  },
  "como-elegir-el-uniforme-perfecto-para-tu-negocio-segun-chatgpt": {
    "src": "/blog/como-elegir-el-uniforme-perfecto-para-tu-negocio-segun-chatgpt.jpg",
    "width": 1024,
    "height": 683,
    "alt": "Pantalla con una conversación de ChatGPT"
  },
  "una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano": {
    "src": "/blog/una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano.jpg",
    "width": 1024,
    "height": 575,
    "alt": "Persona sosteniendo una nota verde con las letras A.I."
  },
  "uniformes-de-guerra": {
    "src": "/blog/uniformes-de-guerra.webp",
    "width": 1024,
    "height": 574,
    "alt": "Prendas de uniforme con distintivos colgadas en una percha"
  },
  "un-tejido-llamado-gaza": {
    "src": "/blog/un-tejido-llamado-gaza.webp",
    "width": 1024,
    "height": 574,
    "alt": "Persona con un pañuelo claro en la cabeza frente a un fondo desenfocado"
  },
  "perumin-2023": {
    "src": "/blog/perumin-2023.webp",
    "width": 1024,
    "height": 574,
    "alt": "Persona con casco observando una operación minera"
  },
  "como-elegir-la-prenda-de-invierno-ideal-segun-tu-rubro-empresarial": {
    "src": "/blog/como-elegir-la-prenda-de-invierno-ideal-segun-tu-rubro-empresarial.jpg",
    "width": 1024,
    "height": 509,
    "alt": "Tres personas con diferentes prendas de trabajo y abrigo"
  },
  "compras-comerciales-vs-compras-industriales-por-que-fabricar-uniformes-a-pedido-es-la-mejor-opcion": {
    "src": "/blog/compras-comerciales-vs-compras-industriales-por-que-fabricar-uniformes-a-pedido-es-la-mejor-opcion.jpg",
    "width": 1024,
    "height": 681,
    "alt": "Persona frente a un muestrario de hilos y materiales"
  },
  "novedades-en-el-mercado-de-uniformes-para-el-2025-tendencias-que-no-puedes-perderte": {
    "src": "/blog/novedades-en-el-mercado-de-uniformes-para-el-2025-tendencias-que-no-puedes-perderte.jpg",
    "width": 1024,
    "height": 619,
    "alt": "Personal con casco y ropa de trabajo en una nave industrial"
  },
  "uniformes-a-medida-o-por-tallas-descubre-la-opcion-mas-practica-y-conveniente": {
    "src": "/blog/uniformes-a-medida-o-por-tallas-descubre-la-opcion-mas-practica-y-conveniente.jpg",
    "width": 1024,
    "height": 576,
    "alt": "Toma de una medida en la cintura de una prenda verde"
  },
  "mujeres-que-tejen-el-mundo-con-su-fuerza-y-pasion": {
    "src": "/blog/mujeres-que-tejen-el-mundo-con-su-fuerza-y-pasion.jpg",
    "width": 1024,
    "height": 576,
    "alt": "Fotografía en blanco y negro de una persona trabajando en una máquina de coser"
  },
  "como-definir-un-proyecto-de-uniformes-corporativos": {
    "src": "/blog/como-definir-un-proyecto-de-uniformes-corporativos.webp",
    "width": 1200,
    "height": 801,
    "alt": "Persona tomando notas en una carpeta de apoyo"
  },
  "por-que-las-empresas-tienen-problemas-con-las-tallas": {
    "src": "/blog/por-que-las-empresas-tienen-problemas-con-las-tallas.webp",
    "width": 1200,
    "height": 800,
    "alt": "Cinta métrica sobre una mesa de trabajo"
  },
  "de-que-depende-el-tiempo-de-entrega-de-uniformes": {
    "src": "/blog/de-que-depende-el-tiempo-de-entrega-de-uniformes.webp",
    "width": 6240,
    "height": 4160,
    "alt": "Cintas métricas de varios colores enrolladas"
  },
  "dia-mundial-del-algodon-2026": {
    "src": "/blog/dia-mundial-del-algodon-2026.webp",
    "width": 1080,
    "height": 1080,
    "alt": "Muestras de algodón de distintos colores exhibidas en un museo"
  },
  "el-fenomeno-del-nino-y-su-impacto-en-la-industria-textil": {
    "src": "/blog/el-fenomeno-del-nino-y-su-impacto-en-la-industria-textil.webp",
    "width": 1600,
    "height": 1200,
    "alt": "Señal de tránsito parcialmente rodeada por agua"
  },
  "sector-textil-peruano-emergencia-productividad-2026": {
    "src": "/blog/sector-textil-peruano-emergencia-productividad-2026.webp",
    "width": 1000,
    "height": 667,
    "alt": "Detalle de las piezas de una máquina textil industrial"
  }
}

export function getPostImage(slug: string): BlogImage {
  const image = images[slug]
  if (!image) throw new Error(`Missing blog image: ${slug}`)
  return image
}
