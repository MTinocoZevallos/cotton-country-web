import { posts } from "../posts"

type PageProps = {
  params: {
    slug: string
  }
}

export default function PostPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug)

  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-2xl font-semibold">
          Post no encontrado
        </h1>
        <p className="mt-4 text-gray-600">
          Slug recibido: {slug}
        </p>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold mb-6">
        {post.title}
      </h1>

      <p className="text-gray-600 mb-10">
        {post.excerpt}
      </p>

      <article className="prose">
        {post.content}
      </article>
    </main>
  )
}
