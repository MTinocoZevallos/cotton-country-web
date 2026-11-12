import type { Metadata } from "next"
import { posts, type Post } from "@/app/blog/posts"
import { blogCategories, postCategoryIds } from "./taxonomy"
import { contentText, inlineText, parseContent } from "./content"
import { getPostImage } from "./images"
import { BLOG_ORIGIN, postPath } from "./paths"

export { posts, blogCategories, getPostImage, postPath }
export const PAGE_SIZE = 12
export const featuredSlug = "como-definir-un-proyecto-de-uniformes-corporativos"
export function categoryForPost(post: Post) {
  const category = blogCategories.find(item => item.id === postCategoryIds[post.slug])
  if (!category) throw new Error(`Missing blog category: ${post.slug}`)
  return category
}
export const categoryPath = (category: typeof blogCategories[number]) => `/blog/categoria/${category.slug}`
export function descriptionForPost(post: Post) {
  const excerpt = post.excerpt.trim()
  const first = parseContent(post.content).find(block=>block.type==="paragraph")
  const text = !excerpt.endsWith("...") && excerpt.length<=175 ? excerpt : first?.type==="paragraph" ? inlineText(first.children) : contentText(post.content)
  if (text.length <= 175) return text
  return text.slice(0,165).replace(/\s+\S*$/, "").replace(/[.,;:]$/, "") + "…"
}
export function readingMinutes(post: Post) { return Math.max(1,Math.ceil(contentText(post.content).split(/\s+/).length/200)) }
export function relatedPosts(post: Post) {
  const others = posts.filter(item=>item.slug!==post.slug)
  const same = others.filter(item=>postCategoryIds[item.slug]===postCategoryIds[post.slug])
  return [...same,...others.filter(item=>!same.includes(item))].slice(0,3)
}
export function pageNumber(raw: string | string[] | undefined): number {
  if (raw === undefined) return 1
  if (Array.isArray(raw) || !/^[1-9]\d*$/.test(raw)) return NaN
  return Number(raw)
}
export function postMetadata(post: Post): Metadata {
  const image = getPostImage(post.slug), path = postPath(post)
  return {
    title:post.title, description:descriptionForPost(post), alternates:{canonical:path},
    openGraph:{type:"article",title:post.title,description:descriptionForPost(post),url:path,siteName:"Cotton Country",locale:"es_PE",images:[{url:image.src,width:image.width,height:image.height,alt:image.alt}],...(post.publishedAt?{publishedTime:post.publishedAt}:{}),...(post.updatedAt?{modifiedTime:post.updatedAt}:{})},
    twitter:{card:"summary_large_image",title:post.title,description:descriptionForPost(post),images:[image.src]},
  }
}
export function postStructuredData(post: Post) {
  const category = categoryForPost(post), image = getPostImage(post.slug), url = BLOG_ORIGIN+postPath(post)
  return {"@context":"https://schema.org","@graph":[
    {"@type":"BlogPosting","@id":url+"#article",url,mainEntityOfPage:{"@type":"WebPage","@id":url},headline:post.title,description:descriptionForPost(post),articleSection:category.name,inLanguage:"es-PE",image:{"@type":"ImageObject",url:BLOG_ORIGIN+image.src,width:image.width,height:image.height},publisher:{"@type":"Organization",name:"Cotton Country",url:BLOG_ORIGIN},...(post.publishedAt?{datePublished:post.publishedAt}:{}),...(post.updatedAt?{dateModified:post.updatedAt}:{})},
    {"@type":"BreadcrumbList",itemListElement:[{name:"Inicio",item:BLOG_ORIGIN+"/"},{name:"Blog",item:BLOG_ORIGIN+"/blog"},{name:category.name,item:BLOG_ORIGIN+categoryPath(category)},{name:post.title,item:url}].map((item,index)=>({"@type":"ListItem",position:index+1,...item}))},
  ]}
}
export function serializeStructuredData(value: unknown) { return JSON.stringify(value).replace(/</g,"\\u003c").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029") }
