import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Post } from "@/app/blog/posts"
import { editorialSerif } from "@/components/home-font"
import { categoryForPost, categoryPath, getPostImage, postStructuredData, readingMinutes, relatedPosts, serializeStructuredData } from "@/lib/blog"
import { publicationLabel } from "@/lib/blog/publication"
import { inlineText, parseContent } from "@/lib/blog/content"
import Content, { InlineContent } from "./Content"
import BlogCard from "./BlogCard"
import styles from "./blog.module.css"

export default function Article({ post }: { post: Post }) {
  const category=categoryForPost(post), image=getPostImage(post.slug), blocks=parseContent(post.content)
  const first=blocks[0]?.type==="paragraph"?blocks[0]:undefined
  const headings=blocks.filter(block=>block.type==="heading")
  const revised=post.updatedAt?new Intl.DateTimeFormat("es-PE",{dateStyle:"long",timeZone:"UTC"}).format(new Date(post.updatedAt)):undefined
  return <div className={`${styles.page} ${editorialSerif.variable}`}>
    {/* JSON only, with '<' escaped; article content is rendered as React nodes. */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeStructuredData(postStructuredData(post))}}/>
    <div className={styles.container}>
      <header className={styles.articleHeader}>
        <nav className={styles.breadcrumbs} aria-label="Ruta de navegación"><Link prefetch={false} href="/blog">Blog</Link><span aria-hidden="true">/</span><Link prefetch={false} href={categoryPath(category)}>{category.name}</Link></nav>
        <p className={styles.eyebrow}>{category.name}</p>
        <h1>{post.title}</h1>
        <div className={styles.articleMeta}><span>Cotton Country · {revised?"Edición revisada":"Archivo editorial"}</span><span>Lectura aprox. {readingMinutes(post)} min</span>{post.publishedAt&&publicationLabel(post.publishedAt)&&<time dateTime={post.publishedAt}>Publicado el {publicationLabel(post.publishedAt)}</time>}{post.updatedAt&&<time dateTime={post.updatedAt}>Revisado el {revised}</time>}</div>
        {first&&<div className={styles.lead}><InlineContent nodes={first.children}/></div>}
      </header>
      {image.visible !== false && <figure className={styles.cover}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width:900px) 100vw, 1100px" loading="lazy"/>{post.slug==="dia-mundial-del-algodon-2026"&&<figcaption>Muestras de algodón en diferentes tonalidades exhibidas en el Museo Amano, Lima. Fotografía: Cotton Country.</figcaption>}</figure>}
      <div className={styles.readingLayout}>
        <aside>{headings.length>=3&&<nav className={styles.toc} aria-label="Índice del artículo"><p>En este artículo</p><ol>{headings.map(h=><li key={h.id} data-level={h.level}><a href={`#${h.id}`}>{inlineText(h.children)}</a></li>)}</ol></nav>}</aside>
        <article className={styles.prose} aria-label="Contenido del artículo"><Content blocks={first?blocks.slice(1):blocks}/></article>
      </div>
      <div className={styles.articleClosing}><Link prefetch={false} href="/blog"><ArrowLeft size={16} aria-hidden="true"/> Volver al blog</Link><Link prefetch={false} href={categoryPath(category)}>Más sobre {category.name.toLowerCase()} <ArrowRight size={16} aria-hidden="true"/></Link></div>
      <section className={styles.cta} aria-labelledby="article-contact"><div><p className={styles.eyebrow}>Del conocimiento al proyecto</p><h2 id="article-contact">¿Estás definiendo los uniformes de tu equipo?</h2><p>Reúne las prendas, cantidades y condiciones de uso para conversar sobre tu requerimiento.</p></div><Link prefetch={false} href="/contacto" className={styles.button}>Conversemos <ArrowUpRight size={16} aria-hidden="true"/></Link></section>
      <section className={styles.section} aria-labelledby="related-title"><div className={styles.sectionHeader}><p className={styles.eyebrow}>Sigue explorando</p><h2 id="related-title">Lecturas relacionadas</h2></div><div className={styles.grid}>{relatedPosts(post).map(item=><BlogCard key={item.slug} post={item}/>)}</div></section>
    </div>
  </div>
}
