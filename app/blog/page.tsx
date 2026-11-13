import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { editorialSerif } from "@/components/home-font"
import { categoryForPost, categoryPath, descriptionForPost, featuredSlug, getPostImage, pageNumber, PAGE_SIZE, posts, postPath, orderPostsByPublication } from "@/lib/blog"
import { searchInterest } from "@/lib/blog/interest"
import BlogCard from "@/components/blog/BlogCard"
import CategoryNav from "@/components/blog/CategoryNav"
import Pagination from "@/components/blog/Pagination"
import styles from "@/components/blog/blog.module.css"

type Props = { searchParams: Promise<{ pagina?: string | string[] }> }
async function state(searchParams: Props["searchParams"]) {
  const page=pageNumber((await searchParams).pagina), pages=Math.ceil(posts.length/PAGE_SIZE)
  if(!Number.isSafeInteger(page)||page<1||page>pages)notFound()
  return {page,pages,path:page===1?"/blog":`/blog?pagina=${page}`}
}
export async function generateMetadata({searchParams}:Props):Promise<Metadata> {
  const {page,path}=await state(searchParams)
  const title=`Blog de cultura textil y uniformes${page>1?` · Página ${page}`:""} | Cotton Country`
  const description="Algodón, industria, materiales, tallaje y compras. Lecturas de Cotton Country para comprender las prendas y definir mejores proyectos de uniformes."
  const image=getPostImage(featuredSlug)
  return {title,description,alternates:{canonical:path},openGraph:{title,description,url:path,type:"website",siteName:"Cotton Country",locale:"es_PE",images:[{url:image.src,width:image.width,height:image.height,alt:image.alt}]}}
}
export default async function BlogPage({searchParams}:Props) {
  const {page,pages}=await state(searchParams)
  const featured=posts.find(post=>post.slug===featuredSlug)!, image=getPostImage(featured.slug), category=categoryForPost(featured)
  const recent=orderPostsByPublication(posts).slice(1,4)
  const archive=orderPostsByPublication(posts)
  const recommended=["una-breve-historia-del-algodon","5-tipos-de-tejidos-inteligentes","compras-comerciales-vs-compras-industriales-por-que-fabricar-uniformes-a-pedido-es-la-mejor-opcion"].map(slug=>posts.find(post=>post.slug===slug)!)
  return <div className={`${styles.page} ${editorialSerif.variable}`}><div className={styles.container}>
    <header className={styles.intro}><p className={styles.eyebrow}>Blog / Cotton Country</p><h1>La cultura detrás de cada uniforme.</h1><p>Algodón, materiales, tallaje y compras. Ideas para comprender la industria textil y tomar decisiones que empiezan mucho antes de confeccionar una prenda.</p></header>
    <CategoryNav/>
    {page===1&&<>
      <section className={styles.feature} aria-labelledby="featured-title"><Link prefetch={false} href={postPath(featured)} className={styles.featureImage}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width:900px) 100vw, 55vw" preload fetchPriority="high"/></Link><div className={styles.featureCopy}><p className={styles.eyebrow}>Lectura destacada</p><Link prefetch={false} className={styles.category} href={categoryPath(category)}>{category.name}</Link><h2 id="featured-title"><Link prefetch={false} href={postPath(featured)}>{featured.title}</Link></h2><p>{descriptionForPost(featured)}</p><Link prefetch={false} href={postPath(featured)} className={styles.textLink}>Leer el artículo <ArrowUpRight size={16} aria-hidden="true"/></Link></div></section>
      <section className={styles.section} aria-labelledby="recent-title"><div className={styles.sectionHeader}><p className={styles.eyebrow}>Publicaciones del archivo</p><h2 id="recent-title">Más publicaciones para explorar.</h2><p>Las actualizaciones editoriales no cambian la secuencia histórica del archivo.</p></div><div className={styles.grid}>{recent.map(post=><BlogCard key={post.slug} post={post}/>)}</div></section>
    </>}
    <section className={styles.section} id="biblioteca" aria-labelledby="archive-title"><div className={styles.sectionHeader}><p className={styles.eyebrow}>Biblioteca textil</p><h2 id="archive-title">Explora nuestros {posts.length} artículos.</h2><p>Elige un tema o recorre la secuencia histórica del archivo por páginas.</p></div><div className={styles.grid}>{archive.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE).map(post=><BlogCard key={post.slug} post={post}/>)}</div><Pagination page={page} pages={pages} path="/blog"/></section>
    {page===1&&<section className={styles.recommendations} aria-labelledby="recommended-title"><p className={styles.eyebrow}>Para seguir pensando</p><h2 id="recommended-title">Lecturas recomendadas</h2><p className={styles.recommendationNote}>Selección editorial, sin ranking automático de popularidad.</p><p className={styles.recommendationNote}>Interés observado en el reporte de {searchInterest.source}: <Link prefetch={false} href="/que-significa-tallas-completas-en-ropa">¿Qué significa tallas completas en ropa?</Link> · {searchInterest.items[0].clicks} clics. Dato del reporte revisado; los clics no equivalen a lecturas.</p><ul>{recommended.map(post=><li key={post.slug}><Link prefetch={false} href={postPath(post)}><span>{categoryForPost(post).name}</span>{post.title} <ArrowUpRight size={16} aria-hidden="true"/></Link></li>)}</ul></section>}
  </div></div>
}
