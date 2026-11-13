import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { editorialSerif } from "@/components/home-font"
import { blogCategories, categoryPath, PAGE_SIZE, pageNumber, posts, orderPostsByPublication } from "@/lib/blog"
import { postCategoryIds } from "@/lib/blog/taxonomy"
import BlogCard from "@/components/blog/BlogCard"
import CategoryNav from "@/components/blog/CategoryNav"
import Pagination from "@/components/blog/Pagination"
import styles from "@/components/blog/blog.module.css"
type Props={params:Promise<{category:string}>;searchParams:Promise<{pagina?:string|string[]}>}
export function generateStaticParams(){return blogCategories.map(category=>({category:category.slug}))}
async function state({params,searchParams}:Props){
  // Resolve both server-provided parameters before looking up the category.
  const [{category:slug},query]=await Promise.all([params,searchParams])
  const selected=blogCategories.find(item=>item.slug===slug)
  if(!selected)notFound()
  const items=orderPostsByPublication(posts.filter(post=>postCategoryIds[post.slug]===selected.id))
  const page=pageNumber(query.pagina),pages=Math.ceil(items.length/PAGE_SIZE)
  if(!Number.isSafeInteger(page)||page<1||page>pages)notFound()
  return {category:selected,items,page,pages,path:categoryPath(selected)+(page>1?`?pagina=${page}`:"")}
}
export async function generateMetadata(props:Props):Promise<Metadata>{const {category,page,path}=await state(props);return{title:`${category.name}${page>1?` · Página ${page}`:""} | Blog Cotton Country`,description:category.description,alternates:{canonical:path},openGraph:{title:category.name,description:category.description,url:path,type:"website",siteName:"Cotton Country",locale:"es_PE"}}}
export default async function CategoryPage(props:Props){
  const {category,items,page,pages}=await state(props)
  return <div className={`${styles.page} ${editorialSerif.variable}`}><div className={styles.container}>
    <header className={styles.intro}><p className={styles.eyebrow}><Link prefetch={false} href="/blog">Blog / Cotton Country</Link></p><h1>{category.name}</h1><p>{category.description}</p></header>
    <CategoryNav selected={category.id}/>
    <section className={styles.section} id="biblioteca" aria-label={`Artículos de ${category.name.toLowerCase()}`}><div className={styles.sectionHeader}><p className={styles.eyebrow}>{items.length} lecturas para explorar</p><h2>Una mirada al tema.</h2></div><div className={styles.grid}>{items.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE).map(post=><BlogCard key={post.slug} post={post}/>)}</div><Pagination page={page} pages={pages} path={categoryPath(category)}/></section>
  </div></div>
}
