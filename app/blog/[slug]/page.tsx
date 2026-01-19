import { posts } from "../posts"
import { notFound } from "next/navigation"

type Props = {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold mb-6">
        {post.title}
      </h1>

      <article className="prose prose-lg max-w-none">
        {post.content.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </article>
    </main>
  )
}
