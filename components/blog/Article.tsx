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
import HistoricalChat from "./HistoricalChat"
import { historicalChatSource, parseFullSizeChat } from "@/lib/blog/historical-chat"
import styles from "./blog.module.css"

export default function Article({ post }: { post: Post }) {
  const historicalChat = post.slug === "una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano"
  const fullSizeChat = post.slug === "las-tallas-completas-segun-una-ia"
  const approvedPeruvianSize = post.slug === "la-talla-peruana"
  const approvedNtp = post.slug === "ntp-para-la-designacion-de-tallas"
  const approvedInterview = post.slug === "que-significa-tallas-completas-en-ropa"
  // Preserve the approved Markdown in storage and scope its italic styling to this article.
  const articleContent = approvedInterview ? post.content.replaceAll("*fit*", "<em>fit</em>") : (approvedNtp || approvedPeruvianSize) ? post.content.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>") : post.content
  const category=categoryForPost(post), image=getPostImage(post.slug), blocks=parseContent(articleContent)
  const first=blocks[0]?.type==="paragraph"?blocks[0]:undefined
  const headings=blocks.filter(block=>block.type==="heading")
  const bodyBlocks=first?blocks.slice(1):blocks
  const interviewStart=bodyBlocks.findIndex(block=>block.type==="heading"&&block.level===2)
  const editorialStart=bodyBlocks.findIndex(block=>block.type==="heading"&&block.id==="son-realmente-una-solucion-las-tallas-completas")
  const chatStart=bodyBlocks.findIndex(block=>block.type==="heading"&&block.id==="que-le-preguntamos-a-chatgpt")
  const chatEnd=bodyBlocks.findIndex(block=>block.type==="heading"&&block.id==="de-donde-obtuvo-la-inteligencia-artificial-estas-medidas")
  const fullSizeStart=bodyBlocks.findIndex(block=>block.type==="heading"&&block.id==="que-respondio-chatgpt")
  const fullSizeEnd=bodyBlocks.findIndex(block=>block.type==="heading"&&block.id==="donde-se-equivoco-la-ia")
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
        <article className={styles.prose} aria-label="Contenido del artículo">
          {fullSizeChat ? <>
            <Content blocks={bodyBlocks.slice(0,fullSizeStart+1)}/>
            <HistoricalChat exchanges={parseFullSizeChat(post.content)} answerLabel="ChatGPT (respuesta original de 2023)"/>
            <Content blocks={bodyBlocks.slice(fullSizeEnd-1)}/>
          </> : historicalChat ? <>
            <Content blocks={bodyBlocks.slice(0,chatStart+1)}/>
            <HistoricalChat source={historicalChatSource(post.content)}/>
            <Content blocks={bodyBlocks.slice(chatEnd)}/>
          </> : approvedInterview ? <>
            <Content blocks={bodyBlocks.slice(0,interviewStart)}/>
            <div className={styles.attributedSection} role="group" aria-label="Respuestas de Ricardo Gonzalez">
              <p className={styles.attribution}>Respuestas de Ricardo Gonzalez</p>
              <Content blocks={bodyBlocks.slice(interviewStart,editorialStart)}/>
            </div>
            <div className={styles.attributedSection} role="group" aria-label="Posición editorial de Cotton Country">
              <p className={styles.attribution}>Posición editorial de Cotton Country</p>
              <Content blocks={bodyBlocks.slice(editorialStart)}/>
            </div>
          </> : <Content blocks={bodyBlocks}/>}
        </article>
      </div>
      <div className={styles.articleClosing}><Link prefetch={false} href="/blog"><ArrowLeft size={16} aria-hidden="true"/> Volver al blog</Link><Link prefetch={false} href={categoryPath(category)}>Más sobre {category.name.toLowerCase()} <ArrowRight size={16} aria-hidden="true"/></Link></div>
      {!approvedInterview && !historicalChat && !approvedNtp && !approvedPeruvianSize && !fullSizeChat && post.slug!=="el-problema-de-las-tallas" && <section className={styles.cta} aria-labelledby="article-contact"><div><p className={styles.eyebrow}>Del conocimiento al proyecto</p><h2 id="article-contact">¿Estás definiendo los uniformes de tu equipo?</h2><p>Reúne las prendas, cantidades y condiciones de uso para conversar sobre tu requerimiento.</p></div><Link prefetch={false} href="/contacto" className={styles.button}>Conversemos <ArrowUpRight size={16} aria-hidden="true"/></Link></section>}
      {!approvedInterview && <section className={styles.section} aria-labelledby="related-title"><div className={styles.sectionHeader}><p className={styles.eyebrow}>Sigue explorando</p><h2 id="related-title">Lecturas relacionadas</h2></div><div className={styles.grid}>{relatedPosts(post).map(item=><BlogCard key={item.slug} post={item}/>)}</div></section>}
    </div>
  </div>
}
