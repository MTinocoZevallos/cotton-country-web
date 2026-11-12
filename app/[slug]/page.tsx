import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { posts, postMetadata } from "@/lib/blog"
import Article from "@/components/blog/Article"
type Props={params:Promise<{slug:string}>}
export function generateStaticParams(){return posts.map(post=>({slug:post.slug}))}
async function getPost(params:Props["params"]){const {slug}=await params;const post=posts.find(item=>item.slug===slug);if(!post)notFound();return post}
export async function generateMetadata({params}:Props):Promise<Metadata>{return postMetadata(await getPost(params))}
export default async function PostPage({params}:Props){return <Article post={await getPost(params)}/>}
