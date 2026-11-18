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
  const approvedInterview = post.slug === "que-significa-tallas-completas-en-ropa"
  const approvedNtp = post.slug === "ntp-para-la-designacion-de-tallas"
  const approvedPeruvianSize = post.slug === "la-talla-peruana"
  const category=categoryForPost(post), image=getPostImage(post.slug), blocks=parseContent(post.content)
  const first=blocks[0]?.type==="paragraph"?blocks[0]:undefined
  const headings=blocks.filter(block=>block.type==="heading")
  const bodyBlocks=first?blocks.slice(1):blocks
  const chatStart=bodyBlocks.findIndex(block=>block.type==="heading"&&block.id==="cotton-country-conversa-con-chatgpt")
  const chatSource=historicalChat||fullSizeChat?historicalChatSource(post.content):undefined
  const chatTail=chatSource?post.content.slice(post.content.indexOf(chatSource)+chatSource.length):""
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
        {first&&<div className={styles.lead} data-article-lead><InlineContent nodes={first.children}/></div>}
      </header>
      {image.visible !== false && <figure className={styles.cover}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width:900px) 100vw, 1100px" loading="lazy" style={image.width<760?{maxWidth:image.width,marginInline:"auto"}:undefined}/></figure>}
      <div className={styles.readingLayout}>
        <aside>{headings.length>0&&<nav className={styles.toc} aria-label="Índice del artículo"><p>En este artículo</p><ol>{headings.map(h=><li key={h.id} data-level={h.level}><a href={`#${h.id}`}>{inlineText(h.children)}</a></li>)}</ol></nav>}</aside>
        <article className={styles.prose} aria-label="Contenido del artículo" data-article-body>
          {chatSource ? <>
            <Content blocks={bodyBlocks.slice(0,chatStart)}/>
            {fullSizeChat ? <HistoricalChat exchanges={parseFullSizeChat(post.content)}/> : <HistoricalChat source={chatSource}/>}
            <Content blocks={parseContent(chatTail)}/>
          </> : <Content blocks={bodyBlocks}/>}
        </article>
      </div>
      <div className={styles.articleClosing}><Link prefetch={false} href="/blog"><ArrowLeft size={16} aria-hidden="true"/> Volver al blog</Link><Link prefetch={false} href={categoryPath(category)}>Más sobre {category.name.toLowerCase()} <ArrowRight size={16} aria-hidden="true"/></Link></div>
      {!approvedInterview && !historicalChat && !approvedNtp && !approvedPeruvianSize && !fullSizeChat && post.slug!=="el-problema-de-las-tallas" && <section className={styles.cta} aria-labelledby="article-contact"><div><p className={styles.eyebrow}>Del conocimiento al proyecto</p><h2 id="article-contact">¿Estás definiendo los uniformes de tu equipo?</h2><p>Reúne las prendas, cantidades y condiciones de uso para conversar sobre tu requerimiento.</p></div><Link prefetch={false} href="/contacto" className={styles.button}>Conversemos <ArrowUpRight size={16} aria-hidden="true"/></Link></section>}
      {!approvedInterview && <section className={styles.section} aria-labelledby="related-title"><div className={styles.sectionHeader}><p className={styles.eyebrow}>Sigue explorando</p><h2 id="related-title">Lecturas relacionadas</h2></div><div className={styles.grid}>{relatedPosts(post).map(item=><BlogCard key={item.slug} post={item}/>)}</div></section>}
    </div>
  </div>
}
