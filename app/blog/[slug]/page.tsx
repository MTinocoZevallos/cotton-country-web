import { notFound, permanentRedirect } from "next/navigation"
import { posts, postPath } from "@/lib/blog"
export function generateStaticParams(){return posts.map(post=>({slug:post.slug}))}
export default async function LegacyBlogPost({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params
  const post=posts.find(item=>item.slug===slug)
  if(!post)notFound()
  permanentRedirect(postPath(post))
}
