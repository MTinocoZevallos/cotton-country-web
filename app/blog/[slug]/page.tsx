import { posts } from "../posts"

interface PageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-2xl font-semibold">Post no encontrado</h1>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold mb-6">{post.title}</h1>

      <article className="prose prose-gray max-w-none whitespace-pre-line">
        {post.content}
      </article>
    </main>
  )
}
