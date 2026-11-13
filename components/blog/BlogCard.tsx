import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Post } from "@/app/blog/posts"
import { categoryForPost, categoryPath, descriptionForPost, getPostImage, postPath, readingMinutes } from "@/lib/blog"
import { publicationLabel } from "@/lib/blog/publication"
import styles from "./blog.module.css"
export default function BlogCard({ post }: { post: Post }) {
  const category=categoryForPost(post), image=getPostImage(post.slug)
  return <article className={styles.card}>
    {image.visible !== false && <Link prefetch={false} href={postPath(post)} className={styles.cardImage}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width:575px) calc(100vw - 40px), (max-width:900px) 50vw, 33vw"/></Link>}
    <Link prefetch={false} href={categoryPath(category)} className={styles.category}>{category.name}</Link>
    <h3><Link prefetch={false} href={postPath(post)}>{post.title}</Link></h3>
    <p>{descriptionForPost(post)}</p>
    <div className={styles.cardBottom}><span>{post.publishedAt&&publicationLabel(post.publishedAt)?<time dateTime={post.publishedAt}>{publicationLabel(post.publishedAt)}</time>:"Archivo editorial"} · Lectura aprox. {readingMinutes(post)} min</span><Link prefetch={false} href={postPath(post)} aria-label={`Leer: ${post.title}`}>Leer artículo <ArrowUpRight size={16} aria-hidden="true"/></Link></div>
  </article>
}
