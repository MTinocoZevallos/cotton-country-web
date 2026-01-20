import { posts } from "../posts"

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-2xl font-semibold">Post no encontrado</h1>
        <p>Slug recibido: {slug}</p>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold mb-6">{post.title}</h1>
      <p className="text-gray-600 mb-10">{post.excerpt}</p>
      <article className="prose">{post.content}</article>
    </main>
  )
}
