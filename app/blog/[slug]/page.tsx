import { Metadata } from "next"
import { notFound } from "next/navigation"
import { posts } from "../posts"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const { slug } = await props.params

  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: "Post no encontrado",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage(
  props: PageProps
) {
  const { slug } = await props.params

  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold mb-6">
        {post.title}
      </h1>
      
      <article className="prose">
        {post.content}
      </article>
    </main>
  )
}