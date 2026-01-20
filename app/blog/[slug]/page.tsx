import { posts } from "../posts"

export default function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = posts.find(
    (p) => p.slug === params.slug
  )

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-2xl font-semibold">
          Post no encontrado
        </h1>
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
